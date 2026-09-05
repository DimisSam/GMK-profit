// Cloudflare-safe Service Worker
// No precache, no stale cache, always fresh files

self.addEventListener("install", (event) => {
  // Activate immediately
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Take control immediately
  event.waitUntil(self.clients.claim());
});

// Network-first fetch (fixes splash freeze)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});
