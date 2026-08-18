import axios from 'axios';

// Use VITE_API_URL if explicitly provided, otherwise relative path '/'
// Relative path relies on Vite's dev server proxy (/api -> http://localhost:5000)
// which works seamlessly over both HTTP and HTTPS on all devices (mobile & desktop).
const BASE_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach JWT from localStorage ──────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sn_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: handle 401 (token expired) ──────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('sn_token');
      localStorage.removeItem('sn_user');
      // Let the ProtectedRoute handle the redirect
    }
    return Promise.reject(error);
  }
);

// ═══════════════════════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════════════════════

/** Staff login. Returns { token, user }. */
export const login = (email, password) =>
  api.post('/api/auth/login', { email, password });

// ═══════════════════════════════════════════════════════════════════════════
// REPORTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Submit a new citizen waste report.
 * @param {FormData} formData - Must include: category, latitude, longitude.
 *                              Optional: description, reporter_email, ward, photo (file)
 */
export const submitReport = (formData) =>
  api.post('/api/reports', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

/** Public tracking — fetch report + history by tracking code. */
export const trackReport = (trackingCode) =>
  api.get(`/api/reports/track/${trackingCode}`);

/**
 * Staff — list reports with optional filters.
 * @param {Object} params - { status, category, ward, date_from, date_to, page, limit }
 */
export const listReports = (params = {}) =>
  api.get('/api/reports', { params });

/** Staff — update report status (supports optional FormData for photo proof). */
export const updateReportStatus = (id, data) => {
  if (data instanceof FormData) {
    return api.patch(`/api/reports/${id}/status`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
  return api.patch(`/api/reports/${id}/status`, data);
};

/** Staff — assign report to a field officer or worker. */
export const assignReport = (id, assigned_to) =>
  api.patch(`/api/reports/${id}/assign`, { assigned_to });

/** Citizen — dispute a resolved report if work was faked. */
export const disputeReport = (trackingCode, reason) =>
  api.post(`/api/reports/track/${trackingCode}/dispute`, { reason });

// ═══════════════════════════════════════════════════════════════════════════
// ANALYTICS
// ═══════════════════════════════════════════════════════════════════════════

/** Staff — get analytics summary. */
export const getAnalytics = () =>
  api.get('/api/analytics');

/** Staff — per-ward performance breakdown. */
export const getWardAnalytics = () =>
  api.get('/api/analytics/wards');

/** Staff — hotspot clusters (density, forecast, resolution rate). */
export const getHotspots = () =>
  api.get('/api/analytics/hotspots');

/** Staff — fleet/team units (derived from field staff + assignments). */
export const getFleet = () =>
  api.get('/api/fleet');

/** Public — landing page stats (no auth). */
export const getPublicStats = () =>
  api.get('/api/public/stats');

export default api;
