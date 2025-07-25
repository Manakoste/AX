const CACHE_NAME = 'transport-company-v2';
const ASSETS = [
  './index.html',
  './vehicles.html',
  './routes.html',
  './style.css',
  './js/vehicles.js',
  './js/routes.js',
  './data/vehicles.json',
  './data/routes.json',
  './images/hero-bg.jfif',
  './images/volvo-truck.jfif',
  './images/man-truck.jfif',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
