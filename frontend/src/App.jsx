import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Citizen pages (mobile-first)
import CitizenHome        from './pages/CitizenHome';
import SubmitReport       from './pages/SubmitReport';
import ReportConfirmation from './pages/ReportConfirmation';
import TrackReport        from './pages/TrackReport';

// Staff pages (desktop-first)
import StaffLogin         from './pages/StaffLogin';
import StaffDashboard     from './pages/StaffDashboard';
import ReportDetailPanel  from './pages/ReportDetailPanel';
import StaffAnalytics     from './pages/StaffAnalytics';
import UserManagement     from './pages/UserManagement';


import { ThemeProvider } from './context/ThemeContext';

// ── Protected Route guard ──────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('sn_token');
  if (!token) return <Navigate to="/staff/login" replace />;
  return children;
}

// ── App ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>

      <Routes>
        {/* ── Citizen routes ─────────────────────────────── */}
        <Route path="/"             element={<CitizenHome />} />
        <Route path="/submit"       element={<SubmitReport />} />
        <Route path="/confirmation" element={<ReportConfirmation />} />
        <Route path="/track"        element={<TrackReport />} />
        <Route path="/track/:code"  element={<TrackReport />} />

        {/* ── Staff routes (JWT protected) ─────────────── */}
        <Route path="/staff/login"  element={<StaffLogin />} />
        <Route
          path="/staff/dashboard"
          element={<ProtectedRoute><StaffDashboard /></ProtectedRoute>}
        />
        <Route
          path="/staff/reports/:id"
          element={<ProtectedRoute><ReportDetailPanel /></ProtectedRoute>}
        />
        <Route
          path="/staff/analytics"
          element={<ProtectedRoute><StaffAnalytics /></ProtectedRoute>}
        />
        <Route
          path="/staff/users"
          element={<ProtectedRoute><UserManagement /></ProtectedRoute>}
        />


        {/* ── Fallback ─────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

