'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';

export default function CustomerProfilePage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`/api/admin/customers/${id}`);
        if (res.ok) {
          setCustomer(await res.json());
        }
      } catch (err) {
        showToast('Failed to load customer profile', 'error');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCustomer();
  }, [id]);

  if (loading) return <div className="flex-center py-12"><div className="spinner"></div></div>;
  if (!customer) return <div className="p-8 text-center">Customer not found</div>;

  return (
    <div className="page-container space-y-6">
      <header className="page-header flex-between items-center">
        <h1 className="text-2xl font-bold">Customer Profile</h1>
        <div className="actions flex gap-2">
          <button className="btn btn-secondary">Edit Customer</button>
          <button className="btn btn-danger">Archive</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="glass-panel p-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex-center text-2xl font-bold text-primary mb-4">
              {customer.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold mb-1">{customer.name}</h2>
            <p className="font-mono text-gray-400 mb-6">{customer.phone}</p>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-gray-500">State</span>
                <span>{customer.state}</span>
              </div>
              <div>
                <span className="block text-gray-500">Address</span>
                <span>{customer.address}</span>
              </div>
              <div>
                <span className="block text-gray-500">Total Submissions</span>
                <span className="badge badge-primary">{customer.cases?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-bold mb-4">Case History</h3>
            <div className="space-y-4">
              {customer.cases?.map(c => (
                <div key={c.id} className="bg-darker p-4 rounded border-l-4 border-primary">
                  <div className="flex-between mb-2">
                    <span className="font-bold">Case #{c.id.substring(0,8)}</span>
                    <span className={`badge status-${c.status.replace(/\s+/g, '-').toLowerCase()}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{c.problem_description}</p>
                  <div className="flex-between text-xs text-gray-500">
                    <span>Practitioner: {c.practitioner_name || 'Unassigned'}</span>
                    <span>{new Date(c.created_at).toLocaleDateString()}</span>
                  </div>
                  {c.utm_source && (
                    <div className="mt-2 text-xs bg-dark p-1 rounded inline-block">
                      Source: {c.utm_source}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
