import api from './axios';

function initializeState(): void {
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
    console.warn("Notifications aren't supported.");
    return;
  }

  if (Notification.permission === 'denied') {
    console.warn('The user has blocked notifications.');
    return;
  }

  if (!('PushManager' in window)) {
    console.warn("Push messaging isn't supported.");
    return;
  }

  navigator.serviceWorker.ready.then(async (reg) => {
    let subscription = await reg.pushManager.getSubscription();

    if (!subscription) {
      const response = await api.get('/push/public_key');
      const publicKey = response.data.publicKey as string;

      subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey,
      });

      await api.post('/push/register', { subscription });

      await api.post('/push/send', { subscription });
    }
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(initializeState);
} else {
  console.log('Please, your browser does not support Service Worker');
}
