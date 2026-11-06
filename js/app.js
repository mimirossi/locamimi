/* LOCAMIMI landing — monta il CoverCarousel del design system e il bottone Booking. */
(function () {
  var React = window.React;
  var ReactDOM = window.ReactDOM;
  var L = window.LOCAMIMI;
  if (!React || !ReactDOM || !L) return;

  /* Bottone Booking: stile del Button del design system su un link vero */
  var cta = document.getElementById('booking-cta');
  if (cta && L.buttonVariants) cta.className = L.buttonVariants({ size: 'lg' });

  var SETS = window.LOCAMIMI_SETS || [];
  var h = React.createElement;

  function Vetrina() {
    var state = React.useState(0);
    var idx = state[0], setIdx = state[1];

    /* Scroll orizzontale (trackpad o Shift + rotella) fa girare la pila, sempre nello stesso verso.
       Lo scroll verticale resta alla pagina; a fila aperta scorre la fila del componente. */
    React.useEffect(function () {
      var area = document.getElementById('vetrina-area');
      if (!area) return;
      var acc = 0, lock = 0, n = SETS.length;
      function onWheel(e) {
        if (e.target.closest && e.target.closest('[role="region"]')) return;
        var d = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX;
        if (!d || (!e.shiftKey && Math.abs(e.deltaX) <= Math.abs(e.deltaY))) return;
        e.preventDefault();
        var now = Date.now();
        if (now < lock) return;
        acc += d;
        if (Math.abs(acc) < 60) return;
        var step = acc > 0 ? 1 : -1;
        setIdx(function (i) { return (i + step + n) % n; });
        acc = 0; lock = now + 380;
      }
      /* Touch: lo swipe orizzontale fa girare la pila come la rotella su desktop.
         touch-action:pan-y (in site.css) lascia lo scroll verticale alla pagina. */
      var sx = null, sy = 0, tlock = 0;
      function onTouchStart(e) {
        if (e.touches.length !== 1 || (e.target.closest && e.target.closest('[role="region"]'))) { sx = null; return; }
        sx = e.touches[0].clientX; sy = e.touches[0].clientY;
      }
      function onTouchMove(e) {
        if (sx === null) return;
        var dx = sx - e.touches[0].clientX, dy = sy - e.touches[0].clientY;
        if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) return;
        var now = Date.now();
        if (now < tlock) return;
        var step = dx > 0 ? 1 : -1;
        setIdx(function (i) { return (i + step + n) % n; });
        sx = e.touches[0].clientX; sy = e.touches[0].clientY; tlock = now + 250;
      }
      function onTouchEnd() { sx = null; }
      area.addEventListener('wheel', onWheel, { passive: false });
      area.addEventListener('touchstart', onTouchStart, { passive: true });
      area.addEventListener('touchmove', onTouchMove, { passive: true });
      area.addEventListener('touchend', onTouchEnd);
      area.addEventListener('touchcancel', onTouchEnd);
      return function () {
        area.removeEventListener('wheel', onWheel);
        area.removeEventListener('touchstart', onTouchStart);
        area.removeEventListener('touchmove', onTouchMove);
        area.removeEventListener('touchend', onTouchEnd);
        area.removeEventListener('touchcancel', onTouchEnd);
      };
    }, []);

    var items = SETS.slice(idx).concat(SETS.slice(0, idx));
    return h(L.CoverCarousel, { items: items });
  }

  /* Fine dell'animazione di entrata (site.css): da qui in poi le card non la ripetono quando la pila gira */
  setTimeout(function () {
    var v = document.querySelector('.vetrina');
    if (v) v.classList.add('is-entered');
  }, 300 + SETS.length * 100 + 700 + 100);

  var tree = h(Vetrina);
  if (L.TooltipProvider) tree = h(L.TooltipProvider, null, tree);
  ReactDOM.createRoot(document.getElementById('carousel')).render(tree);
})();
