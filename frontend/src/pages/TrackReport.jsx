// Page: Track Report
// Mobile-first — citizen enters tracking code and sees status timeline
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { trackReport, disputeReport } from '../services/api';

const STATUS_BADGE = {
  submitted:    'badge-submitted',
  acknowledged: 'badge-acknowledged',
  in_progress:  'badge-in-progress',
  resolved:     'badge-resolved',
  closed:       'badge-closed',
};

const STATUS_LABEL = {
  submitted:    'Submitted',
  acknowledged: 'Acknowledged',
  in_progress:  'In Progress',
  resolved:     'Resolved',
  closed:       'Closed',
};

export default function TrackReport() {
  const [searchParams] = useSearchParams();
  const [code,    setCode]    = useState(searchParams.get('code') || '');
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  // Dispute state
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [disputeReason, setDisputeReason]     = useState('');
  const [disputeLoading, setDisputeLoading]   = useState(false);

  const handleDispute = async (e) => {
    e.preventDefault();
    if (!disputeReason.trim()) return;
    setDisputeLoading(true);
    try {
      await disputeReport(result.report.tracking_code, disputeReason.trim());
      setShowDisputeForm(false);
      setDisputeReason('');
      handleSearch(); // Refresh report data
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit dispute.');
    } finally {
      setDisputeLoading(false);
    }
  };

  // Auto-search if code is pre-filled from query param
  useEffect(() => {
    if (searchParams.get('code')) handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!code.trim()) return setError('Please enter a tracking code.');
    setError('');
    setLoading(true);
    try {
      const res = await trackReport(code.trim().toUpperCase());
      setResult(res.data);
    } catch (err) {
      setResult(null);
      setError(err.response?.data?.error || 'Report not found. Check your tracking code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface px-container-margin py-lg max-w-lg mx-auto">
      <h1 className="text-headline-lg-mobile text-on-surface mb-lg">Track Report</h1>

      {/* Search form */}
      <form onSubmit={handleSearch} className="flex gap-sm mb-lg">
        <input
          className="input-field flex-1 uppercase tracking-widest"
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          placeholder="Enter tracking code…"
          maxLength={12}
        />
        <button type="submit" disabled={loading} className="btn-citizen px-lg shrink-0">
          {loading ? '…' : 'Track'}
        </button>
      </form>

      {error && (
        <div className="p-sm rounded-md bg-error-container text-on-error-container text-label-md mb-md">
          {error}
        </div>
      )}

      {result && (
        <div className="flex flex-col gap-md">
          {/* Report card */}
          <div className="card-citizen space-y-md">
            <div className="flex items-center justify-between">
              <span className="text-label-sm text-outline uppercase tracking-wider font-semibold">
                {result.report.category.replace('_', ' ')}
              </span>
              <span className={STATUS_BADGE[result.report.status]}>
                {STATUS_LABEL[result.report.status]}
              </span>
            </div>

            {/* Dispute Warning if active */}
            {result.report.is_disputed && (
              <div className="p-sm bg-error-container text-on-error-container text-xs font-semibold rounded-xl flex items-center gap-2">
                <span>⚠️ Resolution Disputed. Report re-opened for inspection.</span>
              </div>
            )}

            <p className="text-body-md text-on-surface">
              {result.report.description || 'No description provided.'}
            </p>

            {/* Side-by-side or Proof Photo display */}
            {result.report.resolution_photo_path && (
              <div className="pt-sm border-t border-outline-variant">
                <p className="text-label-xs font-semibold text-primary mb-xs uppercase tracking-wider">
                  ✓ Staff Proof-of-Work Photo
                </p>
                <img
                  src={`/${result.report.resolution_photo_path}`}
                  alt="Proof of work"
                  className="w-full max-h-56 object-cover rounded-xl border border-primary/30"
                />
              </div>
            )}

            {result.report.assigned_to_name && (
              <p className="text-label-md text-on-surface-variant">
                Assigned to: <strong>{result.report.assigned_to_name}</strong>
              </p>
            )}
            
            {/* Citizen Dispute Action */}
            {result.report.status === 'resolved' && !result.report.is_disputed && (
              <div className="pt-sm border-t border-outline-variant space-y-sm">
                <p className="text-label-sm text-on-surface-variant">
                  Is this issue still not properly resolved? You can dispute it.
                </p>
                {!showDisputeForm ? (
                  <button
                    onClick={() => setShowDisputeForm(true)}
                    className="w-full py-2.5 px-md bg-error/10 hover:bg-error/20 text-error font-semibold text-label-md rounded-xl transition border border-error/30"
                  >
                    🚩 Dispute / Re-Open Report
                  </button>
                ) : (
                  <form onSubmit={handleDispute} className="space-y-sm animate-in">
                    <textarea
                      required
                      value={disputeReason}
                      onChange={e => setDisputeReason(e.target.value)}
                      placeholder="Explain why the cleanup is incomplete or unsatisfactory…"
                      className="input-field min-h-[75px] text-label-md resize-none"
                    />
                    <div className="flex gap-sm justify-end">
                      <button
                        type="button"
                        onClick={() => setShowDisputeForm(false)}
                        className="px-md py-2 text-label-md text-on-surface-variant hover:bg-surface-container rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={disputeLoading || !disputeReason.trim()}
                        className="px-md py-2 text-label-md bg-error text-on-error font-semibold rounded-xl shadow-sm disabled:opacity-50"
                      >
                        {disputeLoading ? 'Submitting…' : 'Submit Dispute'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            <p className="text-label-sm text-outline">
              Reported: {new Date(result.report.created_at).toLocaleString()}
            </p>
          </div>

          {/* Status timeline */}
          <div className="card-citizen">
            <h2 className="text-headline-md text-on-surface mb-md">Status Timeline</h2>
            <ol className="relative border-l border-outline-variant ml-sm">
              {result.history.map((h, i) => (
                <li key={i} className="mb-md ml-lg last:mb-0">
                  <div className="absolute -left-[7px] mt-1 w-3.5 h-3.5 rounded-full bg-primary border-2 border-white" />
                  <div className="flex items-center gap-sm mb-xs">
                    <span className={STATUS_BADGE[h.status]}>{STATUS_LABEL[h.status]}</span>
                    <span className="text-label-sm text-outline">
                      {new Date(h.created_at).toLocaleString()}
                    </span>
                  </div>
                  {h.note && <p className="text-body-md text-on-surface-variant">{h.note}</p>}
                  {h.changed_by_name && (
                    <p className="text-label-sm text-outline">by {h.changed_by_name}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </main>
  );
}
