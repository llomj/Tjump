const CACHE_NAME = 'python-exercises-learn-offline-v15';

const BASE_PATH = '/python-exercisesV1/';

const PRECACHE_URLS = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      
      // Precache core files
      for (const url of PRECACHE_URLS) {
        try {
          await cache.add(url);
        } catch (e) {
          console.log('PRECACHE error:', url, e.message);
        }
      }
      
      // Precache CDN resources
      const cdnUrls = [
        'https://cdn.tailwindcss.com',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap',
        'https://cdn-icons-png.flaticon.com/512/5968/5968350.png'
      ];
      
      // Try each CDN URL individually, don't fail if one fails
      for (const url of cdnUrls) {
        try {
          await cache.add(url);
        } catch (e) {
          // CDN might not be available, that's OK
        }
      }
    })()
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  const isLocal = requestUrl.origin === location.origin || requestUrl.href.startsWith(location.origin + BASE_PATH);

  // For local resources: cache-first (try cache, fallback to network)
  if (isLocal) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) {
          return cached;
        }
        
        return fetch(event.request).then((response) => {
          if (response && response.status === 200 && response.type !== 'opaque') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }
          return response;
        }).catch(() => {
          // If navigation fails, serve index.html
          if (event.request.mode === 'navigate' || event.request.destination === 'document') {
            return caches.match(BASE_PATH + 'index.html');
          }
        });
      })
    );
    return;
  }

  // For CDN: network-first with cache fallback
  event.respondWith(
    fetch(event.request).then((response) => {
      // Cache successful responses
      if (response && response.status === 200 && response.type !== 'opaque') {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });
      }
      return response;
    }).catch(() => {
      // Fallback to cache
      return caches.match(event.request).then((cached) => {
        if (cached) {
          return cached;
        }
        // Return empty response if nothing cached
        return new Response('', { status: 503 });
      });
    })
  );
});
