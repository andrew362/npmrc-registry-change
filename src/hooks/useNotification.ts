import { useState, useCallback, useRef, useEffect } from 'react';
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

  const timeoutRef = useRef<number | null>(null);

  const clearNotificationTimeout = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const showNotification = useCallback(
    (message: string, type: NotificationType = 'info') => {
      // Clear any existing notification timeout
      clearNotificationTimeout();

      // Show the new notification
      setNotification({ message, type });

      // Auto-hide after 3 seconds
      timeoutRef.current = window.setTimeout(() => {
        setNotification(null);
        timeoutRef.current = null;
      }, 3000);
    },
    [clearNotificationTimeout]
  );

  const hideNotification = useCallback(() => {
    setNotification(null);
    clearNotificationTimeout();
  }, [clearNotificationTimeout]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => clearNotificationTimeout();
  }, [clearNotificationTimeout]);

  return {
    notification,
    showNotification,
    hideNotification,
  };
}
