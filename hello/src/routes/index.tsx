import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Swachchha Nagar \u2014 Cleaner Cities. Together." },
      { name: "description", content: "Report waste problems, track progress and help build cleaner communities across Kathmandu." },
      { property: "og:title", content: "Swachchha Nagar \u2014 Cleaner Cities. Together." },
      { property: "og:description", content: "Report waste problems, track progress and help build cleaner communities across Kathmandu." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-container-max rounded-full border border-white/40 dark:border-white/10 backdrop-blur-xl bg-surface/70 dark:bg-surface-container/70 shadow-sm flex justify-between items-center px-8 py-3 z-50 transition-all duration-200">
      <div className="font-display-lg text-headline-md tracking-tighter text-primary dark:text-primary-fixed">Swachchha Nagar</div>
      <div className="hidden md:flex gap-6 items-center">
      <Link to="/" className="text-primary dark:text-tertiary-fixed-dim font-bold border-b-2 border-primary dark:border-tertiary-fixed-dim pb-1 font-label-caps text-label-caps transition-all duration-200 hover:scale-95">Home</Link>
      <Link to="/how-it-works" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-caps text-label-caps hover:scale-95 duration-200">How It Works</Link>
      <Link to="/features" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-caps text-label-caps hover:scale-95 duration-200">Features</Link>
      <Link to="/for-municipalities" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-caps text-label-caps hover:scale-95 duration-200">For Municipalities</Link>
      <Link to="/about" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-caps text-label-caps hover:scale-95 duration-200">About</Link>
      </div>
      <button className="bg-primary-container text-on-primary rounded-full px-6 py-2 font-button text-button hover:scale-95 transition-transform duration-200 shadow-sm hidden md:block">Report an Issue</button>

      <button className="md:hidden text-primary">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>menu</span>
      </button>
      </nav>

      <section className="relative pt-40 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col items-center text-center">
      <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary max-w-4xl mb-6">
                  Cleaner Cities. <span className="text-gradient">Together.</span>
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-10">
                  Report waste problems. Track progress. Help build cleaner communities.
              </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
      <button className="bg-primary-container text-on-primary rounded-full px-8 py-3 font-button text-button hover:bg-primary transition-colors flex items-center justify-center gap-2">
                      Report an Issue <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </button>
      <button className="bg-surface-container-highest text-primary rounded-full px-8 py-3 font-button text-button hover:bg-surface-variant transition-colors">
                      See How It Works
                  </button>
      </div>
      <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl border border-surface-container-highest bg-white p-2">
      <img alt="Kathmandu municipal map dashboard showing active waste reports and heatmaps" className="w-full h-auto rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_ItM8yYiNjmdaa9coKq4QREL3S9ZusZb5IPJ8WAV9bGzKITKv2qPgl7kmh_iCxzJFrjomSeyXVSRrq_lmh-6PrvYXoOpb_w-bGnvMSBKBHjshk4F8O7Fnk1EG6tD_VG_Op2W-W-t3XOHjpF98iH-BOYt6j2pZp75idKazzxT_neoWZ36dlrQMV3hCcKFYcMz7fr_wn2yRZ18fNwrsgT8uIB5MsRGjvk0A6wKUTsRlXcTXP2TzdkG3Ig" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none rounded-xl"></div>
      </div>
      </section>

      <section className="py-12 bg-surface-container-lowest border-y border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <p className="text-center font-label-caps text-label-caps text-outline mb-8">Built for faster, more transparent civic response.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
      <span className="material-symbols-outlined">bolt</span>
      </div>
      <span className="font-button text-button text-primary">Real-time Reports</span>
      </div>
      <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
      <span className="material-symbols-outlined">location_on</span>
      </div>
      <span className="font-button text-button text-primary">GPS-Based Location</span>
      </div>
      <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
      <span className="material-symbols-outlined">visibility</span>
      </div>
      <span className="font-button text-button text-primary">Transparent Resolution</span>
      </div>
      </div>
      </div>
      </section>

      <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-16">
      <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">Making a visible difference.</h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">See how citizens and municipalities are working together to build a cleaner city, one report at a time.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      <div className="glass-card rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm transition-transform hover:scale-[1.02] duration-200">
      <div className="relative h-48 overflow-hidden">
      <img alt="Resolved waste issue" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6ulGAmLnedayfiiFqI9Pfj9FVXdxEf6hRghUJbretrqId8H_SblrAj6-cB9VuxdbEHlUcdGbFGJhCKipgk2yht2kLRnzfaAIGvDw_HONb0ZMyJ_EWuA1qXUggNcxo5sbLfMRStxbA4V45YAecfTddN3cwomRnTf5ueJLwi0MEwbsZX8oRQHwgJwVERvX1xyXyJh9QrLBuXSKUx2ywBqO2nz1Kii52bJGQLhL3UpuNYbO2K_-wndGX7w" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
      <span className="material-symbols-outlined text-sm text-primary">location_on</span>
      <span className="text-label-caps font-label-caps text-primary">Ward 08, Thamel</span>
      </div>
      </div>
      <div className="p-6">
      <div className="flex justify-between items-center mb-3">
      <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-label-caps font-label-caps">Resolved</span>
      <span className="text-outline text-sm">2 hours ago</span>
      </div>
      <p className="font-body-md text-on-surface font-semibold">Illegal dumping cleared within 24 hours.</p>
      </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm transition-transform hover:scale-[1.02] duration-200">
      <div className="relative h-48 overflow-hidden">
      <img alt="Resolved waste issue" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQLEHOYA2FIuic1hUcpag9D3WsFgkQHHY2nTJQk__Y_FLu9NQxFQQOtWcnALELDWl66b8aLl5RwAXw_zGq4xvlTcpmhL2i_fHjYWcljQHqsokgsYl5OQ6FbfEWSvZc34cJg8cptSx5bWs6zzXibSIwHeFzmQHfgYpaOlXfY08UYvYTj_YbKNNd6UE5pWYaHbrTgQD1WGWo9G_D3fu5--58rJO0HT5yWnNJFN9iaimM4tBpfGNHmvcOww" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
      <span className="material-symbols-outlined text-sm text-primary">location_on</span>
      <span className="text-label-caps font-label-caps text-primary">Ward 03, Maharajgunj</span>
      </div>
      </div>
      <div className="p-6">
      <div className="flex justify-between items-center mb-3">
      <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-label-caps font-label-caps">Resolved</span>
      <span className="text-outline text-sm">5 hours ago</span>
      </div>
      <p className="font-body-md text-on-surface font-semibold">Overflowing bin collection completed.</p>
      </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm transition-transform hover:scale-[1.02] duration-200">
      <div className="relative h-48 overflow-hidden">
      <img alt="Resolved waste issue" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3FxZVIHJ3bl99jOKibhiJNq3xzO4znueBnCQXbuWs6WNMoaEPhv6oBd4crCCRahi5R39Siz4jTf-YS2kWFWkJhhIXR48xAiAlHxvTCN-AO0Gwilewgdbgwrj9BWoI6-GXZXqjkXTq9qxdu2SZVNhWaOOY4qVDBdSxld1b_ovZxX7owxpT4fhkO82b3fTHyxCzPsFPdQcvzfId50hIqKwwDAroVbtZrvQpbNy6iuxopGI_mZ1ZKG3EvA" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
      <span className="material-symbols-outlined text-sm text-primary">location_on</span>
      <span className="text-label-caps font-label-caps text-primary">Ward 10, Baneshwor</span>
      </div>
      </div>
      <div className="p-6">
      <div className="flex justify-between items-center mb-3">
      <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-label-caps font-label-caps">Resolved</span>
      <span className="text-outline text-sm">Yesterday</span>
      </div>
      <p className="font-body-md text-on-surface font-semibold">Construction debris removed from sidewalk.</p>
      </div>
      </div>
      </div>
      </section>

      <section className="py-20 bg-primary-container text-on-primary-container">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div className="flex flex-col items-center gap-3">
      <span className="material-symbols-outlined text-tertiary-fixed text-4xl">recycling</span>
      <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-tertiary-fixed font-bold">500+</span>
      <span className="font-body-md text-body-md">Tons of Waste Collected</span>
      </div>
      <div className="flex flex-col items-center gap-3">
      <span className="material-symbols-outlined text-tertiary-fixed text-4xl">group</span>
      <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-tertiary-fixed font-bold">2,400+</span>
      <span className="font-body-md text-body-md">Active Citizen Reporters</span>
      </div>
      <div className="flex flex-col items-center gap-3">
      <span className="material-symbols-outlined text-tertiary-fixed text-4xl">handshake</span>
      <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-tertiary-fixed font-bold">14</span>
      <span className="font-body-md text-body-md">Partner Wards</span>
      </div>
      <div className="flex flex-col items-center gap-3">
      <span className="material-symbols-outlined text-tertiary-fixed text-4xl">timer</span>
      <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-tertiary-fixed font-bold">18h</span>
      <span className="font-body-md text-body-md">Average Resolution Time</span>
      </div>
      </div>
      </div>
      </section>

      <section className="py-20 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <div className="text-center mb-12">
      <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">Civic Champions</h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Top-performing wards leading the charge in civic response and cleanup efforts.</p>
      </div>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
      <div className="glass-card rounded-xl p-6 flex items-center justify-between border border-surface-variant transition-transform hover:-translate-y-1 duration-200">
      <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-md text-xl">1</div>
      <div>
      <h3 className="font-headline-md text-primary text-lg">Ward 08 - Thamel</h3>
      <p className="text-sm text-outline font-label-caps">Avg. Resolution: 12 Hours</p>
      </div>
      </div>
      <div className="text-right">
      <div className="font-bold text-primary-container text-xl">842</div>
      <div className="text-sm text-outline font-label-caps">Reports Resolved</div>
      </div>
      </div>
      <div className="glass-card rounded-xl p-6 flex items-center justify-between border border-surface-variant transition-transform hover:-translate-y-1 duration-200">
      <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-surface-container-highest text-primary flex items-center justify-center font-headline-md text-xl">2</div>
      <div>
      <h3 className="font-headline-md text-primary text-lg">Ward 03 - Maharajgunj</h3>
      <p className="text-sm text-outline font-label-caps">Avg. Resolution: 16 Hours</p>
      </div>
      </div>
      <div className="text-right">
      <div className="font-bold text-primary-container text-xl">615</div>
      <div className="text-sm text-outline font-label-caps">Reports Resolved</div>
      </div>
      </div>
      <div className="glass-card rounded-xl p-6 flex items-center justify-between border border-surface-variant transition-transform hover:-translate-y-1 duration-200">
      <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-surface-container-highest text-primary flex items-center justify-center font-headline-md text-xl">3</div>
      <div>
      <h3 className="font-headline-md text-primary text-lg">Ward 10 - Baneshwor</h3>
      <p className="text-sm text-outline font-label-caps">Avg. Resolution: 19 Hours</p>
      </div>
      </div>
      <div className="text-right">
      <div className="font-bold text-primary-container text-xl">498</div>
      <div className="text-sm text-outline font-label-caps">Reports Resolved</div>
      </div>
      </div>
      </div>
      </div>
      </section>

      <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="order-2 md:order-1">
      <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">See where the city needs attention.</h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">Turn historical reports into visual insights to identify recurring hotspots. Our data intelligence helps municipal leaders optimize waste collection routes, allocate resources effectively, and predict future maintenance needs before they become community issues.</p>
      <ul className="space-y-4 mb-8">
      <li className="flex items-start gap-3">
      <span className="material-symbols-outlined text-tertiary-container mt-1">check_circle</span>
      <span className="text-on-surface">Real-time heatmapping of active civic reports</span>
      </li>
      <li className="flex items-start gap-3">
      <span className="material-symbols-outlined text-tertiary-container mt-1">check_circle</span>
      <span className="text-on-surface">Historical trend analysis for resource allocation</span>
      </li>
      <li className="flex items-start gap-3">
      <span className="material-symbols-outlined text-tertiary-container mt-1">check_circle</span>
      <span className="text-on-surface">Predictive modeling for waste collection optimization</span>
      </li>
      </ul>
      </div>
      <div className="order-1 md:order-2 relative">
      <img alt="Heatmap of Kathmandu showing active and resolved civic reports" className="w-full rounded-2xl shadow-xl border border-outline-variant/30 relative z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyAVTDaLDVdwys9_w7MAfLAw9EnN21K4IW2qRP537nHR-ZyTWIXZenBhZXOioZ0mBg_ROQEgM5qr1N9Y8sZ6VAbuB4Fj6p8-H5JuDi7xcP0hN0eaDcnCrTHxgB5ohc3XYO1rnGpVvxNKnPbOof94M74YdZxubQat7pW6Ifk--6VCHbMyiauBGr4hQD6gErZbJMmwNP9zlAbRMThGRt6k_DCh8SHE7MKrSSGqxPFuBdySrqy8YPmZW8wg" />
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-tertiary-fixed-dim/20 rounded-full blur-3xl z-0 pointer-events-none"></div>
      </div>
      </div>
      </section>

      <section className="py-20 bg-surface-container text-on-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <div className="text-center mb-16">
      <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">Open Data Transparency</h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">We believe in making civic performance metrics visible to everyone.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
      <div className="glass-card p-8 rounded-2xl border border-outline-variant/30 flex flex-col justify-center items-center text-center">
      <h3 className="font-headline-md text-headline-md text-primary mb-2">Overall Cleanup Efficiency</h3>
      <div className="relative w-48 h-48 flex items-center justify-center my-6">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
      <circle className="text-surface-variant stroke-current" cx="50" cy="50" fill="transparent" r="45" strokeWidth="8" />
      <circle className="text-tertiary-container stroke-current" cx="50" cy="50" fill="transparent" r="45" strokeDasharray="282.7" strokeDashoffset="16.9" strokeLinecap="round" strokeWidth="8" />
      </svg>
      <div className="absolute text-5xl font-display-lg text-primary font-bold">94%</div>
      </div>
      <p className="text-on-surface-variant text-sm font-label-caps">Of all reported issues resolved within SLA.</p>
      </div>
      <div className="flex flex-col gap-8 justify-center">
      <div>
      <h3 className="font-headline-md text-headline-md text-primary mb-6">Resolution Rate by Category</h3>
      <div className="space-y-6">
      <div>
      <div className="flex justify-between mb-2">
      <span className="font-button text-button text-on-surface">Plastic Waste</span>
      <span className="font-button text-button text-primary">98%</span>
      </div>
      <div className="w-full bg-surface-variant rounded-full h-3">
      <div className="bg-tertiary-container h-3 rounded-full" style={{ width: "98%" }}></div>
      </div>
      </div>
      <div>
      <div className="flex justify-between mb-2">
      <span className="font-button text-button text-on-surface">Organic Waste</span>
      <span className="font-button text-button text-primary">92%</span>
      </div>
      <div className="w-full bg-surface-variant rounded-full h-3">
      <div className="bg-tertiary-container h-3 rounded-full opacity-90" style={{ width: "92%" }}></div>
      </div>
      </div>
      <div>
      <div className="flex justify-between mb-2">
      <span className="font-button text-button text-on-surface">Construction Debris</span>
      <span className="font-button text-button text-primary">85%</span>
      </div>
      <div className="w-full bg-surface-variant rounded-full h-3">
      <div className="bg-tertiary-container h-3 rounded-full opacity-80" style={{ width: "85%" }}></div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </section>
      <footer className="w-full rounded-t-xl bg-surface-container-lowest dark:bg-inverse-surface border-t border-outline-variant dark:border-outline px-margin-desktop py-stack-lg mt-20">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter relative overflow-hidden">

      <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
      <span className="material-symbols-outlined" style={{ fontSize: "200px" }}>map</span>
      </div>
      <div className="flex flex-col gap-4 col-span-1 md:col-span-2">
      <div className="font-display-lg text-headline-md text-primary dark:text-primary-fixed">Swachchha Nagar</div>
      <p className="font-body-md text-body-md text-primary dark:text-primary-fixed-dim">© 2024 Swachchha Nagar. Engineering cleaner cities for Nepal.</p>
      </div>
      <div className="flex flex-col gap-3">
      <h4 className="font-label-caps text-label-caps text-primary dark:text-tertiary-fixed font-semibold">Links</h4>
      <a className="font-body-md text-body-md text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
      <a className="font-body-md text-body-md text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
      </div>
      <div className="flex flex-col gap-3">
      <h4 className="font-label-caps text-label-caps text-primary dark:text-tertiary-fixed font-semibold">Connect</h4>
      <a className="font-body-md text-body-md text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100" href="#">Muni Portal</a>
      <a className="font-body-md text-body-md text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100" href="#">Contact Us</a>
      </div>
      </div>
      </footer>
    </>
  );
}
