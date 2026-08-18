import { useState, useEffect } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { trackReport, disputeReport } from '../services/api';
import { StatusChip, STATUS_LABEL } from '../components/StatusChip';

const LOGO_URL = "https://lh3.googleusercontent.com/aida/AP1WRLvqEeSNx1XairIMzMTuD1Ix3vDKfZJs7-YfgEEPNl2vV2qBzNwK_90H6awnWo0iV_bzKZrzsBPq3Tv4gEr0rWvA3sIHns9dGPYnSzCpCQlzKmbZv0Fy8F9lkUnrfuvbR34Z-KzQBLco3clLLW46ds-c6I34B9njMqJQXNIcT7clHLgKM_5MjunTbA3Cq3_QwpVPnrq69gqyWpvx5LHurPYqkXSlCHozCGCkNqYfsUhZWFOY0h66yfgxdUg";

export default function TrackReport() {
  const [searchParams] = useSearchParams();
  const { code: routeCode } = useParams();
  const initialCode = searchParams.get('code') || routeCode || '';
  const [code,    setCode]    = useState(initialCode);
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [disputeReason, setDisputeReason]     = useState('');
  const [disputeLoading, setDisputeLoading]   = useState(false);

  useEffect(() => {
    if (initialCode) handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDispute = async (e) => {
    e.preventDefault();
    if (!disputeReason.trim()) return;
    setDisputeLoading(true);
    try {
      await disputeReport(result.report.tracking_code, disputeReason.trim());
      setShowDisputeForm(false);
      setDisputeReason('');
      handleSearch();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit dispute.');
    } finally {
      setDisputeLoading(false);
    }
  };

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
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="bg-background text-on-surface font-body-md min-h-screen flex flex-col pb-24 md:pb-0"
    >
      {/* TopAppBar */}
      <header className="bg-surface-container-low sticky top-0 z-40 border-b border-outline-variant/20">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-stack-sm max-w-full">
          <div className="h-10 w-auto flex items-center">
            <Link to="/">
              <img src={LOGO_URL} alt="Swachchha Nagar Logo" className="h-8 w-auto object-contain" />
            </Link>
          </div>
          <div className="flex items-center gap-stack-md">
            <Link to="/submit" className="hidden sm:inline-flex items-center gap-stack-sm bg-primary text-on-primary px-stack-md py-stack-sm rounded-xl font-button text-button font-semibold hover:opacity-90 transition-all active:scale-95">
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              New Report
            </Link>
            <button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container-high transition-colors rounded-full">notifications</button>
            <Link to="/staff/login" className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-primary text-on-primary font-bold text-xs">
              SN
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop pt-stack-lg md:pt-stack-lg">
        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative mb-stack-lg rounded-xl overflow-hidden p-stack-md md:p-stack-lg bg-primary text-on-primary shadow-md"
        >
          <div className="relative z-10">
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold mb-stack-sm">Track Your Report</h2>
            <p className="font-body-md text-body-md opacity-90">Enter your tracking code to see the real-time status of your civic request.</p>
          </div>
        </motion.section>

        {/* Search Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          className="mb-stack-lg"
        >
          <form onSubmit={handleSearch} className="bg-white p-stack-md md:p-stack-lg rounded-xl border border-outline-variant/30 shadow-sm">
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-stack-sm font-semibold" htmlFor="track-id">
              Tracking Code
            </label>
            <div className="flex flex-col sm:flex-row gap-stack-sm">
              <div className="relative flex-grow">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                <input
                  className="w-full pl-10 pr-stack-md py-3 rounded-lg border border-outline bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-body-md outline-none uppercase font-mono tracking-wider"
                  id="track-id"
                  placeholder="e.g. SN-88219"
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value.toUpperCase())}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-on-primary font-button text-button px-stack-lg py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-stack-sm min-h-[48px] font-semibold"
              >
                <span>{loading ? 'Searching...' : 'Search'}</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            <p className="mt-stack-sm font-body-md text-body-md text-on-surface-variant/70">Found in your confirmation SMS or Email.</p>
          </form>
        </motion.section>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="p-stack-md rounded-xl bg-error-container text-on-error-container font-body-md text-body-md mb-stack-lg"
          >
            {error}
          </motion.div>
        )}

        {/* Result Container - Two column on desktop */}
        {result && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
            className="space-y-stack-md md:space-y-0 md:grid md:grid-cols-5 md:gap-stack-lg md:items-start"
          >
            {/* Left Column - Report Details (3/5 width) */}
            <div className="md:col-span-3 space-y-stack-md">
              {/* Active Result Card */}
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
                <div className="p-stack-md border-b border-surface-variant flex justify-between items-center bg-surface-container-low">
                  <span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider uppercase font-semibold">
                    Report #{result.report.tracking_code}
                  </span>
                  <StatusChip status={result.report.status} />
                </div>

                {result.report.is_disputed && (
                  <div className="p-stack-sm mx-stack-md mt-stack-md bg-error-container text-on-error-container text-xs font-semibold rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    Resolution Disputed. Report re-opened for inspection.
                  </div>
                )}

                <div className="p-stack-lg space-y-stack-md">
                  <div className="grid grid-cols-2 gap-stack-lg">
                    <div>
                      <p className="font-label-caps text-label-caps text-on-surface-variant mb-stack-sm">Category</p>
                      <div className="flex items-center gap-stack-sm">
                        <span className="material-symbols-outlined text-primary">eco</span>
                        <p className="font-body-md text-body-md font-semibold capitalize">{result.report.category.replace('_', ' ')}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-label-caps text-label-caps text-on-surface-variant mb-stack-sm">Ward</p>
                      <div className="flex items-center gap-stack-sm">
                        <span className="material-symbols-outlined text-secondary">location_on</span>
                        <p className="font-body-md text-body-md font-semibold">{result.report.ward || 'General'}</p>
                      </div>
                    </div>
                  </div>

                  <p className="font-body-md text-body-md text-on-surface">
                    {result.report.description || 'No detailed description provided.'}
                  </p>

                  {result.report.resolution_photo_path && (
                    <div className="pt-stack-sm border-t border-outline-variant">
                      <p className="font-body-md text-body-md font-semibold text-primary mb-stack-sm uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check_circle</span> Staff Proof-of-Work Photo
                      </p>
                      <img
                        src={`/${result.report.resolution_photo_path}`}
                        alt="Proof of work"
                        className="w-full max-h-56 object-cover rounded-xl border border-primary/30"
                      />
                    </div>
                  )}

                  <div className="space-y-stack-sm pt-stack-sm border-t border-outline-variant">
                    <div className="flex justify-between items-center font-body-md text-body-md">
                      <span className="text-on-surface-variant">Date Submitted</span>
                      <span className="font-medium">{new Date(result.report.created_at).toLocaleString()}</span>
                    </div>
                    {result.report.assigned_to_name && (
                      <div className="flex justify-between items-center font-body-md text-body-md">
                        <span className="text-on-surface-variant">Assigned Staff</span>
                        <span className="font-medium">{result.report.assigned_to_name}</span>
                      </div>
                    )}
                  </div>

                  {result.report.status === 'resolved' && !result.report.is_disputed && (
                    <div className="pt-stack-md border-t border-outline-variant space-y-stack-sm">
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Is this cleanup incomplete or unsatisfactory? You can submit a dispute.
                      </p>
                      {!showDisputeForm ? (
                        <button
                          onClick={() => setShowDisputeForm(true)}
                          className="w-full py-2.5 px-stack-md bg-error/10 hover:bg-error/20 text-error font-semibold font-button text-button rounded-xl transition border border-error/30 flex items-center justify-center gap-stack-sm"
                        >
                          <span className="material-symbols-outlined text-sm">flag</span>
                          Dispute / Re-Open Report
                        </button>
                      ) : (
                        <form onSubmit={handleDispute} className="space-y-stack-sm">
                          <textarea
                            required
                            value={disputeReason}
                            onChange={e => setDisputeReason(e.target.value)}
                            placeholder="Explain why the cleanup is incomplete..."
                            className="w-full p-stack-md border border-outline-variant rounded-lg font-body-md text-body-md outline-none focus:border-error min-h-[75px] resize-none"
                          />
                          <div className="flex gap-stack-sm justify-end">
                            <button
                              type="button"
                              onClick={() => setShowDisputeForm(false)}
                              className="px-stack-md py-2 font-button text-button text-on-surface-variant hover:bg-surface-container rounded-lg"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={disputeLoading || !disputeReason.trim()}
                              className="px-stack-md py-2 font-button text-button bg-error text-on-error font-semibold rounded-lg shadow-sm disabled:opacity-50"
                            >
                              {disputeLoading ? 'Submitting...' : 'Submit Dispute'}
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Timeline & Info (2/5 width) */}
            <div className="md:col-span-2 space-y-stack-md">
              {/* Timeline */}
              <div className="bg-white rounded-xl border border-outline-variant/30 p-stack-lg shadow-sm space-y-stack-md">
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Status History</h3>
                <div className="space-y-stack-md border-l-2 border-primary/20 pl-stack-md ml-stack-sm">
                  {result.history.map((h, i) => (
                    <div key={i} className="relative space-y-stack-sm">
                      <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-white"></div>
                      <div className="flex justify-between items-center">
                        <StatusChip status={h.status} />
                        <span className="font-body-md text-body-md text-outline">
                          {new Date(h.created_at).toLocaleString()}
                        </span>
                      </div>
                      {h.note && <p className="font-body-md text-body-md text-on-surface-variant">{h.note}</p>}
                      {h.changed_by_name && <p className="font-body-md text-body-md text-outline">Updated by {h.changed_by_name}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Help Info Card */}
              <section className="p-stack-lg bg-primary-container/10 rounded-xl border border-primary/20">
                <div className="flex gap-stack-md">
                  <span className="material-symbols-outlined text-primary shrink-0">info</span>
                  <div>
                    <h3 className="font-button text-button text-primary mb-stack-sm font-semibold">What does '{STATUS_LABEL[result.report.status]?.toLowerCase()}' mean?</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {result.report.status === 'submitted' && 'Your report has been received and logged in the municipal database.'}
                      {result.report.status === 'acknowledged' && 'Your report has been received and assigned to the local waste management department. An inspector will visit the site within 24 hours.'}
                      {result.report.status === 'in_progress' && 'Cleanup crew and equipment have been dispatched to your reported location.'}
                      {result.report.status === 'resolved' && 'Cleanup work has been completed and verified by municipal staff.'}
                      {result.report.status === 'closed' && 'This case is officially closed.'}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </motion.section>
        )}
      </main>

      {/* BottomNavBar - hidden on desktop */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface shadow-lg rounded-t-xl md:hidden">
        <Link to="/" className="flex flex-col items-center justify-center text-on-surface-variant cursor-pointer active:scale-90 transition-transform">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-caps text-[10px]">Home</span>
        </Link>
        <Link to="/submit" className="flex flex-col items-center justify-center text-on-surface-variant cursor-pointer active:scale-90 transition-transform">
          <span className="material-symbols-outlined">add_circle</span>
          <span className="font-label-caps text-[10px]">Report</span>
        </Link>
        <Link to="/track" className="flex flex-col items-center justify-center bg-primary-container text-on-primary rounded-full px-4 py-1 cursor-pointer active:scale-90 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
          <span className="font-label-caps text-[10px]">My Reports</span>
        </Link>
        <Link to="/staff/login" className="flex flex-col items-center justify-center text-on-surface-variant cursor-pointer active:scale-90 transition-transform">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-caps text-[10px]">Profile</span>
        </Link>
      </nav>
    </motion.div>
  );
}