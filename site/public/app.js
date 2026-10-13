/* Affiche le catalogue décrit par apps.json (la page fonctionne aussi sans JavaScript). */
(function () {
  'use strict';
  var root = document.getElementById('catalog');
  if (!root || !window.fetch) return;

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    (children || []).forEach(function (c) { e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }

  function safeURL(u) { return /^https:\/\/[a-z0-9-]+\.vialet\.app(\/|$)/i.test(u) ? u : '#'; }

  fetch('/apps.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (apps) {
      if (!Array.isArray(apps) || !apps.length) return;
      var cards = apps.map(function (a) {
        var available = a.status === 'available';
        var h2 = el('h2', {}, [a.name, ' ', el('span', { 'class': 'badge ' + (available ? 'ok' : 'soon') }, [available ? 'Disponible' : 'Bientôt'])]);
        var body = el('div', {}, [h2, el('p', {}, [a.tagline || '']), el('span', { 'class': 'meta' }, [(a.platform || 'macOS') + ' · Gratuit'])]);
        var link = el('a', { 'class': 'app', href: available ? safeURL(a.url) : '#', style: '--c:' + (/^#[0-9a-f]{6}$/i.test(a.color) ? a.color : '#F0A020') },
          [el('img', { src: a.icon || '', width: '64', height: '64', alt: '' }), body, el('span', { 'class': 'go', 'aria-hidden': 'true' }, ['→'])]);
        if (!available) { link.removeAttribute('href'); link.style.pointerEvents = 'none'; }
        return link;
      });
      root.textContent = '';
      cards.forEach(function (c) { root.appendChild(c); });
    })
    .catch(function () { /* on garde la version statique */ });
})();
