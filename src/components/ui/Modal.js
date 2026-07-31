'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) {
  const modalRef = useRef(null);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;
  
  const sizeClass = {
    sm: 'modal-sm',
    md: 'modal-md',
    lg: 'modal-lg'
  }[size] || 'modal-md';

  const modalContent = (
    <div className="modal-overlay fade-in" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={`modal-container slide-up ${sizeClass}`} ref={modalRef}>
        <div className="modal-header flex justify-between items-center p-4 border-b border-white/10">
          <h2 id="modal-title" className="modal-title text-xl font-heading font-bold">{title}</h2>
          <button className="modal-close text-gray-400 hover:text-white" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>
        
        <div className="modal-body p-6">
          {children}
        </div>
        
        {footer && (
          <div className="modal-footer p-4 border-t border-white/10 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  
  return null;
}
