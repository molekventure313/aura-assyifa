'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';

export default function FollowUpPage() {
  const [activeTab, setActiveTab] = useState('today');
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchFollowUps = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/follow-ups?filter=${activeTab}`);
        if (res.ok) {
          setFollowUps(await res.json());
        }
      } catch (err) {
        showToast('Failed to load follow-ups', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchFollowUps();
  }, [activeTab]);

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Follow-ups</h1>
      </header>

      <div className="tabs mb-6">
        <button 
          className={`tab-btn ${activeTab === 'overdue' ? 'active' : ''}`}
          onClick={() => setActiveTab('overdue')}
        >
          Overdue <span className="badge badge-error ml-2">!</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          Today
        </button>
        <button 
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming (7 Days)
        </button>
      </div>

      <div className="follow-up-list space-y-4">
        {loading ? (
          <div className="flex-center py-8"><div className="spinner"></div></div>
        ) : followUps.length > 0 ? (
          followUps.map(item => (
            <div key={item.id} className="follow-up-card glass-panel p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-l-4 border-primary">
              <div className="info">
                <h3 className="font-bold text-lg">{item.customer_name}</h3>
                <p className="text-sm text-gray-400 font-mono">{item.phone}</p>
                <div className="mt-2 text-sm bg-darker p-2 rounded">
                  <span className="text-primary font-bold">{new Date(item.scheduled_for).toLocaleString()}</span>
                  <p className="mt-1">{item.notes}</p>
                </div>
              </div>
              
              <div className="actions flex flex-wrap gap-2 md:flex-col min-w-[150px]">
                <Link href={`/dashboard/perawat/kes/${item.case_id}`} className="btn btn-secondary text-center text-sm">
                  View Case
                </Link>
                <a href={`tel:${item.phone}`} className="btn btn-primary text-center text-sm">📞 Call</a>
                <button className="btn btn-success text-center text-sm">✅ Mark Done</button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state p-8 text-center glass-panel">
            <p className="text-gray-400">No follow-ups for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
