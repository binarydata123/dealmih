// -------------------------
// SERVICE WORKER VERSION
// -------------------------
const CACHE_NAME = "pwa-cache-v1";

// -------------------------
// ASSETS TO PRE-CACHE
const PRE_CACHE_ASSETS = [
    "/",
    "/css/app.css",
    "/js/app.js",

    "/images/icons/icon-72x72.png",
    "/images/icons/icon-96x96.png",
    "/images/icons/icon-128x128.png",
    "/images/icons/icon-144x144.png",
    "/images/icons/icon-152x152.png",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-384x384.png",
    "/images/icons/icon-512x512.png"
];

// -------------------------
// INSTALL EVENT
// -------------------------
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(PRE_CACHE_ASSETS);
    })
  );

  self.skipWaiting();
});

// -------------------------
// ACTIVATE EVENT
// -------------------------
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      )
    )
  );
  self.clients.claim();
});

// -------------------------
// FETCH EVENT
// -------------------------
self.addEventListener("fetch", (event) => {
    const url = event.request.url;

    // ❗ Ignore chrome-extension requests
    if (url.startsWith("chrome-extension://")) {
        return;
    }

    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then((cached) => {
            return (
                cached ||
                fetch(event.request)
                    .then((response) => {

                        // Only cache valid responses
                        if (
                            !response ||
                            response.status !== 200 ||
                            response.type !== "basic"
                        ) {
                            return response;
                        }

                        const resClone = response.clone();

                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, resClone).catch(err => {
                                console.warn("Cache put failed:", err);
                            });
                        });

                        return response;
                    })
                    .catch(() => {
                        // Fallback offline page (optional)
                        return caches.match("/");
                    })
            );
        })
    );
});


// -------------------------
// PUSH EVENT
// -------------------------
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};

  event.waitUntil(
    self.registration.showNotification(data.title || "New Notification", {
      body: data.body || "",
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-192x192.png",
      data: data,
    })
  );
});
