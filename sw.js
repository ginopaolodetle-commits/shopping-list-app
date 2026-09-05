const CACHE_NAME = 'shopping-list-v1';
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

// Activar el Service Worker
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
  // Solo para GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, devolverlo
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          // No cachear si no es 200
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          // Clonar la respuesta
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          // Si falla la red, devolver una página offline
          return caches.match('/shopping-list-app/index.html');
        });
      })
  );
});
