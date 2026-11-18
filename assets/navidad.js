/* ============================================================
   MODO NAVIDAD
   - Botón en la portada (y en el pie) para activarlo o quitarlo.
   - Se recuerda la elección en este navegador.
   - Dibuja el Belén de la portada y la cuenta atrás.
   Este archivo se carga ANTES que app.js.
   ============================================================ */
(function () {
  var KEY = 'turron-navidad';

  function saved() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function save(on) { try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) {} }

  /* ---- cuenta atrás ---- */
  function plural(n) { return n + (n === 1 ? ' día' : ' días'); }
  function countText() {
    var now = new Date(), y = now.getFullYear(), m = now.getMonth(), d = now.getDate();
    var today = new Date(y, m, d), DAY = 864e5;
    if (m === 11 && d === 24) return '¡Hoy es Nochebuena!';
    if (m === 11 && d === 25) return '¡Feliz Navidad!';
    if (m === 0 && d === 6) return '¡Feliz día de Reyes!';
    if ((m === 11 && d > 25) || (m === 0 && d < 6)) {
      var reyes = new Date(m === 11 ? y + 1 : y, 0, 6);
      return 'Faltan ' + plural(Math.round((reyes - today) / DAY)) + ' para los Reyes Magos';
    }
    var nb = new Date(y, 11, 24);
    if (today > nb) nb = new Date(y + 1, 11, 24);
    return 'Faltan ' + plural(Math.round((nb - today) / DAY)) + ' para Nochebuena';
  }

  /* ---- piezas de la portada ---- */
  window.xmasToggle = function () {
    var on = document.body.classList.contains('navidad');
    return '<button type="button" class="xmas-toggle" role="switch" aria-checked="' + on + '" data-xmas>' +
      '<span class="sw" aria-hidden="true"></span><span>Modo Navidad</span></button>' +
      '<p class="xmas-count" aria-live="polite">' + countText() + '</p>';
  };

  window.xmasScene = function () {
    var rey = function (x, h, manto, esc) {
      /* un Rey Mago: manto, cabeza, corona y regalo; h = altura */
      var s = h / 70;
      return '<g transform="translate(' + x + ' ' + (232 - h) + ') scale(' + s + ')">' +
        '<path d="M-14 70 Q-12 22 0 18 Q12 22 14 70Z" fill="' + manto + '"/>' +
        '<path d="M-14 70 Q-12 22 0 18 Q12 22 14 70Z" fill="none" stroke="#ffd45c" stroke-width="1.6" opacity=".6"/>' +
        '<circle cx="0" cy="12" r="7.5" fill="#e8b98a"/>' +
        '<path d="M-8 7 L-6 -3 L-2 3 L0 -5 L2 3 L6 -3 L8 7Z" fill="#ffd45c"/>' +
        '<rect x="9" y="36" width="12" height="11" rx="1.5" fill="' + esc + '"/>' +
        '<rect x="9" y="40" width="12" height="2.2" fill="#ffd45c"/><rect x="14.4" y="36" width="2.2" height="11" fill="#ffd45c"/>' +
        '</g>';
    };
    var oveja = function (x, y, k) {
      return '<g transform="translate(' + x + ' ' + y + ') scale(' + k + ')">' +
        '<ellipse cx="0" cy="0" rx="15" ry="10" fill="#f4efe2"/>' +
        '<circle cx="-9" cy="-5" r="7" fill="#f4efe2"/><circle cx="8" cy="-6" r="7" fill="#f4efe2"/>' +
        '<ellipse cx="-17" cy="-1" rx="6" ry="5" fill="#3b3a38"/>' +
        '<rect x="-10" y="7" width="3" height="9" fill="#3b3a38"/><rect x="5" y="7" width="3" height="9" fill="#3b3a38"/>' +
        '</g>';
    };
    var pino = function (x, k) {
      return '<g transform="translate(' + x + ' 232) scale(' + k + ')">' +
        '<rect x="-4" y="-14" width="8" height="14" fill="#4a3320"/>' +
        '<path d="M0 -118 L-28 -62 L-14 -62 L-34 -28 L-16 -28 L-38 -12 L38 -12 L16 -28 L34 -28 L14 -62 L28 -62Z" fill="#1b5a3f"/>' +
        '<circle cx="-10" cy="-50" r="3.4" fill="#d8283b"/><circle cx="12" cy="-34" r="3.4" fill="#ffd45c"/><circle cx="-14" cy="-22" r="3.4" fill="#ffd45c"/><circle cx="8" cy="-66" r="3.2" fill="#d8283b"/>' +
        '<path d="M0 -128 L3 -120 L11 -120 L5 -115 L7 -107 L0 -112 L-7 -107 L-5 -115 L-11 -120 L-3 -120Z" fill="#ffd45c"/>' +
        '</g>';
    };
    var svg =
      '<svg viewBox="0 0 800 240" role="img" aria-label="Belén de Navidad: la estrella, el portal con el Niño, los Reyes Magos, un pastor y sus ovejas">' +
      '<defs>' +
      '<radialGradient id="xg" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffe9a6" stop-opacity=".95"/><stop offset="1" stop-color="#ffe9a6" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="xb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a6" stop-opacity=".55"/><stop offset="1" stop-color="#ffe9a6" stop-opacity="0"/></linearGradient>' +
      '</defs>' +
      /* colinas */
      '<rect x="-1200" y="167" width="1200" height="80" fill="#1d4d3a"/><rect x="800" y="167" width="1200" height="80" fill="#1d4d3a"/>' +
      '<path d="M0 240V168Q130 120 270 162T540 158Q670 122 800 168V240Z" fill="#1d4d3a"/>' +
      '<rect x="-1200" y="197" width="1200" height="50" fill="#12372a"/><rect x="800" y="197" width="1200" height="50" fill="#12372a"/>' +
      '<path d="M0 240V200Q170 164 340 197T650 188Q735 176 800 198V240Z" fill="#12372a"/>' +
      /* rayo de la estrella */
      '<polygon points="400,62 360,196 440,196" fill="url(#xb)"/>' +
      /* estrella de Belén */
      '<g transform="translate(400 46)"><g class="xs">' +
      '<circle r="34" fill="url(#xg)"/>' +
      '<path d="M0 -34 L6 -7 L34 0 L6 7 L0 34 L-6 7 L-34 0 L-6 -7Z" fill="#ffd45c"/>' +
      '<path d="M0 -20 L4 -4 L20 0 L4 4 L0 20 L-4 4 L-20 0 L-4 -4Z" fill="#fff4c4" transform="rotate(45)"/>' +
      '</g></g>' +
      /* portal */
      '<g transform="translate(330 86)">' +
      '<ellipse class="xglow" cx="70" cy="92" rx="100" ry="54" fill="url(#xg)"/>' +
      '<rect x="10" y="62" width="7" height="84" fill="#6b4a2b"/><rect x="123" y="62" width="7" height="84" fill="#6b4a2b"/>' +
      '<path d="M-6 66 L70 4 L146 66Z" fill="#d9a441"/>' +
      '<path d="M-6 66 L70 4 L146 66" fill="none" stroke="#a87a28" stroke-width="3.2" stroke-linejoin="round"/>' +
      '<path d="M12 56 L128 56" stroke="#a87a28" stroke-width="2" opacity=".7"/>' +
      '<rect x="10" y="62" width="120" height="6" fill="#6b4a2b"/>' +
      /* cuna con el Niño */
      '<path d="M50 146 h40 l-5 -13 h-30z" fill="#8a5a2b"/>' +
      '<ellipse cx="70" cy="131" rx="14" ry="6" fill="#fff2b8"/>' +
      '<circle cx="70" cy="128" r="4.6" fill="#f2c9a0"/>' +
      /* María */
      '<circle cx="36" cy="108" r="8" fill="#f2c9a0"/>' +
      '<path d="M22 148 Q26 118 36 115 Q48 118 50 148Z" fill="#3b5ea8"/>' +
      '<path d="M27 106 Q36 96 45 106 Q44 112 36 113 Q28 112 27 106Z" fill="#3b5ea8" opacity=".9"/>' +
      /* José */
      '<circle cx="106" cy="108" r="8" fill="#f2c9a0"/>' +
      '<path d="M92 148 Q96 118 106 115 Q118 118 120 148Z" fill="#8a5a2b"/>' +
      '<line x1="124" y1="148" x2="124" y2="102" stroke="#6b4a2b" stroke-width="3"/>' +
      '</g>' +
      /* pastor y ovejas */
      '<g transform="translate(140 232)">' +
      '<line x1="22" y1="0" x2="22" y2="-72" stroke="#6b4a2b" stroke-width="3"/><path d="M22 -72 q10 -2 9 8" fill="none" stroke="#6b4a2b" stroke-width="3"/>' +
      '<path d="M-12 0 Q-10 -42 4 -48 Q18 -42 20 0Z" fill="#8c4a2f"/><circle cx="4" cy="-56" r="8" fill="#f2c9a0"/>' +
      '<path d="M-5 -60 Q4 -70 13 -60Z" fill="#5b3a2a"/></g>' +
      oveja(236, 216, 1) + oveja(286, 224, .8) +
      /* Reyes Magos */
      rey(500, 74, '#a4202d', '#2f7d4f') + rey(548, 82, '#2f7d4f', '#a4202d') + rey(600, 68, '#4f3a8c', '#c99a3b') +
      /* pinos */
      pino(40, 1) + pino(94, .72) + pino(748, 1) + pino(700, .76) +
      '</svg>';
    return '<div class="xmas-scene">' + svg + '</div>';
  };


  /* ---- título escrito sobre la bola ----
     Parte el título en 1-3 líneas, elige el reparto con la letra más grande que quepa
     dentro del círculo y escribe cada línea sobre una curva suave (como en una esfera). */
  var ctx = null;
  function textW(t) {                      /* ancho de t con letra de 1 px */
    if (!ctx) { ctx = document.createElement('canvas').getContext('2d'); }
    ctx.font = '400 100px "Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif';
    return ctx.measureText(t).width / 100;
  }
  var RE = 90, RC = 120;                   /* radio útil y curvatura de las líneas */

  function lineRoom(yb, fs) {              /* ancho disponible de una línea a esa altura */
    var best = 0;
    for (var d = 0; d <= 100; d++) {
      var y = yb - d * d / (2 * RC);
      var top = y - 0.74 * fs, bot = y + 0.24 * fs;
      if (d * d + top * top <= RE * RE && d * d + bot * bot <= RE * RE) best = d; else break;
    }
    return 2 * best;
  }
  function fits(lines, fs) {
    var k = lines.length, lh = 1.08 * fs;
    if (k * lh > 108) return false;
    for (var i = 0; i < k; i++) {
      var yb = (i - (k - 1) / 2) * lh + 0.32 * fs;
      if (textW(lines[i]) * fs * 1.05 > lineRoom(yb, fs)) return false;
    }
    return true;
  }
  function splits(words, k) {              /* todos los repartos de las palabras en k líneas */
    if (k === 1) return [[words.join(' ')]];
    var res = [];
    for (var i = 1; i <= words.length - k + 1; i++) {
      var head = words.slice(0, i).join(' ');
      splits(words.slice(i), k - 1).forEach(function (r) { res.push([head].concat(r)); });
    }
    return res;
  }
  function layout(title) {
    var words = title.split(/\s+/), best = null;
    for (var k = 1; k <= Math.min(3, words.length); k++) {
      splits(words, k).forEach(function (lines) {
        var lo = 10, hi = 44;
        if (!fits(lines, lo)) return;
        for (var s = 0; s < 14; s++) { var mid = (lo + hi) / 2; if (fits(lines, mid)) lo = mid; else hi = mid; }
        if (!best || lo > best.fs + 0.01) best = { fs: lo, lines: lines };
      });
    }
    return best || { fs: 12, lines: [title] };
  }
  function esc2(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  window.xmasBall = function (r) {
    var L = layout(r.title), k = L.lines.length, fs = L.fs, lh = 1.08 * fs, D = 95;
    var defs = '', txt = '';
    for (var i = 0; i < k; i++) {
      var yb = (i - (k - 1) / 2) * lh + 0.32 * fs, e = D * D / (2 * RC), id = 'xb-' + r.id + '-' + i;
      defs += '<path id="' + id + '" d="M' + (-D) + ' ' + (yb - e).toFixed(1) + ' Q0 ' + (yb + e).toFixed(1) + ' ' + D + ' ' + (yb - e).toFixed(1) + '"/>';
      txt += '<text font-size="' + fs.toFixed(1) + '"><textPath href="#' + id + '" startOffset="50%" text-anchor="middle">' + esc2(L.lines[i]) + '</textPath></text>';
    }
    var tag = r.ready ? 'VER RECETA →' : 'PRÓXIMAMENTE';
    defs += '<path id="xt-' + r.id + '" d="M-48 61 A78 78 0 0 0 48 61"/>';
    return '<span class="ball-svg" aria-hidden="true"><svg viewBox="0 0 200 200" focusable="false"><defs>' + defs + '</defs>' +
      '<g transform="translate(100 100)">' +
      '<text class="bn" x="0" y="-66" text-anchor="middle" font-size="16">' + esc2(r.num) + '</text>' +
      '<g class="bt">' + txt + '</g>' +
      '<text class="bg" font-size="9.5"><textPath href="#xt-' + r.id + '" startOffset="50%" text-anchor="middle">' + tag + '</textPath></text>' +
      '</g></svg></span>';
  };

  /* ---- guirnalda ---- */
  function lights(on) {
    var h = document.querySelector('.top');
    if (!h) return;
    var ex = h.querySelector('.xmas-lights');
    if (on && !ex) {
      var d = document.createElement('div');
      d.className = 'xmas-lights';
      d.setAttribute('aria-hidden', 'true');
      d.innerHTML = '<i class="l0"></i><i class="l1"></i><i class="l2"></i>';
      h.appendChild(d);
    }
    if (!on && ex) ex.parentNode.removeChild(ex);
  }

  /* ---- aplicar ---- */
  function apply(on) {
    document.body.classList.toggle('navidad', on);
    lights(on);
    var all = document.querySelectorAll('[data-xmas]');
    for (var i = 0; i < all.length; i++) {
      if (all[i].getAttribute('role') === 'switch') all[i].setAttribute('aria-checked', String(on));
      if (all[i].classList.contains('contact-open')) all[i].textContent = on ? 'Quitar modo Navidad' : 'Activar modo Navidad';
    }
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-xmas]') : null;
    if (!t) return;
    var on = !document.body.classList.contains('navidad');
    save(on);
    apply(on);
    /* volver a pintar la página para que la nieve cambie, sin saltar de sitio */
    if (typeof route === 'function') {
      var y = window.scrollY;
      route();
      window.scrollTo(0, y);
      var again = document.querySelector('.xmas-toggle') || document.querySelector('.foot-xmas [data-xmas]');
      if (again && again.focus) again.focus({ preventScroll: true });
      apply(on);
    }
  });

  apply(saved());
})();
