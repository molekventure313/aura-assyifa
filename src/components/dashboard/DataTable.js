'use client';

import React, { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import { SkeletonTable } from '@/components/ui/Loader';
import Select from '@/components/ui/Select';

export default function DataTable({
  columns,
  data = [],
  loading = false,
  emptyMessage = 'No data found',
  onRowClick,
  searchable = false,
  searchPlaceholder = 'Search...',
  pagination = false,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSort = (key, sortable) => {
    if (!sortable) return;
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return data;
    
    return data.filter(item => {
      return columns.some(col => {
        const val = item[col.key];
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [data, searchTerm, searchable, columns]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, pagination, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  if (loading) {
    return <SkeletonTable rows={5} columns={columns.length} />;
  }

  return (
    <div className="data-table-container">
      {searchable && (
        <div className="table-controls mb-4 flex justify-between items-center gap-4 flex-wrap">
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={searchPlaceholder}
            className="max-w-md w-full sm:w-auto"
          />
          
          {pagination && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Rows per page:</span>
              <Select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                options={[10, 25, 50, 100].map(v => ({ value: v, label: String(v) }))}
                className="w-24"
              />
            </div>
          )}
        </div>
      )}

      <div className="table-responsive w-full overflow-x-auto rounded-xl border border-white/10 glass-panel">
        <table className="table w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              {columns.map((col, idx) => (
                <th 
                  key={idx}
                  className={`p-4 font-heading font-medium text-gray-300 ${col.sortable ? 'cursor-pointer hover:bg-white/10' : ''}`}
                  style={{ width: col.width }}
                  onClick={() => handleSort(col.key, col.sortable)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && sortConfig.key === col.key && (
                      <span className="text-xs">
                        {sortConfig.direction === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr 
                  key={row.id || rowIndex} 
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="p-4 text-sm text-gray-200">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="pagination-controls mt-4 flex justify-between items-center gap-4 flex-wrap">
          <div className="text-sm text-gray-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="flex gap-2">
            <button 
              className="btn btn-sm btn-ghost px-3 py-1 text-sm border border-white/10 rounded"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <div className="flex items-center px-2 text-sm text-gray-300">
              Page {currentPage} of {totalPages}
            </div>
            <button 
              className="btn btn-sm btn-ghost px-3 py-1 text-sm border border-white/10 rounded"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
