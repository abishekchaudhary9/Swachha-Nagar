// Page: Submit Report
// Mobile-first form for citizen waste report submission
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitReport } from '../services/api';

const CATEGORIES = [
  { value: 'organic',      label: '🌿 Organic / Food Waste' },
  { value: 'plastic',      label: '♻️ Plastic / Packaging' },
  { value: 'e_waste',      label: '💻 E-Waste / Electronics' },
  { value: 'construction', label: '🧱 Construction Debris' },
  { value: 'other',        label: '🗑️ Other' },
];

export default function SubmitReport() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category:       '',
    description:    '',
    reporter_email: '',
    ward:           '',
    latitude:       '',
    longitude:      '',
  });
  const [photo,     setPhoto]     = useState(null);
  const [gpsStatus, setGpsStatus] = useState('idle'); // idle | fetching | ok | error
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);

  // Auto-capture GPS on mount
  useEffect(() => {
    setGpsStatus('fetching');
    if (!navigator.geolocation) {
      setGpsStatus('error');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setForm(f => ({ ...f, latitude: coords.latitude.toFixed(6), longitude: coords.longitude.toFixed(6) }));
        setGpsStatus('ok');
      },
      () => setGpsStatus('error'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.category)  return setError('Please select a waste category.');
    if (!form.latitude || !form.longitude) return setError('GPS location is required. Please allow location access.');

    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
      if (photo) fd.append('photo', photo);

      const res = await submitReport(fd);
      navigate('/confirmation', { state: { tracking_code: res.data.tracking_code } });
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface px-container-margin py-lg max-w-lg mx-auto">
      <h1 className="text-headline-lg-mobile text-on-surface mb-lg">Report Waste</h1>

      {error && (
        <div className="mb-md p-sm rounded-md bg-error-container text-on-error-container text-label-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-md">
        {/* Category */}
        <div>
          <label className="input-label">Waste Category *</label>
          <select name="category" value={form.category} onChange={handleChange} className="input-field" required>
            <option value="">Select category…</option>
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="input-label">Description (optional)</label>
          <textarea
            name="description" value={form.description} onChange={handleChange}
            className="input-field min-h-[100px] resize-none"
            placeholder="Describe the waste…"
          />
        </div>

        {/* GPS */}
        <div>
          <label className="input-label">Location (GPS)</label>
          <div className={`input-field flex items-center gap-sm ${gpsStatus === 'ok' ? 'border-primary' : ''}`}>
            {gpsStatus === 'fetching' && <span className="text-outline text-label-md animate-pulse">Acquiring GPS…</span>}
            {gpsStatus === 'ok'       && <span className="text-primary text-label-md">📍 {form.latitude}, {form.longitude}</span>}
            {gpsStatus === 'error'    && <span className="text-error text-label-md">GPS unavailable — enter manually</span>}
            {gpsStatus === 'idle'     && <span className="text-outline text-label-md">Waiting…</span>}
          </div>
          {/* Manual override */}
          {gpsStatus === 'error' && (
            <div className="flex gap-sm mt-sm">
              <input name="latitude"  value={form.latitude}  onChange={handleChange} className="input-field" placeholder="Latitude"  type="number" step="any" />
              <input name="longitude" value={form.longitude} onChange={handleChange} className="input-field" placeholder="Longitude" type="number" step="any" />
            </div>
          )}
        </div>

        {/* Ward */}
        <div>
          <label className="input-label">Ward (optional)</label>
          <input name="ward" value={form.ward} onChange={handleChange} className="input-field" placeholder="e.g. Ward 12" />
        </div>

        {/* Photo */}
        <div>
          <label className="input-label">Photo (optional)</label>
          <input
            type="file" accept="image/*" capture="environment"
            className="input-field py-sm cursor-pointer file:mr-sm file:rounded file:border-0 file:bg-primary file:text-on-primary file:px-sm file:text-label-md"
            onChange={e => setPhoto(e.target.files[0])}
          />
        </div>

        {/* Email */}
        <div>
          <label className="input-label">Your Email (for status updates)</label>
          <input name="reporter_email" type="email" value={form.reporter_email} onChange={handleChange} className="input-field" placeholder="you@example.com" />
        </div>

        <button type="submit" disabled={loading} className="btn-citizen w-full mt-sm">
          {loading ? 'Submitting…' : 'Submit Report'}
        </button>
      </form>
    </main>
  );
}
