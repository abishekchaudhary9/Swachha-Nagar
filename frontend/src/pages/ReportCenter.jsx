import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { listReports, updateReportStatus } from '../services/api';
import StaffSidebar from '../components/StaffSidebar';
import StaffHeader from '../components/StaffHeader';
import { StatusChip, PriorityDot, PRIORITY_OF_CATEGORY, relativeTime } from '../components/StatusChip';

const PAGE_SIZE = 15;

export default function ReportCenter() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('sn_user') || 'null');

  const [reports,     setReports]     = useState([]);
  const [total,       setTotal]       = useState(0);
  const [page,        setPage]        = useState(1);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const [filters,     setFilters]     = useState({ status: '', category: '', ward: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const fetchReports = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const params = { page, limit: PAGE_SIZE };
      if (filters.status) params.status = filters.status;
      if (filters.category) params.category = filters.category;
      if (filters.ward) params.ward = filters.ward;
      const res = await listReports(params);
      setReports(res.data.reports);
      setTotal(res.data.total);
    } catch (err) {
      if (err.response?.status === 401) { localStorage.clear(); navigate('/staff/login'); }
      else setError('Failed to load reports.');
    } finally {
      setLoading(false);
    }
  }, [page, filters, navigate]);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      await updateReportStatus(reportId, newStatus, 'Updated via Report Center');
      fetchReports();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update status');
    }
  };

  const seen = new Set();
  const filtered = reports.filter(r => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return r.tracking_code.toLowerCase().includes(q) ||
      (r.description && r.description.toLowerCase().includes(q));
  });
  const visible = filtered.filter(r => { if (seen.has(r.id)) return false; seen.add(r.id); return true; });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      <StaffSidebar user={user} />
      <StaffHeader user={user} />

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-md border-t border-outline-variant/30 md:hidden">
        <div className="flex justify-around items-center h-14">
          <Link to="/staff/dashboard" className="flex flex-col items-center gap-0.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span className="font-label-caps text-[10px]">Dashboard</span>
          </Link>
          <Link to="/staff/reports" className="flex flex-col items-center gap-0.5 text-primary">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>assessment</span>
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

      <main className="md:pl-64 pt-20">
        <div className="px-margin-mobile md:px-margin-desktop py-6 max-w-7xl mx-auto space-y-6 pb-20 md:pb-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary-container">assessment</span>
                <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-primary">Report Center</h1>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">Full registry of citizen reports with filtering and status control.</p>
            </div>
            <span className="font-label-caps text-label-caps bg-tertiary-fixed-dim/20 text-tertiary-container px-3 py-1.5 rounded-full">
              {total} total reports
            </span>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-error-container text-on-error-container font-body-md text-body-md font-semibold border border-error/20">
              {error}
            </motion.div>
          )}

          {/* Filters */}
          <div className="card-base rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="relative lg:col-span-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                <input
                  type="text"
                  placeholder="Search code or description..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/60 focus:border-tertiary-fixed-dim focus:ring-2 focus:ring-tertiary-fixed-dim/20 outline-none transition-all font-body-md text-body-md"
                />
              </div>
              <select
                value={filters.status}
                onChange={e => { setFilters(f => ({ ...f, status: e.target.value })); setPage(1); }}
                className="py-2.5 px-3 bg-surface-container-low rounded-xl border border-outline-variant/60 focus:border-tertiary-fixed-dim focus:ring-2 focus:ring-tertiary-fixed-dim/20 outline-none transition-all font-body-md text-body-md"
              >
                <option value="">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <select
                value={filters.category}
                onChange={e => { setFilters(f => ({ ...f, category: e.target.value })); setPage(1); }}
                className="py-2.5 px-3 bg-surface-container-low rounded-xl border border-outline-variant/60 focus:border-tertiary-fixed-dim focus:ring-2 focus:ring-tertiary-fixed-dim/20 outline-none transition-all font-body-md text-body-md"
              >
                <option value="">All Categories</option>
                <option value="organic">Organic</option>
                <option value="plastic">Plastic</option>
                <option value="e_waste">E-waste</option>
                <option value="construction">Construction</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Ward (e.g. 07)"
                value={filters.ward}
                onChange={e => { setFilters(f => ({ ...f, ward: e.target.value })); setPage(1); }}
                className="py-2.5 px-3 bg-surface-container-low rounded-xl border border-outline-variant/60 focus:border-tertiary-fixed-dim focus:ring-2 focus:ring-tertiary-fixed-dim/20 outline-none transition-all font-body-md text-body-md"
              />
            </div>
          </div>

          {/* Table */}
          <div className="card-base rounded-xl overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-6 h-6 border-2 border-tertiary-fixed-dim border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="font-body-md text-body-md text-on-surface-variant">Loading reports...</p>
              </div>
            ) : visible.length === 0 ? (
              <div className="p-8 text-center font-body-md text-body-md text-on-surface-variant">
                No reports match the current filters.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-outline-variant/40 font-label-caps text-label-caps font-bold text-on-surface-variant uppercase tracking-wider">
                      <th className="px-5 py-3">Report</th>
                      <th className="px-5 py-3 hidden md:table-cell">Category</th>
                      <th className="px-5 py-3">Priority</th>
                      <th className="px-5 py-3 hidden sm:table-cell">Ward</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3 hidden lg:table-cell">Assigned</th>
                      <th className="px-5 py-3 hidden lg:table-cell">Submitted</th>
                      <th className="px-5 py-3 text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {visible.map(r => (
                      <tr key={r.id} className="hover:bg-surface-container-low transition-colors cursor-pointer" onClick={() => navigate(`/staff/reports/${r.id}`)}>
                        <td className="px-5 py-3">
                          <span className="font-mono font-bold text-primary text-sm">{r.tracking_code}</span>
                          <p className="text-xs text-on-surface-variant line-clamp-1 max-w-[220px]">{r.description || 'No description'}</p>
                        </td>
                        <td className="px-5 py-3 hidden md:table-cell">
                          <span className="capitalize font-body-md text-body-md text-on-surface">{r.category.replace('_', ' ')}</span>
                        </td>
                        <td className="px-5 py-3">
                          <PriorityDot priority={PRIORITY_OF_CATEGORY[r.category] || 'Low'} />
                        </td>
                        <td className="px-5 py-3 hidden sm:table-cell font-body-md text-body-md text-on-surface-variant">{r.ward || '—'}</td>
                        <td className="px-5 py-3"><StatusChip status={r.status} /></td>
                        <td className="px-5 py-3 hidden lg:table-cell font-body-md text-body-md text-on-surface-variant">{r.assigned_to_name || 'Unassigned'}</td>
                        <td className="px-5 py-3 hidden lg:table-cell font-body-md text-body-md text-outline">{relativeTime(r.created_at)}</td>
                        <td className="px-5 py-3 text-right">
                          <select
                            value={r.status}
                            onClick={e => e.stopPropagation()}
                            onChange={e => handleStatusChange(r.id, e.target.value)}
                            className="font-label-caps text-label-caps bg-surface-container-low border border-outline-variant rounded-lg px-2 py-1.5 text-primary cursor-pointer outline-none transition-all hover:border-tertiary-fixed-dim"
                          >
                            <option value="submitted">Submitted</option>
                            <option value="acknowledged">Acknowledged</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-outline-variant/30">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Page {page} of {totalPages} · {total} reports
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/50 font-button text-button text-on-surface hover:bg-surface-container transition disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-button text-button hover:bg-primary transition disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}