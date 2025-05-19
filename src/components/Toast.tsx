import React from 'react';
import '../styles/toast.css';

export type NotificationType = 'success' | 'error' | 'info';

export interface NotificationProps {
  message: string;
  type: NotificationType;
}

interface ToastProps {
  notification: NotificationProps | null;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div
      className="toast-enter"
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        backgroundColor:
          notification.type === 'success'
            ? '#10b981'
            : notification.type === 'error'
            ? '#ef4444'
            : '#3b82f6',
        color: 'white',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '320px',
        width: 'auto',
      }}
    >
      <div
        style={{
          fontSize: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {notification.type === 'success'
          ? '✓'
          : notification.type === 'error'
          ? '✕'
          : 'ℹ'}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: '600',
            marginBottom: '2px',
          }}
        >
          {notification.type === 'success'
            ? 'Success!'
            : notification.type === 'error'
            ? 'Error'
            : 'Information'}
        </div>
        <div
          style={{
            fontSize: '14px',
            opacity: 0.9,
          }}
        >
          {notification.message}
        </div>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          opacity: 0.7,
          padding: '0 4px',
          lineHeight: 1,
          fontFamily: 'system-ui',
          marginLeft: '8px',
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
