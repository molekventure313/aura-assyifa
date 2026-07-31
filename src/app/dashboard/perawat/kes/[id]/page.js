'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import { CASE_STATUSES } from '@/lib/utils/constants';

export default function CaseDetailPage() {
  const params = useParams();
  const { id } = params;
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);
  const { showToast } = useToast();

  const fetchCase = async () => {
    try {
      const res = await fetch(`/api/cases/${id}`);
      if (res.ok) {
        setCaseData(await res.json());
      } else {
        showToast('Failed to load case details', 'error');
      }
    } catch (err) {
      showToast('Error loading case', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchCase();
  }, [id]);

  const updateStatus = async (newStatus) => {
    try {
      const res = await fetch(`/api/cases/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', status: newStatus })
      });
      if (res.ok) {
        showToast('Status updated', 'success');
        fetchCase();
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setSubmittingNote(true);
    try {
      const res = await fetch(`/api/cases/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_note', note: noteText })
      });
      if (res.ok) {
        setNoteText('');
        showToast('Note added', 'success');
        fetchCase();
      }
    } catch (err) {
      showToast('Failed to add note', 'error');
    } finally {
      setSubmittingNote(false);
    }
  };

  if (loading) return <div className="flex-center py-8"><div className="spinner"></div></div>;
  if (!caseData) return <div className="empty-state">Case not found.</div>;

  const encodedMessage = encodeURIComponent(`Hi ${caseData.customer_name}, saya perawat dari...`);

  return (
    <div className="case-detail-container">
      <header className="page-header flex-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Case #{id.substring(0,8)}</h1>
          <span className={`badge status-${caseData.status.replace(/\s+/g, '-').toLowerCase()}`}>
            {caseData.status}
          </span>
        </div>
        <select 
          className="status-selector p-2 rounded glass-panel"
          value={caseData.status}
          onChange={(e) => updateStatus(e.target.value)}
        >
          {CASE_STATUSES.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="customer-info-card glass-panel p-6">
            <h2 className="text-xl font-bold mb-4">{caseData.customer_name}</h2>
            
            {caseData.is_repeat && (
              <div className="repeat-badge bg-warning text-dark p-3 rounded mb-4 font-bold flex items-center gap-2">
                <span>⚠️ REPEAT CUSTOMER</span>
                <span className="text-sm font-normal">({caseData.repeat_count} previous submissions)</span>
              </div>
            )}

            <div className="info-grid grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400 block mb-1">Phone Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg">{caseData.phone}</span>
                </div>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">State</span>
                <span>{caseData.state}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-gray-400 block mb-1">Address</span>
                <p>{caseData.address}</p>
              </div>
              <div className="md:col-span-2">
                <span className="text-gray-400 block mb-1">Problem Description</span>
                <p className="bg-darker p-3 rounded">{caseData.problem_description}</p>
              </div>
            </div>
            
            <div className="quick-actions grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              <a href={`tel:${caseData.phone}`} className="btn btn-secondary flex-center gap-2">📞 Call</a>
              <a href={`https://wa.me/60${caseData.phone.replace(/^0+/, '')}?text=${encodedMessage}`} target="_blank" rel="noreferrer" className="btn btn-success flex-center gap-2">💬 WhatsApp</a>
              <button onClick={() => navigator.clipboard.writeText(caseData.phone)} className="btn btn-secondary flex-center gap-2">📋 Copy</button>
              <button onClick={() => updateStatus('Rawatan Selesai')} className="btn btn-primary flex-center gap-2">✅ Complete</button>
            </div>
          </div>

          <div className="notes-section glass-panel p-6">
            <h3 className="text-lg font-bold mb-4">Notes</h3>
            <div className="notes-list space-y-4 mb-6">
              {caseData.notes?.map((note, idx) => (
                <div key={idx} className="note-item bg-darker p-3 rounded border-l-4 border-primary">
                  <p>{note.text}</p>
                  <div className="text-xs text-gray-400 mt-2 flex justify-between">
                    <span>{note.author}</span>
                    <span>{new Date(note.created_at).toLocaleString()}</span>
                  </div>
                </div>
              ))}
              {(!caseData.notes || caseData.notes.length === 0) && (
                <p className="text-gray-500 text-sm">No notes yet.</p>
              )}
            </div>
            <form onSubmit={addNote} className="add-note-form">
              <textarea 
                className="input-field w-full min-h-[100px] mb-3"
                placeholder="Type your note here..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                required
              />
              <button type="submit" className={`btn btn-primary ${submittingNote ? 'loading' : ''}`} disabled={submittingNote}>
                Add Note
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="follow-up-section glass-panel p-6">
            <h3 className="text-lg font-bold mb-4">Follow-ups</h3>
            {/* Follow-up implementation */}
            <p className="text-sm text-gray-400 mb-4">Manage follow-ups for this patient.</p>
            <button className="btn btn-secondary btn-full">Schedule Follow-up</button>
          </div>
          
          <div className="timeline-section glass-panel p-6">
            <h3 className="text-lg font-bold mb-4">Timeline</h3>
            <div className="timeline relative pl-4 border-l border-gray-700 space-y-4">
              {caseData.timeline?.map((event, idx) => (
                <div key={idx} className="timeline-event relative">
                  <span className="absolute -left-6 w-3 h-3 bg-primary rounded-full top-1"></span>
                  <p className="text-sm font-bold">{event.status}</p>
                  <p className="text-xs text-gray-400">{new Date(event.timestamp).toLocaleString()}</p>
                  {event.notes && <p className="text-xs mt-1">{event.notes}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
