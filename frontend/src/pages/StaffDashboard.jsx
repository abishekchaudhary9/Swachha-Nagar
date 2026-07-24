// Page: Staff Dashboard
// Dynamic role-tailored interface (Admin vs Ward Officer vs Field Worker)
import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { listReports } from '../services/api';
import { ThemeToggle } from '../context/ThemeContext';

// Animation variants
const fadeUp   = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const rowVariant = { hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 28 } } };

const STATUSES   = ['submitted','acknowledged','in_progress','resolved','closed'];
const CATEGORIES = ['organic','plastic','e_waste','construction','other'];

const STATUS_BADGE = {
  submitted:    'badge-submitted',
  acknowledged: 'badge-acknowledged',
  in_progress:  'badge-in-progress',
  resolved:     'badge-resolved',
  closed:       'badge-closed',
};
const STATUS_LABEL = {
  submitted:'Submitted', acknowledged:'Acknowledged',
  in_progress:'In Progress', resolved:'Resolved', closed:'Closed',
};

export default function StaffDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('sn_user') || 'null');

  const [reports,  setReports]  = useState([]);
  const [total,    setTotal]    = useState(0);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [filters,  setFilters]  = useState({
    status: '', category: '', ward: '', date_from: '', date_to: '',
  });
  const [page, setPage] = useState(1);

  const fetchReports = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await listReports({ ...filters, page, limit: 20 });
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
  }, [filters, page, navigate]);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  // ── Real-time WebSocket connection ─────────────────────────────────────────
  useEffect(() => {
    // If backend is on standard HTTP/WS, connect via ws://
    const wsUrl = `ws://${window.location.hostname}:5000`;
    let socket;

    try {
      socket = new WebSocket(wsUrl);
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (['REPORT_SUBMITTED', 'REPORT_STATUS_UPDATED', 'REPORT_ASSIGNED'].includes(data.type)) {
            fetchReports();
          }
        } catch {
          // ignore non-json
        }
      };
    } catch (e) {
      console.error('WebSocket connection failed:', e);
    }

    return () => {
      if (socket) socket.close();
    };
  }, [fetchReports]);

  const handleFilter = e => {
    setFilters(f => ({ ...f, [e.target.name]: e.target.value }));
    setPage(1);
  };

  const handleLogout = () => {
    localStorage.removeItem('sn_token');
    localStorage.removeItem('sn_user');
    navigate('/staff/login');
  };

  const role = user?.role || 'sanitation_worker';

  // Role Header Metadata
  const roleTitle = {
    admin: 'City Command & Operations Dashboard',
    field_officer: `Ward Control Center ${user?.ward ? `(${user.ward})` : ''}`,
    sanitation_worker: 'Field Cleanup Tasks',
  }[role] ?? 'Dashboard';

  const roleSubtitle = {
    admin: 'City-wide governance, staff management, and system analytics',
    field_officer: `Managing & delegating civic issues for ${user?.ward || 'your ward'}`,
    sanitation_worker: 'Your assigned cleanup tasks and location work orders',
  }[role] ?? '';

  // Skeleton loading rows
  const SkeletonRows = () => (
    <>
      {[...Array(6)].map((_, i) => (
        <tr key={i} className="border-b border-outline-variant/30">
          <td className="py-sm px-md"><div className="skeleton h-4 w-16" style={{ animationDelay: `${i * 0.05}s` }} /></td>
          <td className="py-sm px-md"><div className="skeleton h-4 w-20" style={{ animationDelay: `${i * 0.05}s` }} /></td>
          <td className="py-sm px-md hidden sm:table-cell"><div className="skeleton h-4 w-12" style={{ animationDelay: `${i * 0.05}s` }} /></td>
          <td className="py-sm px-md"><div className="skeleton h-4 w-24" style={{ animationDelay: `${i * 0.05}s` }} /></td>
          <td className="py-sm px-md hidden md:table-cell"><div className="skeleton h-4 w-28" style={{ animationDelay: `${i * 0.05}s` }} /></td>
          <td className="py-sm px-md hidden lg:table-cell"><div className="skeleton h-4 w-20" style={{ animationDelay: `${i * 0.05}s` }} /></td>
          <td className="py-sm px-md text-right"><div className="skeleton h-4 w-16 ml-auto" style={{ animationDelay: `${i * 0.05}s` }} /></td>
        </tr>
      ))}
    </>
  );

  return (
    <motion.div
      className="min-h-screen bg-surface-container-low"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      {/* ── Top Nav ───────────────────────────────────────────────────────── */}
      <motion.header
        className="bg-secondary text-on-secondary px-md md:px-xl py-md flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-card-admin"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 25 }}
      >
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-headline-md font-semibold">{roleTitle}</h1>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/20">
              {role === 'admin' ? 'System Admin' : role === 'field_officer' ? 'Ward Officer' : 'Field Worker'}
            </span>
          </div>
          <p className="text-label-md opacity-80 mt-0.5">{user?.name} · {roleSubtitle}</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <ThemeToggle />
          
          {/* Admin Exclusive Button */}
          {role === 'admin' && (
            <Link 
              to="/staff/users" 
              className="inline-flex items-center gap-2 bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-emerald-400/30 transition-all shadow-sm active:scale-95 hover:shadow-emerald-500/20"
            >
              <svg className="w-4 h-4 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Manage Staff Users</span>
            </Link>
          )}

          {/* Admin & Officer Analytics Link */}
          {(role === 'admin' || role === 'field_officer') && (
            <Link 
              to="/staff/analytics" 
              className="inline-flex items-center gap-2 bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-indigo-400/30 transition-all shadow-sm active:scale-95 hover:shadow-indigo-500/20"
            >
              <svg className="w-4 h-4 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 002 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
              </svg>
              <span>Analytics</span>
            </Link>
          )}

          <button 
            onClick={handleLogout} 
            className="inline-flex items-center gap-1.5 bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-rose-400/30 transition-all shadow-sm active:scale-95"
          >
            <svg className="w-4 h-4 text-rose-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </motion.header>

      <motion.div className="px-md md:px-xl py-md md:py-lg space-y-lg" variants={container} initial="hidden" animate="show">
        {/* ── Filters ────────────────────────────────────────────────────── */}
        <motion.div className="card-admin" variants={fadeUp}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-sm">
            <select name="status" value={filters.status} onChange={handleFilter} className="input-field text-label-md">
              <option value="">All Statuses</option>
              {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
            </select>
            <select name="category" value={filters.category} onChange={handleFilter} className="input-field text-label-md">
              <option value="">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c.replace('_',' ')}</option>)}
            </select>

            {/* Ward input only editable by Admin */}
            {role === 'admin' ? (
              <input name="ward" value={filters.ward} onChange={handleFilter} className="input-field text-label-md" placeholder="Search Ward…" />
            ) : (
              <div className="input-field text-label-md bg-surface-container flex items-center text-on-surface-variant italic">
                {role === 'field_officer' ? `Ward: ${user?.ward || 'Assigned Ward'}` : 'My Assigned Work'}
              </div>
            )}

            <input name="date_from" type="date" value={filters.date_from} onChange={handleFilter} className="input-field text-label-md" />
            <input name="date_to"   type="date" value={filters.date_to}   onChange={handleFilter} className="input-field text-label-md" />
          </div>
        </motion.div>

        {/* Error Notification */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="p-sm rounded-md bg-error-container text-on-error-container text-label-md"
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            >{error}</motion.div>
          )}
        </AnimatePresence>

        {/* Total Count Header */}
        <motion.p className="text-label-md text-on-surface-variant font-medium" variants={fadeUp}>
          {loading ? 'Loading…' : `${total} ${role === 'sanitation_worker' ? 'assigned task' : 'report'}${total !== 1 ? 's' : ''} found`}
        </motion.p>

        {/* ── Report Table ──────────────────────────────────────────────────────── */}
        <motion.div className="card-admin overflow-x-auto" variants={fadeUp}>
          <table className="w-full text-body-md border-collapse">
            <thead>
              <tr className="border-b border-outline-variant text-label-sm text-outline uppercase tracking-wider">
                <th className="text-left py-sm px-md">Code</th>
                <th className="text-left py-sm px-md">Category</th>
                <th className="text-left py-sm px-md hidden sm:table-cell">Ward</th>
                <th className="text-left py-sm px-md">Status</th>
                <th className="text-left py-sm px-md hidden md:table-cell">{role === 'sanitation_worker' ? 'Assigned Worker' : 'Assigned To'}</th>
                <th className="text-left py-sm px-md hidden lg:table-cell">Date</th>
                <th className="text-right py-sm px-md">Action</th>
              </tr>
            </thead>
            <motion.tbody variants={container} initial="hidden" animate="show">
              {loading ? <SkeletonRows /> : (
                <>
                  {reports.map((r) => (
                    <motion.tr
                      key={r.id}
                      variants={rowVariant}
                      onClick={() => navigate(`/staff/reports/${r.id}`)}
                      className="border-b border-outline-variant/40 cursor-pointer"
                      whileHover={{ backgroundColor: 'rgba(80,73,200,0.05)', x: 2 }}
                      transition={{ duration: 0.12 }}
                    >
                      <td className="py-sm px-md font-mono text-label-md text-secondary font-semibold">{r.tracking_code}</td>
                      <td className="py-sm px-md capitalize text-label-md">{r.category.replace('_',' ')}</td>
                      <td className="py-sm px-md text-label-md text-on-surface-variant hidden sm:table-cell">{r.ward || '—'}</td>
                      <td className="py-sm px-md"><span className={STATUS_BADGE[r.status]}>{STATUS_LABEL[r.status]}</span></td>
                      <td className="py-sm px-md text-label-md text-on-surface-variant hidden md:table-cell">{r.assigned_to_name || 'Unassigned'}</td>
                      <td className="py-sm px-md text-label-sm text-outline hidden lg:table-cell">{new Date(r.created_at).toLocaleDateString()}</td>
                      <td className="py-sm px-md text-right">
                        <motion.button
                          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                          onClick={(e) => { e.stopPropagation(); navigate(`/staff/reports/${r.id}`); }}
                          className="text-xs font-semibold text-secondary bg-secondary/10 hover:bg-secondary/20 px-3 py-1.5 rounded-lg border border-secondary/20 transition-colors"
                        >
                          {role === 'sanitation_worker' ? 'Update →' : role === 'field_officer' ? 'Delegate →' : 'Manage →'}
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                  {reports.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-lg text-center text-on-surface-variant text-label-md">
                        {role === 'sanitation_worker'
                          ? 'You have no assigned tasks at the moment.'
                          : 'No reports match the active filters.'}
                      </td>
                    </tr>
                  )}
                </>
              )}
            </motion.tbody>
          </table>
        </motion.div>

        {/* ── Pagination ──────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {total > 20 && (
            <motion.div
              className="flex items-center justify-center gap-md"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
                onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                className="btn-ghost-admin text-label-md disabled:opacity-40 px-4 py-2 rounded-xl"
              >← Prev</motion.button>
              <span className="text-label-md text-on-surface-variant font-medium">
                Page {page} of {Math.ceil(total/20)}
              </span>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
                onClick={() => setPage(p => p+1)} disabled={page >= Math.ceil(total/20)}
                className="btn-ghost-admin text-label-md disabled:opacity-40 px-4 py-2 rounded-xl"
              >Next →</motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
