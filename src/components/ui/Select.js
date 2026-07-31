'use client';

import React from 'react';

export default function Select({
  label,
  error,
  options = [],
  value,
  onChange,
  placeholder,
  required,
  id,
  name,
  className = '',
  ...props
}) {
  const selectId = id || name;
  const errorClass = error ? 'input-error' : '';
  
  const normalizedOptions = options.map(opt => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`input-field select-field ${errorClass}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {normalizedOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p id={`${selectId}-error`} className="form-error">
          {error}
        </p>
      )}
    </div>
  );
}
