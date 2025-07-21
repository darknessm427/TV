// A simple service worker for basic caching

const CACHE_NAME = 'darkness-tv-cache-v2'; // Version updated to ensure new cache
const urlsToCache = [
  '/',
  '/index.html',
  'https://raw.githubusercontent.com/darknessm427/darknessm427/main/Image/tv.png?raw=true'
  // You can add more assets here to be cached, like CSS, JS, or images.
];

// Install event: opens the cache and adds the core files.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event: remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('darkness-tv-cache-') && cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


// Fetch event: serves content from cache if available.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      }
    )
  );
});
