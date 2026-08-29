import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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
  const user = JSON.parse(localStorage.getItem('sn_user') || 'null');
  const canDispatch = user?.role === 'admin' || user?.role === 'field_officer';

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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-stack-md md:p-stack-lg font-body-md">
      {/* Report Detail Panel Modal */}
      <div className="bg-surface-container-lowest w-full max-w-5xl max-h-[calc(100dvh-1rem)] md:max-h-[90vh] rounded-xl shadow-2xl flex flex-col md:flex-row overflow-y-auto md:overflow-hidden border border-outline-variant relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={() => navigate('/staff/dashboard')}
          className="absolute top-4 right-4 z-20 bg-surface-container-high/70 hover:bg-surface-container-highest p-2 rounded-full transition-colors text-on-surface"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Left Column: Visuals & Core Info */}
        <div className="w-full md:w-5/12 bg-surface-container-low border-b md:border-b-0 md:border-r border-outline-variant flex flex-col md:overflow-y-auto custom-scrollbar shrink-0">
          {/* Main Image */}
          <div className="w-full aspect-[4/3] bg-surface-dim relative group overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Report photo"
              src={report?.photo_path ? `/${report.photo_path}` : "https://lh3.googleusercontent.com/aida-public/AB6AXuCv0cSq4aXti1x9caH5sgb59JvGjaRA552wNhBlDAgRgqvFlaqJ4DnwC5NtkMTfZ8OhN4X4QhOhpF85vATYqtNJZF4wwhohss4SkaKwAa-NoAuo92ddITbSA1eNecs3BFguYoNpZJXPQKu2tcltPGpNN81J7w_3byro4DlqoXrW-xUzaCbt2vQ7sLds2q3irz6G17AkVb61Y__8k-iWTUc0g9Rhs9rVgHjvNHIeCN_tg-YLCEumJyogob9VTwtP8Z1Zfh2X6r-z-BA"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="bg-white/95 text-primary font-label-caps text-label-caps px-3 py-1 rounded-full flex items-center gap-1 shadow-md font-semibold capitalize">
                  <span className="material-symbols-outlined text-[14px]">cleaning_services</span>
                  {report?.category?.replace('_', ' ') || 'Waste Management'}
                </span>
                <StatusChip status={report?.status} className="bg-white/95" />
              </div>
              <span className="bg-black/40 backdrop-blur-sm text-white font-label-caps text-label-caps px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider">
                #{report?.id}
              </span>
            </div>
          </div>

          {/* Detailed Info */}
          <div className="p-stack-lg space-y-stack-lg">
            {/* Identity card */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-stack-md space-y-stack-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Report #{report?.tracking_code}
                </h3>
                <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>report</span>
              </div>
              <div className="grid grid-cols-1 gap-2 pt-2">
                <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md">
                  <span className="w-7 h-7 rounded-lg bg-primary-container/15 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                  </span>
                  Ward: {report?.ward || 'General Area'}
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md">
                  <span className="w-7 h-7 rounded-lg bg-primary-container/15 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                  </span>
                  Reported: {new Date(report?.created_at).toLocaleString()}
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md">
                  <span className="w-7 h-7 rounded-lg bg-primary-container/15 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px] text-primary">badge</span>
                  </span>
                  Assigned: {report?.assigned_to_name || 'Unassigned'}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-stack-md">
              <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">notes</span>
                Description
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {report?.description || 'No detailed description submitted.'}
              </p>
            </div>

            {/* Live Location Map */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 overflow-hidden">
              <div className="flex items-center justify-between px-stack-md py-stack-sm border-b border-outline-variant/30">
                <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-wider font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">map</span>
                  Live Location
                </h4>
                <span className="font-label-caps text-label-caps bg-tertiary-fixed-dim/20 text-tertiary-container px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
                  Live
                </span>
              </div>
              {report?.latitude && report?.longitude ? (
                <MapContainer
                  center={[report.latitude, report.longitude]}
                  zoom={15}
                  className="w-full h-52 z-0"
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <CircleMarker
                    center={[report.latitude, report.longitude]}
                    radius={10}
                    pathOptions={{ color: '#005440', fillColor: '#6adab4', weight: 3, fillOpacity: 0.7 }}
                  >
                    <Tooltip direction="top" offset={[0, -10]}>
                      <div className="font-label-caps text-label-caps">
                        <strong>{report.tracking_code}</strong>
                        <br />
                        Ward {report.ward || '—'}
                      </div>
                    </Tooltip>
                  </CircleMarker>
                </MapContainer>
              ) : (
                <div className="h-40 flex flex-col items-center justify-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-3xl text-outline">map</span>
                  <p className="font-label-caps text-label-caps">No GPS coordinates recorded</p>
                </div>
              )}
              <div className="flex items-center justify-between px-stack-md py-stack-sm bg-surface-container-lowest border-t border-outline-variant/30">
                <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Coordinates</span>
                <span className="font-mono text-xs text-primary font-bold">
                  {report?.latitude && report?.longitude
                    ? `${Number(report.latitude).toFixed(5)}, ${Number(report.longitude).toFixed(5)}`
                    : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Operations & Workflow */}
        <div className="w-full md:w-7/12 flex flex-col h-full md:overflow-y-auto custom-scrollbar">
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

              {canDispatch && (
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
              )}
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
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-stack-md pt-stack-lg border-t border-outline-variant">
              <button
                onClick={() => navigate('/staff/dashboard')}
                className="w-full sm:w-auto px-stack-lg py-stack-md text-secondary font-button text-button hover:bg-secondary/5 rounded-lg border border-secondary font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={saving}
                className="w-full sm:w-auto px-stack-lg py-stack-md bg-primary-container text-on-primary font-button text-button rounded-lg shadow-md hover:opacity-90 active:scale-[0.98] transition-all font-bold disabled:opacity-50"
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
