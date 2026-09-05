const CACHE_NAME = 'shopping-list-v2';
const urlsToCache = [
  '/shopping-list-app/',
  '/shopping-list-app/index.html',
  '/shopping-list-app/styles.css',
  '/shopping-list-app/script.js',
  '/shopping-list-app/manifest.json'
];

// Instalar el Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache).catch(err => {
          console.log('Cache addAll error:', err);
          return cache.addAll([
            '/shopping-list-app/',
            '/shopping-list-app/index.html'
          ]);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activar el Service Worker y borrar cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptar peticiones
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          return caches.match('/shopping-list-app/index.html');
        });
      })
  );
});
