'use client';

import { useEffect } from 'react';

export default function ServiceWorkerCleaner() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          console.log('Unregistering ServiceWorker:', registration);
          registration.unregister();
        }
      });
    }
  }, []);

  return null;
}
