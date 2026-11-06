/* Apply the saved theme before first paint. Load this in <head> on every page. */
(function () {
  try {
    var t = localStorage.getItem('gate-theme');
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
  } catch (e) { /* storage blocked: follow the OS theme */ }
})();
