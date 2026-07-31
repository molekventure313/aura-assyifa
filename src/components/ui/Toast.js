'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {mounted && createPortal(
        <div style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 'var(--z-toast, 400)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          maxWidth: '380px',
          width: '100%',
        }}>
          {toasts.map((toast) => (
            <div
              key={toast.id}
              role="alert"
              style={{
                padding: '0.875rem 1rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                background: toast.type === 'error'
                  ? 'rgba(239, 68, 68, 0.15)'
                  : toast.type === 'success'
                  ? 'rgba(16, 185, 129, 0.15)'
                  : 'rgba(59, 130, 246, 0.15)',
                border: `1px solid ${
                  toast.type === 'error'
                    ? 'rgba(239, 68, 68, 0.3)'
                    : toast.type === 'success'
                    ? 'rgba(16, 185, 129, 0.3)'
                    : 'rgba(59, 130, 246, 0.3)'
                }`,
                backdropFilter: 'blur(12px)',
                color: 'var(--text-primary, #fff)',
                fontSize: '0.875rem',
                animation: 'slideInRight 0.3s ease-out',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              <div>{toast.message}</div>
              <button
                onClick={() => removeToast(toast.id)}
                aria-label="Close"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  padding: '0',
                  lineHeight: 1,
                }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}
