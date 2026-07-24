import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ThemeToggle } from '../context/ThemeContext';

// ── SVG Icons ────────────────────────────────────────────────────────────────
const IconUsers = () => <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const IconUserPlus = () => <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>;
const IconTrash = () => <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const IconEdit = () => <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const IconShield = () => <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const IconMapPin = () => <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconMail = () => <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconLock = () => <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const IconUser = () => <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const IconEye = () => <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const IconEyeOff = () => <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.962 8.962 0 014.122-.971c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" /></svg>;
const IconAlertCircle = () => <svg className="w-5 h-5 inline-block shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconCheckCircle = () => <svg className="w-5 h-5 inline-block shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconArrowLeft = () => <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const IconSearch = () => <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

// ── Role labels and badge colors ─────────────────────────────────────────────
const ROLE_CONFIG = {
  admin: {
    label: 'System Admin',
    icon: <IconShield />,
    bgLight: 'bg-purple-100', textLight: 'text-purple-700',
    bgDark: 'dark:bg-purple-950/50', textDark: 'dark:text-purple-300',
  },
  field_officer: {
    label: 'Ward Officer',
    icon: <IconUser />,
    bgLight: 'bg-blue-100', textLight: 'text-blue-700',
    bgDark: 'dark:bg-blue-950/50', textDark: 'dark:text-blue-300',
  },
  sanitation_worker: {
    label: 'Field Staff',
    icon: <IconUsers />,
    bgLight: 'bg-emerald-100', textLight: 'text-emerald-700',
    bgDark: 'dark:bg-emerald-950/50', textDark: 'dark:text-emerald-300',
  },
  staff: {
    label: 'Staff',
    icon: <IconUser />,
    bgLight: 'bg-gray-100', textLight: 'text-gray-700',
    bgDark: 'dark:bg-gray-800', textDark: 'dark:text-gray-300',
  },
};

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Create Form State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'field_officer', ward: '',
  });

  // Edit Form State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({ id: null, name: '', role: '', ward: '' });

  // Delete Confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('sn_user') || '{}');

  useEffect(() => {
    fetchUsers();
  }, []);

  // Auto-dismiss success messages after 4s
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchUsers = async () => {
    setLoading(true); setError('');
    try {
      const res = await api.get('/api/auth/users');
      setUsers(res.data.users || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // ── Create User ───────────────────────────────────────────────────────────
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await api.post('/api/auth/users', formData);
      setSuccess(`✅ User "${formData.name}" created successfully!`);
      setShowCreateModal(false);
      setFormData({ name: '', email: '', password: '', role: 'field_officer', ward: '' });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create user');
    }
  };

  // ── Edit User ─────────────────────────────────────────────────────────────
  const openEditModal = (user) => {
    setEditData({ id: user.id, name: user.name, role: user.role, ward: user.ward || '' });
    setShowEditModal(true);
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await api.put(`/api/auth/users/${editData.id}`, {
        name: editData.name,
        role: editData.role,
        ward: editData.ward,
      });
      setSuccess(`✅ User "${editData.name}" updated successfully!`);
      setShowEditModal(false);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update user');
    }
  };

  // ── Delete User ───────────────────────────────────────────────────────────
  const confirmDeleteUser = async () => {
    if (!deleteTarget) return;
    const { id, name } = deleteTarget;
    setDeleteTarget(null);
    setError(''); setSuccess('');
    try {
      await api.delete(`/api/auth/users/${id}`);
      setSuccess(`✅ User "${name}" deleted successfully.`);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete user');
    }
  };

  // ── Filtering ─────────────────────────────────────────────────────────────
  const filteredUsers = users.filter(u => {
    const matchesSearch = !searchQuery ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.ward && u.ward.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = !roleFilter || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // ── Role Badge Component ──────────────────────────────────────────────────
  const getRoleBadge = (role) => {
    const cfg = ROLE_CONFIG[role] || ROLE_CONFIG.staff;
    return (
      <span className={`${cfg.bgLight} ${cfg.textLight} ${cfg.bgDark} ${cfg.textDark} text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 w-max`}>
        {cfg.icon} {cfg.label}
      </span>
    );
  };

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    officers: users.filter(u => u.role === 'field_officer').length,
    workers: users.filter(u => u.role === 'sanitation_worker').length,
  };

  return (
    <div className="min-h-screen bg-surface-container-low">
      {/* ── Header Navigation ─────────────────────────────────────────────── */}
      <header className="bg-secondary text-on-secondary px-md md:px-xl py-md flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-card-admin">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/staff/dashboard')}
            className="p-2 hover:bg-white/10 rounded-lg text-on-secondary/70 hover:text-on-secondary transition"
            title="Back to Dashboard"
          >
            <IconArrowLeft />
          </button>
          <div>
            <h1 className="text-headline-md font-semibold flex items-center gap-2">
              <span className="text-emerald-300"><IconUsers /></span> Staff Management
            </h1>
            <p className="text-label-md opacity-80">Add, edit, and manage Municipal Officers & Sanitation Staff</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-95"
          >
            <IconUserPlus /> Add Staff Member
          </button>
        </div>
      </header>

      <div className="px-md md:px-xl py-md md:py-lg max-w-7xl mx-auto space-y-lg">
        {/* ── Stats Cards ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
          {[
            { label: 'Total Staff', value: stats.total, color: 'text-secondary' },
            { label: 'Admins', value: stats.admins, color: 'text-purple-500 dark:text-purple-400' },
            { label: 'Officers', value: stats.officers, color: 'text-blue-500 dark:text-blue-400' },
            { label: 'Field Workers', value: stats.workers, color: 'text-emerald-500 dark:text-emerald-400' },
          ].map((s, i) => (
            <div key={i} className="card-admin p-md">
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">{s.label}</p>
              <p className={`text-headline-md font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Feedback Messages ───────────────────────────────────────────── */}
        {error && (
          <div className="bg-error-container text-on-error-container p-sm rounded-xl flex items-center gap-3 animate-in">
            <IconAlertCircle />
            <p className="text-label-md font-medium">{error}</p>
            <button onClick={() => setError('')} className="ml-auto text-on-error-container/60 hover:text-on-error-container font-bold">✕</button>
          </div>
        )}
        {success && (
          <div className="bg-primary/15 text-primary p-sm rounded-xl flex items-center gap-3 animate-in">
            <IconCheckCircle />
            <p className="text-label-md font-medium">{success}</p>
          </div>
        )}

        {/* ── Search & Filter Bar ─────────────────────────────────────────── */}
        <div className="card-admin p-md">
          <div className="flex flex-col md:flex-row gap-sm">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-on-surface-variant"><IconSearch /></span>
              <input
                type="text"
                placeholder="Search by name, email, or ward..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-9 text-label-md"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="input-field text-label-md w-full md:w-48"
            >
              <option value="">All Roles</option>
              <option value="admin">System Admin</option>
              <option value="field_officer">Ward Officer</option>
              <option value="sanitation_worker">Field Staff</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        </div>

        {/* ── User Table ──────────────────────────────────────────────────── */}
        <div className="card-admin overflow-hidden">
          {loading ? (
            <div className="p-lg text-center text-on-surface-variant">
              <div className="inline-block w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-label-md">Loading staff records...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-lg text-center text-on-surface-variant">
              <p className="text-label-md">
                {users.length === 0
                  ? 'No staff users found. Click "Add Staff Member" to create one.'
                  : 'No users match your search criteria.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-body-md">
                <thead>
                  <tr className="border-b border-outline-variant text-label-sm text-outline uppercase tracking-wider">
                    <th className="text-left px-md py-sm">Staff Member</th>
                    <th className="text-left px-md py-sm hidden md:table-cell">Email</th>
                    <th className="text-left px-md py-sm">Role</th>
                    <th className="text-left px-md py-sm hidden sm:table-cell">Assigned Ward</th>
                    <th className="text-right px-md py-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="border-b border-outline-variant/40 hover:bg-surface-container transition-colors">
                      <td className="px-md py-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-secondary/15 text-secondary font-bold flex items-center justify-center text-sm shrink-0">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-on-surface">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-md py-sm text-on-surface-variant hidden md:table-cell">
                        <div className="flex items-center gap-1.5">
                          <IconMail />
                          <span className="text-label-md">{u.email}</span>
                        </div>
                      </td>
                      <td className="px-md py-sm">{getRoleBadge(u.role)}</td>
                      <td className="px-md py-sm hidden sm:table-cell">
                        {u.ward ? (
                          <span className="inline-flex items-center gap-1 bg-surface-container text-on-surface text-xs font-medium px-2.5 py-1 rounded-md border border-outline-variant">
                            <span className="text-error"><IconMapPin /></span> {u.ward}
                          </span>
                        ) : (
                          <span className="text-xs text-on-surface-variant italic">All Wards (City Wide)</span>
                        )}
                      </td>
                      <td className="px-md py-sm text-right">
                        <div className="flex items-center justify-end gap-1">
                          {u.id !== currentUser?.id ? (
                            <>
                              <button
                                onClick={() => openEditModal(u)}
                                className="p-1.5 text-secondary hover:bg-secondary/10 rounded-lg transition"
                                title="Edit User"
                              >
                                <IconEdit />
                              </button>
                              <button
                                onClick={() => setDeleteTarget({ id: u.id, name: u.name })}
                                className="p-1.5 text-error hover:bg-error/10 rounded-lg transition"
                                title="Delete User"
                              >
                                <IconTrash />
                              </button>
                            </>
                          ) : (
                            <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full border border-outline-variant">
                              You (Logged in)
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL: Create New User
      ═══════════════════════════════════════════════════════════════════════ */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl shadow-xl border border-outline-variant max-w-md w-full p-lg space-y-md animate-in">
            <div className="flex items-center justify-between border-b border-outline-variant pb-sm">
              <h2 className="text-headline-sm font-bold text-on-surface flex items-center gap-2">
                <span className="text-primary"><IconUserPlus /></span> Register Staff Member
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-on-surface-variant hover:text-on-surface text-lg font-bold"
              >✕</button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-md">
              <div>
                <label className="input-label">Full Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-on-surface-variant"><IconUser /></span>
                  <input
                    type="text" required
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field pl-9 text-label-md"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-on-surface-variant"><IconMail /></span>
                  <input
                    type="email" required
                    placeholder="e.g. officer.ward4@swachhanagar.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field pl-9 text-label-md"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-on-surface-variant"><IconLock /></span>
                  <input
                    type={showPassword ? 'text' : 'password'} required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input-field pl-9 pr-10 text-label-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-on-surface-variant hover:text-on-surface"
                  >
                    {showPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-sm">
                <div>
                  <label className="input-label">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="input-field text-label-md"
                  >
                    <option value="field_officer">Ward Officer</option>
                    <option value="sanitation_worker">Sanitation Worker (Ground Staff)</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Ward Number</label>
                  <input
                    type="text"
                    placeholder="e.g. Ward 4"
                    value={formData.ward}
                    onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                    className="input-field text-label-md"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-sm border-t border-outline-variant pt-md">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-label-md text-on-surface-variant hover:bg-surface-container rounded-xl transition"
                >Cancel</button>
                <button
                  type="submit"
                  className="px-4 py-2 text-label-md bg-primary hover:bg-primary/90 text-on-primary font-medium rounded-xl shadow-sm transition"
                >Create Staff User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL: Edit User
      ═══════════════════════════════════════════════════════════════════════ */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl shadow-xl border border-outline-variant max-w-md w-full p-lg space-y-md animate-in">
            <div className="flex items-center justify-between border-b border-outline-variant pb-sm">
              <h2 className="text-headline-sm font-bold text-on-surface flex items-center gap-2">
                <span className="text-secondary"><IconEdit /></span> Edit Staff Member
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-on-surface-variant hover:text-on-surface text-lg font-bold"
              >✕</button>
            </div>

            <form onSubmit={handleEditUser} className="space-y-md">
              <div>
                <label className="input-label">Full Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-on-surface-variant"><IconUser /></span>
                  <input
                    type="text" required
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="input-field pl-9 text-label-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-sm">
                <div>
                  <label className="input-label">Role</label>
                  <select
                    value={editData.role}
                    onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                    className="input-field text-label-md"
                  >
                    <option value="field_officer">Ward Officer</option>
                    <option value="sanitation_worker">Sanitation Worker (Ground Staff)</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Ward Assignment</label>
                  <input
                    type="text"
                    placeholder="e.g. Ward 4"
                    value={editData.ward}
                    onChange={(e) => setEditData({ ...editData, ward: e.target.value })}
                    className="input-field text-label-md"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-sm border-t border-outline-variant pt-md">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-label-md text-on-surface-variant hover:bg-surface-container rounded-xl transition"
                >Cancel</button>
                <button
                  type="submit"
                  className="px-4 py-2 text-label-md bg-secondary hover:bg-secondary/90 text-on-secondary font-medium rounded-xl shadow-sm transition"
                >Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL: Delete Confirmation
      ═══════════════════════════════════════════════════════════════════════ */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl shadow-xl border border-outline-variant max-w-sm w-full p-lg space-y-md text-center animate-in">
            <div className="w-12 h-12 rounded-full bg-error/15 text-error flex items-center justify-center mx-auto">
              <IconTrash />
            </div>
            <div>
              <h3 className="text-headline-sm font-bold text-on-surface">Delete Staff User?</h3>
              <p className="text-label-md text-on-surface-variant mt-1">
                Are you sure you want to remove <span className="font-semibold text-on-surface">{deleteTarget.name}</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-sm pt-xs">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-label-md text-on-surface-variant hover:bg-surface-container rounded-xl transition w-full font-medium"
              >Cancel</button>
              <button
                type="button"
                onClick={confirmDeleteUser}
                className="px-4 py-2 text-label-md bg-error hover:bg-error/90 text-on-error font-medium rounded-xl shadow-sm transition w-full"
              >Delete User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
