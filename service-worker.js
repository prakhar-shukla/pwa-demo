var cacheName = 'v1';


self.addEventListener('install', (e) => {
    console.log("Service worker installed");
})


self.addEventListener('activate', (e) => {
    console.log("Service worker activated")

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log("Clearing Old Cache");
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request)
            .then(response => {
                const responseClone = response.clone();
                caches.open(cacheName)
                    .then(cache => {
                        cache.put(e.request, responseClone);
                    })
                return response;
            }).catch(() => caches.match(e.request).then(res=>res))
    );
})