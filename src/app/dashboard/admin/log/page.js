'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function ActivityLogPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('/api/admin/logs');
        if (res.ok) setLogs(await res.json());
      } catch (err) {
        showToast('Failed to fetch activity logs', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const getActionColor = (action) => {
    switch(action.toLowerCase()) {
      case 'create': return 'text-success';
      case 'update': return 'text-primary';
      case 'delete': return 'text-error';
      case 'claim': return 'text-warning';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="page-container">
      <header className="page-header mb-6">
        <h1>System Activity Log</h1>
        <p className="text-sm text-gray-400 mt-1">Audit trail of all system actions</p>
      </header>

      <div className="glass-panel overflow-x-auto">
        <table className="data-table w-full text-left text-sm">
          <thead>
            <tr>
              <th className="p-4 bg-darker">Timestamp</th>
              <th className="p-4 bg-darker">User</th>
              <th className="p-4 bg-darker">Action</th>
              <th className="p-4 bg-darker">Entity</th>
              <th className="p-4 bg-darker">Description</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center"><div className="spinner mx-auto"></div></td>
              </tr>
            ) : logs.length > 0 ? (
              logs.map((log, idx) => (
                <tr key={idx} className="border-b border-gray-800 hover:bg-darker/50">
                  <td className="p-4 text-xs text-gray-400 whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="p-4 font-medium">{log.user_name || log.user_id}</td>
                  <td className="p-4">
                    <span className={`font-bold ${getActionColor(log.action)}`}>
                      {log.action.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{log.entity_type} {log.entity_id ? `#${log.entity_id.substring(0,6)}` : ''}</td>
                  <td className="p-4 text-gray-300">{log.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">No logs found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination could go here */}
      <div className="flex justify-center mt-6">
        <div className="flex gap-2">
          <button className="btn btn-secondary text-sm disabled:opacity-50" disabled>Previous</button>
          <button className="btn btn-secondary text-sm disabled:opacity-50" disabled>Next</button>
        </div>
      </div>
    </div>
  );
}
