/* ============================================================
   MODO NOA
   - Interruptor en la cabecera y en el pie. Se recuerda en este navegador.
   - Se ve siempre con el aspecto de Navidad.
   - Las recetas se siguen "un paso cada vez", con casillas para marcar
     ingredientes y pasos hechos, y una señal de peligro en los pasos
     que queman o cortan.
   Este archivo se carga después de navidad.js y antes de app.js.
   ============================================================ */
(function () {
  var KEY = 'turron-noa';
  function saved() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function save(on) { try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) {} }
  function isOn() { return document.body.classList.contains('noa'); }

  /* pasos que queman o cortan: se detectan por lo que dicen (calor, horno, microondas, cuchillas…) */
  var DANGER = /\b(?:[5-9]\d|\d{3})\s?°\s?C|microondas|horno|fuego|baño mar[ií]a|cuchillo|hierv|caliente|termómetro de caramelo|cuece|cocer|cocción|freír|escald|cortar|corta |troce|tritura|picar|batidora|procesadora|robot/i;
  function risky(text) { return DANGER.test(text); }
  var WARN = '<span class="ng-danger" role="note"><span aria-hidden="true">⚠️</span> ¡Cuidado! Pídele ayuda a un adulto.</span>';

  /* ---- casillas de ingredientes ---- */
  var CHK = {};
  function recipeId() { var m = location.hash.match(/^#\/(?:receta|extra)\/([\w-]+)/); return m ? m[1] : ''; }
  function scope(el) {
    var d = el.closest ? el.closest('dialog.xdlg') : null;
    if (d) { var t = d.querySelector('.xtitle'); return t ? t.id : 'x'; }
    return recipeId();
  }
  function keyOf(li) {
    var g = li.closest ? li.closest('.grp') : null, h = g && g.querySelector('h4');
    var n = li.querySelector('.n');
    return scope(li) + '|' + (h ? h.textContent : '') + '|' + (n ? n.textContent : li.textContent);
  }

  /* ---- repasa un trozo de página: señal de peligro y casillas ---- */
  window.noaScan = function (root) {
    if (!isOn() || !root) return;
    var i, steps = root.querySelectorAll('.steps li');
    for (i = 0; i < steps.length; i++) {
      var li = steps[i];
      if (li.classList.contains('danger') || !risky(li.textContent)) continue;
      li.classList.add('danger');
      var s = li.querySelector('strong');
      if (s) s.insertAdjacentHTML('afterend', WARN);
    }
    var ing = root.querySelectorAll('.ing li');
    for (i = 0; i < ing.length; i++) {
      ing[i].setAttribute('role', 'checkbox');
      ing[i].setAttribute('tabindex', '0');
      var done = !!CHK[keyOf(ing[i])];
      ing[i].classList.toggle('done', done);
      ing[i].setAttribute('aria-checked', String(done));
    }
  };

  function toggleIng(li) {
    var k = keyOf(li), on = !CHK[k];
    CHK[k] = on;
    li.classList.toggle('done', on);
    li.setAttribute('aria-checked', String(on));
  }

  /* ---- "un paso cada vez" ---- */
  var ST = { id: '', i: 0 };
  var ITEMS = [];

  function guideHTML() {
    var n = ITEMS.length, i = ST.i;
    if (i >= n) {
      return '<div class="ng-end"><p class="ng-big" aria-hidden="true">🎉🎄</p><h3>¡Lo has conseguido!</h3><p>Has terminado todos los pasos.</p>' +
        '<div class="ng-btns"><button type="button" data-ng="restart">Empezar otra vez</button><button type="button" data-ng="prev">← Volver al último paso</button></div></div>';
    }
    var it = ITEMS[i], pct = Math.round(i / n * 100);
    return '<div class="ng-top"><span class="ng-count">Paso ' + (i + 1) + ' de ' + n + '</span><span class="ng-sec">' + it.sec + '</span></div>' +
      '<div class="ng-bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + n + '" aria-valuenow="' + i + '"><i style="width:' + pct + '%"></i></div>' +
      '<h3 class="ng-title">' + it.title + '</h3>' + (it.danger ? WARN : '') +
      '<div class="ng-text">' + it.text + '</div>' +
      '<div class="ng-btns">' + (i > 0 ? '<button type="button" data-ng="prev">← Anterior</button>' : '<span></span>') +
      '<button type="button" class="ng-next" data-ng="next">' + (i === n - 1 ? '✓ ¡Terminado!' : '✓ Hecho, siguiente →') + '</button></div>';
  }

  function paint(scroll) {
    var g = document.querySelector('#app .noa-guide');
    if (!g) return;
    g.innerHTML = guideHTML();
    if (scroll) {
      var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      g.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
    }
  }

  window.noaRecipe = function (r) {
    var old = document.querySelector('#app .noa-guide'); if (old) old.parentNode.removeChild(old);
    if (!isOn() || !r) return;
    var lists = document.querySelectorAll('#app .recipe ol.steps');
    if (!lists.length) { window.noaScan(document.getElementById('app')); return; }
    ITEMS = [];
    Array.prototype.forEach.call(lists, function (ol) {
      var sec = ol.closest('section'), h2 = sec && sec.querySelector('h2');
      Array.prototype.forEach.call(ol.children, function (li) {
        var st = li.querySelector('strong'), p = li.querySelector('p');
        ITEMS.push({ sec: h2 ? h2.innerHTML : '', title: st ? st.innerHTML : '', text: p ? p.innerHTML : '', danger: risky(li.textContent) });
      });
    });
    if (ST.id !== r.id) { ST.id = r.id; ST.i = 0; }
    if (ST.i > ITEMS.length) ST.i = 0;
    var box = document.createElement('div');
    box.className = 'noa-guide';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Paso a paso');
    lists[0].parentNode.insertBefore(box, lists[0]);
    Array.prototype.forEach.call(lists, function (ol) { ol.classList.add('noa-hidden'); });
    paint(false);
    window.noaScan(document.getElementById('app'));
  };

  /* ---- clics ---- */
  document.addEventListener('click', function (e) {
    var t = e.target;
    var sw = t.closest ? t.closest('[data-noa]') : null;
    if (sw) {
      var on = !isOn();
      save(on);
      apply(on);
      var y = window.scrollY;
      if (window.xmasApply) window.xmasApply();
      if (window.refreshView) window.refreshView();
      window.scrollTo(0, y);
      var again = document.querySelector('.noa-toggle');
      if (again && again.focus) again.focus({ preventScroll: true });
      return;
    }
    var b = t.closest ? t.closest('[data-ng]') : null;
    if (b) {
      var a = b.getAttribute('data-ng');
      if (a === 'next') ST.i = Math.min(ITEMS.length, ST.i + 1);
      else if (a === 'prev') ST.i = ST.i >= ITEMS.length ? ITEMS.length - 1 : Math.max(0, ST.i - 1);
      else if (a === 'restart') ST.i = 0;
      paint(true);
      return;
    }
    var li = isOn() && t.closest ? t.closest('.ing li') : null;
    if (li) toggleIng(li);
  });
  document.addEventListener('keydown', function (e) {
    if ((e.key === ' ' || e.key === 'Enter') && isOn() && e.target.matches && e.target.matches('.ing li')) {
      e.preventDefault(); toggleIng(e.target);
    }
  });

  /* ---- aplicar ---- */
  function apply(on) {
    document.body.classList.toggle('noa', on);
    var all = document.querySelectorAll('[data-noa]');
    for (var i = 0; i < all.length; i++) {
      if (all[i].getAttribute('role') === 'switch') all[i].setAttribute('aria-checked', String(on));
      if (all[i].classList.contains('contact-open')) all[i].textContent = on ? 'Quitar modo Noa' : 'Activar modo Noa';
    }
  }
  apply(saved());
})();
