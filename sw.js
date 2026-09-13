const CACHE_NAME = 'myanmar-hub-v6.2';
const urlsToCache = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './roof.html',
  './concrete.html',
  './brick.html',
  './paint.html',
  './tile.html',
  './wood.html',
  './converter.html',
  './notes.html',
  './more.html',
  './fonts/padauk.woff2',
  './webfonts/fa-solid-900.woff2',
  './webfonts/fa-regular-400.woff2',
  './webfonts/fa-brands-400.woff2'
];

// Install: cache files but skip ones that fail to avoid install failure
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        urlsToCache.map(url =>
          cache.add(url).catch(err => {
            // skip missing/failed resources so install doesn't fail
            console.warn('Failed to cache', url, err);
          })
        )
      );
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: navigation fallback to index.html; otherwise try cache first then network
self.addEventListener('fetch', event => {
  // handle navigation requests (SPA support)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // update cache with latest navigation response
          const copy = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // for other requests: try cache first, then network, then cache fallback
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        // optionally cache fetched responses for future
        try {
          const respClone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, respClone));
        } catch (e) {
          // ignore cache put errors for opaque responses
        }
        return resp;
      }).catch(() => caches.match(event.request));
    })
  );
});
