/* GATE CSE 2027 — static site renderer (no build step).
 *
 * Routes (hash based, so GitHub Pages needs no server config):
 *   #/                                  -> content/home.md
 *   #/<page>                            -> content/<page>.md
 *   #/subjects/<slug>                   -> content/subjects/<slug>/index.md
 *   #/subjects/<slug>/notes|formulae    -> content/subjects/<slug>/<tab>.md
 *   #/subjects/<slug>/pyq               -> generated from data/pyq.json
 *   ...?h=<heading-id>                  -> scroll to that heading
 *
 * Markdown: GFM via marked, math via KaTeX ($inline$, $$display$$),
 * callouts with "> [!TIP] Title", widgets with ```widget fenced blocks.
 */
(function () {
  'use strict';

  const S = {
    site: null,
    texts: new Map(),
    weightage: undefined,
    pyq: undefined,
    route: null,
    seq: 0,
    index: null,
    indexing: null,
  };

  // ---------------------------------------------------------------- helpers
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function h(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v == null || v === false) continue;
        if (k === 'class') n.className = v;
        else if (k === 'text') n.textContent = v;
        else if (k === 'html') n.innerHTML = v;
        else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
        else n.setAttribute(k, v === true ? '' : String(v));
      }
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid == null || kid === false) continue;
      n.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    return n;
  }

  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function slugify(text) {
    return String(text)
      .toLowerCase()
      .normalize('NFKD').replace(/[̀-ͯ]/g, '')
      .replace(/&[a-z]+;/g, ' ')
      .replace(/[^a-z0-9\s-]/g, ' ')
      .trim()
      .replace(/[\s-]+/g, '-')
      .slice(0, 80);
  }

  // Visible text of a rendered element, without KaTeX's hidden MathML copy or UI controls.
  function visibleText(el) {
    const c = el.cloneNode(true);
    c.querySelectorAll('.katex-mathml, .anchor, .study-toggle, button').forEach((n) => n.remove());
    return c.textContent.replace(/\s+/g, ' ').trim();
  }

  // Plain text of a Markdown heading line (no math or markup), used for ids + search.
  function headingPlain(md) {
    return md
      .replace(/\$\$?([^$]+)\$\$?/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/<[^>]+>/g, '')
      .replace(/[*_~]/g, '')
      .trim();
  }

  // Per-viewer conveniences only (theme, progress). Never required for rendering.
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
    },
  };

  // Successful responses are cached for the session; failures are retried on the next request.
  function fetchText(url) {
    if (!S.texts.has(url)) {
      const p = fetch(url, { cache: 'no-cache' })
        .then((r) => (r.ok ? r.text() : null))
        .catch(() => null)
        .then((t) => { if (t == null) S.texts.delete(url); return t; });
      S.texts.set(url, p);
    }
    return S.texts.get(url);
  }
  function fetchJSON(url) {
    return fetch(url, { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
  }
  function getWeightage() {
    if (S.weightage === undefined) S.weightage = fetchJSON('data/weightage.json').then((d) => { if (!d) S.weightage = undefined; return d; });
    return S.weightage;
  }
  function getPyq() {
    if (S.pyq === undefined) S.pyq = fetchJSON('data/pyq.json').then((d) => { if (!d) S.pyq = undefined; return d; });
    return S.pyq;
  }

  // ---------------------------------------------------------------- markdown + math
  const PH = (i) => `KTXM${i}MXTK`;

  function protectInline(text, math) {
    const codes = [];
    text = text.replace(/(`+)([\s\S]*?[^`])\1(?!`)/g, (m) => { codes.push(m); return `\u0000${codes.length - 1}\u0000`; });
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (m, tex) => { math.push({ tex, display: true }); return PH(math.length - 1); });
    text = text.replace(/(^|[^\\$])\$(?!\s)((?:\\.|[^\\$\n])+?)(?<!\s)\$(?!\d)/g, (m, pre, tex) => {
      math.push({ tex, display: false });
      return pre + PH(math.length - 1);
    });
    return text.replace(/\u0000(\d+)\u0000/g, (m, i) => codes[+i]);
  }

  function protectMath(md, math) {
    const out = [];
    let buf = [];
    let fence = null;
    const flush = () => { if (buf.length) { out.push(protectInline(buf.join('\n'), math)); buf = []; } };
    for (const line of md.split('\n')) {
      const m = line.match(/^\s{0,3}(`{3,}|~{3,})/);
      if (!fence && m) { flush(); fence = m[1]; out.push(line); continue; }
      if (fence) {
        out.push(line);
        if (m && m[1][0] === fence[0] && m[1].length >= fence.length && line.trim() === m[1]) fence = null;
        continue;
      }
      buf.push(line);
    }
    flush();
    return out.join('\n');
  }

  function tex(item) {
    if (!item) return '';
    try {
      return window.katex.renderToString(item.tex, { displayMode: item.display, throwOnError: false, strict: 'ignore' });
    } catch (e) {
      return `<code>${escapeHtml(item.tex)}</code>`;
    }
  }

  function mdToHtml(md) {
    const math = [];
    const src = protectMath(md.replace(/\r\n?/g, '\n'), math);
    const html = window.marked.parse(src, { gfm: true });
    return html
      .replace(/<p>\s*KTXM(\d+)MXTK\s*<\/p>/g, (m, i) => tex(math[+i]))
      .replace(/KTXM(\d+)MXTK/g, (m, i) => tex(math[+i]));
  }

  // ---------------------------------------------------------------- routing
  function subjectBySlug(slug) { return S.site.subjects.find((s) => s.slug === slug); }
  function subjectByCode(code) { return S.site.subjects.find((s) => s.code === code); }

  function parseRoute() {
    let raw = location.hash.replace(/^#\/?/, '');
    try { raw = decodeURIComponent(raw); } catch (e) { /* keep raw */ }
    const qi = raw.indexOf('?');
    const pathPart = qi >= 0 ? raw.slice(0, qi) : raw;
    const query = qi >= 0 ? raw.slice(qi + 1) : '';
    const path = pathPart.replace(/\/+$/, '') || 'home';
    const anchor = new URLSearchParams(query).get('h');
    const m = path.match(/^subjects\/([a-z]+)(?:\/(notes|formulae|pyq))?$/);
    if (m && subjectBySlug(m[1])) {
      const subject = subjectBySlug(m[1]);
      const tab = m[2] || 'overview';
      // query is kept for the PYQ tab, which reads ?topic=&type=&years=&status=&sort= from it
      return { path, anchor, query, subject, tab, file: tab === 'pyq' ? null : `content/subjects/${subject.slug}/${m[2] || 'index'}.md` };
    }
    if (!/^[a-z0-9][a-z0-9-]*$/.test(path)) return { path, anchor, query, file: null };
    return { path, anchor, query, file: `content/${path}.md` };
  }

  function routeHref(path, anchor) {
    const p = path === 'home' ? '' : path;
    return `#/${p}${anchor ? `?h=${encodeURIComponent(anchor)}` : ''}`;
  }

  // Every Markdown page in reading order (used by pager + search).
  function allPages() {
    const list = [];
    for (const sec of S.site.nav) {
      if (sec.subjects) {
        for (const s of S.site.subjects) {
          list.push({ route: `subjects/${s.slug}`, title: `${s.name}: overview`, file: `content/subjects/${s.slug}/index.md` });
          list.push({ route: `subjects/${s.slug}/notes`, title: `${s.name}: notes`, file: `content/subjects/${s.slug}/notes.md` });
          list.push({ route: `subjects/${s.slug}/formulae`, title: `${s.name}: formulae`, file: `content/subjects/${s.slug}/formulae.md` });
        }
      } else {
        for (const it of sec.items) if (it.route) list.push({ route: it.route, title: it.title, file: `content/${it.route}.md` });
      }
    }
    return list;
  }

  // ---------------------------------------------------------------- page rendering
  async function render() {
    const r = parseRoute();
    const prev = S.route;
    S.route = r;
    updateNav(r);
    closeNav();
    // Same page: just scroll. Exception: a PYQ link with different filters re-renders the list.
    if (prev && prev.path === r.path && !(r.tab === 'pyq' && prev.query !== r.query)) { scrollToAnchor(r.anchor, true); return; }

    const seq = ++S.seq;
    const doc = $('#doc');
    doc.setAttribute('aria-busy', 'true');
    renderPageHead(r);

    let ok = true;
    if (r.subject && r.tab === 'pyq') {
      await renderPyq(doc, r, seq);
    } else {
      const md = r.file ? await fetchText(r.file) : null;
      if (seq !== S.seq) return;
      if (md == null) { ok = false; renderMissing(doc, r); }
      else {
        doc.innerHTML = mdToHtml(md);
        await enhance(doc, r, seq);
      }
    }
    if (seq !== S.seq) return;

    const h1 = $('h1', doc);
    const pageTitle = h1 ? visibleText(h1) : 'GATE CSE 2027';
    document.title = r.path === 'home' ? 'GATE CSE 2027 Prep' : `${pageTitle} · GATE CSE 2027`;
    buildToc(doc, r);
    if (r.subject) paintProgress(r.subject);
    renderPager(r, ok);
    doc.removeAttribute('aria-busy');
    if (r.anchor) scrollToAnchor(r.anchor, false);
    else window.scrollTo(0, 0);
    if (prev) $('#main').focus({ preventScroll: true });
  }

  function scrollToAnchor(id, smooth) {
    if (!id) return;
    const t = document.getElementById(id);
    if (!t) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    t.scrollIntoView({ block: 'start', behavior: smooth && !reduce ? 'smooth' : 'auto' });
  }

  function renderMissing(doc, r) {
    const owned = (S.site.pending || {})[r.path];
    doc.replaceChildren(
      h('h1', { text: owned ? owned.title : 'Page not found' }),
      h('div', { class: 'notice' },
        h('h2', { text: owned ? 'Being prepared' : 'Nothing here yet' }),
        h('p', { text: owned ? owned.note : 'This page does not exist. Use the menu or search to find what you need.' }),
        h('p', {}, h('a', { href: '#/', text: 'Back to home' }))));
  }

  function renderPageHead(r) {
    const head = $('#page-head');
    head.replaceChildren();
    if (!r.subject) return;
    const s = r.subject;
    const tabs = [['overview', 'Overview', ''], ['notes', 'Notes', '/notes'], ['formulae', 'Formulae', '/formulae'], ['pyq', 'Previous-year questions', '/pyq']];
    head.append(h('div', { class: 'subject-head' },
      h('div', { class: 'subject-title' }, h('span', { class: 'code-badge', text: s.code }), h('span', { text: s.name })),
      h('nav', { class: 'tabs', 'aria-label': `${s.name} sections` },
        tabs.map(([key, label, suffix]) => h('a', {
          href: `#/subjects/${s.slug}${suffix}`,
          class: r.tab === key ? 'active' : null,
          'aria-current': r.tab === key ? 'page' : null,
          text: label,
        }))),
      h('details', { class: 'sp-inline' }, h('summary', { text: 'Your progress' }), h('div', { class: 'sp-inline-body' }))));
  }

  const CALLOUTS = {
    note: 'Note', tip: 'Tip', important: 'Important', warning: 'Warning', caution: 'Caution',
    trap: 'Common trap', example: 'Worked example', pyq: 'From past papers', key: 'Key idea',
    recall: 'Recall',
  };

  async function enhance(doc, r, seq) {
    // Heading ids + anchor links
    const used = new Set();
    for (const hd of $$('h1, h2, h3, h4', doc)) {
      let id = slugify(visibleText(hd)) || 'section';
      const base = id;
      let n = 2;
      while (used.has(id)) id = `${base}-${n++}`;
      used.add(id);
      hd.id = id;
      if (hd.tagName !== 'H1') hd.append(h('a', { class: 'anchor', href: routeHref(r.path, id), 'aria-label': 'Link to this section', text: '#' }));
    }

    // Tables scroll sideways on small screens
    for (const t of $$('table', doc)) {
      const wrap = h('div', { class: 'table-wrap' });
      t.replaceWith(wrap);
      wrap.append(t);
    }

    // Callouts: > [!TYPE] optional title
    for (const bq of $$('blockquote', doc)) {
      const p = bq.firstElementChild;
      if (!p || p.tagName !== 'P') continue;
      const m = p.innerHTML.match(/^\s*\[!([A-Za-z]+)\]([^\n]*)\n?/);
      if (!m) continue;
      const type = m[1].toLowerCase();
      const title = m[2].replace(/<br\s*\/?>\s*$/, '').trim() || CALLOUTS[type] || type;
      p.innerHTML = p.innerHTML.slice(m[0].length).replace(/^\s*<br\s*\/?>/, '');
      if (!p.textContent.trim() && !p.querySelector('.katex, img')) p.remove();
      bq.classList.add('callout', `callout-${type}`);
      bq.prepend(h('div', { class: 'callout-title', html: title }));
    }

    // External links open in a new tab
    for (const a of $$('a[href^="http"]', doc)) { a.target = '_blank'; a.rel = 'noopener'; }

    // Code: widgets first, then syntax highlighting for labelled languages
    const widgetJobs = [];
    for (const code of $$('pre > code', doc)) {
      if (code.classList.contains('language-widget')) {
        const opts = parseWidgetOpts(code.textContent);
        const host = h('div', { class: 'widget' });
        code.parentElement.replaceWith(host);
        widgetJobs.push(renderWidget(host, opts, r));
      } else if (window.hljs && /language-(c|cpp|python|java|sql|bash|javascript|js|text)\b/.test(code.className)) {
        try { window.hljs.highlightElement(code); } catch (e) { /* plain is fine */ }
      }
    }
    await Promise.all(widgetJobs);
    if (seq !== S.seq) return;
    groupCodeTabs(doc);

    // Notes pages: "studied" toggle on every topic (h2)
    if (r.subject && r.tab === 'notes') addStudyToggles(doc, r.subject);
  }

  function parseWidgetOpts(text) {
    const opts = {};
    for (const line of text.split('\n')) {
      const m = line.match(/^\s*([a-z-]+)\s*:\s*(.*?)\s*$/i);
      if (m) opts[m[1].toLowerCase()] = m[2];
    }
    return opts;
  }

  // ---------------------------------------------------------------- progress (per viewer)
  const PROGRESS_KEY = 'gate-progress';
  function getProgress() { return store.get(PROGRESS_KEY, {}) || {}; }
  function setDone(slug, id, done) {
    const p = getProgress();
    p[slug] = p[slug] || {};
    if (done) p[slug][id] = 1; else delete p[slug][id];
    store.set(PROGRESS_KEY, p);
  }

  function addStudyToggles(doc, subject) {
    const done = getProgress()[subject.slug] || {};
    for (const h2 of $$('h2', doc)) {
      const id = h2.id;
      const btn = h('button', { type: 'button', class: 'study-toggle', 'aria-pressed': done[id] ? 'true' : 'false' });
      const paint = () => {
        const on = btn.getAttribute('aria-pressed') === 'true';
        btn.textContent = on ? '✓ Studied' : 'Mark studied';
        btn.setAttribute('aria-label', `${on ? 'Unmark' : 'Mark'} "${h2.firstChild ? h2.firstChild.textContent : id}" as studied`);
      };
      btn.addEventListener('click', () => {
        const on = btn.getAttribute('aria-pressed') !== 'true';
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        setDone(subject.slug, id, on);
        paint();
      });
      paint();
      h2.prepend(btn);
    }
  }

  // Topics of a subject = the h2 headings of its notes page.
  async function subjectTopics(subject) {
    const md = await fetchText(`content/subjects/${subject.slug}/notes.md`);
    if (!md) return [];
    const topics = [];
    const used = new Set();
    let fence = false;
    for (const line of md.split('\n')) {
      if (/^\s{0,3}(```|~~~)/.test(line)) { fence = !fence; continue; }
      if (fence) continue;
      const m = line.match(/^##\s+(.+?)\s*#*\s*$/);
      if (!m) continue;
      const title = headingPlain(m[1]);
      let id = slugify(title) || 'section';
      const base = id;
      let n = 2;
      while (used.has(id)) id = `${base}-${n++}`;
      used.add(id);
      topics.push({ id, title });
    }
    return topics;
  }

  // ---------------------------------------------------------------- widgets
  async function renderWidget(host, opts, r) {
    const type = opts.type;
    const subject = opts.subject ? subjectByCode(opts.subject.toUpperCase()) : r.subject;
    try {
      if (type === 'countdown') return renderCountdown(host);
      if (type === 'subjects') return await renderSubjectCards(host);
      if (type === 'checklist' && subject) return await renderChecklist(host, subject);
      if (type === 'weightage-subjects') return window.GATECharts.subjectBars(host, await getWeightage(), S.site.subjects, opts);
      if (type === 'weightage-topics' && subject) return window.GATECharts.topicBars(host, await getWeightage(), subject, opts);
      if (type === 'weightage-trend' && subject) return window.GATECharts.trend(host, await getWeightage(), subject, opts);
      if (window.GATEWidgets && typeof window.GATEWidgets[type] === 'function') return await window.GATEWidgets[type](host, opts, r);
      host.append(h('p', { class: 'muted', text: `Unknown widget: ${type}` }));
    } catch (e) {
      host.append(h('p', { class: 'muted', text: 'This panel could not be drawn.' }));
      console.error(e);
    }
  }

  function renderCountdown(host) {
    const ex = S.site.exam;
    const first = new Date(`${ex.first_day}T09:00:00+05:30`);
    const now = new Date();
    const days = Math.ceil((first - now) / 86400000);
    host.append(h('div', { class: 'hero' },
      h('div', {},
        h('div', { class: 'hero-num', text: days > 0 ? String(days) : '0' }),
        h('div', { class: 'hero-label', text: days > 0 ? 'days to the first GATE 2027 exam day' : 'GATE 2027 exam window has started' })),
      h('ul', { class: 'hero-facts' },
        ex.facts.map(([k, v]) => h('li', {}, h('b', { text: `${k}: ` }), v)))));
  }

  async function renderSubjectCards(host) {
    const [w, progress] = [await getWeightage(), getProgress()];
    const grid = h('div', { class: 'cards' });
    host.append(grid);
    const topicsList = await Promise.all(S.site.subjects.map((s) => subjectTopics(s)));
    S.site.subjects.forEach((s, i) => {
      const topics = topicsList[i];
      const done = topics.filter((t) => (progress[s.slug] || {})[t.id]).length;
      const pct = topics.length ? Math.round((done / topics.length) * 100) : 0;
      const ws = w && w.subjects && w.subjects[s.code];
      const avg = ws ? (ws.avg_marks_recent != null ? ws.avg_marks_recent : ws.avg_marks) : null;
      grid.append(h('div', { class: 'card' },
        h('a', { class: 'card-title', href: `#/subjects/${s.slug}`, style: 'text-decoration:none;color:inherit' },
          h('span', { class: 'code-badge', text: s.code }), h('span', { text: s.name })),
        h('div', { class: 'card-text', text: s.blurb }),
        h('div', { class: 'card-links' },
          h('a', { href: `#/subjects/${s.slug}/notes`, text: 'Notes' }),
          h('a', { href: `#/subjects/${s.slug}/formulae`, text: 'Formulae' }),
          h('a', { href: `#/subjects/${s.slug}/pyq`, text: 'PYQs' })),
        h('div', { class: 'card-meta' },
          h('span', { text: avg != null ? `≈ ${(+avg).toFixed(1)} marks / paper` : s.marks_hint || '' }),
          h('span', { text: topics.length ? `${done}/${topics.length} topics` : '' })),
        topics.length ? h('div', { class: 'meter', role: 'img', 'aria-label': `${pct}% of topics studied` }, h('span', { style: `width:${pct}%` })) : null));
    });
  }

  async function renderChecklist(host, subject) {
    const topics = await subjectTopics(subject);
    if (!topics.length) { host.append(h('p', { class: 'muted', text: 'Topic list appears once the notes page is published.' })); return; }
    const done = getProgress()[subject.slug] || {};
    const list = h('ul', { class: 'checklist' });
    const counter = h('p', { class: 'muted' });
    const paintCount = () => {
      const d = (getProgress()[subject.slug]) || {};
      const n = topics.filter((t) => d[t.id]).length;
      counter.textContent = `${n} of ${topics.length} topics marked studied (saved in this browser only).`;
    };
    for (const t of topics) {
      const id = `chk-${subject.slug}-${t.id}`;
      const cb = h('input', { type: 'checkbox', id, checked: done[t.id] ? true : null });
      const li = h('li', { class: done[t.id] ? 'done' : null }, cb,
        h('label', { for: id, class: 'sr-only', style: 'position:absolute;left:-9999px', text: `Studied: ${t.title}` }),
        h('a', { href: routeHref(`subjects/${subject.slug}/notes`, t.id), text: t.title }));
      cb.addEventListener('change', () => { setDone(subject.slug, t.id, cb.checked); li.classList.toggle('done', cb.checked); paintCount(); });
      list.append(li);
    }
    paintCount();
    host.append(list, counter);
  }

  // ---------------------------------------------------------------- PYQ tab
  async function renderPyq(doc, r, seq) {
    const s = r.subject;
    const [data, w] = await Promise.all([getPyq(), getWeightage()]);
    if (seq !== S.seq) return;
    doc.replaceChildren(h('h1', { text: `${s.name}: previous-year questions` }));
    const items = Array.isArray(data) ? data : (data && Array.isArray(data.questions) ? data.questions : null);
    if (!items) {
      doc.append(h('div', { class: 'notice' },
        h('h2', { text: 'Being tagged' }),
        h('p', { text: 'Every past GATE CSE question is being tagged by subject and topic. This tab fills in automatically once that analysis is published.' }),
        h('p', {}, 'Meanwhile: ', h('a', { href: '#/papers', text: 'past papers and answer keys' }), ' · ', h('a', { href: '#/analysis', text: 'topic weightage' }))));
      return;
    }
    const mine = items.filter((q) => String(q.subject).toUpperCase() === s.code);
    const topicMeta = (w && w.subjects && w.subjects[s.code] && w.subjects[s.code].topics) || {};
    const nameByCode = {};
    for (const q of mine) if (q.topic_name) nameByCode[q.topic] = q.topic_name;
    const topicName = (code) => (topicMeta[code] && topicMeta[code].name) || nameByCode[code] || code || 'Other';
    const meta = (w && w.paper_meta) || {};
    const yearOf = (q) => +(q.year || (String(q.paper).match(/\d{4}/) || [0])[0]);
    const paperLabel = (q) => {
      const m = meta[q.paper] || {};
      const year = q.year || m.year;
      const set = q.set != null ? q.set : m.set;
      if (year) return `GATE ${year}${set ? ` set ${set}` : ''}`;
      return String(q.paper);
    };

    doc.append(h('p', { class: 'lead', text: `${mine.length} ${s.name} questions from ${Object.keys(meta).length || 'past'} GATE CSE papers, tagged by topic. Questions from 2021 onwards carry a one-line paraphrase; open the paper for the full text and figures.` }));
    doc.append(h('p', { class: 'muted', style: 'font-size:13px' },
      'Topics are listed by marks in the last 10 papers. Practise by topic on 2007–2023 and keep the 2024–2026 papers unseen for full timed mocks (',
      h('a', { href: '#/strategy?h=the-13-week-plan', text: 'the 13-week plan' }), ').'));

    // Topics in order of marks in the 10 papers of 2021-26 (from weightage.json), then by name.
    const recentMarks = (code) => (topicMeta[code] && +topicMeta[code].marks_recent) || 0;
    const topics = Array.from(new Set(mine.map((q) => q.topic)))
      .sort((a, b) => recentMarks(b) - recentMarks(a) || topicName(a).localeCompare(topicName(b)));
    const types = Array.from(new Set(mine.map((q) => q.type).filter(Boolean))).sort();
    const selTopic = h('select', { 'aria-label': 'Filter by topic' }, h('option', { value: '', text: 'All topics' }),
      topics.map((t) => {
        const n = mine.filter((q) => q.topic === t).length;
        const mk = recentMarks(t);
        return h('option', { value: t, text: `${topicName(t)} (${n}${mk ? `; ${mk} marks in 2021–26` : ''})` });
      }));
    const selType = h('select', { 'aria-label': 'Filter by question type' }, h('option', { value: '', text: 'All types' }), types.map((t) => h('option', { value: t, text: t })));
    const selYears = h('select', { 'aria-label': 'Filter by years' },
      h('option', { value: '', text: 'All years' }),
      h('option', { value: 'pre2024', text: 'Before 2024 (topic practice)' }),
      h('option', { value: 'mock', text: '2024–2026 (keep for full mocks)' }),
      h('option', { value: 'recent', text: '2021–2026 (MSQ era)' }),
      h('option', { value: 'old', text: 'Before 2021' }));
    const selSort = h('select', { 'aria-label': 'Sort order' }, h('option', { value: 'new', text: 'Newest first' }), h('option', { value: 'old', text: 'Oldest first' }));
    const selStatus = h('select', { 'aria-label': 'Filter by your result' },
      h('option', { value: '', text: 'All' }), h('option', { value: 'todo', text: 'Not tried yet' }),
      h('option', { value: 'r', text: 'Got right' }), h('option', { value: 'w', text: 'Got wrong' }));

    // Filters can be preset from the link (#/subjects/os/pyq?topic=paging&years=pre2024).
    // Years default to "Before 2024" so the mock papers stay unseen; years=all shows everything.
    const params = new URLSearchParams(r.query || '');
    const preset = (sel, key, fallback) => {
      let v = params.has(key) ? params.get(key) : fallback;
      if (key === 'years' && v === 'all') v = '';
      if (Array.from(sel.options).some((o) => o.value === v)) sel.value = v;
    };
    preset(selTopic, 'topic', '');
    preset(selType, 'type', '');
    preset(selYears, 'years', 'pre2024');
    preset(selStatus, 'status', '');
    preset(selSort, 'sort', 'new');
    // Keep the address in step with the filters, so a reload or a shared link shows the same list.
    const syncUrl = () => {
      if (S.route !== r) return;
      const p = new URLSearchParams();
      if (selTopic.value) p.set('topic', selTopic.value);
      if (selType.value) p.set('type', selType.value);
      if (selYears.value !== 'pre2024') p.set('years', selYears.value || 'all');
      if (selStatus.value) p.set('status', selStatus.value);
      if (selSort.value !== 'new') p.set('sort', selSort.value);
      const q = p.toString();
      const hash = `#/subjects/${s.slug}/pyq${q ? `?${q}` : ''}`;
      if (location.hash !== hash) history.replaceState(null, '', hash);
      r.query = q;
    };
    const yearOk = (y) => {
      switch (selYears.value) {
        case 'pre2024': return y <= 2023;
        case 'mock': return y >= 2024;
        case 'recent': return y >= 2021;
        case 'old': return y < 2021;
        default: return true;
      }
    };
    // A plain web search for the question on GATE Overflow: paper year, set and number only.
    const solutionUrl = (q) => {
      const m = meta[q.paper] || {};
      const year = q.year || m.year;
      const set = q.set != null ? q.set : m.set;
      return `https://www.google.com/search?q=${encodeURIComponent(`site:gateoverflow.in GATE CSE ${year}${set ? ` Set ${set}` : ''} Question ${q.qno}`)}`;
    };
    const count = h('span', { class: 'muted', style: 'font-size:13px' });
    // Long topic names must not widen the page on phones: let each select shrink inside its label.
    for (const sel of [selTopic, selType, selYears, selStatus, selSort]) sel.style.cssText = 'min-width:0;max-width:100%';
    const fit = { style: 'max-width:100%' };
    doc.append(h('div', { class: 'filters' },
      h('label', fit, 'Topic', selTopic), h('label', fit, 'Type', selType), h('label', fit, 'Years', selYears),
      h('label', fit, 'My result', selStatus), h('label', fit, 'Sort', selSort), count));
    doc.append(h('p', { class: 'muted', style: 'font-size:13px;margin-top:0' },
      'Solve a question, check the official key, then mark it right or wrong. Your results feed the progress report for this subject (saved in this browser only).'));
    const list = h('ol', { class: 'pyq-list' });
    const empty = h('p', { class: 'muted', text: 'No questions match these filters. Try "All years" or another topic.' });
    doc.append(list, empty);

    const paint = () => {
      const marks = getPyqMarks();
      const sorted = mine
        .filter((q) => (!selTopic.value || q.topic === selTopic.value)
          && (!selType.value || q.type === selType.value)
          && yearOk(yearOf(q))
          && (!selStatus.value || (selStatus.value === 'todo' ? !marks[pyqKey(q)] : marks[pyqKey(q)] === selStatus.value)))
        .sort((a, b) => (selSort.value === 'old' ? 1 : -1) * (yearOf(a) - yearOf(b) || String(a.paper).localeCompare(String(b.paper)) || ((+a.qno || 0) - (+b.qno || 0))));
      count.textContent = `${sorted.length} shown`;
      empty.hidden = sorted.length > 0;
      list.replaceChildren(...sorted.map((q) => {
        const m = meta[q.paper] || {};
        const pdf = q.pdf || m.file || null;
        const official = m.official_url || null;
        const keyUrl = m.official_key_url || m.key_file || null;
        const hasKey = q.key != null && q.key !== '';
        return h('li', {},
          h('div', { class: 'pyq-meta' },
            h('span', { class: 'pill', text: paperLabel(q) }),
            h('span', { class: 'pill', text: q.qlabel || (q.qno != null ? `Q.${q.qno}` : '') }),
            q.type ? h('span', { class: 'pill', text: q.type }) : null,
            q.marks ? h('span', { class: 'pill', text: `${q.marks} mark${+q.marks > 1 ? 's' : ''}` }) : null,
            h('span', { class: 'pill', text: topicName(q.topic) })),
          q.text ? h('div', { text: q.text }) : h('div', { class: 'muted', text: 'Open the paper to read this question.' }),
          h('details', {},
            h('summary', { text: hasKey ? 'Answer key, paper and solution' : 'Paper and solution' }),
            hasKey ? h('p', {}, h('b', { text: 'Official key: ' }), String(q.key)) : null,
            h('p', {},
              pdf ? h('a', { href: pdf, target: '_blank', rel: 'noopener', text: 'Question paper (PDF)' }) : null,
              pdf && official ? ' · ' : null,
              official ? h('a', { href: official, target: '_blank', rel: 'noopener', text: 'official copy' }) : null,
              keyUrl ? ' · ' : null,
              keyUrl ? h('a', { href: keyUrl, target: '_blank', rel: 'noopener', text: 'answer key' }) : null),
            h('p', {}, h('a', { href: solutionUrl(q), target: '_blank', rel: 'noopener', text: 'Search for a worked solution on GATE Overflow' }))),
          pyqMarkButtons(q));
      }));
    };
    [selTopic, selType, selYears, selStatus, selSort].forEach((x) => x.addEventListener('change', () => { paint(); syncUrl(); }));
    paint();
  }

  // ---------------------------------------------------------------- past-question results (per viewer)
  const PYQ_KEY = 'gate-pyq';
  const pyqKey = (q) => `${q.paper}|${q.qno}`;
  function getPyqMarks() {
    const m = store.get(PYQ_KEY, {});
    return m && typeof m === 'object' ? m : {};
  }
  function setPyqMark(key, value) {
    const m = getPyqMarks();
    if (value) m[key] = value; else delete m[key];
    store.set(PYQ_KEY, m);
  }
  function pyqMarkButtons(q) {
    const key = pyqKey(q);
    const current = getPyqMarks()[key];
    const make = (value, label) => h('button', {
      type: 'button', class: `pyq-mark pyq-mark-${value}`, 'data-value': value,
      'aria-pressed': current === value ? 'true' : 'false', text: label,
    });
    const right = make('r', '✓ Got it right');
    const wrong = make('w', '✗ Got it wrong');
    const wrap = h('div', { class: 'pyq-actions', role: 'group', 'aria-label': 'Your result for this question' }, right, wrong);
    wrap.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-value]');
      if (!b) return;
      const on = b.getAttribute('aria-pressed') !== 'true';
      setPyqMark(key, on ? b.dataset.value : null);
      for (const x of [right, wrong]) x.setAttribute('aria-pressed', x === b && on ? 'true' : 'false');
    });
    return wrap;
  }

  // ---------------------------------------------------------------- subject progress report
  // Reads only this browser's records: topics marked studied (gate-progress), recall-card
  // ratings from study.js (gate-study), past-question results (gate-pyq) and the mock test
  // attempt (gate-mock-2027, graded with the same rules as mock/mock.js).
  const isoToday = () => {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  };
  let predictedP = null;
  function getPredicted() {
    if (!predictedP) predictedP = fetchJSON('data/predicted-2027.json').then((d) => { if (!d) predictedP = null; return d; });
    return predictedP;
  }

  function gradeMock(D, attempt, code) {
    if (!D || !Array.isArray(D.questions) || !attempt) return null;
    if (!attempt.submitted) return { inProgress: true };
    if (D.version != null && attempt.version != null && D.version !== attempt.version) return null;
    const answered = (a) => a != null && a !== '' && !(Array.isArray(a) && !a.length);
    const res = { right: 0, wrong: 0, skip: 0, got: 0, max: 0 };
    for (const x of D.questions) {
      if (String(x.subject).toUpperCase() !== code) continue;
      const a = attempt.ans ? attempt.ans[x.no] : undefined;
      const marks = +x.marks || 0;
      res.max += marks;
      if (!answered(a)) { res.skip++; continue; }
      let ok = false;
      if (x.type === 'MCQ') ok = a === x.answer;
      else if (x.type === 'MSQ') ok = Array.isArray(a) && Array.isArray(x.answer) && [...a].sort().join() === [...x.answer].sort().join();
      else { const v = parseFloat(a); ok = Number.isFinite(v) && !!x.answer && v >= x.answer.min - 1e-9 && v <= x.answer.max + 1e-9; }
      if (ok) { res.right++; res.got += marks; } else { res.wrong++; if (x.type === 'MCQ') res.got -= marks / 3; }
    }
    return res.max ? res : null;
  }

  async function progressReport(subject) {
    const [topics, notesMd, pyq, D] = await Promise.all([
      subjectTopics(subject), fetchText(`content/subjects/${subject.slug}/notes.md`), getPyq(), getPredicted(),
    ]);
    const studiedMap = getProgress()[subject.slug] || {};
    const studied = topics.filter((t) => studiedMap[t.id]).length;
    const next = topics.find((t) => !studiedMap[t.id]) || null;

    const totalCards = notesMd ? (notesMd.match(/^>\s*\[!RECALL\]/gm) || []).length : 0;
    const study = store.get('gate-study', {}) || {};
    const cards = Object.values(study.cards || {}).filter((c) => c && c.subject === subject.slug);
    const today = isoToday();
    const due = cards.filter((c) => c.due && c.due <= today).length
      + Object.values(study.topics || {}).filter((t) => t && t.subject === subject.slug && t.due && t.due <= today).length;

    const items = Array.isArray(pyq) ? pyq : (pyq && Array.isArray(pyq.questions) ? pyq.questions : []);
    const mine = items.filter((q) => String(q.subject).toUpperCase() === subject.code);
    const marks = getPyqMarks();
    let right = 0;
    let wrong = 0;
    const missed = {};
    for (const q of mine) {
      const m = marks[pyqKey(q)];
      if (m === 'r') right++;
      else if (m === 'w') { wrong++; const k = q.topic_name || q.topic || 'Other'; missed[k] = (missed[k] || 0) + 1; }
    }
    const worst = Object.entries(missed).sort((a, b) => b[1] - a[1])[0] || null;

    return {
      topics: topics.length, studied, next,
      totalCards, rated: cards.length, due,
      strong: cards.filter((c) => (c.box || 0) >= 3).length,
      learning: cards.filter((c) => (c.box || 0) >= 1 && (c.box || 0) < 3).length,
      shaky: cards.filter((c) => !c.box).length,
      pyqTotal: mine.length, right, wrong, worst,
      mock: gradeMock(D, store.get('gate-mock-2027', null), subject.code),
    };
  }

  function progressPanel(subject, p) {
    const s = subject.slug;
    const pct = (a, b) => (b ? Math.round((100 * a) / b) : 0);
    const num = (v) => (Math.round(v * 100) / 100).toString();
    const block = (label, value, ...rest) => h('div', { class: 'sp-block' },
      h('div', { class: 'sp-row' }, h('span', { class: 'sp-label', text: label }), h('span', { class: 'sp-value', text: value })),
      ...rest);
    const hint = (text, href, linkText) => h('p', { class: 'sp-hint' }, text, ' ', h('a', { href, text: linkText }));
    const tried = p.right + p.wrong;

    const notes = block('Notes studied', p.topics ? `${p.studied} / ${p.topics}` : '–',
      p.topics ? h('div', { class: 'meter', role: 'img', 'aria-label': `${pct(p.studied, p.topics)}% of topics studied` }, h('span', { style: `width:${pct(p.studied, p.topics)}%` })) : null,
      p.next
        ? h('p', { class: 'sp-hint' }, p.studied ? 'Next: ' : 'Start with ', h('a', { href: routeHref(`subjects/${s}/notes`, p.next.id), text: p.next.title }))
        : (p.topics ? h('p', { class: 'sp-hint', text: 'Every topic is marked studied.' }) : null));

    const cards = block('Recall cards', p.totalCards ? `${p.rated} / ${p.totalCards} rated` : '–',
      p.rated
        ? h('p', { class: 'sp-stats' }, h('span', { text: `Strong ${p.strong}` }), h('span', { text: `Learning ${p.learning}` }), h('span', { text: `Shaky ${p.shaky}` }))
        : hint('Rate the recall cards in the notes to see what sticks.', routeHref(`subjects/${s}/notes`), 'Open notes'),
      p.due ? h('p', { class: 'sp-hint' }, h('strong', { text: `${p.due} due for review today` }), ' · ', h('a', { href: '#/', text: 'review on Home' })) : null);

    const splitBar = () => {
      const bar = h('div', { class: 'sp-split', role: 'img', 'aria-label': `${p.right} right, ${p.wrong} wrong` });
      if (p.right) { const x = h('span', { class: 'ok' }); x.style.flexGrow = p.right; bar.append(x); }
      if (p.wrong) { const x = h('span', { class: 'bad' }); x.style.flexGrow = p.wrong; bar.append(x); }
      return bar;
    };
    const pyq = block('Past questions', p.pyqTotal ? `${tried} / ${p.pyqTotal} tried` : '–',
      tried ? splitBar() : null,
      tried
        ? h('p', { class: 'sp-stats' },
          h('span', {}, h('span', { class: 'sp-ico ok', text: '✓', 'aria-hidden': 'true' }), ` ${p.right} right`),
          h('span', {}, h('span', { class: 'sp-ico bad', text: '✗', 'aria-hidden': 'true' }), ` ${p.wrong} wrong`),
          h('span', { text: `${pct(p.right, tried)}% correct` }))
        : hint('Mark questions right or wrong as you solve them.', `#/subjects/${s}/pyq`, 'Open past questions'),
      p.worst ? h('p', { class: 'sp-hint' }, 'Most missed: ', h('strong', { text: p.worst[0] }), ` (${p.worst[1]})`) : null);

    let mock;
    if (p.mock && !p.mock.inProgress) {
      const n = p.mock.right + p.mock.wrong + p.mock.skip;
      mock = block('Mock test', `${p.mock.right} / ${n} right`,
        h('p', { class: 'sp-hint', text: `${num(p.mock.got)} of ${p.mock.max} marks in this subject${p.mock.skip ? ` · ${p.mock.skip} skipped` : ''}` }));
    } else if (p.mock && p.mock.inProgress) {
      mock = block('Mock test', 'in progress', hint('Submit it to see your score here.', 'mock/', 'Resume the mock'));
    } else {
      mock = block('Mock test', '–', hint('Take the predicted-paper mock to see your score here.', 'mock/', 'Start the mock'));
    }

    return h('section', { class: 'sp', 'aria-label': `Your progress in ${subject.name}` },
      h('div', { class: 'sp-kicker', text: 'Your progress' }),
      notes, cards, pyq, mock,
      h('p', { class: 'sp-note', text: 'Saved in this browser only.' }));
  }

  let progressSeq = 0;
  async function paintProgress(subject) {
    const seq = ++progressSeq;
    let report;
    try { report = await progressReport(subject); } catch (e) { console.error(e); return; }
    if (seq !== progressSeq || !S.route || !S.route.subject || S.route.subject.slug !== subject.slug) return;
    const side = $('#toc');
    const panel = progressPanel(subject, report);
    const old = $('#toc .sp');
    if (old) old.replaceWith(panel); else side.append(panel);
    const body = $('#page-head .sp-inline-body');
    if (body) body.replaceChildren(progressPanel(subject, report));
    const summary = $('#page-head .sp-inline > summary');
    if (summary) {
      const tried = report.right + report.wrong;
      summary.textContent = `Your progress: ${report.studied}/${report.topics} topics studied${tried ? ` · ${report.right}/${tried} questions right` : ''}`;
    }
  }

  let progressTimer = null;
  function refreshProgressSoon() {
    clearTimeout(progressTimer);
    progressTimer = setTimeout(() => { if (S.route && S.route.subject) paintProgress(S.route.subject); }, 150);
  }

  // ---------------------------------------------------------------- nav, toc, pager
  function renderNav() {
    const nav = $('#sidebar');
    nav.replaceChildren();
    for (const sec of S.site.nav) {
      const box = h('div', { class: 'nav-sec' }, h('div', { class: 'nav-title', text: sec.title }));
      if (sec.subjects) {
        // site.json lists subjects in weightage order (avg marks per paper, 2021-26); show that rank
        S.site.subjects.forEach((s, i) => {
          const tip = s.avg_recent != null ? `${s.code}: about ${s.avg_recent} marks per paper (2021–26)` : s.code;
          // one link per subject, straight to its Overview; Notes/Formulae/PYQ are the tabs on the subject page
          box.append(h('a', { class: 'nav-link nav-subject-link', href: `#/subjects/${s.slug}`, 'data-subject': s.slug, title: tip },
            h('span', { class: 'code-badge nav-rank', text: String(i + 1), 'aria-label': `Rank ${i + 1}` }), h('span', { text: s.name })));
        });
      } else {
        for (const it of sec.items) {
          box.append(h('a', {
            class: 'nav-link',
            href: it.href || routeHref(it.route),
            'data-route': it.route || null,
          }, h('span', { text: it.title }), it.badge ? h('span', { class: 'nav-badge', text: it.badge }) : null));
        }
      }
      nav.append(box);
    }
    // credit at the foot of the sidebar (user request, 2026-11-07)
    nav.append(h('p', { class: 'nav-credit' },
      h('span', { text: 'Created by ' }), h('strong', { text: 'Arshan Ali Khan' }),
      h('span', { text: ', built with ' }), h('strong', { text: 'Claude' }), h('span', { text: ' (Anthropic).' })));
  }

  // Adjacent ```c and ```python blocks become one panel with C / Python tabs.
  // The chosen language is remembered for the whole site (localStorage key "gate-code-lang").
  const CODE_LANGS = { c: 'C', python: 'Python' };
  function groupCodeTabs(doc) {
    let pref = 'c';
    try { pref = localStorage.getItem('gate-code-lang') || 'c'; } catch (e) { /* storage blocked */ }
    const langOf = (pre) => { const m = pre && pre.tagName === 'PRE' && /language-(c|python)\b/.exec(pre.firstElementChild ? pre.firstElementChild.className : ''); return m ? m[1] : null; };
    for (const pre of $$('pre', doc)) {
      if (!pre.isConnected || pre.closest('.code-tabs') || !langOf(pre)) continue;
      const group = [pre];
      let next = pre.nextElementSibling;
      while (next && langOf(next) && !group.some((g) => langOf(g) === langOf(next))) { group.push(next); next = next.nextElementSibling; }
      if (group.length < 2) continue;
      // user request: show both languages at once, side by side, clearly labelled, with a divider
      group.sort((a, b) => (langOf(a) === 'c' ? -1 : 1) - (langOf(b) === 'c' ? -1 : 1));   // C on the left
      const box = h('div', { class: 'code-tabs code-split' });
      pre.before(box);
      for (const p of group) {
        const lang = langOf(p);
        box.append(h('div', { class: `code-col code-col-${lang}` },
          h('div', { class: 'code-label', text: CODE_LANGS[lang] }), p));
      }
    }
    void pref;
  }

  function updateNav(r) {
    for (const a of $$('#sidebar a[data-route]')) {
      const on = a.dataset.route === r.path;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    }
    // a subject stays highlighted on all of its tabs (Overview, Notes, Formulae, PYQ)
    for (const a of $$('#sidebar a[data-subject]')) {
      const on = !!(r.subject && a.dataset.subject === r.subject.slug);
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    }
  }

  let tocObserver = null;
  function buildToc(doc, r) {
    const toc = $('#toc');
    toc.replaceChildren();
    if (tocObserver) { tocObserver.disconnect(); tocObserver = null; }
    const heads = $$('h2, h3', doc).filter((x) => x.id);
    if (heads.length < 3) return;
    const mkList = () => h('ul', {}, heads.map((x) => h('li', { class: x.tagName === 'H3' ? 'l3' : 'l2' },
      h('a', { href: routeHref(r.path, x.id), 'data-id': x.id, text: visibleText(x) }))));
    toc.append(h('div', { class: 'toc-title', text: 'On this page' }), mkList());
    // Collapsible copy at the top of the page for narrower screens
    const h2s = heads.filter((x) => x.tagName === 'H2');
    if (h2s.length >= 4 && r.path !== 'home') {
      const first = $('h1', doc);
      const inline = h('details', { class: 'toc-inline' }, h('summary', { text: 'On this page' }), mkList());
      if (first && first.nextElementSibling) first.nextElementSibling.after(inline); else doc.prepend(inline);
    }
    const links = new Map($$('a[data-id]', toc).map((a) => [a.dataset.id, a]));
    tocObserver = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        links.forEach((a) => a.classList.remove('current'));
        const a = links.get(e.target.id);
        if (a) a.classList.add('current');
      }
    }, { rootMargin: `-${60}px 0px -70% 0px` });
    heads.forEach((x) => tocObserver.observe(x));
  }

  function renderPager(r, ok) {
    const pager = $('#pager');
    pager.replaceChildren();
    if (!ok) return;
    const pages = allPages();
    const i = pages.findIndex((p) => p.route === r.path);
    if (i < 0) return;
    const prev = pages[i - 1];
    const next = pages[i + 1];
    if (prev) pager.append(h('a', { class: 'prev', href: routeHref(prev.route) }, h('span', { class: 'dir', text: 'Previous' }), prev.title));
    if (next) pager.append(h('a', { class: 'next', href: routeHref(next.route) }, h('span', { class: 'dir', text: 'Next' }), next.title));
  }

  // ---------------------------------------------------------------- search
  function stripMd(s) {
    return s
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/\$\$[\s\S]*?\$\$/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[`*_>#|~]/g, ' ')
      .replace(/\$([^$]+)\$/g, '$1')
      .replace(/\\[a-zA-Z]+/g, ' ')
      .replace(/[{}]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  async function buildIndex() {
    const pages = allPages();
    const texts = await Promise.all(pages.map((p) => fetchText(p.file)));
    const index = [];
    pages.forEach((p, i) => {
      const md = texts[i];
      if (!md) return;
      let cur = { route: p.route, page: p.title, heading: null, id: null, lines: [] };
      const push = () => { const text = stripMd(cur.lines.join('\n')); if (text || cur.heading) index.push({ route: cur.route, page: cur.page, heading: cur.heading, id: cur.id, text, lower: `${cur.page} ${cur.heading || ''} ${text}`.toLowerCase() }); };
      const used = new Set();
      let fence = false;
      for (const line of md.split('\n')) {
        if (/^\s{0,3}(```|~~~)/.test(line)) { fence = !fence; cur.lines.push(line); continue; }
        const m = !fence && line.match(/^(#{1,4})\s+(.+?)\s*#*\s*$/);
        if (m) {
          push();
          const title = headingPlain(m[2]);
          let id = slugify(title) || 'section';
          const base = id; let n = 2;
          while (used.has(id)) id = `${base}-${n++}`;
          used.add(id);
          cur = { route: p.route, page: p.title, heading: m[1].length === 1 ? null : title, id: m[1].length === 1 ? null : id, lines: [] };
        } else cur.lines.push(line);
      }
      push();
    });
    return index;
  }

  function ensureIndex() {
    if (!S.indexing) S.indexing = buildIndex().then((ix) => (S.index = ix));
    return S.indexing;
  }

  function highlightTerms(text, terms) {
    let out = escapeHtml(text);
    for (const t of terms) {
      if (t.length < 2) continue;
      const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
      out = out.replace(re, '<mark>$1</mark>');
    }
    return out;
  }

  function runSearch(q) {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length || !S.index) return [];
    const res = [];
    for (const e of S.index) {
      if (!terms.every((t) => e.lower.includes(t))) continue;
      const hl = (e.heading || '').toLowerCase();
      const pl = e.page.toLowerCase();
      const tl = e.text.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (hl.includes(t)) score += 8;
        if (pl.includes(t)) score += 3;
        let c = 0; let at = tl.indexOf(t);
        while (at >= 0 && c < 6) { c++; at = tl.indexOf(t, at + t.length); }
        score += c;
      }
      if (hl === terms.join(' ')) score += 10;
      res.push({ e, score });
    }
    return res.sort((a, b) => b.score - a.score).slice(0, 14);
  }

  function snippet(text, terms) {
    const tl = text.toLowerCase();
    let at = -1;
    for (const t of terms) { at = tl.indexOf(t); if (at >= 0) break; }
    if (at < 0) return text.slice(0, 140);
    const start = Math.max(0, at - 50);
    return (start > 0 ? '…' : '') + text.slice(start, start + 150) + (start + 150 < text.length ? '…' : '');
  }

  function initSearch() {
    const input = $('#search');
    const box = $('#search-results');
    let active = -1;
    let results = [];

    const close = () => { box.hidden = true; input.setAttribute('aria-expanded', 'false'); active = -1; };
    const open = () => { box.hidden = false; input.setAttribute('aria-expanded', 'true'); };
    const select = (i) => {
      const items = $$('a', box);
      items.forEach((a, j) => a.setAttribute('aria-selected', j === i ? 'true' : 'false'));
      active = i;
      if (items[i]) items[i].scrollIntoView({ block: 'nearest' });
    };

    const paint = async () => {
      const q = input.value.trim();
      if (!q) { close(); return; }
      open();
      if (!S.index) { box.innerHTML = '<div class="sr-empty">Building the search index…</div>'; await ensureIndex(); if (input.value.trim() !== q) return; }
      results = runSearch(q);
      const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      if (!results.length) { box.innerHTML = '<div class="sr-empty">No matches. Try fewer or different words.</div>'; return; }
      box.replaceChildren(...results.map(({ e }, i) => {
        const a = h('a', { href: routeHref(e.route, e.id), role: 'option', id: `sr-${i}`, 'aria-selected': 'false' });
        a.innerHTML = `<div class="sr-where">${escapeHtml(e.page)}</div><div class="sr-head">${highlightTerms(e.heading || e.page, terms)}</div><div class="sr-snip">${highlightTerms(snippet(e.text, terms), terms)}</div>`;
        a.addEventListener('click', () => { close(); input.value = ''; input.blur(); });
        return a;
      }));
      select(0);
    };

    let timer = null;
    input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(paint, 120); });
    input.addEventListener('focus', () => { ensureIndex(); if (input.value.trim()) paint(); });
    input.addEventListener('keydown', (e) => {
      const items = $$('a', box);
      if (e.key === 'ArrowDown') { e.preventDefault(); if (items.length) select(Math.min(active + 1, items.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (items.length) select(Math.max(active - 1, 0)); }
      else if (e.key === 'Enter') { if (items[active]) { e.preventDefault(); location.hash = items[active].getAttribute('href'); close(); input.value = ''; input.blur(); } }
      else if (e.key === 'Escape') { close(); input.blur(); }
    });
    document.addEventListener('click', (e) => { if (!e.target.closest('.search')) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && !e.ctrlKey && !e.metaKey) {
        e.preventDefault(); input.focus();
      }
    });
  }

  // ---------------------------------------------------------------- theme + mobile nav
  const SUN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';

  function initTheme() {
    const btn = $('#theme-btn');
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const current = () => document.documentElement.getAttribute('data-theme') || (mq.matches ? 'dark' : 'light');
    const paint = () => {
      const dark = current() === 'dark';
      btn.innerHTML = dark ? SUN : MOON;
      btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      btn.title = btn.getAttribute('aria-label');
    };
    btn.addEventListener('click', () => {
      const next = current() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('gate-theme', next); } catch (e) { /* ignore */ }
      paint();
    });
    mq.addEventListener('change', paint);
    paint();
  }

  function closeNav() {
    document.body.classList.remove('nav-open');
    const b = $('.menu-btn');
    if (b) b.setAttribute('aria-expanded', 'false');
    const scrim = $('.scrim');
    if (scrim) scrim.hidden = true;
  }
  function initMobileNav() {
    const btn = $('.menu-btn');
    const scrim = $('.scrim');
    btn.addEventListener('click', () => {
      const open = !document.body.classList.contains('nav-open');
      document.body.classList.toggle('nav-open', open);
      btn.setAttribute('aria-expanded', String(open));
      scrim.hidden = !open;
    });
    scrim.addEventListener('click', closeNav);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });
  }

  // ---------------------------------------------------------------- boot
  async function boot() {
    initTheme();
    initMobileNav();
    if (!window.marked || !window.katex) {
      $('#doc').innerHTML = '<div class="notice"><h2>Could not load the page renderer</h2><p>The Markdown and math libraries did not load. Check your connection and reload.</p></div>';
      return;
    }
    S.site = await fetchJSON('site.json');
    if (!S.site) { $('#doc').innerHTML = '<div class="notice"><h2>Site configuration missing</h2><p>site.json could not be loaded.</p></div>'; return; }
    renderNav();
    initSearch();
    window.addEventListener('hashchange', render);
    document.addEventListener('click', (e) => { if (e.target.closest && e.target.closest('#doc button, #doc input')) refreshProgressSoon(); });
    document.addEventListener('change', (e) => { if (e.target.closest && e.target.closest('#doc')) refreshProgressSoon(); });
    window.addEventListener('storage', refreshProgressSoon);
    render();
  }

  window.GATE = { slugify, mdToHtml, subjectTopics, getWeightage, h };
  boot();
})();
