// Service Worker — "Nowy Dzień"
// Podbij numer wersji (CACHE_NAME) za każdym razem, gdy zmienisz pliki aplikacji,
// żeby telefony pobrały nową wersję zamiast trzymać starą z pamięci podręcznej.
const CACHE_NAME = "nowy-dzien-v1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./fonts/Bricolage-latin.woff2",
  "./fonts/Bricolage-latinext.woff2",
  "./fonts/Inter-latin.woff2",
  "./fonts/Inter-latinext.woff2",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first dla plików aplikacji, sieć jako zapasowa opcja.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
