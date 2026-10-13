/* Affiche le catalogue décrit par apps.json, avec filtre par catégorie (la page marche aussi sans JavaScript). */
(function () {
  'use strict';
  var list = document.getElementById('list');
  var filters = document.getElementById('filters');
  var count = document.getElementById('count');
  if (!list || !window.fetch) return;

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    (children || []).forEach(function (c) { e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }
  function safeURL(u) { return /^https:\/\/[a-z0-9-]+\.vialet\.app(\/|$)/i.test(u) ? u : null; }
  function safeColor(c) { return /^#[0-9a-f]{6}$/i.test(c || '') ? c : '#888888'; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function row(app, index) {
    var available = app.status === 'available' && safeURL(app.url);
    var attrs = { 'class': 'row' + (available ? '' : ' off'), style: '--c:' + safeColor(app.color) };
    if (available) attrs.href = safeURL(app.url);
    var who = el('span', { 'class': 'who' }, [
      el('img', { src: app.icon || '', width: '48', height: '48', alt: '' }),
      el('span', {}, [el('b', {}, [app.name]), el('small', {}, [app.tagline || ''])])
    ]);
    var state = el('span', { 'class': 'state' + (available ? '' : ' soon') }, [el('i', { 'class': 'dot' }), available ? 'Disponible' : 'Bientôt']);
    return el(available ? 'a' : 'div', attrs, [
      el('span', { 'class': 'num' }, [pad(index + 1)]), who,
      el('span', { 'class': 'cat' }, [app.category || '']), state,
      el('span', { 'class': 'go', 'aria-hidden': 'true' }, [available ? '↗' : ''])
    ]);
  }

  function render(apps, category) {
    var shown = apps.filter(function (a) { return !category || a.category === category; });
    list.textContent = '';
    shown.forEach(function (a, i) { list.appendChild(row(a, i)); });
    count.textContent = shown.length + (shown.length > 1 ? ' apps' : ' app');
  }

  fetch('/apps.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (apps) {
      if (!Array.isArray(apps) || !apps.length) return;
      var cats = [];
      apps.forEach(function (a) { if (a.category && cats.indexOf(a.category) < 0) cats.push(a.category); });
      render(apps, null);
      if (cats.length > 1) {
        filters.hidden = false;
        ['Tout'].concat(cats).forEach(function (c, i) {
          var b = el('button', { type: 'button', 'aria-pressed': i === 0 ? 'true' : 'false' }, [c]);
          b.addEventListener('click', function () {
            filters.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
            b.setAttribute('aria-pressed', 'true');
            render(apps, i === 0 ? null : c);
          });
          filters.appendChild(b);
        });
      }
    })
    .catch(function () { /* on garde la version statique */ });
})();
