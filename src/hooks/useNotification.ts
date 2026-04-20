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

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideNotification = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setNotification(null);
  }, []);

  const showNotification = useCallback(
    (message: string, type: NotificationType = 'info') => {
      // Clear any existing timer
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Show the new notification
      setNotification({ message, type });

      // Auto-hide after 3 seconds
      timeoutRef.current = setTimeout(() => {
        setNotification(null);
        timeoutRef.current = null;
      }, 3000);
    },
    []
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    notification,
    showNotification,
    hideNotification
  };
}
