/* Mock CBT for the predicted GATE CSE 2027 paper. Data: ../data/predicted-2027.json */
(function () {
  'use strict';
  const KEY = 'gate-mock-2027';
  const $ = (s, r = document) => r.querySelector(s);
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* storage blocked */ } },
    clear() { try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } },
  };
  let D = null, S = null, tick = null;

  // ---------- markdown + math (code is protected before math) ----------
  function md(src) {
    const math = [], code = [];
    let t = String(src).replace(/```[\s\S]*?```|`[^`\n]+`/g, (m) => { code.push(m); return `\u0000${code.length - 1}\u0000`; });
    t = t.replace(/\$\$([\s\S]+?)\$\$/g, (m, x) => { math.push([x, true]); return `MATH${math.length - 1}X`; });
    t = t.replace(/\$([^\$\n]+?)\$/g, (m, x) => { math.push([x, false]); return `MATH${math.length - 1}X`; });
    t = t.replace(/\u0000(\d+)\u0000/g, (m, i) => code[+i]);
    let html = window.marked ? window.marked.parse(t, { gfm: true }) : t;
    return html.replace(/MATH(\d+)X/g, (m, i) => {
      try { return window.katex.renderToString(math[+i][0], { displayMode: math[+i][1], throwOnError: false }); }
      catch (e) { return math[+i][0]; }
    });
  }
  const mdInline = (s) => md(s).replace(/^<p>([\s\S]*)<\/p>\s*$/, '$1');

  // ---------- state ----------
  function fresh(mode) {
    const st = { version: D.version, mode, started: Date.now(), deadline: mode === 'timed' ? Date.now() + D.duration_minutes * 60000 : null,
      cur: 0, ans: {}, status: {}, submitted: false };
    D.questions.forEach((q) => { st.status[q.no] = 'nv'; });
    st.status[D.questions[0].no] = 'na';
    return st;
  }
  const save = () => store.set(S);
  const q = () => D.questions[S.cur];
  const answered = (no) => { const a = S.ans[no]; return a != null && a !== '' && !(Array.isArray(a) && !a.length); };

  // ---------- timer ----------
  function fmt(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    return `${Math.floor(s / 3600)}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }
  function startTimer() {
    const box = $('#timer');
    box.hidden = false;
    clearInterval(tick);
    const upd = () => {
      if (!S || S.submitted) return clearInterval(tick);
      if (S.mode !== 'timed') { $('#timer-val').textContent = 'Practice'; return; }
      const left = S.deadline - Date.now();
      $('#timer-val').textContent = fmt(left);
      box.classList.toggle('m-timer-low', left < 10 * 60000);
      if (left <= 0) { clearInterval(tick); submit(true); }
    };
    upd(); tick = setInterval(upd, 1000);
  }

  // ---------- exam screen ----------
  function show(id) { ['start', 'exam', 'result'].forEach((s) => { $(`#screen-${s}`).hidden = s !== id; }); }
  function renderQuestion() {
    const x = q(), el = $('#question'), neg = x.type === 'MCQ' ? `−${x.marks === 1 ? '1/3' : '2/3'}` : 'none';
    const typeName = { MCQ: 'Multiple choice (one answer)', MSQ: 'Multiple select (one or more answers)', NAT: 'Numerical answer' }[x.type];
    let body = `<div class="m-qhead"><span class="m-qno">Question ${x.no}</span><span class="m-chip">${typeName}</span>
      <span class="m-chip">Marks ${x.marks}</span><span class="m-chip">Negative ${neg}</span></div><div class="m-qtext">${md(x.text)}</div>`;
    const a = S.ans[x.no];
    if (x.type === 'NAT') {
      body += `<label class="m-nat"><span>Your answer</span><input id="nat" inputmode="decimal" autocomplete="off" value="${a != null ? String(a).replace(/"/g, '') : ''}" placeholder="Type a number"></label>
        <div class="m-keypad" aria-label="Numeric keypad">${['7','8','9','4','5','6','1','2','3','0','.','-'].map((k) => `<button type="button" data-k="${k}">${k}</button>`).join('')}
        <button type="button" data-k="bs" class="m-kwide">Backspace</button></div>`;
    } else {
      const multi = x.type === 'MSQ';
      body += '<div class="m-opts">' + x.options.map((o, i) => {
        const L = 'ABCD'[i], on = multi ? (Array.isArray(a) && a.includes(L)) : a === L;
        return `<label class="m-opt${on ? ' m-opt-on' : ''}"><input type="${multi ? 'checkbox' : 'radio'}" name="opt" value="${L}"${on ? ' checked' : ''}>
          <span class="m-optl">(${L})</span><span class="m-optt">${mdInline(o)}</span></label>`;
      }).join('') + '</div>';
    }
    el.innerHTML = body;
    if (x.type === 'NAT') {
      const inp = $('#nat');
      inp.addEventListener('input', () => { inp.value = inp.value.replace(/[^0-9.\-]/g, ''); S.ans[x.no] = inp.value; save(); });
      $('.m-keypad').addEventListener('click', (e) => {
        const k = e.target.dataset && e.target.dataset.k; if (!k) return;
        inp.value = k === 'bs' ? inp.value.slice(0, -1) : inp.value + k; S.ans[x.no] = inp.value; save();
      });
    } else {
      el.querySelectorAll('input[name=opt]').forEach((i) => i.addEventListener('change', () => {
        S.ans[x.no] = x.type === 'MSQ' ? [...el.querySelectorAll('input[name=opt]:checked')].map((c) => c.value) : i.value;
        el.querySelectorAll('.m-opt').forEach((l) => l.classList.toggle('m-opt-on', l.querySelector('input').checked));
        save();
      }));
    }
    document.querySelectorAll('.m-tab').forEach((t) => t.classList.toggle('m-tab-on', t.dataset.section === x.section));
    $('#btn-prev').disabled = S.cur === 0;
    renderPalette();
  }
  function renderPalette() {
    const sec = q().section, list = D.questions.filter((x) => x.section === sec);
    $('#palette-title').textContent = sec === 'GA' ? 'General Aptitude' : 'Computer Science & IT';
    $('#palette').innerHTML = list.map((x) => `<button type="button" class="m-pal st-${S.status[x.no]}${x.no === q().no ? ' m-pal-cur' : ''}" data-no="${x.no}" aria-label="Question ${x.no}">${x.no}</button>`).join('');
    const c = { nv: 0, na: 0, a: 0, m: 0, am: 0 };
    D.questions.forEach((x) => { c[S.status[x.no]]++; });
    $('#counts').innerHTML = [['a', 'Answered'], ['na', 'Not answered'], ['nv', 'Not visited'], ['m', 'Marked'], ['am', 'Answered & marked']]
      .map(([k, l]) => `<span><span class="m-dot st-${k}"></span>${c[k]} ${l}</span>`).join('');
  }
  function leave(mark) {
    const no = q().no, has = answered(no);
    S.status[no] = mark ? (has ? 'am' : 'm') : (has ? 'a' : 'na');
  }
  function go(i) {
    if (i < 0 || i >= D.questions.length) return;
    S.cur = i;
    const no = q().no;
    if (S.status[no] === 'nv') S.status[no] = 'na';
    save(); renderQuestion();
    $('#question').scrollIntoView({ block: 'nearest' });
  }

  // ---------- scoring ----------
  function grade(x) {
    const a = S.ans[x.no];
    if (!answered(x.no)) return { st: 'skip', score: 0 };
    let ok = false;
    if (x.type === 'MCQ') ok = a === x.answer;
    else if (x.type === 'MSQ') ok = [...a].sort().join() === [...x.answer].sort().join();
    else { const v = parseFloat(a); ok = Number.isFinite(v) && v >= x.answer.min - 1e-9 && v <= x.answer.max + 1e-9; }
    if (ok) return { st: 'right', score: x.marks };
    return { st: 'wrong', score: x.type === 'MCQ' ? -x.marks / 3 : 0 };
  }
  const keyStr = (x) => x.type === 'MCQ' ? `(${x.answer})` : x.type === 'MSQ' ? x.answer.map((l) => `(${l})`).join(' ')
    : (x.answer.min === x.answer.max ? `${x.answer.min}` : `${x.answer.min} to ${x.answer.max}`);
  const yourStr = (x) => { const a = S.ans[x.no]; if (!answered(x.no)) return '—'; return x.type === 'MCQ' ? `(${a})` : x.type === 'MSQ' ? a.map((l) => `(${l})`).join(' ') : String(a); };

  function submit(auto) {
    if (S.submitted) return;
    leave(false);
    S.submitted = true; S.submittedAt = Date.now(); save();
    clearInterval(tick);
    $('#timer').hidden = true;
    $('#calc-toggle').hidden = true; Calc.close();
    renderResult(auto);
  }
  function renderResult(auto) {
    const rows = D.questions.map((x) => ({ x, g: grade(x) }));
    const tot = rows.reduce((s, r) => s + r.g.score, 0);
    const cnt = (k) => rows.filter((r) => r.g.st === k).length;
    const neg = rows.filter((r) => r.g.score < 0).reduce((s, r) => s + r.g.score, 0);
    const bySub = {};
    rows.forEach(({ x, g }) => {
      const b = bySub[x.subject] || (bySub[x.subject] = { name: x.subject_name, max: 0, got: 0, right: 0, wrong: 0, skip: 0 });
      b.max += x.marks; b.got += g.score; b[g.st]++;
    });
    const r2 = (v) => (Math.round(v * 100) / 100).toFixed(2);
    const used = S.mode === 'timed' ? fmt(Math.min(S.submittedAt, S.deadline) - S.started) : fmt(S.submittedAt - S.started);
    const el = $('#screen-result');
    el.innerHTML = `<div class="m-card"><h1>Your score: ${r2(tot)} / 100</h1>
      ${auto ? '<p class="m-muted">Time ran out, so the test was submitted automatically.</p>' : ''}
      <div class="m-stats"><div><b>${cnt('right')}</b><span>correct</span></div><div><b>${cnt('wrong')}</b><span>wrong</span></div>
      <div><b>${cnt('skip')}</b><span>not attempted</span></div><div><b>${r2(neg)}</b><span>negative marks</span></div><div><b>${used}</b><span>time used</span></div></div>
      <h2>By subject</h2><div class="m-tablewrap"><table><thead><tr><th>Subject</th><th>Score</th><th>Max</th><th>Correct</th><th>Wrong</th><th>Skipped</th></tr></thead><tbody>
      ${Object.values(bySub).map((b) => `<tr><td>${b.name}</td><td>${r2(b.got)}</td><td>${b.max}</td><td>${b.right}</td><td>${b.wrong}</td><td>${b.skip}</td></tr>`).join('')}
      </tbody></table></div>
      <div class="m-actions"><button type="button" class="m-btn m-btn-primary" id="btn-retake">Retake the test</button>
      <a class="m-btn" href="../#/predicted-2027">Read all solutions on the site</a></div></div>
      <div class="m-card"><h2>Question review</h2><div class="m-filter" role="group" aria-label="Filter">
      ${[['all', 'All'], ['wrong', 'Wrong'], ['skip', 'Not attempted'], ['right', 'Correct']].map(([k, l], i) => `<button type="button" class="m-btn m-btn-ghost${i ? '' : ' m-on'}" data-f="${k}">${l}</button>`).join('')}</div>
      <div id="review">${rows.map(({ x, g }) => `<details class="m-rev m-rev-${g.st}" data-st="${g.st}"><summary><span class="m-qno">Q.${x.no}</span>
        <span>${x.subject_name} · ${x.topic_name}</span><span class="m-revs">${g.st === 'right' ? '+' : ''}${r2(g.score)}</span></summary>
        <div class="m-qtext">${md(x.text)}</div>${x.options ? `<ol type="A" class="m-revopts">${x.options.map((o) => `<li>${mdInline(o)}</li>`).join('')}</ol>` : ''}
        <p><b>Your answer:</b> ${yourStr(x)} &nbsp; <b>Correct:</b> ${keyStr(x)}</p><div class="m-sol">${md(x.solution)}</div></details>`).join('')}</div></div>`;
    show('result');
    $('#btn-retake').onclick = () => { store.clear(); location.reload(); };
    el.querySelectorAll('[data-f]').forEach((b) => b.addEventListener('click', () => {
      el.querySelectorAll('[data-f]').forEach((o) => o.classList.toggle('m-on', o === b));
      el.querySelectorAll('.m-rev').forEach((d) => { d.hidden = b.dataset.f !== 'all' && d.dataset.st !== b.dataset.f; });
    }));
    window.scrollTo(0, 0);
  }

  // ---------- on-screen scientific calculator (safe parser, no eval) ----------
  const Calc = (function () {
    let expr = '', ans = 0, deg = true, fresh = false;
    const ROWS = [
      ['sin', 'cos', 'tan', '(', ')', 'C'],
      ['sin⁻¹', 'cos⁻¹', 'tan⁻¹', 'x²', 'xʸ', '⌫'],
      ['log', 'ln', '√', '1/x', 'n!', '%'],
      ['7', '8', '9', '÷', 'π', 'e'],
      ['4', '5', '6', '×', 'Ans', 'eˣ'],
      ['1', '2', '3', '−', '10ˣ', 'mod'],
      ['0', '.', '+', '='],
    ];
    const INS = { 'sin': 'sin(', 'cos': 'cos(', 'tan': 'tan(', 'sin⁻¹': 'asin(', 'cos⁻¹': 'acos(', 'tan⁻¹': 'atan(',
      'log': 'log(', 'ln': 'ln(', '√': '√(', 'eˣ': 'exp(', '10ˣ': '10^(', 'x²': '^2', 'xʸ': '^', '1/x': '^(−1)', 'n!': '!', 'mod': ' mod ' };
    const isOpStart = (k) => /^[+−×÷^!%]$|^(x²|xʸ|1\/x|n!|mod)$/.test(k);
    function tokenize(s) {
      const t = []; let i = 0;
      const OP = { '+': '+', '−': '-', '-': '-', '×': '*', '*': '*', '÷': '/', '/': '/', '^': '^', '!': '!', '%': '%' };
      while (i < s.length) {
        const c = s[i];
        if (c === ' ') { i++; continue; }
        if (/[0-9.]/.test(c)) {
          let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++;
          const str = s.slice(i, j); if ((str.match(/\./g) || []).length > 1) throw new Error('number');
          t.push({ k: 'n', v: parseFloat(str) }); i = j; continue;
        }
        if (/[a-zA-Z]/.test(c)) {
          let j = i; while (j < s.length && /[a-zA-Z]/.test(s[j])) j++;
          const w = s.slice(i, j); i = j;
          if (w === 'e') t.push({ k: 'n', v: Math.E });
          else if (w === 'Ans') t.push({ k: 'n', v: ans });
          else if (w === 'mod') t.push({ k: 'op', v: 'mod' });
          else t.push({ k: 'f', v: w });
          continue;
        }
        if (c === 'π') { t.push({ k: 'n', v: Math.PI }); i++; continue; }
        if (c === '√') { t.push({ k: 'f', v: 'sqrt' }); i++; continue; }
        if (c === '(' || c === ')') { t.push({ k: c }); i++; continue; }
        if (OP[c]) { t.push({ k: 'op', v: OP[c] }); i++; continue; }
        throw new Error('char');
      }
      const out = [];  // implicit multiplication: 2π, 3(4), 2sin(30)
      for (const tok of t) {
        const p = out[out.length - 1];
        const left = p && (p.k === 'n' || p.k === ')' || (p.k === 'op' && (p.v === '!' || p.v === '%')));
        if (left && (tok.k === 'n' || tok.k === 'f' || tok.k === '(')) out.push({ k: 'op', v: '*' });
        out.push(tok);
      }
      return out;
    }
    const rad = (x) => (deg ? x * Math.PI / 180 : x), unrad = (x) => (deg ? x * 180 / Math.PI : x);
    const tidy = (v) => (Math.abs(v) < 1e-12 ? 0 : v);
    function fact(n) { if (n < 0 || n > 170 || Math.abs(n - Math.round(n)) > 1e-9) return NaN; let r = 1; for (let i = 2; i <= Math.round(n); i++) r *= i; return r; }
    function fn(name, a) {
      switch (name) {
        case 'sin': return tidy(Math.sin(rad(a)));
        case 'cos': return tidy(Math.cos(rad(a)));
        case 'tan': return Math.abs(tidy(Math.cos(rad(a)))) === 0 ? NaN : tidy(Math.tan(rad(a)));
        case 'asin': return unrad(Math.asin(a));
        case 'acos': return unrad(Math.acos(a));
        case 'atan': return unrad(Math.atan(a));
        case 'log': return Math.log10(a);
        case 'ln': return Math.log(a);
        case 'sqrt': return Math.sqrt(a);
        case 'exp': return Math.exp(a);
        default: throw new Error('fn');
      }
    }
    function evaluate(s) {
      const tk = tokenize(s); let p = 0;
      const peek = () => tk[p], isOp = (...o) => peek() && peek().k === 'op' && o.includes(peek().v);
      function sum() { let v = prod(); while (isOp('+', '-')) { const o = tk[p++].v, r = prod(); v = o === '+' ? v + r : v - r; } return v; }
      function prod() { let v = unary(); while (isOp('*', '/', 'mod')) { const o = tk[p++].v, r = unary(); v = o === '*' ? v * r : o === '/' ? v / r : ((v % r) + r) % r; } return v; }
      function unary() { if (isOp('-', '+')) { const o = tk[p++].v, v = unary(); return o === '-' ? -v : v; } return power(); }
      function power() { const b = post(); if (isOp('^')) { p++; return Math.pow(b, unary()); } return b; }
      function post() { let v = prim(); while (isOp('!', '%')) v = tk[p++].v === '!' ? fact(v) : v / 100; return v; }
      function prim() {
        const t = tk[p++];
        if (!t) throw new Error('end');
        if (t.k === 'n') return t.v;
        if (t.k === '(') { const v = sum(); if (peek() && peek().k === ')') p++; else if (peek()) throw new Error(')'); return v; }
        if (t.k === 'f') { if (!peek() || peek().k !== '(') throw new Error('('); p++; const a = sum(); if (peek() && peek().k === ')') p++; return fn(t.v, a); }
        throw new Error('token');
      }
      const v = sum(); if (p < tk.length) throw new Error('trailing'); return v;
    }
    function fmtNum(v) {
      if (!Number.isFinite(v)) return 'Error';
      const r = Number(v.toPrecision(12));
      return (Math.abs(r) >= 1e12 || (r !== 0 && Math.abs(r) < 1e-9)) ? r.toExponential(9).replace(/\.?0+e/, 'e') : String(r);
    }
    function draw(out) { $('#calc-expr').textContent = expr; if (out != null) $('#calc-out').textContent = out; }
    function press(k) {
      if (k === 'C') { expr = ''; fresh = false; return draw('0'); }
      if (k === '⌫') { expr = expr.replace(/(asin\(|acos\(|atan\(|sin\(|cos\(|tan\(|log\(|ln\(|exp\(|√\(|10\^\(|\^\(−1\)| mod |Ans|.)$/, ''); return draw(); }
      if (k === '=') {
        if (!expr.trim()) return;
        let v; try { v = evaluate(expr); } catch (e) { v = NaN; }
        const s = fmtNum(v);
        if (s !== 'Error') ans = Number(v.toPrecision(12));
        fresh = true; return draw(s);
      }
      if (fresh) { expr = isOpStart(k) ? 'Ans' : ''; fresh = false; }
      expr += INS[k] || k;
      draw();
    }
    function open() { $('#calc').hidden = false; $('#calc-toggle').setAttribute('aria-expanded', 'true'); }
    function close() { $('#calc').hidden = true; $('#calc-toggle').setAttribute('aria-expanded', 'false'); }
    function init() {
      const keys = $('#calc-keys');
      keys.innerHTML = ROWS.flat().map((k) => {
        const cls = k === '=' ? 'k-eq' : k === '0' ? 'k-zero' : k === 'C' ? 'k-clr' : /^[+−×÷]$/.test(k) ? 'k-op' : /^[0-9.]$/.test(k) ? '' : 'k-fn';
        return `<button type="button" class="${cls}" data-k="${k}">${k}</button>`;
      }).join('');
      keys.addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (b) press(b.dataset.k); });
      $('#calc-toggle').onclick = () => ($('#calc').hidden ? open() : close());
      $('#calc-close').onclick = close;
      document.querySelectorAll('.m-calc-mode button').forEach((b) => b.addEventListener('click', () => {
        deg = b.dataset.mode === 'deg';
        document.querySelectorAll('.m-calc-mode button').forEach((o) => o.classList.toggle('m-on', o === b));
      }));
      $('#calc').addEventListener('keydown', (e) => {
        const map = { Enter: '=', '=': '=', Backspace: '⌫', Escape: null, '*': '×', '/': '÷', '-': '−', '+': '+', '^': 'xʸ', '!': 'n!', '%': '%', '(': '(', ')': ')', '.': '.' };
        if (e.key === 'Escape') { close(); $('#calc-toggle').focus(); return; }
        const k = /^[0-9]$/.test(e.key) ? e.key : map[e.key];
        if (k) { e.preventDefault(); press(k); }
      });
      // drag by the title bar
      const head = $('#calc-head'), box = $('#calc');
      head.addEventListener('pointerdown', (e) => {
        if (e.target.closest('button') || innerWidth <= 520) return;
        const r = box.getBoundingClientRect(), dx = e.clientX - r.left, dy = e.clientY - r.top;
        head.setPointerCapture(e.pointerId);
        const move = (ev) => {
          box.style.left = Math.max(0, Math.min(innerWidth - r.width, ev.clientX - dx)) + 'px';
          box.style.top = Math.max(0, Math.min(innerHeight - 60, ev.clientY - dy)) + 'px';
          box.style.right = 'auto';
        };
        const up = () => { head.removeEventListener('pointermove', move); head.removeEventListener('pointerup', up); };
        head.addEventListener('pointermove', move); head.addEventListener('pointerup', up);
      });
    }
    return { init, open, close, evaluate: (s) => fmtNum(evaluate(s)), setDeg: (d) => { deg = d; } };
  })();
  window.GATEMockCalc = Calc;

  // ---------- wiring ----------
  function begin(st) {
    S = st; save(); show('exam'); startTimer(); renderQuestion();
    $('#calc-toggle').hidden = false;
  }
  function confirmSubmit() {
    const left = D.questions.filter((x) => !answered(x.no)).length;
    $('#modal-body').innerHTML = `<p>${left} of 65 questions are not answered.</p>${S.mode === 'timed' ? `<p>Time left: ${fmt(S.deadline - Date.now())}</p>` : ''}<p>You cannot change answers after submitting.</p>`;
    $('#modal').hidden = false; $('#modal-ok').focus();
  }
  function wire() {
    Calc.init();
    $('#btn-start').onclick = () => begin(fresh('timed'));
    $('#btn-practice').onclick = () => begin(fresh('practice'));
    $('#btn-resume').onclick = () => begin(store.get());
    $('#btn-next').onclick = () => { leave(false); go(Math.min(S.cur + 1, D.questions.length - 1)); };
    $('#btn-prev').onclick = () => { leave(false); go(S.cur - 1); };
    $('#btn-mark').onclick = () => { leave(true); go(Math.min(S.cur + 1, D.questions.length - 1)); };
    $('#btn-clear').onclick = () => { delete S.ans[q().no]; S.status[q().no] = 'na'; save(); renderQuestion(); };
    $('#palette').onclick = (e) => { const b = e.target.closest('[data-no]'); if (!b) return; leave(false); go(D.questions.findIndex((x) => x.no === +b.dataset.no)); };
    document.querySelectorAll('.m-tab').forEach((t) => { t.onclick = () => { leave(false); go(D.questions.findIndex((x) => x.section === t.dataset.section)); }; });
    $('#btn-submit').onclick = confirmSubmit;
    $('#modal-cancel').onclick = () => { $('#modal').hidden = true; };
    $('#modal-ok').onclick = () => { $('#modal').hidden = true; submit(false); };
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('#modal').hidden = true; });
    $('#theme-toggle').onclick = () => {
      const root = document.documentElement;
      const cur = root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('gate-theme', next); } catch (e) { /* ignore */ }
    };
  }

  fetch('../data/predicted-2027.json').then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }).then((d) => {
    D = d; wire();
    $('#load-status').textContent = `${D.questions.length} questions loaded.`;
    const saved = store.get();
    if (saved && saved.version === D.version) {
      if (saved.submitted) { S = saved; renderResult(false); return; }
      if (saved.mode === 'practice' || saved.deadline > Date.now()) $('#btn-resume').hidden = false;
      else { S = saved; submit(true); }
    }
  }).catch(() => { $('#load-status').textContent = 'Could not load the questions. Open this page through the website (not as a local file).'; });
})();
