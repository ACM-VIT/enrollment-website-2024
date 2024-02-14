// sw.js

// Push notification

// Register service worker
self.addEventListener('install', function(event) {
    console.log('Service worker installed');
});

// Activate service worker
self.addEventListener('activate', function(event) {
    console.log('Service worker activated');
});

// Initial subscription to push notification

// Subscribe to push notification
self.addEventListener('push', function(event) {
    console.log('Push notification received', event);


    let data = (event.data.json());

    if (data.action === 'notify') {
        self.registration.showNotification(data.payload.title, {tag: data.payload.tag, body: data.payload.body});
    } else if (data.action === 'close') {
        self.registration.getNotifications({tag: data.payload.tag}).then(function(notifications) {
            notifications.forEach(function(notification) {
                notification.close();
            });
        });
    }
});
