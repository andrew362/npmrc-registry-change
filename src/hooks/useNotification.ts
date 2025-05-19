import { useState, useCallback } from 'react';
import { NotificationType } from '../components/Toast';

interface UseNotificationReturn {
  notification: { message: string; type: NotificationType } | null;
  showNotification: (message: string, type?: NotificationType) => void;
  hideNotification: () => void;
}

export function useNotification(): UseNotificationReturn {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
  } | null>(null);

  const showNotification = useCallback(
    (message: string, type: NotificationType = 'info') => {
      // Clear any existing notification
      if (notification) {
        setNotification(null);
      }

      // Show the new notification
      setNotification({ message, type });

      // Auto-hide after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    },
    [notification]
  );

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    notification,
    showNotification,
    hideNotification
  };
}
