import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import StaffSidebar from '../components/StaffSidebar';
import StaffHeader from '../components/StaffHeader';

const ROLE_CONFIG = {
  admin:             { label: 'System Admin',    cls: 'bg-primary-container text-on-primary' },
  field_officer:     { label: 'Ward Officer',    cls: 'bg-tertiary-fixed-dim/25 text-tertiary-container' },
  sanitation_worker: { label: 'Field Staff',     cls: 'bg-secondary-container text-on-secondary-container' },
};

export default function UserManagement() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('sn_user') || 'null');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'field_officer', ward: '',
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({ id: null, name: '', role: '', ward: '' });

  const [deleteTarget, setDeleteTarget] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('sn_user') || '{}');

  useEffect(() => { fetchUsers(); }, []);

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
      if (err.response?.status === 401) { localStorage.clear(); navigate('/staff/login'); }
      setError(err.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await api.post('/api/auth/users', formData);
      setSuccess(`User "${formData.name}" created successfully!`);
      setShowCreateModal(false);
      setFormData({ name: '', email: '', password: '', role: 'field_officer', ward: '' });
      fetchUsers();
    } catch (err) {
      if (err.response?.status === 401) { localStorage.clear(); navigate('/staff/login'); }
      setError(err.response?.data?.error || 'Failed to create user');
    }
  };

  const openEditModal = (u) => {
    setEditData({ id: u.id, name: u.name, role: u.role, ward: u.ward || '' });
    setShowEditModal(true);
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await api.put(`/api/auth/users/${editData.id}`, {
        name: editData.name, role: editData.role, ward: editData.ward,
      });
      setSuccess(`User "${editData.name}" updated successfully!`);
      setShowEditModal(false);
      fetchUsers();
    } catch (err) {
      if (err.response?.status === 401) { localStorage.clear(); navigate('/staff/login'); }
      setError(err.response?.data?.error || 'Failed to update user');
    }
  };

  const confirmDeleteUser = async () => {
    if (!deleteTarget) return;
    const { id, name } = deleteTarget;
    setDeleteTarget(null);
    setError(''); setSuccess('');
    try {
      await api.delete(`/api/auth/users/${id}`);
      setSuccess(`User "${name}" deleted successfully.`);
      fetchUsers();
    } catch (err) {
      if (err.response?.status === 401) { localStorage.clear(); navigate('/staff/login'); }
      setError(err.response?.data?.error || 'Failed to delete user');
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = !searchQuery ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.ward && u.ward.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = !roleFilter || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role) => {
    const cfg = ROLE_CONFIG[role] || ROLE_CONFIG.sanitation_worker;
    return (
      <span className={`${cfg.cls} font-label-caps text-label-caps font-semibold px-2.5 py-1 rounded-full w-max`}>
        {cfg.label}
      </span>
    );
  };

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    officers: users.filter(u => u.role === 'field_officer').length,
    workers: users.filter(u => u.role === 'sanitation_worker').length,
  };

  const inputCls = "w-full py-2.5 px-3 bg-surface-container-low rounded-xl border border-outline-variant/60 focus:border-tertiary-fixed-dim focus:ring-2 focus:ring-tertiary-fixed-dim/20 outline-none transition-all font-body-md text-body-md";
  const modalCls = "bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 max-w-md w-full max-h-[calc(100dvh-2rem)] overflow-y-auto p-stack-lg space-y-stack-md";

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
          <Link to="/staff/reports" className="flex flex-col items-center gap-0.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">assessment</span>
            <span className="font-label-caps text-[10px]">Reports</span>
          </Link>
          <Link to="/staff/users" className="flex flex-col items-center gap-0.5 text-primary">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
            <span className="font-label-caps text-[10px]">Staff</span>
          </Link>
          <Link to="/" className="flex flex-col items-center gap-0.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">public</span>
            <span className="font-label-caps text-[10px]">Citizen</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="md:pl-64 pt-20">
        <div className="px-margin-mobile md:px-margin-desktop py-6 max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary-container">groups</span>
                <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-primary">Staff Management</h1>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">Add, edit, and manage Municipal Officers & Sanitation Staff</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-button text-button px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Add Staff Member
            </button>
          </div>

          {/* Error / Success */}
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-error-container text-on-error-container font-body-md text-body-md font-semibold border border-error/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-tertiary-fixed-dim/20 text-tertiary-container font-body-md text-body-md font-semibold border border-tertiary-fixed-dim/40 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              {success}
            </motion.div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Total Staff', value: stats.total, icon: 'groups' },
              { label: 'Admins', value: stats.admins, icon: 'shield' },
              { label: 'Officers', value: stats.officers, icon: 'badge' },
              { label: 'Field Workers', value: stats.workers, icon: 'engineering' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="data-card p-stack-md"
              >
                <span className="material-symbols-outlined text-[20px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                <p className="font-display-lg-mobile text-[22px] font-bold text-primary mt-0.5">{s.value}</p>
                <p className="font-label-caps text-label-caps font-medium text-on-surface-variant uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="card-base rounded-xl p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                <input
                  type="text"
                  placeholder="Search by name, email, or ward..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/60 focus:border-tertiary-fixed-dim focus:ring-2 focus:ring-tertiary-fixed-dim/20 outline-none transition-all font-body-md text-body-md"
                />
              </div>
              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                className="w-full sm:w-48 py-2.5 px-3 bg-surface-container-low rounded-xl border border-outline-variant/60 focus:border-tertiary-fixed-dim focus:ring-2 focus:ring-tertiary-fixed-dim/20 outline-none transition-all font-body-md text-body-md"
              >
                <option value="">All Roles</option>
                <option value="admin">System Admin</option>
                <option value="field_officer">Ward Officer</option>
                <option value="sanitation_worker">Field Staff</option>
              </select>
            </div>
          </div>

          {/* User Table */}
          <div className="card-base rounded-xl overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-6 h-6 border-2 border-tertiary-fixed-dim border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="font-body-md text-body-md text-on-surface-variant">Loading staff records...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-8 text-center font-body-md text-body-md text-on-surface-variant">
                {users.length === 0
                  ? 'No staff users found. Click "Add Staff Member" to create one.'
                  : 'No users match your search criteria.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-outline-variant/40 font-label-caps text-label-caps font-bold text-on-surface-variant uppercase tracking-wider">
                      <th className="px-5 py-3">Staff Member</th>
                      <th className="px-5 py-3 hidden md:table-cell">Email</th>
                      <th className="px-5 py-3">Role</th>
                      <th className="px-5 py-3 hidden sm:table-cell">Ward</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary font-bold flex items-center justify-center text-sm shrink-0">
                              {u.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-body-md text-body-md font-semibold text-on-surface">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 font-body-md text-body-md text-on-surface-variant hidden md:table-cell">{u.email}</td>
                        <td className="px-5 py-3">{getRoleBadge(u.role)}</td>
                        <td className="px-5 py-3 hidden sm:table-cell">
                          {u.ward ? (
                            <span className="inline-flex items-center gap-1 bg-surface-container-low text-on-surface font-body-md text-body-md px-2.5 py-1 rounded-md border border-outline-variant/40">
                              <span className="material-symbols-outlined text-[14px] text-secondary">location_on</span>
                              {u.ward}
                            </span>
                          ) : (
                            <span className="font-body-md text-body-md text-on-surface-variant italic">All Wards</span>
                          )}
                        </td>
                        <td className="px-5 py-3 text-right">
                          {u.id !== currentUser?.id ? (
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => openEditModal(u)} className="p-1.5 text-secondary hover:bg-secondary/10 rounded-lg transition" title="Edit User">
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                              </button>
                              <button onClick={() => setDeleteTarget({ id: u.id, name: u.name })} className="p-1.5 text-error hover:bg-error-container/30 rounded-lg transition" title="Delete User">
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </div>
                          ) : (
                            <span className="font-label-caps text-label-caps font-medium text-on-surface-variant bg-surface-container-low px-2.5 py-1 rounded-full">You</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={modalCls}>
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">person_add</span>
                Register Staff Member
              </h2>
              <button onClick={() => setShowCreateModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="space-y-stack-md">
              <div>
                <label className="block font-label-caps text-label-caps font-semibold text-on-surface-variant mb-1">Full Name</label>
                <input type="text" required placeholder="e.g. Rajesh Sharma" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps font-semibold text-on-surface-variant mb-1">Email Address</label>
                <input type="email" required placeholder="e.g. officer.ward4@swachhanagar.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps font-semibold text-on-surface-variant mb-1">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} required placeholder="••••••••" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-caps text-label-caps font-semibold text-on-surface-variant mb-1">Role</label>
                  <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className={inputCls}>
                    <option value="field_officer">Ward Officer</option>
                    <option value="sanitation_worker">Field Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps font-semibold text-on-surface-variant mb-1">Ward Number</label>
                  <input type="text" placeholder="e.g. Ward 4" value={formData.ward} onChange={e => setFormData({ ...formData, ward: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-outline-variant/30 pt-4">
                <button type="button" onClick={() => setShowCreateModal(false)} className="w-full sm:w-auto px-4 py-2 font-button text-button text-on-surface-variant hover:bg-surface-container rounded-xl transition">Cancel</button>
                <button type="submit" className="w-full sm:w-auto px-4 py-2 font-button text-button bg-primary-container hover:bg-primary text-on-primary font-semibold rounded-xl shadow-md transition">Create Staff User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={modalCls}>
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">edit</span>
                Edit Staff Member
              </h2>
              <button onClick={() => setShowEditModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleEditUser} className="space-y-stack-md">
              <div>
                <label className="block font-label-caps text-label-caps font-semibold text-on-surface-variant mb-1">Full Name</label>
                <input type="text" required value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} className={inputCls} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-caps text-label-caps font-semibold text-on-surface-variant mb-1">Role</label>
                  <select value={editData.role} onChange={e => setEditData({ ...editData, role: e.target.value })} className={inputCls}>
                    <option value="field_officer">Ward Officer</option>
                    <option value="sanitation_worker">Field Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps font-semibold text-on-surface-variant mb-1">Ward Assignment</label>
                  <input type="text" placeholder="e.g. Ward 4" value={editData.ward} onChange={e => setEditData({ ...editData, ward: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-outline-variant/30 pt-4">
                <button type="button" onClick={() => setShowEditModal(false)} className="w-full sm:w-auto px-4 py-2 font-button text-button text-on-surface-variant hover:bg-surface-container rounded-xl transition">Cancel</button>
                <button type="submit" className="w-full sm:w-auto px-4 py-2 font-button text-button bg-primary-container hover:bg-primary text-on-primary font-semibold rounded-xl shadow-md transition">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 max-w-sm w-full p-stack-lg space-y-stack-md text-center">
            <div className="w-12 h-12 rounded-full bg-error-container text-error flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">delete</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Delete Staff User?</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Are you sure you want to remove <span className="font-semibold text-on-surface">{deleteTarget.name}</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 px-4 py-2 font-button text-button text-on-surface-variant hover:bg-surface-container rounded-xl transition font-medium">Cancel</button>
              <button onClick={confirmDeleteUser} className="flex-1 px-4 py-2 font-button text-button bg-error hover:bg-error/90 text-on-error font-semibold rounded-xl shadow-md transition">Delete User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
