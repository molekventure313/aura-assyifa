'use client';

import React from 'react';

export default function StatsCard({
  title,
  value,
  icon,
  trend, // 'up' or 'down' or null
  trendValue,
  color = 'primary', // 'primary', 'success', 'warning', 'danger', 'info'
  onClick,
  className = ''
}) {
  const isClickable = !!onClick;
  
  return (
    <div 
      className={`stats-card glass-panel p-6 rounded-xl relative overflow-hidden ${isClickable ? 'cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1' : ''} ${className}`}
      onClick={onClick}
      role={isClickable ? 'button' : 'region'}
      tabIndex={isClickable ? 0 : undefined}
    >
      <div className={`absolute top-0 right-0 p-4 opacity-10 text-6xl text-${color}`}>
        {icon}
      </div>
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <h3 className="text-sm font-medium text-gray-400 mb-2 font-heading uppercase tracking-wider">{title}</h3>
        
        <div className="flex items-end gap-3">
          <span className={`text-4xl font-bold font-heading text-${color}`}>
            {value}
          </span>
          
          {trend && (
            <div className={`flex items-center text-sm font-medium mb-1 ${trend === 'up' ? 'text-success' : 'text-danger'}`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
