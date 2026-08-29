import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { listReports, updateReportStatus } from '../services/api';
import StaffSidebar from '../components/StaffSidebar';
import StaffHeader from '../components/StaffHeader';
import { StatusChip, relativeTime } from '../components/StatusChip';

const MAP_STYLE = {
  submitted:    { color: '#717975', fillColor: '#717975' },
  acknowledged: { color: '#3a675a', fillColor: '#3a675a' },
  in_progress:  { color: '#6adab4', fillColor: '#6adab4' },
  resolved:     { color: '#0b3d32', fillColor: '#0b3d32' },
  closed:       { color: '#c0c8c4', fillColor: '#c0c8c4' },
};

const LEGEND = [
  { color: '#717975', label: 'Submitted' },
  { color: '#3a675a', label: 'Acknowledged' },
  { color: '#6adab4', label: 'In Progress' },
  { color: '#0b3d32', label: 'Resolved' },
  { color: '#c0c8c4', label: 'Closed' },
];

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: i => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function StaffDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('sn_user') || 'null');

  const [reports,      setReports]      = useState([]);
  const [total,        setTotal]        = useState(0);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery,  setSearchQuery]  = useState('');
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const fetchReports = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const statusParam = activeFilter === 'ALL' ? '' : activeFilter.toLowerCase();
      const res = await listReports({ status: statusParam, limit: 100 });
      setReports(res.data.reports);
      setTotal(res.data.total);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate('/staff/login');
      } else {
        setError('Failed to load reports.');
      }
    } finally {
      setLoading(false);
    }
  }, [activeFilter, navigate]);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  useEffect(() => {
    const token = localStorage.getItem('sn_token');
    if (!token) return undefined;
    const wsProto = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const wsUrl = `${wsProto}://${window.location.hostname}${window.location.port ? `:${window.location.port}` : ':5000'}`;
    let socket;
    try {
      socket = new WebSocket(wsUrl, ['bearer', token]);
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (['REPORT_SUBMITTED', 'REPORT_STATUS_UPDATED', 'REPORT_ASSIGNED'].includes(data.type)) {
            fetchReports();
            if (data.type === 'REPORT_SUBMITTED') {
              setToastMessage(`New Report #${data.report?.tracking_code || 'SN-NEW'}`);
              setTimeout(() => setToastMessage(null), 5000);
            }
          }
        } catch {}
      };
    } catch (e) {
      console.error('WebSocket failed:', e);
    }
    return () => { if (socket) socket.close(); };
  }, [fetchReports]);

  const handleStatusChange = async (reportId, newStatus, e) => {
    e.stopPropagation();
    try {
      await updateReportStatus(reportId, newStatus, 'Status updated via dashboard');
      fetchReports();
    } catch {
      alert('Failed to update status');
    }
  };

  const filteredReports = reports.filter(r => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return r.tracking_code.toLowerCase().includes(q) ||
      (r.description && r.description.toLowerCase().includes(q)) ||
      (r.ward && r.ward.toLowerCase().includes(q));
  });

  const mapReports = filteredReports.filter(r => r.latitude && r.longitude);
  const stats = {
    total: reports.length,
    active: reports.filter(r => !['resolved', 'closed'].includes(r.status)).length,
    resolved: reports.filter(r => r.status === 'resolved').length,
    pending: reports.filter(r => r.status === 'submitted').length,
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      <StaffSidebar user={user} />
      <StaffHeader user={user} />

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            className="fixed top-20 right-4 z-[100] bg-surface-container-lowest text-on-surface px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-primary-fixed-dim/40"
          >
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse" />
            <div>
              <p className="font-button text-button font-bold">Live Alert</p>
              <p className="font-body-md text-body-md text-on-surface-variant">{toastMessage}</p>
            </div>
            <button className="ml-2 opacity-40 hover:opacity-100 transition-opacity" onClick={() => setToastMessage(null)}>
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="md:pl-64 pt-20 flex flex-col lg:flex-row">
        {/* Left Panel */}
        <section className="w-full lg:w-[480px] xl:w-[520px] flex flex-col bg-surface-container-lowest/60 border-r border-outline-variant/30 shrink-0">
          {/* Stats Row */}
          <div className="px-margin-mobile pt-5 pb-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { label: 'Total', value: stats.total, icon: 'assignment', tone: 'text-primary' },
              { label: 'Active', value: stats.active, icon: 'pending_actions', tone: 'text-secondary' },
              { label: 'Resolved', value: stats.resolved, icon: 'check_circle', tone: 'text-tertiary-container' },
              { label: 'Pending', value: stats.pending, icon: 'hourglass_empty', tone: 'text-outline' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="data-card p-stack-md"
              >
                <span className={`material-symbols-outlined text-[20px] ${s.tone}`} style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                <p className="font-display-lg-mobile text-[26px] font-extrabold text-primary mt-1">{s.value}</p>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Search + Filter */}
          <div className="px-margin-mobile pb-3 space-y-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/60 focus:border-tertiary-fixed-dim focus:ring-2 focus:ring-tertiary-fixed-dim/20 outline-none transition-all font-body-md text-body-md placeholder:text-outline"
                placeholder="Search by code, ward, or description..."
                type="text"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {['ALL', 'SUBMITTED', 'ACKNOWLEDGED', 'IN_PROGRESS', 'RESOLVED'].map(st => (
                <button
                  key={st}
                  onClick={() => setActiveFilter(st)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-caps text-label-caps transition-all duration-200 ${
                    activeFilter === st
                      ? 'bg-primary-container text-on-primary shadow-md'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/40'
                  }`}
                >
                  {st === 'ALL' ? 'All' : st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Report List */}
          <div className="flex-1 overflow-y-auto px-margin-mobile pb-5 space-y-3">
            {loading ? (
              <div className="space-y-3 pt-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-surface-container-low rounded-xl p-4 animate-pulse border border-outline-variant/40">
                    <div className="h-3 w-24 bg-surface-container-high rounded mb-3" />
                    <div className="h-4 w-40 bg-surface-container-high rounded mb-2" />
                    <div className="h-3 w-full bg-surface-container-high rounded" />
                  </div>
                ))}
              </div>
            ) : filteredReports.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                <span className="material-symbols-outlined text-5xl text-outline mb-3">inbox</span>
                <p className="font-button text-button text-on-surface-variant">No reports found</p>
                <p className="font-body-md text-body-md text-outline mt-1">Try adjusting your search or filter</p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredReports.map((r, idx) => (
                  <motion.div
                    key={r.id}
                    layout
                    initial="hidden"
                    animate="show"
                    custom={idx}
                    variants={staggerItem}
                    onClick={() => {
                      setSelectedReportId(r.id);
                      navigate(`/staff/reports/${r.id}`);
                    }}
                    className={`card-base p-4 cursor-pointer group hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 ${
                      selectedReportId === r.id ? 'border-tertiary-fixed-dim ring-2 ring-tertiary-fixed-dim/20' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-primary tracking-wide">{r.tracking_code}</span>
                      </div>
                      <StatusChip status={r.status} />
                    </div>

                    <h3 className="font-button text-button font-bold text-on-surface mb-1 group-hover:text-primary transition-colors capitalize">
                      {r.category.replace('_', ' ')}
                      {r.ward && <span className="font-normal text-on-surface-variant"> — Ward {r.ward}</span>}
                    </h3>

                    <p className="font-body-md text-body-md text-on-surface-variant/80 line-clamp-1 mb-3">
                      {r.description || 'No description'}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center">
                          <span className="material-symbols-outlined text-[12px] text-on-surface-variant">person</span>
                        </div>
                        <span className="font-label-caps text-label-caps text-on-surface-variant">{r.assigned_to_name || 'Unassigned'}</span>
                      </div>
                      <span className="font-label-caps text-label-caps text-outline">{relativeTime(r.created_at)}</span>
                    </div>

                    <div className="mt-3">
                      <select
                        value={r.status}
                        onChange={(e) => handleStatusChange(r.id, e.target.value, e)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full font-label-caps text-label-caps bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-primary cursor-pointer outline-none transition-all hover:border-tertiary-fixed-dim"
                      >
                        <option value="submitted">Submitted</option>
                        <option value="acknowledged">Acknowledged</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </section>

        {/* Right Panel - Real Map */}
        <section className="flex-1 relative bg-surface-container hidden lg:block overflow-hidden lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]">
          {/* Floating Filter Bar */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-[500] flex items-center gap-1.5 bg-surface-container-lowest/90 backdrop-blur-xl p-1.5 rounded-full shadow-xl border border-outline-variant/40">
            {['ALL', 'SUBMITTED', 'ACKNOWLEDGED', 'IN_PROGRESS', 'RESOLVED'].map(st => (
              <button
                key={st}
                onClick={() => setActiveFilter(st)}
                className={`px-3.5 py-1.5 rounded-full font-label-caps text-label-caps transition-all duration-200 ${
                  activeFilter === st
                    ? 'bg-primary-container text-on-primary shadow-lg'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                {st === 'ALL' ? 'All' : st.replace('_', ' ')}
              </button>
            ))}
          </div>

          {mapReports.length > 0 ? (
            <MapContainer
              center={[mapReports[0].latitude, mapReports[0].longitude]}
              zoom={13}
              className="w-full h-full z-0"
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mapReports.map(rep => (
                <CircleMarker
                  key={rep.id}
                  center={[rep.latitude, rep.longitude]}
                  radius={9}
                  pathOptions={{ ...MAP_STYLE[rep.status] || MAP_STYLE.submitted, weight: 2, fillOpacity: 0.65 }}
                  eventHandlers={{ click: () => navigate(`/staff/reports/${rep.id}`) }}
                >
                  <Tooltip>
                    <div className="font-label-caps text-label-caps">
                      <strong>{rep.tracking_code}</strong>
                      <br />
                      {rep.category.replace('_', ' ')} — Ward {rep.ward || '?'}
                      <br />
                      {rep.assigned_to_name || 'Unassigned'}
                    </div>
                  </Tooltip>
                </CircleMarker>
              ))}
            </MapContainer>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center opacity-50">
              <span className="material-symbols-outlined text-6xl text-outline mb-3">map</span>
              <p className="font-button text-button text-on-surface-variant">No geo-tagged reports to display</p>
            </div>
          )}

          {/* Bottom Right - Legend */}
          <div className="absolute bottom-5 right-5 z-[500] flex flex-col gap-3">
            <div className="bg-surface-container-lowest/90 backdrop-blur-xl p-4 rounded-xl shadow-xl border border-outline-variant/40 w-44">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-sm text-primary">map</span>
                <h4 className="font-label-caps text-label-caps font-bold text-on-surface uppercase tracking-wider">Legend</h4>
              </div>
              <div className="space-y-2">
                {LEGEND.map(l => (
                  <div key={l.label} className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: l.color }} />
                    <span className="font-label-caps text-label-caps text-on-surface-variant">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-container text-on-primary p-4 rounded-xl shadow-xl flex items-center gap-3">
              <div className="flex-1">
                <p className="font-label-caps text-label-caps opacity-80 font-bold uppercase tracking-widest">Network</p>
                <p className="font-button text-button font-bold">System Optimal</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse shadow-lg shadow-tertiary-fixed/50" />
            </div>
          </div>
        </section>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-md border-t border-outline-variant/30 md:hidden">
        <div className="flex justify-around items-center h-14">
          <Link to="/staff/dashboard" className="flex flex-col items-center gap-0.5 text-primary">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            <span className="font-label-caps text-[10px]">Dashboard</span>
          </Link>
          <Link to="/staff/reports" className="flex flex-col items-center gap-0.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">assessment</span>
            <span className="font-label-caps text-[10px]">Reports</span>
          </Link>
          <Link to="/staff/wards" className="flex flex-col items-center gap-0.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">leaderboard</span>
            <span className="font-label-caps text-[10px]">Wards</span>
          </Link>
          <Link to="/" className="flex flex-col items-center gap-0.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">public</span>
            <span className="font-label-caps text-[10px]">Citizen</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
