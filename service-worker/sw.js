// public/sw.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// This will be replaced by the generated manifest
self.__WB_MANIFEST

// Cache first for assets
workbox.routing.registerRoute(
  ({request}) => request.destination === 'image' || 
                 request.destination === 'font' ||
                 request.destination === 'style' ||
                 request.destination === 'script',
  new workbox.strategies.CacheFirst({
    cacheName: 'assets',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
      })
    ]
  })
);

// Improved navigation handling
workbox.routing.registerRoute(
  ({request}) => request.mode === 'navigate',
  new workbox.strategies.NetworkFirst({
    cacheName: 'pages',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }),
      {
        handlerDidError: async () => {
          // Return the cached homepage as a fallback
          return caches.match('/');
        }
      }
    ],
    networkTimeoutSeconds: 3
  })
);

// Catch-all route as fallback
workbox.routing.setDefaultHandler(
  new workbox.strategies.NetworkFirst({
    cacheName: 'default',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 24 * 60 * 60
      }),
      {
        handlerDidError: async () => {
          return caches.match('/');
        }
      }
    ]
  })
);
