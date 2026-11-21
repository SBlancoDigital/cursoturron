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


/* ---- Recetas extra: enlaces [[id|texto]] dentro de los textos ---- */
var EXTRAS = window.EXTRAS || {};
Object.keys(EXTRAS).forEach(function (k) { EXTRAS[k].id = k; });
var XBASE = '#/';                      /* ruta de la receta (o ventana) que se está dibujando */
function lk(s) {
  return esc(s).replace(/\[\[([\w-]+)\|([^\]]+)\]\]/g, function (m, id, label) {
    return EXTRAS[id] ? '<a class="xlink" href="' + XBASE + '/' + id + '">' + label + '</a>' : label;
  });
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
    return '<li><span class="n">' + lk(i[0]) + '</span><span class="dots"></span>' + qty(i[1]) + '</li>';
  }).join('') + '</ul>';
}

function badge(n) { return '<span class="mix-n m' + n + '" aria-hidden="true">' + n + '</span>'; }

function group(g) {
  return '<div class="grp' + (g.n ? ' mix m' + g.n : '') + '"><h4>' +
    (g.n ? badge(g.n) + '<span class="vh">Mezcla ' + g.n + ': </span>' : '') + esc(g.title) + '</h4>' +
    (g.note ? '<p class="note">' + esc(sc(g.note)) + '</p>' : '') +
    (g.items ? ingList(g.items) : '') +
    (g.text ? '<p>' + lk(g.text) + '</p>' : '') + '</div>';
}

function ingredientBlock(b) {
  return '<h3 class="sub">' + esc(b.heading) + '</h3>' +
    (b.intro ? '<p class="intro">' + esc(sc(b.intro)) + '</p>' : '') +
    '<div class="' + (b.cols === 2 ? 'grid2' : '') + '">' + b.groups.map(group).join('') + '</div>';
}

function steps(list) {
  return '<ol class="steps">' + list.map(function (s) {
    return '<li><div><strong>' + (s[2] ? badge(s[2]) : '') + esc(s[0]) + '</strong><p>' + lk(sc(s[1])) + '</p></div></li>';
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
    (window.xmasToggle ? window.xmasToggle() : '') +
    '</div>' + (window.xmasScene ? window.xmasScene() : '') + '</section>' +
    '<section class="wrap"><h2 class="vh">Recetas</h2><ol class="cards">' +
    RECIPES.map(card).join('') + '</ol></section>' + extrasHome();
}

var HOMEX = { id: '', title: 'Todas las recetas', base: '#/extra', uses: {}, home: true };
function extrasHome() {
  var ids = Object.keys(EXTRAS);
  if (!ids.length) return '';
  return '<section class="wrap xhome"><h2>Recetas extra</h2>' +
    '<p class="xhome-i">Las preparaciones que se usan dentro de los turrones, para consultarlas sin entrar en cada uno.</p>' +
    '<ul class="xgrid">' + ids.map(function (id) {
      var e = EXTRAS[id];
      return '<li><a class="xcard" href="#/extra/' + id + '"><strong>' + esc(e.title.replace(/ \(.*\)$/, '')) + '</strong>' +
        '<span>' + (e.kind === 'free' ? 'Cantidad libre' : 'Ligada a la cantidad del turrón') + '</span></a></li>';
    }).join('') + '</ul></section>';
}

function card(r) {
  if (r.ready) {
    return '<li><a class="card" href="#/receta/' + r.id + '"><span class="num">' + r.num + '</span><h3>' + esc(r.title) + '</h3><p>' + esc(r.short) + '</p><span class="tag">Ver receta →</span>' + (window.xmasBall ? window.xmasBall(r) : '') + '</a></li>';
  }
  return '<li><div class="card soon"><span class="num">' + r.num + '</span><h3>' + esc(r.title) + '</h3><span class="tag">Próximamente</span>' + (window.xmasBall ? window.xmasBall(r) : '') + '</div></li>';
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

function extrasBar(r) {
  var list = (r.extras || []).filter(function (id) { return EXTRAS[id]; });
  if (!list.length) return '';
  return '<nav class="xbar" aria-label="Recetas extra de esta receta"><span class="xbar-t">Recetas extra</span><ul>' +
    list.map(function (id) { return '<li><a class="xlink" href="' + XBASE + '/' + id + '">' + esc(EXTRAS[id].title.replace(/ \(.*\)$/, '')) + '</a></li>'; }).join('') + '</ul></nav>';
}

function recipeView(r) {
  XBASE = '#/receta/' + r.id;
  var ready = RECIPES.filter(function (x) { return x.ready; });
  var i = ready.indexOf(r), prev = ready[i - 1], next = ready[i + 1];
  var pager = '<nav class="pager" aria-label="Más recetas"><span>' +
    (prev ? '<a href="#/receta/' + prev.id + '">← ' + esc(prev.title) + '</a>' : '') + '</span>' +
    '<a href="#/">Todas las recetas</a><span>' +
    (next ? '<a href="#/receta/' + next.id + '">' + esc(next.title) + ' →</a>' : '') + '</span></nav>';

  return '<article class="wrap narrow recipe">' +
    '<header class="r-head"><h1 tabindex="-1">' + esc(r.title) + '</h1><p class="kicker">Receta ' + r.num + '</p>' +
    (r.origin ? '<p class="origin">Receta original que utilizaba ' + esc(r.origin) + '</p>' : '') +
    (r.lead ? '<p class="lead">' + esc(r.lead) + '</p>' : '') + ORN +
    (r.meta && r.meta.length ? '<ul class="meta">' + r.meta.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ul>' : '') +
    '<div class="r-tools">' + scalerView() + '<button class="print" type="button" data-print>Imprimir receta</button></div></header>' +
    extrasBar(r) +
    '<section><h2>Ingredientes</h2>' + r.ingredients.map(ingredientBlock).join('') + '</section>' +
    '<section><h2>' + esc(r.prepTitle || 'Preparación del mazapán base') + '</h2>' + steps(r.prep) + '</section>' +
    ((r.assembly || r.stack || r.confit) ? '<section><h2>' + esc(r.assemblyTitle || 'Montaje de las capas') + '</h2>' + (r.stack ? stack(r.stack) : '') + (r.assembly ? steps(r.assembly) : '') +
    (r.confit ? '<div class="aside"><strong>' + esc(r.confit[0]) + '</strong><p>' + lk(sc(r.confit[1])) + '</p></div>' : '') + '</section>' : '') +
    (r.extra || []).map(function (x) { return '<section><h2>' + esc(x.title) + '</h2>' + (x.photo ? '<figure class="photo"><img src="' + esc(x.photo.src) + '" alt="' + esc(x.photo.alt) + '" loading="lazy"><figcaption>' + esc(x.photo.caption) + '</figcaption></figure>' : '') + steps(x.steps) + '</section>'; }).join('') +
    (r.tips && r.tips.length ? '<section><h2>Trucos del curso</h2><ul class="tips">' +
    r.tips.map(function (t) { return '<li><b>' + esc(t[0]) + '</b> ' + lk(sc(t[1])) + '</li>'; }).join('') + '</ul></section>' : '') +
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

/* ---- Ventanas de recetas extra (se abren encima y, al cerrarlas, sigues donde estabas) ---- */
var XSTACK = [];          /* [{id, dlg, opener}] */
var XPUSHED = 0;          /* ventanas abiertas por el usuario en esta receta (para volver atrás) */

function chain(r, ids) {   /* factor de cantidades de cada ventana, según lo que gasta el nivel de abajo */
  var f = SCALE, parent = r, out = [];
  ids.forEach(function (id) {
    var e = EXTRAS[id], use = (parent.uses && parent.uses[id]) || {}, pf = f, need = null;
    if (e.kind === 'free') { f = 1; }
    else if (use.need && e.yield) { need = use.need * pf; f = need / e.yield; }
    else { f = pf * (use.k || 1); }
    out.push({ e: e, f: f, pf: pf, need: need });
    parent = e;
  });
  return out;
}

function xmsg(c, parentTitle) {
  if (c.e.kind === 'free') return 'Cantidad libre: haz la que necesites.';
  if (parentTitle === null) return 'Cantidades de la receta base. Para ajustarlas a tu turrón, ábrela desde la propia receta.';
  if (c.need) return 'Cantidades ajustadas a tu turrón: te hacen falta ' + num(c.need, c.need >= 10 ? 0 : 1) + ' g de ' + c.e.title.toLowerCase() + '.';
  return 'Cantidades ajustadas a tu ' + parentTitle + (c.pf !== 1 ? ' (×' + num(c.pf, 2) + ')' : '') + '.';
}

function extraBody(c, base, parentTitle) {
  var e = c.e, keep = SCALE, keepBase = XBASE;
  SCALE = c.f; XBASE = base;
  var html =
    '<p class="xmsg ' + (e.kind === 'free' ? 'free' : 'linked') + '" role="status">' + esc(xmsg(c, parentTitle)) + '</p>' +
    '<h2 class="xtitle" id="xt-' + e.id + '" tabindex="-1">' + esc(e.title) + '</h2>' +
    (e.lead ? '<p class="lead">' + esc(e.lead) + '</p>' : '') +
    (e.ingredients || []).map(function (b) {
      var cp = Object.assign({}, b, { groups: b.groups.map(function (g) { return Object.assign({}, g, { note: g.note }); }) });
      return ingredientBlock(cp).replace(/^<h3 class="sub">[^<]*<\/h3>/, b.heading === e.title.replace(/ \(.*\)$/, '') || e.title.indexOf(b.heading) === 0 ? '' : '$&');
    }).join('') +
    '<h3 class="sub">Preparación</h3>' + steps(e.prep) +
    (e.aside ? '<div class="aside"><strong>' + esc(e.aside[0]) + '</strong><p>' + lk(sc(e.aside[1])) + '</p></div>' : '') +
    (e.tips && e.tips.length ? '<h3 class="sub">Trucos del curso</h3><ul class="tips">' + e.tips.map(function (t) { return '<li><b>' + esc(t[0]) + '</b> ' + lk(sc(t[1])) + '</li>'; }).join('') + '</ul>' : '');
  SCALE = keep; XBASE = keepBase;
  return html;
}

function parentHash(ids, n) { return '#/receta/' + ids.slice(0, 1)[0] + (n ? '/' + ids.slice(1, n + 1).join('/') : ''); }

function closeTop() {
  if (!XSTACK.length) return;
  if (XPUSHED > 0) { history.back(); return; }
  var m = location.hash.match(/^(#\/receta\/[\w-]+(?:\/[\w-]+)*)\/[\w-]+$/);
  location.replace(m ? m[1] : '#/');
}

function openDialog(r, ids, i, c) {
  var base = (r.base || '#/receta/' + r.id) + (i ? '/' + ids.slice(0, i).join('/') : '') + '/' + ids[i];
  var parentTitle = i === 0 ? (r.home ? null : r.id === 'pan-de-cadiz' ? 'Pan de Cádiz' : 'turrón') : EXTRAS[ids[i - 1]].title.toLowerCase();
  var backLabel = i === 0 ? r.title : EXTRAS[ids[i - 1]].title.replace(/ \(.*\)$/, '');
  var dlg = document.createElement('dialog');
  dlg.className = 'xdlg';
  dlg.setAttribute('aria-labelledby', 'xt-' + ids[i]);
  dlg.innerHTML =
    '<div class="xin"><div class="xhead"><button type="button" class="xback" data-xclose>← Volver a ' + esc(backLabel) + '</button>' +
    '<button type="button" class="xx" data-xclose aria-label="Cerrar">×</button></div>' +
    '<div class="xbody">' + extraBody(c, base, parentTitle) + '</div>' +
    '<div class="xfoot"><button type="button" class="print" data-xprint>Imprimir esta receta</button> <button type="button" class="xback" data-xclose>← Volver a ' + esc(backLabel) + '</button></div></div>';
  dlg.addEventListener('cancel', function (ev) { ev.preventDefault(); closeTop(); });
  dlg.addEventListener('click', function (ev) {
    if (ev.target === dlg) { closeTop(); return; }
    var b = ev.target.closest ? ev.target.closest('[data-xclose]') : null;
    if (b) { closeTop(); return; }
    var p = ev.target.closest ? ev.target.closest('[data-xprint]') : null;
    if (p) window.print();
  });
  document.body.appendChild(dlg);
  var opener = document.activeElement;
  if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  var t = dlg.querySelector('.xtitle'); if (t) t.focus({ preventScroll: true });
  return { id: ids[i], dlg: dlg, opener: opener };
}

function syncExtras(r, ids) {
  ids = ids.filter(function (id, i) { return EXTRAS[id] && (i === 0 || true); });
  var cs = chain(r, ids), keep = 0;
  while (keep < XSTACK.length && keep < ids.length && XSTACK[keep].id === ids[keep]) keep++;
  while (XSTACK.length > keep) {
    var x = XSTACK.pop();
    if (x.dlg.close) x.dlg.close(); x.dlg.remove();
    if (!XSTACK.length && x.opener && x.opener.focus && document.contains(x.opener)) x.opener.focus({ preventScroll: true });
  }
  for (var i = keep; i < ids.length; i++) XSTACK.push(openDialog(r, ids, i, cs[i]));
  XPUSHED = Math.min(XPUSHED, ids.length);
  document.body.classList.toggle('xopen', ids.length > 0);
  if (XSTACK.length) XSTACK.forEach(function (x, j) { x.dlg.classList.toggle('xtop', j === XSTACK.length - 1); });
}

document.addEventListener('click', function (e) {
  var a = e.target.closest ? e.target.closest('a.xlink') : null;
  if (a) XPUSHED++;
});

var LAST = null;
function route() {
  var m = location.hash.match(/^#\/receta\/([\w-]+)((?:\/[\w-]+)*)$/);
  var ids = m ? m[2].split('/').filter(Boolean) : [];
  var mx = location.hash.match(/^#\/extra((?:\/[\w-]+)+)$/);
  if (mx) ids = mx[1].split('/').filter(Boolean);
  var r = null;
  if (m) {
    r = RECIPES.filter(function (x) { return x.id === m[1] && x.ready; })[0] || null;
  }
  if (r && r.id === LAST && APP.querySelector('.recipe')) {   /* misma receta: solo cambian las ventanas */
    syncExtras(r, ids);
    return;
  }
  if (mx && LAST === null && APP.querySelector('.hero')) {   /* ya estamos en la portada: solo cambian las ventanas */
    syncExtras(HOMEX, ids);
    return;
  }
  syncExtras(r || HOMEX, []);
  XPUSHED = 0;
  if (!r || r.id !== LAST) SCALE = 1;
  LAST = r ? r.id : null;
  APP.innerHTML = r ? recipeView(r) : homeView();
  var bt = document.querySelector('.back-top');
  if (bt) bt.hidden = !r;
  document.title = (r ? r.title + ' · ' : '') + 'Curso de turrón artesano · Silvia Blanco';
  window.scrollTo(0, 0);
  var h = APP.querySelector('h1');
  if (h && h.focus) h.focus({ preventScroll: true });
  if (r) bindRecipe(r);
  if (r && ids.length) syncExtras(r, ids);
  if (!r && mx) syncExtras(HOMEX, ids);
  var xm = document.body.classList.contains('navidad');
  startSnow(document.getElementById('snowPage'), r ? (xm ? 30 : 16) : 0);
  if (!r) startSnow(APP.querySelector('.snow'), xm ? 46 : 18);
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
