/* charts.js — dependency-free charts for data/weightage.json.
 *
 * Every chart here is single-series: one accent hue, no legend (the title names
 * what is plotted), hairline solid grid, 4px rounded data-ends square at the
 * baseline, a value label only on the extreme/endpoint, a hover + keyboard
 * tooltip, and a "Table view" twin so no value is gated behind hover.
 */
(function () {
  'use strict';

  function h(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    if (attrs) for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else n.setAttribute(k, String(v));
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid == null || kid === false) continue;
      n.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    return n;
  }

  const fmt = (v) => (Math.round(v * 10) / 10).toLocaleString('en-IN', { maximumFractionDigits: 1 });

  function niceScale(max, target) {
    if (!(max > 0)) max = 1;
    const raw = max / (target || 4);
    const p = Math.pow(10, Math.floor(Math.log10(raw)));
    const n = raw / p;
    const step = (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
    const top = Math.ceil(max / step - 1e-9) * step;
    const ticks = [];
    for (let v = 0; v <= top + 1e-9; v += step) ticks.push(+v.toFixed(6));
    return { top, ticks };
  }

  // ---------- tooltip (one per page) ----------
  let tipEl = null;
  function showTip(x, y, value, label) {
    if (!tipEl) {
      tipEl = h('div', { class: 'chart-tip', role: 'tooltip' });
      document.body.append(tipEl);
      window.addEventListener('scroll', hideTip, { passive: true });
    }
    tipEl.replaceChildren(h('strong', { text: value }), h('span', { text: label }));
    tipEl.hidden = false;
    const pad = 8;
    const w = tipEl.offsetWidth || 160;
    const cx = Math.min(Math.max(x, w / 2 + pad), window.innerWidth - w / 2 - pad);
    tipEl.style.left = `${cx}px`;
    tipEl.style.top = `${Math.max(y, tipEl.offsetHeight + 16)}px`;
  }
  function hideTip() { if (tipEl) tipEl.hidden = true; }

  function bindTip(target, anchorEl, value, label, mode) {
    const place = (evt) => {
      const r = (anchorEl || target).getBoundingClientRect();
      const x = mode === 'end' ? r.right : (evt && evt.clientX != null && mode === 'pointer' ? evt.clientX : r.left + r.width / 2);
      showTip(x, r.top, value, label);
    };
    target.addEventListener('pointerenter', place);
    target.addEventListener('pointermove', place);
    target.addEventListener('pointerleave', hideTip);
    target.addEventListener('focus', () => place());
    target.addEventListener('blur', hideTip);
  }

  // ---------- shared pieces ----------
  function frame(host, title, subtitle) {
    const fig = h('figure', { class: 'chart' },
      h('figcaption', {}, h('div', { class: 'chart-title', text: title }), subtitle ? h('div', { class: 'chart-sub', text: subtitle }) : null));
    const body = h('div', { class: 'chart-body' });
    fig.append(body);
    host.append(fig);
    return { fig, body };
  }

  function tableView(fig, headers, rows) {
    const table = h('table', {},
      h('thead', {}, h('tr', {}, headers.map((x) => h('th', { text: x })))),
      h('tbody', {}, rows.map((r) => h('tr', {}, r.map((c) => h('td', { text: c == null ? '–' : String(c) }))))));
    fig.append(h('details', { class: 'chart-table' }, h('summary', { text: 'Table view' }), h('div', { class: 'table-wrap' }, table)));
  }

  function empty(host, title, msg) {
    const { body } = frame(host, title, null);
    body.append(h('p', { class: 'chart-empty', text: msg }));
  }

  const PENDING = 'Weightage data from the past-paper analysis has not been published yet. This chart fills in automatically once it is.';

  // ---------- horizontal bars ----------
  function hbars(body, rows, unit) {
    const max = Math.max(0, ...rows.map((r) => r.value));
    const { top, ticks } = niceScale(max, 4);
    const plot = h('div', { class: 'hbar', role: 'list' });
    const grid = h('div', { class: 'hbar-grid', 'aria-hidden': 'true' });
    for (const t of ticks) { const s = h('span'); s.style.left = `${(t / top) * 100}%`; grid.append(s); }
    plot.append(grid);
    const maxIdx = rows.findIndex((r) => r.value === max);
    rows.forEach((r, i) => {
      const pct = top ? (r.value / top) * 100 : 0;
      const fill = h('span', { class: 'hbar-fill' });
      fill.style.width = `${pct}%`;
      const track = h('span', { class: 'hbar-track' }, fill);
      if (i === maxIdx) {
        const val = h('span', { class: 'hbar-val', text: fmt(r.value) });
        val.style.left = `${pct}%`;
        track.append(val);
      }
      const label = h('span', { class: 'hbar-label', title: r.label }, r.href ? h('a', { href: r.href, text: r.label, tabindex: '-1' }) : r.label);
      const row = h('div', { class: 'hbar-row', role: 'listitem', tabindex: '0', 'aria-label': `${r.label}: ${fmt(r.value)} ${unit}` }, label, track, h('span'));
      if (r.href) row.addEventListener('keydown', (e) => { if (e.key === 'Enter') location.hash = r.href; });
      bindTip(row, fill, `${fmt(r.value)} ${unit}`, r.detail || r.label, 'end');
      plot.append(row);
    });
    const axis = h('div', { class: 'chart-axis', 'aria-hidden': 'true' });
    for (const t of ticks) { const s = h('span', { text: fmt(t) }); s.style.left = `${(t / top) * 100}%`; axis.append(s); }
    const axisWrap = h('div', { class: 'hbar' }, axis);
    body.append(plot, axisWrap);
  }

  function subjectBars(host, w, subjects) {
    const title = 'Average marks per paper, by subject';
    if (!w || !w.subjects) return empty(host, title, PENDING);
    const recent = subjects.some((s) => w.subjects[s.code] && w.subjects[s.code].avg_marks_recent != null);
    const rows = subjects
      .filter((s) => w.subjects[s.code])
      .map((s) => {
        const ws = w.subjects[s.code];
        const value = recent && ws.avg_marks_recent != null ? +ws.avg_marks_recent : +ws.avg_marks || 0;
        const range = ws.min_recent != null && ws.max_recent != null ? `range ${fmt(ws.min_recent)}–${fmt(ws.max_recent)} in 2021–26` : null;
        return { label: s.name, value, href: `#/subjects/${s.slug}`, detail: [s.name, range].filter(Boolean).join(' · '), all: ws.avg_marks, rec: ws.avg_marks_recent, min: ws.min_recent, max: ws.max_recent };
      })
      .sort((a, b) => b.value - a.value);
    if (!rows.length) return empty(host, title, PENDING);
    const { fig, body } = frame(host, title, recent ? 'Mean over the 10 GATE CSE papers of 2021–2026, out of 100 marks per paper' : 'All analysed papers, out of 100 marks per paper');
    hbars(body, rows, 'marks');
    tableView(fig, ['Subject', 'Avg 2021–26', 'Min 2021–26', 'Max 2021–26', 'Avg, all papers'],
      rows.map((r) => [r.label, r.rec != null ? fmt(r.rec) : null, r.min != null ? fmt(r.min) : null, r.max != null ? fmt(r.max) : null, r.all != null ? fmt(r.all) : null]));
  }

  function topicBars(host, w, subject, opts) {
    const title = `${subject.name}: marks by topic`;
    const ws = w && w.subjects && w.subjects[subject.code];
    if (!ws || !ws.topics) return empty(host, title, PENDING);
    const metric = (opts && opts.metric) === 'recent' ? 'recent' : 'all';
    const limit = +(opts && opts.limit) || 14;
    const nRecent = (w.recent_papers && w.recent_papers.length) || 10;
    const yearOf = (p) => { const m = String(p).match(/\d{4}/); return m ? +m[0] : null; };
    const all = Object.entries(ws.topics).map(([code, t]) => {
      const status = t.status_2027 || '';
      return {
        code,
        label: t.name || code,
        value: metric === 'recent' ? +(t.marks_recent || 0) : +(t.marks || 0),
        count: t.count,
        marks: t.marks,
        recent: t.marks_recent,
        hit: t.recent_papers_hit,
        last: t.last_seen || (t.papers || []).map(yearOf).filter(Boolean).reduce((a, b) => Math.max(a, b), 0) || null,
        status,
        removed: /^removed/i.test(status),
      };
    }).sort((a, b) => b.value - a.value || (b.marks || 0) - (a.marks || 0));
    // Topics dropped from the 2027 syllabus stay in the table, not the chart.
    const charted = all.filter((r) => r.value > 0 && !r.removed);
    if (!charted.length) return empty(host, title, 'No tagged questions for this subject yet.');
    const rows = charted.slice(0, limit).map((r) => ({
      ...r,
      detail: [
        r.label,
        `${r.count || 0} question${r.count === 1 ? '' : 's'}`,
        r.hit != null ? `in ${r.hit} of the last ${nRecent} papers` : null,
        r.last ? `last asked ${r.last}` : null,
        r.status && r.status !== 'in syllabus' ? `2027: ${r.status}` : null,
      ].filter(Boolean).join(' · '),
    }));
    const span = w.papers && w.papers.length ? spanLabel(w) : 'all analysed papers';
    const { fig, body } = frame(host, title, metric === 'recent'
      ? 'Total marks asked, GATE CSE 2021–2026'
      : `Total marks asked across ${span}${charted.length > limit ? ` · top ${limit} of ${charted.length} topics` : ''}`);
    hbars(body, rows, 'marks');
    const removed = all.filter((r) => r.removed && r.marks > 0);
    if (removed.length) body.append(h('p', { class: 'chart-sub', text: `Not shown (dropped from the 2027 syllabus): ${removed.map((r) => r.label).join(', ')}.` }));
    tableView(fig, ['Topic', 'Questions', 'Marks (all)', 'Marks 2021–26', `Papers hit (of last ${nRecent})`, 'Last asked', '2027 syllabus'],
      all.map((r) => [r.label, r.count, r.marks, r.recent, r.hit, r.last, r.status || null]));
  }

  function spanLabel(w) {
    const years = (w.papers || []).map((p) => { const m = String(p).match(/\d{4}/); return m ? +m[0] : null; }).filter(Boolean);
    if (!years.length) return 'all analysed papers';
    return `${w.papers.length} papers, ${Math.min(...years)}–${Math.max(...years)}`;
  }

  // ---------- columns over time ----------
  function trend(host, w, subject) {
    const title = `${subject.name}: marks per year`;
    const ws = w && w.subjects && w.subjects[subject.code];
    if (!ws || !ws.marks_by_paper) return empty(host, title, PENDING);
    const byYear = new Map();
    for (const [paper, marks] of Object.entries(ws.marks_by_paper)) {
      const m = String(paper).match(/\d{4}/);
      if (!m) continue;
      const y = +m[0];
      const e = byYear.get(y) || { sum: 0, n: 0 };
      e.sum += +marks || 0; e.n += 1;
      byYear.set(y, e);
    }
    const pts = Array.from(byYear.entries()).sort((a, b) => a[0] - b[0]).map(([y, e]) => ({ year: y, value: e.sum / e.n, sets: e.n }));
    if (!pts.length) return empty(host, title, 'No data yet.');
    const { fig, body } = frame(host, title, subject.code === 'GA'
      ? 'Marks per paper; years with two or more sets show the average of the sets'
      : 'Marks per paper, scaled to the 85-mark technical section; years with two or more sets show the average of the sets');
    const max = Math.max(...pts.map((p) => p.value));
    const { top, ticks } = niceScale(max, 4);
    const wrap = h('div', { class: 'colchart' });
    const yaxis = h('div', { class: 'col-yaxis', 'aria-hidden': 'true' });
    for (const t of ticks) { const s = h('span', { text: fmt(t) }); s.style.bottom = `${(t / top) * 100}%`; yaxis.append(s); }
    const plot = h('div', { class: 'col-plot', role: 'list' });
    const grid = h('div', { class: 'col-grid', 'aria-hidden': 'true' });
    for (const t of ticks) { if (!t) continue; const s = h('span'); s.style.bottom = `${(t / top) * 100}%`; grid.append(s); }
    plot.append(grid);
    const xaxis = h('div', { class: 'col-xaxis', 'aria-hidden': 'true' });
    const every = pts.length > 14 ? 2 : 1;
    pts.forEach((p, i) => {
      const bar = h('span', { class: 'col-bar' });
      bar.style.height = `${top ? (p.value / top) * 100 : 0}%`;
      const label = `${p.year}${p.sets > 1 ? ` (avg of ${p.sets} sets)` : ''}`;
      const slot = h('div', { class: 'col-slot', role: 'listitem', tabindex: '0', 'aria-label': `${label}: ${fmt(p.value)} marks` }, bar);
      if (i === pts.length - 1) {
        const v = h('span', { class: 'col-val', text: fmt(p.value) });
        v.style.bottom = `${top ? (p.value / top) * 100 : 0}%`;
        slot.append(v);
      }
      bindTip(slot, bar, `${fmt(p.value)} marks`, label, 'center');
      plot.append(slot);
      xaxis.append(h('span', { text: (i % every === 0 || i === pts.length - 1) ? `’${String(p.year).slice(2)}` : '' }));
    });
    wrap.append(yaxis, plot, xaxis);
    body.append(wrap);
    tableView(fig, ['Year', 'Marks', 'Sets'], pts.map((p) => [p.year, fmt(p.value), p.sets]));
  }

  window.GATECharts = { subjectBars, topicBars, trend };
})();
