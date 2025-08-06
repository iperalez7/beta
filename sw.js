// Service Worker for notifications, no icons used
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  self.registration.showNotification(
    data.title || 'Warehouse Task Update', 
    {
      body: data.body || 'A new update has arrived.'
    }
  );
});
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type: 'window', includeUncontrolled: true}).then(clientsArr => {
      if (clientsArr.length > 0) {
        let client = clientsArr[0];
        return client.focus();
      }
      return clients.openWindow('/warehouse-mobile.html');
    })
  );
});
