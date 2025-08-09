// Service Worker for image caching and offline support

const CACHE_NAME = 'tucanbit-cache-v1';
const IMAGE_CACHE_NAME = 'tucanbit-images-v1';

// Files to cache immediately
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle image requests
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME)
        .then((cache) => {
          return cache.match(request)
            .then((response) => {
              if (response) {
                // Return cached image
                return response;
              }

              // Fetch from network and cache
              return fetch(request)
                .then((networkResponse) => {
                  if (networkResponse.status === 200) {
                    cache.put(request, networkResponse.clone());
                  }
                  return networkResponse;
                })
                .catch(() => {
                  // Return a placeholder image if network fails
                  return new Response(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                      <rect width="200" height="200" fill="#374151"/>
                      <text x="100" y="100" text-anchor="middle" fill="#9CA3AF" font-family="Arial" font-size="14">
                        Image not available
                      </text>
                    </svg>`,
                    {
                      headers: { 'Content-Type': 'image/svg+xml' }
                    }
                  );
                });
            });
        })
    );
    return;
  }

  // Handle other requests
  event.respondWith(
    caches.match(request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle any background sync tasks
  console.log('Background sync triggered');
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from TucanBit',
    icon: '/TB.png',
    badge: '/TB.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/TB.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/TB.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('TucanBit', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
}); 