'use client';

import React from 'react';

export default function Input({
  label,
  error,
  hint,
  required,
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  rows,
  className = '',
  ...props
}) {
  const inputId = id || name;
  const isTextarea = rows !== undefined;
  
  const Component = isTextarea ? 'textarea' : 'input';
  
  const baseInputClass = 'input-field';
  const errorClass = error ? 'input-error' : '';
  
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      
      <Component
        id={inputId}
        name={name}
        type={isTextarea ? undefined : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`${baseInputClass} ${errorClass}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      
      {error && (
        <p id={`${inputId}-error`} className="form-error">
          {error}
        </p>
      )}
      
      {hint && !error && (
        <p id={`${inputId}-hint`} className="form-hint">
          {hint}
        </p>
      )}
    </div>
  );
}
