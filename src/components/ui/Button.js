'use client';

import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  onClick,
  type = 'button',
  className = '',
  fullWidth = false,
  ...props
}) {
  const baseClasses = 'btn';
  
  // These map to globals.css classes
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    warning: 'btn-warning',
    ghost: 'btn-ghost',
    whatsapp: 'btn-whatsapp',
    phone: 'btn-phone',
  };

  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const stateClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${widthClass} ${stateClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="spinner mr-2" aria-hidden="true"></span>
      )}
      {!loading && icon && (
        <span className="btn-icon mr-2" aria-hidden="true">{icon}</span>
      )}
      {children}
    </button>
  );
}
