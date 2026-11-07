/* GATE CSE 2027: study layer. Owner: session C. Why each feature exists: GATE/DESIGN.md section 4.
 *
 *  Recall cards      "> [!RECALL] Question?" callouts keep the answer hidden until asked for;
 *                    Forgot / Hard / Knew it then schedules the next review (testing effect).
 *  Spaced review     rated cards and topics marked "studied" come back after 1, 3, 7, 14, 30, 60 days,
 *                    capped so the last review lands before the exam (spacing effect).
 *                    Widget `type: review` lists what is due.
 *  Self-test mode    formulae pages: each formula hidden behind its name; notes pages: each section
 *                    hidden behind its heading (free recall before re-reading).
 *  Reading settings  font, size and letter spacing per reader (no single font is fastest for everyone).
 *  Focus mode        hides navigation; optional break reminder every 25 or 50 minutes.
 *
 * Hooks from app.js: #doc loses aria-busy once a page has fully rendered, and
 * window.GATEWidgets[type](host, opts, route) renders widget types app.js does not know.
 * Everything is stored per viewer in localStorage; each access is wrapped and the site works without it.
 */
(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const html = document.documentElement;

  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k === 'html') n.innerHTML = v;
      else n.setAttribute(k, v === true ? '' : String(v));
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid == null || kid === false) continue;
      n.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    return n;
  }

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage blocked: nothing is saved */ }
    },
  };

  const slugify = (s) => (window.GATE && window.GATE.slugify
    ? window.GATE.slugify(s)
    : String(s).toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').trim().replace(/[\s-]+/g, '-').slice(0, 80));

  // ---------------------------------------------------------------- dates (local calendar days)
  const pad = (n) => String(n).padStart(2, '0');
  const isoDay = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = () => isoDay(new Date());
  const parseDay = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (iso, n) => { const d = parseDay(iso); d.setDate(d.getDate() + n); return isoDay(d); };
  const dayDiff = (a, b) => Math.round((parseDay(b) - parseDay(a)) / 86400000);
  const fmtDay = (iso) => parseDay(iso).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

  function whenText(iso) {
    const d = dayDiff(today(), iso);
    if (d < 0) return `overdue by ${-d} day${d === -1 ? '' : 's'}`;
    if (d === 0) return 'due today';
    if (d === 1) return 'next review tomorrow';
    return `next review ${fmtDay(iso)}, in ${d} days`;
  }

  let examDay = '2027-02-06';
  fetch('site.json').then((r) => (r.ok ? r.json() : null)).then((s) => {
    const d = s && s.exam && s.exam.first_day;
    if (/^\d{4}-\d{2}-\d{2}$/.test(d || '')) examDay = d;
  }).catch(() => { /* keep the default */ });

  // ---------------------------------------------------------------- spaced-review schedule
  // Leitner-style boxes. A forgotten item restarts at 1 day; "hard" repeats the same gap;
  // "knew it" moves to the next, longer gap. Nothing is scheduled after two days before the exam.
  const STEPS = [1, 3, 7, 14, 30, 60];
  const RATINGS = [[0, 'Forgot'], [1, 'Hard'], [2, 'Knew it']];

  function reschedule(item, rating) {
    const fresh = item.box == null;
    let box;
    if (rating === 0) box = 0;
    else if (rating === 1) box = fresh ? 0 : item.box;
    else box = fresh ? 1 : Math.min(item.box + 1, STEPS.length - 1);
    const now = today();
    const lastSlot = addDays(examDay, -2);
    let due = addDays(now, STEPS[box]);
    if (due > lastSlot) due = now < lastSlot ? lastSlot : addDays(now, 1);
    return Object.assign({}, item, {
      box, due, last: now,
      reps: (item.reps || 0) + 1,
      lapses: (item.lapses || 0) + (rating === 0 ? 1 : 0),
    });
  }

  const STUDY_KEY = 'gate-study';
  function loadStudy() {
    const raw = store.get(STUDY_KEY, null);
    const s = raw && typeof raw === 'object' ? raw : {};
    if (!s.cards || typeof s.cards !== 'object') s.cards = {};
    if (!s.topics || typeof s.topics !== 'object') s.topics = {};
    return s;
  }
  const saveStudy = (s) => store.set(STUDY_KEY, s);

  // ---------------------------------------------------------------- routes (same rules as app.js)
  function route() {
    let raw = location.hash.replace(/^#\/?/, '');
    try { raw = decodeURIComponent(raw); } catch (e) { /* keep raw */ }
    const qi = raw.indexOf('?');
    const path = (qi >= 0 ? raw.slice(0, qi) : raw).replace(/\/+$/, '') || 'home';
    const params = new URLSearchParams(qi >= 0 ? raw.slice(qi + 1) : '');
    const m = path.match(/^subjects\/([a-z]+)(?:\/(notes|formulae|pyq))?$/);
    return { path, params, slug: m ? m[1] : null, tab: m ? (m[2] || 'overview') : null };
  }
  const routeHash = (path, id, extra) => `#/${path === 'home' ? '' : path}${id ? `?h=${encodeURIComponent(id)}${extra || ''}` : ''}`;

  // Heading text without the "#" anchor and the "Mark studied" button.
  function headingText(hd) {
    return Array.from(hd.childNodes)
      .filter((n) => !(n.classList && (n.classList.contains('anchor') || n.classList.contains('study-toggle'))))
      .map((n) => n.textContent).join('').replace(/\s+/g, ' ').trim();
  }

  // Text of a rendered node with math turned back into $TeX$ and code into `code`,
  // so it can be stored, slugged and re-rendered by window.GATE.mdToHtml.
  function sourceText(node) {
    const clone = node.cloneNode(true);
    clone.querySelectorAll('.katex').forEach((k) => {
      const ann = k.querySelector('annotation[encoding="application/x-tex"]');
      k.replaceWith(document.createTextNode(ann ? `$${ann.textContent.trim()}$` : k.textContent));
    });
    clone.querySelectorAll('code').forEach((c) => c.replaceWith(document.createTextNode(`\`${c.textContent}\``)));
    return clone.textContent.replace(/\s+/g, ' ').trim();
  }

  function inlineMd(text) {
    if (window.GATE && window.GATE.mdToHtml) {
      try { return window.GATE.mdToHtml(text).trim().replace(/^<p>([\s\S]*)<\/p>$/, '$1'); } catch (e) { /* fall through */ }
    }
    return null;
  }

  // ---------------------------------------------------------------- recall cards
  function cardStatus(card) {
    if (!card || !card.due) return { text: 'New', due: false };
    const d = dayDiff(today(), card.due);
    if (d <= 0) return { text: d < 0 ? 'Overdue' : 'Due today', due: true };
    return { text: `Next review ${fmtDay(card.due)}`, due: false };
  }

  function enhanceRecallCards(doc, r) {
    const used = new Set();
    $$('blockquote.callout-recall', doc).forEach((bq, i) => {
      if (bq.dataset.recall) return;
      bq.dataset.recall = 'on';
      const title = bq.querySelector(':scope > .callout-title');
      const question = title ? sourceText(title) : '';
      let id = `recall-${slugify(question.replace(/[$`]/g, ' ')) || i + 1}`;
      const base = id;
      let n = 2;
      while (used.has(id)) id = `${base}-${n++}`;
      used.add(id);
      bq.id = id;
      const key = `${r.path}#${id}`;

      const answer = el('div', { class: 'recall-answer', id: `${id}-answer`, hidden: true });
      for (const node of Array.from(bq.childNodes)) if (node !== title) answer.append(node);
      const status = el('span', { class: 'recall-status' });
      const label = el('div', { class: 'recall-label' }, el('span', { class: 'recall-kicker', text: 'Recall' }), status);
      const show = el('button', { type: 'button', class: 'recall-btn recall-show', 'aria-expanded': 'false', 'aria-controls': answer.id, text: 'Show answer' });
      const rate = el('div', { class: 'recall-rate', role: 'group', 'aria-label': 'How well did you recall it?', hidden: true },
        el('span', { class: 'recall-ask', text: 'How did it go?' }),
        RATINGS.map(([v, t]) => el('button', { type: 'button', class: `recall-btn rate-${v}`, 'data-rate': v, text: t })));
      // Multiple-choice options: a GFM task list in the card ("- [x] right", "- [ ] wrong").
      // Picking one marks it, shows the right one and opens the worked answer (user request).
      const list = Array.from(answer.querySelectorAll(':scope > ul')).find((ul) =>
        ul.children.length > 1 && Array.from(ul.children).every((li) => li.querySelector(':scope > input[type="checkbox"]')));
      let choices = null;
      if (list) {
        choices = el('div', { class: 'recall-options', role: 'group', 'aria-label': 'Choose an answer' });
        Array.from(list.children).forEach((li, k) => {
          const box = li.querySelector(':scope > input[type="checkbox"]');
          const correct = box.checked;
          box.remove();
          const opt = el('button', { type: 'button', class: 'recall-opt', 'data-correct': correct ? '1' : '0' },
            el('span', { class: 'recall-opt-key', 'aria-hidden': 'true', text: 'ABCDEFGH'[k] }), el('span', { class: 'recall-opt-text' }));
          opt.lastChild.append(...Array.from(li.childNodes));
          choices.append(opt);
        });
        list.remove();
      }

      const hint = el('span', { class: 'recall-hint', text: choices ? 'Work it out first, then pick an option.' : 'Answer it in your head, or on paper, first.' });
      const bar = el('div', { class: 'recall-bar' }, show, rate, hint);

      if (title) title.before(label); else bq.prepend(label);
      if (choices) bq.append(choices);
      bq.append(answer, bar);

      const openAnswer = () => { if (answer.hidden) show.click(); };
      if (choices) choices.addEventListener('click', (e) => {
        const pick = e.target.closest('.recall-opt');
        if (!pick || choices.dataset.done) return;
        choices.dataset.done = '1';
        const right = pick.dataset.correct === '1';
        for (const o of choices.children) {
          o.disabled = true;
          if (o.dataset.correct === '1') o.classList.add('is-correct');
        }
        if (!right) pick.classList.add('is-wrong');
        pick.setAttribute('aria-pressed', 'true');
        openAnswer();
        hint.hidden = false;
        hint.textContent = right ? 'Correct. Rate how easy it was.' : 'Not quite: the right option is marked green.';
        hint.classList.toggle('recall-hint-good', right);
        hint.classList.toggle('recall-hint-bad', !right);
      });
      // Showing the answer without picking also reveals the right option.
      if (choices) show.addEventListener('click', () => {
        if (answer.hidden || choices.dataset.done) return;
        choices.dataset.done = '1';
        for (const o of choices.children) { o.disabled = true; if (o.dataset.correct === '1') o.classList.add('is-correct'); }
      });

      const paint = () => {
        const st = cardStatus(loadStudy().cards[key]);
        status.textContent = st.text;
        status.classList.toggle('due', st.due);
      };
      show.addEventListener('click', () => {
        const opening = answer.hidden;
        answer.hidden = !opening;
        show.setAttribute('aria-expanded', String(opening));
        show.textContent = opening ? 'Hide answer' : 'Show answer';
        rate.hidden = !opening || bq.dataset.rated === today();
        hint.hidden = opening && !rate.hidden;
      });
      rate.addEventListener('click', (e) => {
        const b = e.target.closest('button[data-rate]');
        if (!b) return;
        const s = loadStudy();
        s.cards[key] = Object.assign(reschedule(s.cards[key] || {}, +b.dataset.rate),
          { q: question.slice(0, 220), route: r.path, id, subject: r.slug || null });
        saveStudy(s);
        bq.dataset.rated = today();
        rate.hidden = true;
        hint.hidden = false;
        hint.textContent = `Saved: ${whenText(s.cards[key].due)}.`;
        paint();
      });
      paint();
    });
  }

  // ---------------------------------------------------------------- studied topics -> self-test reviews
  function setTopic(slug, id, title, studied) {
    if (!slug || !id) return;
    const s = loadStudy();
    const key = `${slug}/${id}`;
    if (studied) {
      if (!s.topics[key]) {
        s.topics[key] = { subject: slug, id, title: String(title).slice(0, 160), route: `subjects/${slug}/notes`, studied: today(), due: addDays(today(), 1) };
      }
    } else {
      delete s.topics[key];
    }
    saveStudy(s);
  }

  // app.js flips aria-pressed on the button itself before the click bubbles up to here.
  document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('.study-toggle');
    if (!btn) return;
    const h2 = btn.closest('h2');
    const r = route();
    if (h2 && r.slug) setTopic(r.slug, h2.id, headingText(h2), btn.getAttribute('aria-pressed') === 'true');
  });
  document.addEventListener('change', (e) => {
    const cb = e.target;
    if (!cb.matches || !cb.matches('.checklist input[type="checkbox"]')) return;
    const a = cb.closest('li') && cb.closest('li').querySelector('a[href]');
    if (!a) return;
    let href = a.getAttribute('href');
    try { href = decodeURIComponent(href); } catch (err) { /* keep */ }
    const m = href.match(/^#\/subjects\/([a-z]+)\/notes\?h=([^&]+)/);
    if (m) setTopic(m[1], m[2], a.textContent.trim(), cb.checked);
  });

  // ---------------------------------------------------------------- review widget (type: review)
  const REVIEW_LIMIT = 15;

  function renderReview(host) {
    const now = today();
    const s = loadStudy();
    const items = [
      ...Object.entries(s.cards).filter(([, c]) => c && c.due).map(([key, c]) => ({ kind: 'card', key, c })),
      ...Object.entries(s.topics).filter(([, t]) => t && t.due).map(([key, t]) => ({ kind: 'topic', key, c: t })),
    ];
    const due = items.filter((x) => x.c.due <= now).sort((a, b) => a.c.due.localeCompare(b.c.due));
    const later = items.filter((x) => x.c.due > now);
    const tomorrow = later.filter((x) => x.c.due === addDays(now, 1)).length;
    const week = later.filter((x) => x.c.due <= addDays(now, 7)).length;

    const box = el('section', { class: 'review', 'aria-label': 'Spaced review' },
      el('div', { class: 'review-head' },
        el('span', { class: 'review-title', text: due.length ? `Due for review today: ${due.length}` : 'Spaced review' }),
        items.length ? el('span', { class: 'review-count', text: `${tomorrow} due tomorrow · ${week} in the next 7 days` }) : null));

    if (!items.length) {
      box.append(el('p', { class: 'review-empty', text: 'Nothing is scheduled yet. Rate the recall cards on the notes pages, or mark topics as studied, and they come back here after 1, 3, 7, 14 and 30 days, timed to finish before the exam.' }));
    } else if (!due.length) {
      box.append(el('p', { class: 'review-empty', text: 'Nothing is due today. The gap between reviews is what makes them stick, so come back when items are due.' }));
    } else {
      const list = el('ol', { class: 'review-list' });
      due.slice(0, REVIEW_LIMIT).forEach((x) => list.append(reviewRow(x, host)));
      box.append(list);
      if (due.length > REVIEW_LIMIT) box.append(el('p', { class: 'review-empty', text: `${due.length - REVIEW_LIMIT} more are due. Work through the list from the top; the oldest come first.` }));
    }
    host.replaceChildren(box);
  }

  function reviewRow(x, host) {
    const c = x.c;
    const code = (c.subject || '').toUpperCase();
    const late = dayDiff(c.due, today());
    const meta = el('div', { class: 'review-meta' },
      code ? el('span', { class: 'code-badge', text: code }) : null,
      el('span', { text: x.kind === 'card' ? 'Recall card' : 'Topic self-test' }),
      late > 0 ? el('span', { class: 'review-late', text: `${late} day${late > 1 ? 's' : ''} overdue` }) : null);

    if (x.kind === 'card') {
      const link = el('a', { class: 'review-link', href: routeHash(c.route, c.id) });
      const rendered = inlineMd(c.q || 'Recall card');
      if (rendered) link.innerHTML = rendered; else link.textContent = c.q || 'Recall card';
      return el('li', {}, meta, link);
    }

    const actions = el('div', { class: 'review-actions', role: 'group', 'aria-label': `How well did you recall ${c.title}?` },
      el('span', { class: 'recall-ask', text: 'After the self-test:' }),
      RATINGS.map(([v, t]) => el('button', { type: 'button', class: `recall-btn rate-${v}`, 'data-rate': v, text: t })));
    actions.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-rate]');
      if (!b) return;
      const s = loadStudy();
      if (s.topics[x.key]) { s.topics[x.key] = reschedule(s.topics[x.key], +b.dataset.rate); saveStudy(s); }
      renderReview(host);
    });
    return el('li', {}, meta,
      el('a', { class: 'review-link', href: routeHash(c.route, c.id, '&test=1'), text: c.title }),
      el('div', { class: 'review-how', text: 'Write down what you remember from the heading alone, then reveal the section and check.' }),
      actions);
  }

  window.GATEWidgets = Object.assign(window.GATEWidgets || {}, { review: (host) => renderReview(host) });

  // ---------------------------------------------------------------- self-test mode
  const EYE_OFF = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7c2 0 3.8.7 5.3 1.7M22 12s-3.6 7-10 7c-2 0-3.8-.7-5.3-1.7"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18"/></svg>';

  function addSelfTest(doc, r) {
    if (!r.slug || (r.tab !== 'notes' && r.tab !== 'formulae')) return null;
    const h1 = $('h1', doc);
    if (!h1 || $('.study-bar', doc)) return null;
    const formulae = r.tab === 'formulae';
    const toggle = el('button', { type: 'button', class: 'st-toggle', 'aria-pressed': 'false', html: `${EYE_OFF}<span>Self-test</span>` });
    const hint = el('span', { class: 'st-hint', text: formulae
      ? 'Hides every formula. Recall each one from its name, then click to check.'
      : 'Hides every section. Recall what it says from the heading, then reveal it.' });
    const revealAll = el('button', { type: 'button', class: 'st-mini', hidden: true, text: 'Reveal all' });
    const hideAll = el('button', { type: 'button', class: 'st-mini', hidden: true, text: 'Hide all' });
    const bar = el('div', { class: 'study-bar' }, toggle, hint, revealAll, hideAll);

    let ref = h1;
    const next = h1.nextElementSibling;
    if (next && next.tagName === 'P') {
      ref = next;
      if (next.nextElementSibling && next.nextElementSibling.classList.contains('toc-inline')) ref = next.nextElementSibling;
    }
    ref.after(bar);

    let prepared = false;
    const set = (on) => {
      if (on && !prepared) { (formulae ? prepareFormulae : prepareNotes)(doc, bar); prepared = true; }
      if (on) coverAll(doc, true);
      doc.classList.toggle('self-test', on);
      toggle.setAttribute('aria-pressed', String(on));
      revealAll.hidden = !on;
      hideAll.hidden = !on;
    };
    toggle.addEventListener('click', () => set(toggle.getAttribute('aria-pressed') !== 'true'));
    revealAll.addEventListener('click', () => coverAll(doc, false));
    hideAll.addEventListener('click', () => coverAll(doc, true));
    return set;
  }

  function makeCover(host, content) {
    host.classList.add('cover-host', 'is-covered');
    content.classList.add('cover-content');
    const btn = el('button', { type: 'button', class: 'cover-btn', 'aria-label': 'Show the hidden formula', text: 'Show' });
    btn.addEventListener('click', (e) => {
      host.classList.remove('is-covered');
      if (e.detail !== 0) return; // mouse: leave focus alone
      const doc = host.closest('.doc');
      const nextBtn = $$('.cover-host.is-covered > .cover-btn', doc)
        .find((b) => host.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
      if (nextBtn) nextBtn.focus();
    });
    host.prepend(btn);
  }

  function prepareFormulae(doc) {
    for (const table of $$('table', doc)) {
      for (const row of $$('tbody tr', table)) {
        Array.from(row.cells).slice(1).forEach((td) => {
          if (td.classList.contains('cover-host') || !td.textContent.trim()) return;
          const wrap = el('span', {});
          while (td.firstChild) wrap.append(td.firstChild);
          td.append(wrap);
          makeCover(td, wrap);
        });
      }
    }
    for (const disp of $$('.katex-display', doc)) {
      if (disp.closest('table, .cover-host')) continue;
      const host = el('div', {});
      disp.replaceWith(host);
      host.append(disp);
      makeCover(host, disp);
    }
  }

  function prepareNotes(doc, bar) {
    let section = null;
    for (const node of Array.from(doc.children)) {
      if (node === bar || node.tagName === 'H1' || node.classList.contains('toc-inline')) continue;
      if (node.tagName === 'H2' || node.tagName === 'H3') {
        section = node.id;
        node.after(el('button', { type: 'button', class: 'st-reveal', 'aria-expanded': 'false', 'data-section': section, text: 'Reveal section' }));
        continue;
      }
      if (!section || node.matches('blockquote.callout-recall')) continue; // recall cards stay: they are the test
      node.classList.add('st-body');
      node.dataset.section = section;
    }
    for (const b of $$('.st-reveal', doc)) {
      if (!$(`.st-body[data-section="${CSS.escape(b.dataset.section)}"]`, doc)) b.remove();
    }
  }

  function setSection(doc, btn, open) {
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Hide section' : 'Reveal section';
    $$(`.st-body[data-section="${CSS.escape(btn.dataset.section)}"]`, doc).forEach((n) => n.classList.toggle('st-open', open));
  }

  function coverAll(doc, covered) {
    $$('.cover-host', doc).forEach((h) => h.classList.toggle('is-covered', covered));
    $$('.st-reveal', doc).forEach((b) => setSection(doc, b, !covered));
  }

  document.addEventListener('click', (e) => {
    const b = e.target.closest && e.target.closest('.st-reveal');
    if (b) setSection(b.closest('.doc'), b, b.getAttribute('aria-expanded') !== 'true');
  });

  // ---------------------------------------------------------------- page lifecycle
  let setSelfTest = null;
  let pagePath = null;

  function applyRouteParams(r) {
    const id = r.params.get('h');
    const test = r.params.get('test') === '1';
    if (test && setSelfTest) setSelfTest(true);
    if (id && (test || id.startsWith('recall-'))) {
      const t = document.getElementById(id);
      if (t) t.scrollIntoView({ block: 'start' });
    }
  }

  function onPageReady() {
    const doc = $('#doc');
    const r = route();
    pagePath = r.path;
    doc.classList.remove('self-test');
    enhanceRecallCards(doc, r);
    setSelfTest = addSelfTest(doc, r);
    applyRouteParams(r);
    updateProgress();
  }

  const docEl = document.getElementById('doc');
  if (docEl) {
    new MutationObserver(() => { if (!docEl.hasAttribute('aria-busy')) onPageReady(); })
      .observe(docEl, { attributes: true, attributeFilter: ['aria-busy'] });
  }
  // Same-page links (app.js only scrolls, it does not re-render).
  window.addEventListener('hashchange', () => {
    const r = route();
    if (r.path === pagePath && docEl && !docEl.hasAttribute('aria-busy')) applyRouteParams(r);
  });

  // ---------------------------------------------------------------- reading settings
  const SETTINGS_KEY = 'gate-reading';
  const OPTIONS = {
    font: [['hyper', 'Hyperlegible'], ['system', 'System'], ['serif', 'Serif']],
    size: [['xs', 'XS'], ['s', 'S'], ['m', 'M'], ['l', 'L'], ['xl', 'XL']],
    spacing: [['normal', 'Normal'], ['wide', 'Wide']],
    breakEvery: [['0', 'Off'], ['25', '25 min'], ['50', '50 min']],
  };
  const FONT_PREVIEW = {
    hyper: '"Atkinson Hyperlegible Next", sans-serif',
    system: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    serif: '"Literata", Georgia, serif',
  };
  const DEFAULTS = { font: 'hyper', size: 'm', spacing: 'normal', breakEvery: '25' };
  const settings = Object.assign({}, DEFAULTS);
  const saved = store.get(SETTINGS_KEY, null);
  if (saved && typeof saved === 'object') {
    for (const k of Object.keys(DEFAULTS)) if (OPTIONS[k].some(([v]) => v === String(saved[k]))) settings[k] = String(saved[k]);
  }
  const LITERATA = 'https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400..700&display=swap';

  function applySettings() {
    html.dataset.font = settings.font;
    html.dataset.size = settings.size;
    html.dataset.spacing = settings.spacing;
    if (settings.font === 'serif' && !document.getElementById('font-literata')) {
      document.head.append(el('link', { id: 'font-literata', rel: 'stylesheet', href: LITERATA }));
    }
  }
  applySettings(); // before app.js renders any content, so pages never jump

  function segmented(name, legend, current, onChange) {
    const row = el('div', { class: 'seg-row' });
    for (const [value, label] of OPTIONS[name]) {
      const id = `rp-${name}-${value}`;
      const input = el('input', { type: 'radio', name: `rp-${name}`, id, value, checked: value === current ? true : null });
      input.addEventListener('change', () => { if (input.checked) onChange(value); });
      const text = el('span', { text: label });
      if (name === 'font') text.style.fontFamily = FONT_PREVIEW[value];
      row.append(el('label', { class: 'seg-opt', for: id }, input, text));
    }
    return el('fieldset', { class: 'seg' }, el('legend', { text: legend }), row);
  }

  // ---------------------------------------------------------------- focus mode + break reminder
  const TARGET = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>';
  const focus = { on: false, start: 0, breakEnd: 0, prompted: false, timer: 0 };
  const ui = {};

  const mmss = (ms) => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${pad(s % 60)}`; };

  function showBanner(text, actions) {
    ui.banner.replaceChildren(el('p', { text }), ...actions.map(([label, fn], i) => {
      const b = el('button', { type: 'button', class: `recall-btn${i === 0 ? ' recall-show' : ''}`, text: label });
      b.addEventListener('click', fn);
      return b;
    }));
    ui.banner.hidden = false;
  }
  const hideBanner = () => { if (ui.banner) ui.banner.hidden = true; };

  function tick() {
    const now = Date.now();
    if (focus.breakEnd) {
      const left = focus.breakEnd - now;
      if (left > 0) { ui.time.textContent = `Break ${mmss(left)}`; return; }
      focus.breakEnd = 0;
      focus.start = now;
      focus.prompted = false;
      showBanner('Break over. Before you read on, recall the last section without looking, then check it.', [['Continue', hideBanner]]);
    }
    ui.time.textContent = `${Math.floor((now - focus.start) / 60000)} min`;
    const every = +settings.breakEvery;
    if (every && !focus.prompted && now - focus.start >= every * 60000) {
      focus.prompted = true;
      const rest = every >= 50 ? 10 : 5;
      showBanner(`${every} minutes of focused study. Take a ${rest}-minute break away from the screen.`, [
        [`Start ${rest}-minute break`, () => { focus.breakEnd = Date.now() + rest * 60000; hideBanner(); tick(); }],
        ['Keep going', () => { focus.start = Date.now(); focus.prompted = false; hideBanner(); }],
      ]);
    }
  }

  function updateProgress() {
    if (!focus.on || !ui.progress) return;
    const max = html.scrollHeight - window.innerHeight;
    ui.progress.firstChild.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
  }

  function setFocus(on) {
    focus.on = on;
    html.classList.toggle('focus-mode', on);
    ui.focusBtn.setAttribute('aria-pressed', String(on));
    ui.panelFocus.setAttribute('aria-pressed', String(on));
    ui.panelFocus.textContent = on ? 'Leave focus mode' : 'Enter focus mode';
    ui.chip.hidden = !on;
    clearInterval(focus.timer);
    hideBanner();
    if (on) {
      focus.start = Date.now();
      focus.breakEnd = 0;
      focus.prompted = false;
      focus.timer = setInterval(tick, 1000);
      tick();
      updateProgress();
    }
  }

  function buildUi() {
    const themeBtn = $('#theme-btn');
    if (!themeBtn) return;
    ui.time = el('span', { class: 'focus-time' });
    const exit = el('button', { type: 'button', class: 'focus-exit', text: 'Exit focus' });
    ui.chip = el('div', { class: 'focus-chip', hidden: true }, ui.time, exit);
    ui.focusBtn = el('button', { type: 'button', class: 'icon-btn focus-btn', 'aria-pressed': 'false', title: 'Focus mode: hide the navigation', html: `${TARGET}<span>Focus</span>` });
    const readBtn = el('button', { type: 'button', class: 'icon-btn reading-btn', 'aria-expanded': 'false', 'aria-controls': 'reading-panel', 'aria-label': 'Reading settings', title: 'Reading settings', text: 'Aa' });
    themeBtn.before(ui.chip, ui.focusBtn, readBtn);

    const save = () => store.set(SETTINGS_KEY, settings);
    const change = (key) => (value) => { settings[key] = value; applySettings(); save(); };
    ui.panelFocus = el('button', { type: 'button', class: 'rp-focus', 'aria-pressed': 'false', text: 'Enter focus mode' });
    const panel = el('div', { id: 'reading-panel', class: 'reading-panel', role: 'dialog', 'aria-label': 'Reading settings', hidden: true },
      el('div', { class: 'rp-title', text: 'Reading settings' }),
      segmented('font', 'Font', settings.font, change('font')),
      segmented('size', 'Text size', settings.size, change('size')),
      segmented('spacing', 'Letter spacing', settings.spacing, change('spacing')),
      el('div', { class: 'rp-sep' }),
      ui.panelFocus,
      el('p', { class: 'rp-note', text: 'Focus mode hides the menu, contents and search.' }),
      segmented('breakEvery', 'Break reminder in focus mode', settings.breakEvery, change('breakEvery')),
      el('p', { class: 'rp-note', text: 'No single font is fastest for everyone: try each for a few days. Saved in this browser only.' }));
    ui.banner = el('div', { class: 'focus-banner', role: 'status', hidden: true });
    ui.progress = el('div', { class: 'read-progress', 'aria-hidden': 'true' }, el('span'));
    document.body.append(panel, ui.banner, ui.progress);

    const openPanel = (on) => {
      panel.hidden = !on;
      readBtn.setAttribute('aria-expanded', String(on));
      if (on) { const first = panel.querySelector('input:checked'); if (first) first.focus(); }
    };
    readBtn.addEventListener('click', () => openPanel(panel.hidden));
    document.addEventListener('click', (e) => {
      if (!panel.hidden && !panel.contains(e.target) && !readBtn.contains(e.target)) openPanel(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (!panel.hidden) { openPanel(false); readBtn.focus(); return; }
      if (focus.on && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) setFocus(false);
    });
    ui.focusBtn.addEventListener('click', () => setFocus(!focus.on));
    ui.panelFocus.addEventListener('click', () => { setFocus(!focus.on); openPanel(false); });
    exit.addEventListener('click', () => setFocus(false));
    window.addEventListener('scroll', () => { if (focus.on) requestAnimationFrame(updateProgress); }, { passive: true });
  }
  buildUi();
})();
