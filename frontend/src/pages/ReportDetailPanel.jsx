import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateReportStatus, assignReport } from '../services/api';
import api from '../services/api';
import { StatusChip } from '../components/StatusChip';

const STATUS_STEPS = ['submitted', 'acknowledged', 'in_progress', 'resolved', 'closed'];

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
  const [saving,        setSaving]        = useState(false);
  const [error,         setError]         = useState('');
  const [success,       setSuccess]       = useState('');
  const [resolutionPhoto, setResolutionPhoto] = useState(null);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const allRes = await api.get('/api/reports?limit=200');
      const found  = allRes.data.reports.find(r => r.id === parseInt(id, 10));
      if (!found) { setError('Report not found.'); setLoading(false); return; }
      setReport(found);
      setNewStatus(found.status);
      if (found.assigned_to_id) setAssignTo(found.assigned_to_id);

      const trackRes = await api.get(`/api/reports/track/${found.tracking_code}`);
      setHistory(trackRes.data.history || []);

      try {
        const staffRes = await api.get('/api/auth/users');
        setOfficers(staffRes.data.users || []);
      } catch {
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

  const handleSaveChanges = async () => {
    setSaving(true); setError(''); setSuccess('');
    try {
      if (newStatus === 'resolved' && !resolutionPhoto && !report?.resolution_photo_path) {
        setError('A proof-of-work photo is required to mark this task as Resolved.');
        setSaving(false);
        return;
      }

      if (assignTo && parseInt(assignTo, 10) !== report?.assigned_to_id) {
        await assignReport(id, assignTo);
      }

      if (newStatus !== report?.status || note.trim() || resolutionPhoto) {
        if (resolutionPhoto) {
          const formData = new FormData();
          formData.append('status', newStatus);
          if (note) formData.append('note', note);
          formData.append('resolution_photo', resolutionPhoto);
          await updateReportStatus(id, formData);
        } else {
          await updateReportStatus(id, { status: newStatus, note });
        }
      }

      setSuccess('Changes saved successfully.');
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center text-on-primary font-button text-button">
        Loading Report Details...
      </div>
    );
  }

  const currentStepIdx = STATUS_STEPS.indexOf(report?.status || 'submitted');

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-stack-md md:p-stack-lg font-body-md">
      {/* Report Detail Panel Modal */}
      <div className="bg-surface-container-lowest w-full max-w-5xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-outline-variant relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={() => navigate('/staff/dashboard')}
          className="absolute top-4 right-4 z-20 bg-surface-container-high/70 hover:bg-surface-container-highest p-2 rounded-full transition-colors text-on-surface"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Left Column: Visuals & Core Info */}
        <div className="w-full md:w-5/12 bg-surface-container-low border-r border-outline-variant flex flex-col overflow-y-auto custom-scrollbar">
          {/* Main Image */}
          <div className="w-full aspect-[4/3] bg-surface-dim relative group overflow-hidden">
            <img
              className="w-full h-full object-cover"
              alt="Report photo"
              src={report?.photo_path ? `/${report.photo_path}` : "https://lh3.googleusercontent.com/aida-public/AB6AXuCv0cSq4aXti1x9caH5sgb59JvGjaRA552wNhBlDAgRgqvFlaqJ4DnwC5NtkMTfZ8OhN4X4QhOhpF85vATYqtNJZF4wwhohss4SkaKwAa-NoAuo92ddITbSA1eNecs3BFguYoNpZJXPQKu2tcltPGpNN81J7w_3byro4DlqoXrW-xUzaCbt2vQ7sLds2q3irz6G17AkVb61Y__8k-iWTUc0g9Rhs9rVgHjvNHIeCN_tg-YLCEumJyogob9VTwtP8Z1Zfh2X6r-z-BA"}
            />
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="bg-primary/90 text-on-primary font-label-caps text-label-caps px-3 py-1 rounded-full flex items-center gap-1 shadow-md font-semibold capitalize">
                <span className="material-symbols-outlined text-[14px]">cleaning_services</span>
                {report?.category?.replace('_', ' ') || 'Waste Management'}
              </span>
              <StatusChip status={report?.status} className="bg-white/90" />
            </div>
          </div>

          {/* Detailed Info */}
          <div className="p-stack-lg space-y-stack-lg">
            <div className="space-y-stack-sm">
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Report #{report?.tracking_code}
              </h3>
              <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
                Ward: {report?.ward || 'General Area'}
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
                Reported: {new Date(report?.created_at).toLocaleString()}
              </div>
            </div>

            <div className="bg-surface rounded-lg p-stack-md border border-outline-variant space-y-stack-sm">
              <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-wider font-semibold">Description</h4>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {report?.description || 'No detailed description submitted.'}
              </p>
            </div>

            {/* Location Marker */}
            <div className="space-y-stack-sm">
              <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-wider font-semibold">Location Marker</h4>
              <div className="h-32 w-full bg-surface-variant rounded-lg border border-outline-variant overflow-hidden">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBX8TvjWhbd2mSUpQNFlYe9zHKyoFsyB-b5GMpzQor2CKOanovevtLO0vYzfMib4YfGu5Ri4WA_k4ELH3KXN049n2BnqTcd6tw_5bW3c7pwkQym28Hb-g5GI4-OjGAhxuaDyKdagJPB9l3mtIAlEcJxsAM3R9Ct7Cay__mseW2Pdr8VywSQnlmmZKAsX1d9t8KO7hgiC5A6zYYSLDveS2Plo4zu_Vqw9ETdRKNTHL8d9spckjDI9Obeu5Mv0kMrX5R_zpEGGz6jymo')` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Operations & Workflow */}
        <div className="w-full md:w-7/12 flex flex-col h-full overflow-y-auto custom-scrollbar">
          {/* Header Actions */}
          <div className="p-stack-lg border-b border-outline-variant flex flex-wrap gap-stack-md items-center justify-between sticky top-0 bg-surface-container-lowest z-10">
            <div>
              <p className="font-label-caps text-label-caps text-outline uppercase font-bold">Workstream Activity</p>
              <h2 className="font-headline-md text-headline-md font-bold text-primary">Resolution Workflow</h2>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-button text-button px-stack-md py-stack-sm rounded-lg transition-colors flex items-center gap-stack-sm border border-outline-variant font-semibold"
            >
              <span className="material-symbols-outlined">print</span>
              Export
            </button>
          </div>

          <div className="p-stack-lg space-y-stack-lg">
            {(error || success) && (
              <div className={`p-stack-md rounded-xl font-button text-button font-semibold ${error ? 'bg-error-container text-on-error-container' : 'bg-primary-container text-on-primary'}`}>
                {error || success}
              </div>
            )}

            {/* Status Stepper */}
            <div className="relative">
              <h4 className="font-label-caps text-label-caps text-outline uppercase mb-stack-lg font-bold">Status History</h4>
              <div className="space-y-0">
                {STATUS_STEPS.map((step, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div key={step} className={`flex gap-stack-md ${idx > currentStepIdx ? 'opacity-40' : ''}`}>
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          isCurrent
                            ? 'bg-primary-container text-on-primary border-2 border-primary'
                            : isDone
                              ? 'bg-primary text-on-primary'
                              : 'bg-surface-container-highest border border-outline text-outline'
                        }`}>
                          {isDone ? <span className="material-symbols-outlined text-[18px]">check</span> : <span className="material-symbols-outlined text-[18px]">radio_button_unchecked</span>}
                        </div>
                        {idx < STATUS_STEPS.length - 1 && (
                          <div className={`w-0.5 h-12 ${isDone ? 'bg-primary' : 'bg-outline-variant'}`}></div>
                        )}
                      </div>
                      <div className="pb-stack-lg">
                        <p className={`font-button text-button capitalize font-bold ${isCurrent ? 'text-primary' : 'text-on-surface'}`}>
                          {step.replace('_', ' ')}
                        </p>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          {isDone ? 'Verified step' : 'Pending step'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Operational Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-lg pt-stack-lg border-t border-outline-variant">
              <div className="space-y-stack-sm">
                <label className="block font-button text-button text-on-surface font-semibold">Update Status</label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline text-on-surface rounded-lg px-stack-md py-stack-md outline-none focus:ring-2 focus:ring-tertiary-fixed-dim font-body-md text-body-md"
                >
                  <option value="submitted">Submitted</option>
                  <option value="acknowledged">Acknowledged</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="space-y-stack-sm">
                <label className="block font-button text-button text-on-surface font-semibold">Assign Cleanup Team</label>
                <select
                  value={assignTo}
                  onChange={e => setAssignTo(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline text-on-surface rounded-lg px-stack-md py-stack-md outline-none focus:ring-2 focus:ring-tertiary-fixed-dim font-body-md text-body-md"
                >
                  <option value="">Select Staff Member...</option>
                  {officers.map(o => (
                    <option key={o.id} value={o.id}>
                      {o.name} ({o.role.replace('_', ' ')})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Photo upload if resolving */}
            {newStatus === 'resolved' && (
              <div className="space-y-stack-sm bg-primary/10 p-stack-md rounded-xl border border-primary/20">
                <label className="block font-button text-button text-primary font-bold">Proof-of-Work Photo (Required for Resolution)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setResolutionPhoto(e.target.files[0])}
                  className="w-full font-body-md text-body-md text-on-surface cursor-pointer"
                />
              </div>
            )}

            {/* Internal Notes */}
            <div className="space-y-stack-sm">
              <label className="block font-button text-button text-on-surface font-semibold">Add Internal Note</label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                className="w-full bg-surface-container-low border border-outline text-on-surface rounded-lg px-stack-md py-stack-md outline-none focus:ring-2 focus:ring-tertiary-fixed-dim font-body-md text-body-md"
                placeholder="Add administrative details or instructions for the team..."
                rows={3}
              />
            </div>

            {/* Final Action Row */}
            <div className="flex justify-end gap-stack-md pt-stack-lg border-t border-outline-variant">
              <button
                onClick={() => navigate('/staff/dashboard')}
                className="px-stack-lg py-stack-md text-secondary font-button text-button hover:bg-secondary/5 rounded-lg border border-secondary font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={saving}
                className="px-stack-lg py-stack-md bg-primary-container text-on-primary font-button text-button rounded-lg shadow-md hover:opacity-90 active:scale-[0.98] transition-all font-bold disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}