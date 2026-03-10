const CACHE_NAME = 'python-exercises-learn-offline-v23';

const BASE_PATH = '/python-exercisesV1/';

const STATIC_ASSETS = [
  BASE_PATH,
  BASE_PATH + 'manifest.json'
];

const CDN_URLS = [
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap',
  'https://cdn-icons-png.flaticon.com/512/5968/5968350.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      
      for (const url of STATIC_ASSETS) {
        try {
          await cache.add(url);
        } catch (e) {
          console.log('Cache add error:', url, e.message);
        }
      }
      
      for (const url of CDN_URLS) {
        try {
          await cache.add(url);
        } catch (e) {
          console.log('CDN cache error:', url, e.message);
        }
      }

      // Dynamically fetch index.html and pre-cache its assets to ensure offline support works right after first load
      try {
        // Fetch the HTML to find which hashed JS/CSS files to pre-cache
        const response = await fetch(BASE_PATH + 'index.html?t=' + new Date().getTime());
        if (response.ok) {
          const html = await response.text();
          // Find all src="..." and href="..." for assets
          const assetRegex = /(?:src|href)="(\/python-exercisesV1\/assets\/[^"]+\.(?:js|css))"/g;
          let match;
          while ((match = assetRegex.exec(html)) !== null) {
            try {
              await cache.add(match[1]);
              console.log('Dynamically pre-cached asset:', match[1]);
            } catch (e) {
              console.log('Failed to pre-cache asset:', match[1], e.message);
            }
          }
        }
      } catch (e) {
        console.log('Dynamic index.html pre-cache error:', e.message);
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
  const isNavigation = event.request.mode === 'navigate' || event.request.destination === 'document' || event.request.url.includes('index.html');
  const isLocal = requestUrl.origin === location.origin;

  // NETWORK-FIRST for HTML/navigation: always fetch fresh index.html so new JS bundles load
  if (isNavigation) {
    event.respondWith(
      fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(() => {
        // Offline fallback: serve cached index.html
        return caches.match(BASE_PATH + 'index.html').then((cached) => cached || caches.match(BASE_PATH));
      })
    );
    return;
  }

  // CACHE-FIRST for local JS/CSS assets (they have hashed filenames, safe to cache forever)
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
        }).catch(() => undefined);
      })
    );
    return;
  }

  // CACHE-FIRST for CDN resources
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response && response.status === 200 && response.type !== 'opaque') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(() => new Response('', { status: 503 }));
    })
  );
});
