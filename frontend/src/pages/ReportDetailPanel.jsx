// Page: Report Detail Panel
// Desktop-first — status timeline, assign team, update status
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { listReports, updateReportStatus, assignReport } from '../services/api';
import api from '../services/api';

const STATUSES = ['submitted','acknowledged','in_progress','resolved','closed'];
const STATUS_LABEL = {
  submitted:'Submitted', acknowledged:'Acknowledged',
  in_progress:'In Progress', resolved:'Resolved', closed:'Closed',
};
const STATUS_BADGE = {
  submitted:'badge-submitted', acknowledged:'badge-acknowledged',
  in_progress:'badge-in-progress', resolved:'badge-resolved', closed:'badge-closed',
};

export default function ReportDetailPanel() {
  const { id }    = useParams();
  const navigate  = useNavigate();

  const [report,        setReport]        = useState(null);
  const [history,       setHistory]       = useState([]);
  const [officers,      setOfficers]      = useState([]);
  const [newStatus,     setNewStatus]     = useState('');
  const [note,          setNote]          = useState('');
  const [assignTo,      setAssignTo]      = useState('');
  const [loading,       setLoading]       = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);
  const [error,         setError]         = useState('');
  const [success,       setSuccess]       = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      // Fetch single report via list endpoint filtered by… using direct call
      const [rRes, oRes] = await Promise.all([
        api.get(`/api/reports?page=1&limit=1`),  // will fetch by id via full list
        api.get('/api/reports?page=1&limit=200'), // fetch field officers from list (stub — will be replaced with dedicated endpoint)
      ]);

      // Find report by id in paginated list — temporary until dedicated GET /api/reports/:id
      const allRes = await api.get('/api/reports?limit=200');
      const found  = allRes.data.reports.find(r => r.id === parseInt(id, 10));
      if (!found) { setError('Report not found.'); setLoading(false); return; }
      setReport(found);
      setNewStatus(found.status);
      if (found.assigned_to_id) setAssignTo(found.assigned_to_id);


      // Fetch history via track endpoint (tracking_code needed)
      const trackRes = await api.get(`/api/reports/track/${found.tracking_code}`);
      setHistory(trackRes.data.history || []);

      // Fetch staff users from /api/auth/users
      try {
        const currentUser = JSON.parse(localStorage.getItem('sn_user') || '{}');
        const staffRes = await api.get('/api/auth/users');
        const staffUsers = staffRes.data.users || [];
        
        let assignable = [];
        if (currentUser?.role === 'field_officer') {
          // Field Officers delegate tasks to Sanitation Workers in their ward
          assignable = staffUsers.filter(u => u.role === 'sanitation_worker');
        } else {
          // System Admins can assign to Ward Officers or Sanitation Workers
          assignable = staffUsers.filter(
            u => u.role === 'field_officer' || u.role === 'sanitation_worker'
          );
        }
        setOfficers(assignable);
      } catch (e) {
        console.error('Failed to load staff users', e);
        setOfficers([]);
      }
    } catch (err) {
      if (err.response?.status === 401) { localStorage.clear(); navigate('/staff/login'); }
      setError('Failed to load report details.');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);


  useEffect(() => { load(); }, [load]);

  // ── Real-time WebSocket connection for live report updates ─────────────────
  useEffect(() => {
    const wsUrl = `ws://${window.location.hostname}:5000`;
    let socket;

    try {
      socket = new WebSocket(wsUrl);
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (['REPORT_STATUS_UPDATED', 'REPORT_ASSIGNED'].includes(data.type)) {
            load();
          }
        } catch {
          // ignore non-json ping/pong messages
        }
      };
    } catch (e) {
      console.error('WebSocket connection failed:', e);
    }

    return () => {
      if (socket) socket.close();
    };
  }, [load]);

  const [resolutionPhoto, setResolutionPhoto] = useState(null);

  const handleStatusUpdate = async e => {
    e.preventDefault();
    setStatusLoading(true); setError(''); setSuccess('');
    try {
      if (newStatus === 'resolved' && !resolutionPhoto && !report?.resolution_photo_path) {
        setError('A proof-of-work cleanup photo is required to mark this task as RESOLVED.');
        setStatusLoading(false);
        return;
      }

      if (resolutionPhoto) {
        const formData = new FormData();
        formData.append('status', newStatus);
        if (note) formData.append('note', note);
        formData.append('resolution_photo', resolutionPhoto);
        await updateReportStatus(id, formData);
      } else {
        await updateReportStatus(id, { status: newStatus, note });
      }

      setSuccess('Status updated successfully.');
      setNote('');
      setResolutionPhoto(null);
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update status.');
    } finally {
      setStatusLoading(false);
    }
  };

  const handleAssign = async e => {
    e.preventDefault();
    if (!assignTo) return setError('Select a field officer first.');
    setAssignLoading(true); setError(''); setSuccess('');
    try {
      await assignReport(id, assignTo);
      setSuccess('Report assigned successfully.');
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to assign report.');
    } finally {
      setAssignLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-on-surface-variant">Loading…</div>;

  return (
    <motion.div
      className="min-h-screen bg-surface-container-low"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
    >
      {/* Nav */}
      <motion.header
        className="bg-secondary text-on-secondary px-md md:px-xl py-md flex items-center gap-md shadow-card-admin"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      >
        <button
          onClick={() => navigate('/staff/dashboard')}
          className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-2 rounded-xl border border-white/20 transition-all active:scale-95 shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          Dashboard
        </button>

        <div className="flex-1 flex items-center gap-3 min-w-0">
          <h1 className="text-headline-md font-semibold truncate">Report Detail</h1>
          {report && (
            <span className="font-mono text-xs font-bold bg-white/15 text-white px-2.5 py-1 rounded-lg border border-white/20 tracking-widest shrink-0">
              {report.tracking_code}
            </span>
          )}
        </div>

        {report && (
          <span className={`${STATUS_BADGE[report.status]} shrink-0`}>
            {STATUS_LABEL[report.status]}
          </span>
        )}
      </motion.header>

      <div className="px-md md:px-xl py-md md:py-lg grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Left — report info + timeline */}
        <motion.div
          className="lg:col-span-2 flex flex-col gap-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 24, delay: 0.08 }}
        >
          <AnimatePresence>
            {(error || success) && (
              <motion.div
                className={`p-sm rounded-md text-label-md ${error ? 'bg-error-container text-on-error-container' : 'bg-primary/15 text-primary'}`}
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              >
                {error || success}
              </motion.div>
            )}
          </AnimatePresence>

          {report && (
            <div className="card-admin">
              <h2 className="text-headline-md mb-md">Report Info</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md text-body-md">
                <div className="flex flex-col pb-xs border-b border-outline-variant/30">
                  <span className="text-label-sm font-semibold text-outline uppercase tracking-wider">Category</span>
                  <span className="capitalize text-on-surface font-medium">{report.category.replace('_',' ')}</span>
                </div>
                <div className="flex flex-col pb-xs border-b border-outline-variant/30">
                  <span className="text-label-sm font-semibold text-outline uppercase tracking-wider">Ward</span>
                  <span className="text-on-surface font-medium">{report.ward || '—'}</span>
                </div>
                <div className="flex flex-col pb-xs border-b border-outline-variant/30 min-w-0">
                  <span className="text-label-sm font-semibold text-outline uppercase tracking-wider">Reporter Email</span>
                  <span className="text-on-surface font-medium truncate" title={report.reporter_email}>{report.reporter_email || '—'}</span>
                </div>
                <div className="flex flex-col pb-xs border-b border-outline-variant/30">
                  <span className="text-label-sm font-semibold text-outline uppercase tracking-wider">Location</span>
                  <span className="font-mono text-on-surface font-medium">{report.latitude?.toFixed(5)}, {report.longitude?.toFixed(5)}</span>
                </div>
                <div className="flex flex-col pb-xs border-b border-outline-variant/30">
                  <span className="text-label-sm font-semibold text-outline uppercase tracking-wider">Assigned To</span>
                  <span className="text-on-surface font-medium">{report.assigned_to_name || '—'}</span>
                </div>
                <div className="flex flex-col pb-xs border-b border-outline-variant/30">
                  <span className="text-label-sm font-semibold text-outline uppercase tracking-wider">Submitted</span>
                  <span className="text-on-surface font-medium">{new Date(report.created_at).toLocaleString()}</span>
                </div>
              </div>
              {report.description && (
                <div className="mt-md pt-md border-t border-outline-variant">
                  <p className="text-label-md text-outline mb-xs">Description</p>
                  <p className="text-body-md">{report.description}</p>
                </div>
              )}
              {/* Dispute Alert Banner */}
              {report.is_disputed && (
                <div className="mt-md p-md bg-error-container text-on-error-container rounded-xl border border-error/30 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    CITIZEN DISPUTED THIS RESOLUTION
                  </div>
                  <p className="text-xs">{report.dispute_reason}</p>
                </div>
              )}

              {/* Photos Comparison (Original vs Resolution Proof) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-md">
                {report.photo_path && (
                  <div>
                    <p className="text-label-sm font-semibold text-outline mb-xs uppercase tracking-wider">Original Citizen Photo</p>
                    <img
                      src={`/${report.photo_path}`}
                      alt="Report original photo"
                      className="w-full max-h-64 object-cover rounded-xl border border-outline-variant"
                    />
                  </div>
                )}
                {report.resolution_photo_path && (
                  <div>
                    <p className="text-label-sm font-semibold text-primary mb-xs uppercase tracking-wider flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Staff Proof-of-Work Photo
                    </p>
                    <img
                      src={`/${report.resolution_photo_path}`}
                      alt="Staff resolution proof photo"
                      className="w-full max-h-64 object-cover rounded-xl border-2 border-primary/40"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Status timeline */}
          <div className="card-admin">
            <h2 className="text-headline-md mb-md">Status Timeline</h2>
            {history.length === 0 ? (
              <p className="text-on-surface-variant text-label-md">No history yet.</p>
            ) : (
              <ol className="relative border-l border-outline-variant ml-sm">
                {history.map((h, i) => (
                  <li key={i} className="mb-md ml-lg last:mb-0">
                    <div className="absolute -left-[7px] mt-1 w-3.5 h-3.5 rounded-full bg-secondary border-2 border-white" />
                    <div className="flex items-center gap-sm mb-xs">
                      <span className={STATUS_BADGE[h.status]}>{STATUS_LABEL[h.status]}</span>
                      <span className="text-label-sm text-outline">{new Date(h.created_at).toLocaleString()}</span>
                    </div>
                    {h.note && <p className="text-body-md text-on-surface-variant">{h.note}</p>}
                    {h.changed_by_name && <p className="text-label-sm text-outline">by {h.changed_by_name}</p>}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </motion.div>

        {/* Right — actions */}
        <div className="flex flex-col gap-lg">
          {/* Update status */}
          <div className="card-admin">
            <h2 className="text-headline-md mb-xs">Update Status</h2>
            <p className="text-label-sm text-on-surface-variant mb-md">Select a new status to transition this report</p>

            <form onSubmit={handleStatusUpdate} className="flex flex-col gap-md">
              {/* Status step buttons */}
              <div className="flex flex-col gap-xs">
                {STATUSES.map((s) => {
                  const isCurrent = s === report?.status;
                  const isSelected = s === newStatus;
                  const statusStyles = {
                    submitted:    { bg: 'bg-outline-variant/20', activeBg: 'bg-outline-variant/40', ring: 'ring-outline', dot: 'bg-outline' },
                    acknowledged: { bg: 'bg-secondary/10', activeBg: 'bg-secondary/20', ring: 'ring-secondary', dot: 'bg-secondary' },
                    in_progress:  { bg: 'bg-tertiary/10', activeBg: 'bg-tertiary/20', ring: 'ring-tertiary', dot: 'bg-tertiary' },
                    resolved:     { bg: 'bg-primary/10', activeBg: 'bg-primary/20', ring: 'ring-primary', dot: 'bg-primary' },
                    closed:       { bg: 'bg-surface-container-high', activeBg: 'bg-surface-container-highest', ring: 'ring-outline-variant', dot: 'bg-outline-variant' },
                  };
                  const style = statusStyles[s] || statusStyles.submitted;

                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewStatus(s)}
                      className={`w-full flex items-center gap-sm px-md py-sm rounded-lg text-left transition-all text-label-md
                        ${isSelected
                          ? `${style.activeBg} ring-2 ${style.ring} font-semibold text-on-surface`
                          : `${style.bg} hover:brightness-95 text-on-surface-variant`
                        }`}
                    >
                      {/* Status dot */}
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${style.dot} ${isSelected ? 'scale-125' : 'opacity-60'} transition-transform`} />
                      <span className="flex-1">{STATUS_LABEL[s]}</span>
                      {isCurrent && (
                        <span className="text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full border border-outline-variant">
                          Current
                        </span>
                      )}
                      {isSelected && !isCurrent && (
                        <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Note field */}
              <div>
                <label className="input-label">Staff Note (optional)</label>
                <textarea
                  value={note} onChange={e => setNote(e.target.value)}
                  className="input-field resize-none min-h-[80px]"
                  placeholder="Explain the reason for this status change…"
                />
              </div>

              {/* Proof of Work Photo Input (Mandatory when resolving) */}
              {newStatus === 'resolved' && (
                <div className="bg-primary/10 border border-primary/30 p-md rounded-xl space-y-sm">
                  <label className="block text-label-md font-semibold text-primary flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Upload Proof-of-Work Photo (Required)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setResolutionPhoto(e.target.files[0])}
                    className="w-full text-xs text-on-surface file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-primary/90"
                  />
                  <p className="text-label-sm text-on-surface-variant">
                    Take a photo of the cleaned site. Camera GPS EXIF will be logged for verification audit.
                  </p>
                </div>
              )}

              {/* Submit button */}
              {(() => {
                const noChange = newStatus === report?.status && !note.trim();
                const btnColors = {
                  submitted:    'bg-outline hover:bg-outline/80',
                  acknowledged: 'bg-secondary hover:bg-secondary/90',
                  in_progress:  'bg-tertiary hover:bg-tertiary/90',
                  resolved:     'bg-primary hover:bg-primary/90',
                  closed:       'bg-on-surface-variant hover:bg-on-surface-variant/80',
                };
                return (
                  <button
                    type="submit"
                    disabled={statusLoading || noChange}
                    className={`w-full font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2
                      ${noChange
                        ? 'bg-surface-container-high text-on-surface-variant/50 cursor-not-allowed border border-outline-variant'
                        : `${btnColors[newStatus] || 'bg-primary hover:bg-primary/90'} text-white active:scale-[0.98]`
                      }
                      disabled:opacity-60`}
                  >
                    {statusLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Updating…
                      </>
                    ) : noChange ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Up to Date
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Update to {STATUS_LABEL[newStatus]}
                      </>
                    )}
                  </button>
                );
              })()}
            </form>
          </div>

          {/* Assign Panel — ONLY visible to Admin & Field Officer (Hidden for Sanitation Workers) */}
          {(() => {
            const currentUser = JSON.parse(localStorage.getItem('sn_user') || '{}');
            const isWorker = currentUser?.role === 'sanitation_worker';
            const isOfficer = currentUser?.role === 'field_officer';

            if (isWorker) return null; // Sanitation Workers cannot assign or delegate tasks!

            return (
              <div className="card-admin">
                <div className="flex items-center justify-between mb-md">
                  <h2 className="text-headline-md">{isOfficer ? 'Delegate Task' : 'Assign Staff'}</h2>
                  {report?.assigned_to_name && (
                    <span className="inline-flex items-center gap-1.5 bg-primary/15 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Assigned
                    </span>
                  )}
                </div>

                <form onSubmit={handleAssign} className="flex flex-col gap-md">
                  <div>
                    <label className="input-label">
                      {isOfficer ? 'Select Sanitation Field Worker' : 'Assigned Field Officer / Worker'}
                    </label>
                    <select value={assignTo} onChange={e => setAssignTo(e.target.value)} className="input-field">
                      <option value="">{isOfficer ? 'Select field worker…' : 'Select officer or staff…'}</option>
                      {officers.map(o => (
                        <option key={o.id} value={o.id}>
                          {o.name} ({o.role === 'field_officer' ? 'Officer' : 'Field Worker'}{o.ward ? ` - ${o.ward}` : ''})
                        </option>
                      ))}
                    </select>
                    {officers.length === 0 && (
                      <p className="text-label-sm text-on-surface-variant mt-xs">
                        {isOfficer
                          ? 'No field workers found in your ward. Ask Admin to register workers in Staff Management.'
                          : 'No staff registered yet. Add staff in the "Staff Management" panel.'}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={assignLoading || officers.length === 0 || !assignTo}
                    className={`w-full font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2
                      ${!assignTo || officers.length === 0
                        ? 'bg-surface-container-high text-on-surface-variant/50 cursor-not-allowed border border-outline-variant'
                        : report?.assigned_to_id && parseInt(assignTo, 10) === report?.assigned_to_id
                          ? 'bg-primary text-on-primary'
                          : 'bg-secondary text-on-secondary hover:brightness-110 active:scale-[0.98]'
                      }
                      disabled:opacity-60`}
                  >
                    {assignLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Updating…
                      </>
                    ) : report?.assigned_to_id ? (
                      parseInt(assignTo, 10) === report?.assigned_to_id ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Assigned to {report.assigned_to_name}
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          Reassign Officer
                        </>
                      )
                    ) : !assignTo ? (
                      'Select an Officer'
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Assign Officer
                      </>
                    )}
                  </button>
                </form>
              </div>
            );
          })()}

    </div>
  </div>
</motion.div>
  );
}
