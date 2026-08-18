import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { submitReport } from '../services/api';

const LOGO_URL = "https://lh3.googleusercontent.com/aida/AP1WRLvqEeSNx1XairIMzMTuD1Ix3vDKfZJs7-YfgEEPNl2vV2qBzNwK_90H6awnWo0iV_bzKZrzsBPq3Tv4gEr0rWvA3sIHns9dGPYnSzCpCQlzKmbZv0Fy8F9lkUnrfuvbR34Z-KzQBLco3clLLW46ds-c6I34B9njMqJQXNIcT7clHLgKM_5MjunTbA3Cq3_QwpVPnrq69gqyWpvx5LHurPYqkXSlCHozCGCkNqYfsUhZWFOY0h66yfgxdUg";

const CATEGORIES = [
  { value: 'organic',      label: 'Organic' },
  { value: 'plastic',      label: 'Plastic' },
  { value: 'e_waste',      label: 'E-waste' },
  { value: 'construction', label: 'Construction' },
  { value: 'other',        label: 'Other' },
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
  const [photo,        setPhoto]        = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [gpsStatus, setGpsStatus] = useState('idle');
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);

  useEffect(() => {
    captureGps();
  }, []);

  const captureGps = () => {
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
  };

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleCategorySelect = (val) => {
    setForm(f => ({ ...f, category: val }));
  };

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!photo) return setError('Photo evidence is required to submit a report.');
    if (!form.category) return setError('Please select a waste category.');

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('photo', photo);
      Object.entries(form).forEach(([key, val]) => {
        if (val) formData.append(key, val);
      });

      const res = await submitReport(formData);
      navigate('/confirmation', { state: res.data.report });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit report. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="bg-background text-on-surface font-body-md min-h-screen pb-24 md:pb-0"
    >
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 px-margin-mobile py-stack-sm flex items-center justify-between">
        <Link to="/" className="p-2 -ml-2 rounded-full hover:bg-surface-container-high transition-colors flex items-center">
          <span className="material-symbols-outlined text-on-surface text-[22px]">arrow_back</span>
        </Link>
        <div className="flex items-center gap-stack-sm">
          <img src={LOGO_URL} alt="Logo" className="w-6 h-6 object-contain" />
          <h1 className="font-headline-md text-sm text-primary font-bold">New Waste Report</h1>
        </div>
        <div className="w-8"></div>
      </header>

      <main className="px-margin-mobile md:px-margin-desktop py-stack-md">
        <div className="md:flex md:gap-gutter md:max-w-6xl md:mx-auto md:items-start">
          {/* Left Column - Form */}
          <div className="md:flex-1 md:max-w-2xl md:mx-auto">
            {error && (
              <div className="p-stack-md mb-stack-md rounded-xl bg-error-container text-on-error-container font-body-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-stack-lg">
              {/* Form Section 1: Location */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
                className="bg-surface-container-lowest p-stack-md rounded-xl shadow-sm border border-outline-variant/30 space-y-stack-md"
              >
                <div className="flex items-center gap-stack-sm">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold">1</div>
                  <h3 className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider font-semibold">Location Details</h3>
                </div>

                <button
                  type="button"
                  onClick={captureGps}
                  disabled={gpsStatus === 'fetching'}
                  className={`w-full flex items-center justify-center gap-stack-sm font-button text-button h-12 rounded-xl active:scale-95 transition-all duration-150 shadow-md ${
                    gpsStatus === 'ok'
                      ? 'bg-primary-container text-on-primary'
                      : 'bg-primary text-on-primary'
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {gpsStatus === 'fetching' ? 'progress_activity' : gpsStatus === 'ok' ? 'check_circle' : 'my_location'}
                  </span>
                  {gpsStatus === 'fetching' && 'Finding GPS...'}
                  {gpsStatus === 'ok' && `GPS Locked (${form.latitude}, ${form.longitude})`}
                  {gpsStatus === 'error' && 'Retry GPS Capture'}
                  {gpsStatus === 'idle' && 'Capture My Location'}
                </button>

                {gpsStatus === 'error' && (
                  <div className="space-y-stack-sm">
                    <p className="font-body-md text-body-md text-on-surface-variant">GPS unavailable. Enter coordinates manually or provide your ward below.</p>
                    <div className="grid grid-cols-2 gap-stack-sm">
                      <input name="latitude" value={form.latitude} onChange={handleChange} className="w-full h-10 rounded-lg border border-outline-variant bg-surface px-stack-md font-body-md text-body-md" placeholder="Latitude" type="number" step="any" />
                      <input name="longitude" value={form.longitude} onChange={handleChange} className="w-full h-10 rounded-lg border border-outline-variant bg-surface px-stack-md font-body-md text-body-md" placeholder="Longitude" type="number" step="any" />
                    </div>
                  </div>
                )}

                <div className="relative w-full h-36 rounded-lg overflow-hidden bg-surface-container border border-outline-variant">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYRh11rXKGneRvBcL0sfGvRP8OHTzsTZcf03zIzb1RqX14ewowfPTxwPZLIJIA11VcGBQJCSwGFrRtTWPbbsQtuZk1HoYHSAluplAS4GeFYF5hLzQRQan34RQ-KaTtqyUOsEhR1tNLBNnBQMDeEOC8I3CAYmnaB6IRGWpoTCamxdAe2fiUTkmtXgwI5Dh2K6xjfzrxsuaZlhsZA64BoOj8N9K6nDJApT4axs8sWhvWwzhUR5N7-Yfwp3A0R3vY2tMGw8gPnE_Uj7E')` }}></div>
                  <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-on-surface-variant font-bold border border-outline-variant uppercase">
                    {gpsStatus === 'ok' ? 'GPS ACTIVE' : 'LOCATION PREVIEW'}
                  </div>
                </div>
              </motion.section>

              {/* Form Section 2: Visual Evidence */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2, ease: 'easeOut' }}
                className="bg-surface-container-lowest p-stack-md rounded-xl shadow-sm border border-outline-variant/30 space-y-stack-md"
              >
                <div className="flex items-center gap-stack-sm">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold">2</div>
                  <h3 className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider font-semibold">Photo Upload</h3>
                </div>
                <div className="relative group cursor-pointer">
                  <input accept="image/*" className="absolute inset-0 opacity-0 z-10 cursor-pointer" type="file" onChange={handlePhotoChange} />
                  {photoPreview ? (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-primary">
                      <img src={photoPreview} alt="Selected photo" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 right-2 bg-primary text-on-primary px-2 py-1 rounded text-xs font-semibold">Photo Attached</div>
                    </div>
                  ) : (
                    <div className="w-full aspect-video rounded-xl border-2 border-dashed border-outline-variant bg-surface flex flex-col items-center justify-center gap-stack-sm group-active:bg-surface-container-high transition-colors">
                      <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>photo_camera</span>
                      <p className="font-body-md text-body-md text-on-surface-variant">Tap to take or upload a photo</p>
                    </div>
                  )}
                </div>
              </motion.section>

              {/* Form Section 3: Classification */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.3, ease: 'easeOut' }}
                className="bg-surface-container-lowest p-stack-md rounded-xl shadow-sm border border-outline-variant/30 space-y-stack-md"
              >
                <div className="flex items-center gap-stack-sm">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold">3</div>
                  <h3 className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider font-semibold">Waste Category</h3>
                </div>
                <div className="flex flex-wrap gap-stack-sm">
                  {CATEGORIES.map(cat => {
                    const isActive = form.category === cat.value;
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => handleCategorySelect(cat.value)}
                        className={`px-stack-md h-10 rounded-full border font-button text-button transition-colors ${
                          isActive
                            ? 'bg-primary-container text-on-primary border-primary-container font-semibold'
                            : 'bg-surface border-outline-variant text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </motion.section>

              {/* Form Section 4: Details */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.4, ease: 'easeOut' }}
                className="bg-surface-container-lowest p-stack-md rounded-xl shadow-sm border border-outline-variant/30 space-y-stack-lg"
              >
                <div className="flex items-center gap-stack-sm">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold">4</div>
                  <h3 className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider font-semibold">Additional Information</h3>
                </div>
                <div className="space-y-stack-md">
                  <div className="space-y-stack-sm">
                    <label className="block font-label-caps text-label-caps text-on-surface-variant px-1">Description (Optional)</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary bg-surface font-body-md text-body-md p-stack-md outline-none"
                      placeholder="Provide extra details about the waste pile..."
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
                    <div className="space-y-stack-sm">
                      <label className="block font-label-caps text-label-caps text-on-surface-variant px-1">Ward Number</label>
                      <input
                        name="ward"
                        value={form.ward}
                        onChange={handleChange}
                        className="w-full h-12 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary bg-surface font-body-md text-body-md px-stack-md outline-none"
                        placeholder="e.g. 07"
                        type="text"
                      />
                    </div>
                    <div className="space-y-stack-sm">
                      <label className="block font-label-caps text-label-caps text-on-surface-variant px-1">Contact Email (Optional)</label>
                      <input
                        name="reporter_email"
                        value={form.reporter_email}
                        onChange={handleChange}
                        className="w-full h-12 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary bg-surface font-body-md text-body-md px-stack-md outline-none"
                        placeholder="your@email.com"
                        type="email"
                      />
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Submission */}
              <div className="pt-stack-lg pb-stack-lg">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-on-primary h-14 rounded-xl font-headline-md text-headline-md font-bold shadow-lg active:scale-95 transition-all duration-150 flex items-center justify-center gap-stack-md disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Report'}
                  <span className="material-symbols-outlined">send</span>
                </button>
                <p className="text-center font-label-caps text-label-caps text-outline mt-stack-md">By submitting, you agree to our civic guidelines.</p>
              </div>
            </form>
          </div>

          {/* Right Column - Preview Panel (Desktop only) */}
          <aside className="hidden md:block md:w-80 lg:w-96 xl:w-[420px] shrink-0">
            <div className="sticky top-20 space-y-stack-md">
              {/* Report Summary Card */}
              <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-sm border border-outline-variant/30">
                <h3 className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider font-semibold mb-stack-md flex items-center gap-stack-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">summarize</span>
                  Report Summary
                </h3>
                <div className="space-y-stack-md">
                  <div className="flex items-center justify-between py-stack-sm border-b border-outline-variant/20">
                    <span className="font-body-md text-body-md text-on-surface-variant">Category</span>
                    <span className="font-body-md text-body-md font-semibold capitalize text-on-surface">
                      {form.category ? form.category.replace('_', ' ') : 'Not selected'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-stack-sm border-b border-outline-variant/20">
                    <span className="font-body-md text-body-md text-on-surface-variant">Ward</span>
                    <span className="font-body-md text-body-md font-semibold text-on-surface">
                      {form.ward || 'Not specified'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-stack-sm border-b border-outline-variant/20">
                    <span className="font-body-md text-body-md text-on-surface-variant">GPS</span>
                    <span className={`font-body-md text-body-md font-semibold ${gpsStatus === 'ok' ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {gpsStatus === 'ok' ? 'Locked' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-stack-sm border-b border-outline-variant/20">
                    <span className="font-body-md text-body-md text-on-surface-variant">Photo</span>
                    <span className="font-body-md text-body-md font-semibold text-on-surface">
                      {photo ? 'Attached' : 'Not attached'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-stack-sm">
                    <span className="font-body-md text-body-md text-on-surface-variant">Description</span>
                    <span className="font-body-md text-body-md font-semibold text-on-surface">
                      {form.description ? `${form.description.length} chars` : 'Empty'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-primary-container/10 p-stack-md rounded-xl border border-primary/20">
                <div className="flex gap-stack-sm">
                  <span className="material-symbols-outlined text-primary shrink-0">lightbulb</span>
                  <div className="space-y-stack-sm">
                    <h4 className="font-button text-button font-semibold text-primary">Reporting Tips</h4>
                    <ul className="font-body-md text-body-md text-on-surface-variant space-y-1 list-none pl-0">
                      <li className="flex items-start gap-1">
                        <span className="text-primary text-[14px]">•</span>
                        Clear photos help identify the waste type
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-primary text-[14px]">•</span>
                        Accurate GPS speeds up the cleanup crew
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-primary text-[14px]">•</span>
                        Providing your ward number helps route reports faster
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Bottom Navigation Bar - hidden on desktop */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-white shadow-2xl border-t border-outline-variant/30 rounded-t-xl md:hidden">
        <Link to="/" className="flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all duration-150 text-on-surface-variant hover:text-primary cursor-pointer active:scale-90">
          <span className="material-symbols-outlined text-[20px]">home</span>
          <span className="font-label-caps text-[10px]">Home</span>
        </Link>
        <Link to="/submit" className="flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all duration-150 bg-primary-container text-on-primary font-bold cursor-pointer active:scale-90">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          <span className="font-label-caps text-[10px]">Report</span>
        </Link>
        <Link to="/track" className="flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all duration-150 text-on-surface-variant hover:text-primary cursor-pointer active:scale-90">
          <span className="material-symbols-outlined text-[20px]">history</span>
          <span className="font-label-caps text-[10px]">My Reports</span>
        </Link>
        <Link to="/staff/login" className="flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all duration-150 text-on-surface-variant hover:text-primary cursor-pointer active:scale-90">
          <span className="material-symbols-outlined text-[20px]">person</span>
          <span className="font-label-caps text-[10px]">Staff Portal</span>
        </Link>
      </nav>
    </motion.div>
  );
}