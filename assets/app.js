/* Las recetas se cargan antes desde la carpeta «recetas». */
var RECIPES = (window.RECIPES || []).slice().sort(function (a, b) { return a.num < b.num ? -1 : a.num > b.num ? 1 : 0; });

/* ============================================================
   Código de la página (no hace falta tocarlo)
   ============================================================ */
var APP = document.getElementById('app');
var ORN = '<div class="orn" aria-hidden="true"><span></span><svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 3l1.9 7.1L21 12l-7.1 1.9L12 21l-1.9-7.1L3 12l7.1-1.9z" fill="currentColor"/></svg><span></span></div>';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


/* ---- Ajuste de cantidades ---- */
var SCALE = 1;
var PRESETS = [[0.5, '½'], [1, '1'], [1.5, '1½'], [2, '2'], [3, '3']];

function num(n, dec) {
  var f = Math.pow(10, dec);
  return String(Math.round(n * f) / f).replace('.', ',');
}
function halves(n) {
  var r = Math.round(n * 2) / 2, w = Math.floor(r);
  return (r - w ? (w ? w : '') + '½' : String(w));
}
function plural(n, one, many) { return n > 1 ? many : one; }

/* escala las cantidades con unidad (g, kg, gotas, cucharadas, huevos) */
function sc(text) {
  if (SCALE === 1) return text;
  return String(text).replace(/(\d+(?:,\d+)?)(\s?)(kg|g|gotas?|cucharaditas?|cucharadas?|huevos?)(?![A-Za-zÁÉÍÓÚáéíóúñ])/g, function (m, n, sp, u) {
    var v = parseFloat(n.replace(',', '.')) * SCALE;
    if (u === 'g') return (v >= 10 ? num(v, 0) : num(v, 1)) + sp + 'g';
    if (u === 'kg') return num(v, 2) + sp + 'kg';
    var base = u.replace(/s$/, '');
    var forms = { gota: 'gotas', cucharada: 'cucharadas', cucharadita: 'cucharaditas', huevo: 'huevos' };
    var h = Math.round(v * 2) / 2;
    return halves(v) + sp + (h > 1 ? forms[base] : base);
  });
}
/* "2 (112 g)": el número suelto de huevos */
function scQty(q) {
  if (SCALE === 1) return q;
  var m = q.match(/^(\d+) \((.*)\)$/);
  if (m) return halves(parseInt(m[1], 10) * SCALE) + ' (' + sc(m[2]) + ')';
  return sc(q);
}

function qty(q) {
  return '<span class="q' + (/por confirmar/.test(q) ? ' tbc' : '') + '">' + esc(scQty(q)) + '</span>';
}

function ingList(items) {
  return '<ul class="ing">' + items.map(function (i) {
    return '<li><span class="n">' + esc(i[0]) + '</span><span class="dots"></span>' + qty(i[1]) + '</li>';
  }).join('') + '</ul>';
}

function badge(n) { return '<span class="mix-n m' + n + '" aria-hidden="true">' + n + '</span>'; }

function group(g) {
  return '<div class="grp' + (g.n ? ' mix m' + g.n : '') + '"><h4>' +
    (g.n ? badge(g.n) + '<span class="vh">Mezcla ' + g.n + ': </span>' : '') + esc(g.title) + '</h4>' +
    (g.note ? '<p class="note">' + esc(g.note) + '</p>' : '') +
    (g.items ? ingList(g.items) : '') +
    (g.text ? '<p>' + esc(g.text) + '</p>' : '') + '</div>';
}

function ingredientBlock(b) {
  return '<h3 class="sub">' + esc(b.heading) + '</h3>' +
    (b.intro ? '<p class="intro">' + esc(sc(b.intro)) + '</p>' : '') +
    '<div class="' + (b.cols === 2 ? 'grid2' : '') + '">' + b.groups.map(group).join('') + '</div>';
}

function steps(list) {
  return '<ol class="steps">' + list.map(function (s) {
    return '<li><div><strong>' + (s[2] ? badge(s[2]) : '') + esc(s[0]) + '</strong><p>' + esc(s[1]) + '</p></div></li>';
  }).join('') + '</ol>';
}

function stack(st) {
  return '<div class="stack" role="img" aria-label="' + esc(st.label) + '">' +
    st.items.map(function (it) {
      return it[0] === 'fr' ? '<div class="fr">' + esc(it[2]) + '</div>' : '<div class="lay ' + it[1] + '">' + esc(it[2]) + '</div>';
    }).join('') + '</div>' +
    '<p class="stack-cap">' + esc(st.caption) + '</p>';
}

function homeView() {
  return '<section class="hero"><div class="snow" aria-hidden="true"></div><div class="wrap narrow center">' +
    '<h1 tabindex="-1">Curso de turrón artesano</h1>' +
    '<p class="sub">Las recetas del curso, paso a paso y con todos los detalles.</p>' + ORN +
    '</div></section>' +
    '<section class="wrap"><h2 class="vh">Recetas</h2><ol class="cards">' +
    RECIPES.map(card).join('') + '</ol></section>';
}

function card(r) {
  if (r.ready) {
    return '<li><a class="card" href="#/receta/' + r.id + '"><span class="num">' + r.num + '</span><h3>' + esc(r.title) + '</h3><p>' + esc(r.short) + '</p><span class="tag">Ver receta →</span></a></li>';
  }
  return '<li><div class="card soon"><span class="num">' + r.num + '</span><h3>' + esc(r.title) + '</h3><span class="tag">Próximamente</span></div></li>';
}


function scalerView() {
  var isPreset = PRESETS.some(function (p) { return p[0] === SCALE; });
  var note = SCALE !== 1
    ? '<p class="scale-note" role="status">Cantidades ×' + num(SCALE, 2) + '<small>Los tiempos y las temperaturas no cambian.</small></p>'
    : '';
  return '<div class="scaler" role="group" aria-label="Ajustar cantidades"><span class="scaler-t">Ajustar cantidades</span>' +
    '<div class="scaler-b">' + PRESETS.map(function (p) {
      return '<button type="button" data-scale="' + p[0] + '" aria-pressed="' + (p[0] === SCALE) + '" aria-label="Multiplicar por ' + p[1] + '">×' + p[1] + '</button>';
    }).join('') + '</div>' +
    '<label class="scaler-c">Otro factor ×<input type="text" inputmode="decimal" autocomplete="off" data-scale-input value="' +
    (isPreset ? '' : num(SCALE, 2)) + '" placeholder="1,25" aria-label="Otro factor de multiplicación"></label>' +
    note + '</div>';
}

function setScale(r, v, focus) {
  if (!(v > 0)) return;
  SCALE = Math.min(20, Math.max(0.1, v));
  var y = window.scrollY;
  APP.innerHTML = recipeView(r);
  bindRecipe(r);
  window.scrollTo(0, y);
  if (focus) { var el = APP.querySelector(focus); if (el && el.focus) el.focus({ preventScroll: true }); }
}

function bindRecipe(r) {
  var b = APP.querySelector('[data-print]');
  if (b) b.addEventListener('click', function () { window.print(); });
  Array.prototype.forEach.call(APP.querySelectorAll('[data-scale]'), function (btn) {
    btn.addEventListener('click', function () {
      var v = parseFloat(btn.getAttribute('data-scale'));
      setScale(r, v, '[data-scale="' + v + '"]');
    });
  });
  var inp = APP.querySelector('[data-scale-input]');
  if (inp) inp.addEventListener('change', function () {
    var v = parseFloat(inp.value.replace(',', '.'));
    if (v > 0) setScale(r, v, '[data-scale-input]'); else inp.value = '';
  });
}

function recipeView(r) {
  var ready = RECIPES.filter(function (x) { return x.ready; });
  var i = ready.indexOf(r), prev = ready[i - 1], next = ready[i + 1];
  var pager = '<nav class="pager" aria-label="Más recetas"><span>' +
    (prev ? '<a href="#/receta/' + prev.id + '">← ' + esc(prev.title) + '</a>' : '') + '</span>' +
    '<a href="#/">Todas las recetas</a><span>' +
    (next ? '<a href="#/receta/' + next.id + '">' + esc(next.title) + ' →</a>' : '') + '</span></nav>';

  return '<article class="wrap narrow recipe">' +
    '<a class="back" href="#/">← Todas las recetas</a>' +
    '<header class="r-head"><p class="kicker">Receta ' + r.num + '</p><h1 tabindex="-1">' + esc(r.title) + '</h1>' +
    '<p class="lead">' + esc(r.lead) + '</p>' + ORN +
    (r.meta && r.meta.length ? '<ul class="meta">' + r.meta.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ul>' : '') +
    '<button class="print" type="button" data-print>Imprimir receta</button>' + scalerView() + '</header>' +
    '<section><h2>Ingredientes</h2>' + r.ingredients.map(ingredientBlock).join('') + '</section>' +
    '<section><h2>' + esc(r.prepTitle || 'Preparación del mazapán base') + '</h2>' + steps(r.prep) + '</section>' +
    '<section><h2>' + esc(r.assemblyTitle || 'Montaje de las capas') + '</h2>' + (r.stack ? stack(r.stack) : '') + steps(r.assembly) +
    (r.confit ? '<div class="aside"><strong>' + esc(r.confit[0]) + '</strong><p>' + esc(sc(r.confit[1])) + '</p></div>' : '') + '</section>' +
    (r.extra || []).map(function (x) { return '<section><h2>' + esc(x.title) + '</h2>' + steps(x.steps) + '</section>'; }).join('') +
    (r.tips && r.tips.length ? '<section><h2>Trucos del curso</h2><ul class="tips">' +
    r.tips.map(function (t) { return '<li><b>' + esc(t[0]) + '</b> ' + esc(sc(t[1])) + '</li>'; }).join('') + '</ul></section>' : '') +
    (r.pending && r.pending.length ? '<details class="pending"><summary>Notas pendientes del curso</summary><ul>' +
    r.pending.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></details>' : '') +
    pager + '</article>';
}

function startSnow(el, count) {
  if (!el) return;
  el.innerHTML = '';
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var html = '';
  for (var k = 0; k < count; k++) {
    var s = 2 + Math.random() * 3;
    html += '<i style="left:' + (Math.random() * 100).toFixed(1) + '%;width:' + s.toFixed(1) + 'px;height:' + s.toFixed(1) +
      'px;animation-duration:' + (9 + Math.random() * 10).toFixed(1) + 's;animation-delay:' + (-Math.random() * 14).toFixed(1) +
      's;--dx:' + Math.round(Math.random() * 40 - 20) + 'px"></i>';
  }
  el.innerHTML = html;
}

var LAST = null;
function route() {
  var m = location.hash.match(/^#\/receta\/([\w-]+)$/);
  var r = null;
  if (m) {
    r = RECIPES.filter(function (x) { return x.id === m[1] && x.ready; })[0] || null;
  }
  if (!r || r.id !== LAST) SCALE = 1;
  LAST = r ? r.id : null;
  APP.innerHTML = r ? recipeView(r) : homeView();
  document.title = (r ? r.title + ' · ' : '') + 'Curso de turrón artesano · Silvia Blanco';
  window.scrollTo(0, 0);
  var h = APP.querySelector('h1');
  if (h && h.focus) h.focus({ preventScroll: true });
  if (r) bindRecipe(r);
  startSnow(document.getElementById('snowPage'), r ? 16 : 0);
  if (!r) startSnow(APP.querySelector('.snow'), 18);
}


/* ---- Contacto ---- */
(function () {
  var dlg = document.getElementById('contact');
  var opener = null;
  function build() {
    /* el correo se monta al abrir, para que no lo recojan los robots */
    var mail = ['hola', 'silviablanco.com'].join('@');
    var tel = '+34649683744';
    dlg.querySelector('.contact-in').innerHTML =
      '<h2 id="contact-t">Datos de contacto</h2><p class="who">Silvia Blanco</p>' + ORN +
      '<div class="contact-btns">' +
      '<a class="main" href="tel:' + tel + '"><b>Llamar</b>+34 649 68 37 44</a>' +
      '<a href="https://wa.me/34649683744" target="_blank" rel="noopener"><b>WhatsApp</b>+34 649 68 37 44</a>' +
      '<a href="mailto:' + mail + '"><b>Enviar email</b>' + mail + '</a></div>';
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-contact]') : null;
    if (t) {
      opener = t; build();
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
      return;
    }
    if (e.target === dlg && dlg.close) dlg.close();   /* clic fuera de la tarjeta */
  });
  dlg.addEventListener('close', function () { if (opener) opener.focus(); });
})();

window.addEventListener('hashchange', route);
route();
