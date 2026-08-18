import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/hotspots")({
  head: () => ({
    meta: [
      { title: "Hotspot Analysis \u2014 Swachchha Nagar" },
      { name: "description", content: "Heatmaps and forecasts of recurring waste hotspots by ward." },
      { property: "og:title", content: "Hotspot Analysis \u2014 Swachchha Nagar" },
      { property: "og:description", content: "Heatmaps and forecasts of recurring waste hotspots by ward." },
    ],
  }),
  component: Hotspots,
});

function Hotspots() {
  return (
    <>
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop py-4 bg-white/70 dark:bg-inverse-surface/70 font-headline-md text-headline-md backdrop-blur-xl border-b border-outline-variant/30 shadow-sm transition-all duration-200">
      <div className="flex items-center gap-4">
      <span className="text-headline-md font-display-lg text-primary dark:text-primary-fixed tracking-tight font-bold">KTM Waste Management</span>
      </div>
      <div className="flex items-center gap-6">
      <div className="relative hidden md:block">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" data-icon="search" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
      <input className="pl-10 pr-4 py-2 rounded-full border border-outline-variant/50 bg-white/50 focus:bg-white focus:ring-2 focus:ring-tertiary-fixed-dim focus:border-transparent outline-none transition-all text-sm w-64 glass-panel" placeholder="Search data..." type="text" />
      </div>
      <button aria-label="notifications" className="p-2 rounded-full text-on-surface-variant font-medium hover:bg-primary/5 transition-colors active:scale-95 duration-200">
      <span className="material-symbols-outlined" data-icon="notifications" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
      </button>
      <button aria-label="settings" className="p-2 rounded-full text-on-surface-variant font-medium hover:bg-primary/5 transition-colors active:scale-95 duration-200">
      <span className="material-symbols-outlined" data-icon="settings" style={{ fontVariationSettings: "'FILL' 0" }}>settings</span>
      </button>
      <div className="h-10 w-10 rounded-full overflow-hidden border border-outline-variant/30 cursor-pointer">
      <img alt="Administrator profile" className="h-full w-full object-cover" data-alt="A clean, minimalist 3D render avatar of a professional administrator in a bright, modern setting. The style is premium civic-tech, utilizing a soft light-mode color palette with subtle emerald and teal accents. The lighting is diffused and high-key, creating a sophisticated and trustworthy mood." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1LU00C77g0-TKi_WvgNynY-YanbDmMafe8nexP6PcqwjX7aR6ekB-3AW-vR7PUzydho3OqfJujPh36ALdf8WzTtChlaDBOI2K9f0549-8Dzz4XHDw7lbBVYWfmK_qwmxkAl9w7o2vvVZQnsfRJCw1JR_Ot-aOIkw0fyrBi_c88sWJnpH7YWJBtRqsE1jUrg2SLEX6ZEmzTXl8jzIy4XxXp7Up6if8CwSEGuVP3KEmjR_YHc21E1AWAg" />
      </div>
      </div>
      </header>
      <div className="flex h-screen pt-[72px]">

      <nav className="hidden md:flex flex-col h-[calc(100vh-72px)] py-stack-lg px-4 gap-stack-md fixed h-full left-0 w-64 bg-surface dark:bg-inverse-surface border-r border-outline-variant/20 z-40">
      <div className="mb-8 flex flex-col items-center text-center">
      <div className="h-16 w-16 rounded-full overflow-hidden mb-3 border border-outline-variant/20">
      <img alt="Kathmandu Metropolitan City Logo" className="h-full w-full object-cover" data-alt="The official Kathmandu Metropolitan City logo rendered in a minimalist, high-end 3D glassmorphic style. It sits against a pristine white background, illuminated by soft, studio-quality lighting that highlights its geometric precision and civic authority. The color palette emphasizes deep primary greens and vibrant teal accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGANPMnblPORKzry7CGFmAuSIdHM_lgywRBEOyhFXyXiu_HVaUPbEZ6xk8BCtFgltBKkJzLFyKxhoOSKREcvcSn5kH6WwYHPSRXD3PRhJs3rrm6MII4iNXfg6ZAX3WOI1El-Phkk8tFIITYUpMQqvG3fqLz2e4GJm7rHY83SZj8h2VChGBd9VR1bvoYF4SNaZp1J2cyUDhTT-uiVAe9LbI3O0gGmr32s0RNysBPn-k6_Fvuxwmi_BJCA" />
      </div>
      <h2 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed tracking-tight font-bold text-lg leading-tight">KMC Operations</h2>
      <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider mt-1">Municipal Hub</span>
      </div>
      <div className="flex-1 flex flex-col gap-2">
      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 group">
      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors" data-icon="dashboard" style={{ fontVariationSettings: "'FILL' 0" }}>dashboard</span>
      <span className="font-label-caps text-label-caps tracking-wider">Dashboard</span>
      </Link>
      <Link to="/wards" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 group">
      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors" data-icon="leaderboard" style={{ fontVariationSettings: "'FILL' 0" }}>leaderboard</span>
      <span className="font-label-caps text-label-caps tracking-wider">Ward Performance</span>
      </Link>
      <Link to="/fleet" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 group">
      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors" data-icon="local_shipping" style={{ fontVariationSettings: "'FILL' 0" }}>local_shipping</span>
      <span className="font-label-caps text-label-caps tracking-wider">Fleet Monitor</span>
      </Link>
      <Link to="/hotspots" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-tertiary-container bg-tertiary-fixed-dim/20 transition-all active:translate-x-1 duration-150 group">
      <span className="material-symbols-outlined text-tertiary-container" data-icon="radar" style={{ fontVariationSettings: "'FILL' 1" }}>radar</span>
      <span className="font-label-caps text-label-caps font-bold tracking-wider">Hotspot Analysis</span>
      </Link>
      <Link to="/reports" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 group">
      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors" data-icon="assessment" style={{ fontVariationSettings: "'FILL' 0" }}>assessment</span>
      <span className="font-label-caps text-label-caps tracking-wider">Report Center</span>
      </Link>
      </div>
      <div className="mt-auto pt-4 border-t border-outline-variant/20 flex flex-col gap-2">
      <button className="w-full bg-primary-container text-white font-button text-button py-3 rounded-lg hover:bg-primary-container/90 active:scale-95 transition-all shadow-sm">
                          Dispatch Crew
                      </button>
      <a className="flex items-center gap-3 px-4 py-2 mt-2 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all group" href="#">
      <span className="material-symbols-outlined text-sm text-outline group-hover:text-primary transition-colors" data-icon="help_outline" style={{ fontVariationSettings: "'FILL' 0" }}>help_outline</span>
      <span className="font-label-caps text-label-caps tracking-wider text-[10px]">Support</span>
      </a>
      <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all group" href="#">
      <span className="material-symbols-outlined text-sm text-outline group-hover:text-primary transition-colors" data-icon="inventory_2" style={{ fontVariationSettings: "'FILL' 0" }}>inventory_2</span>
      <span className="font-label-caps text-label-caps tracking-wider text-[10px]">Archive</span>
      </a>
      </div>
      </nav>

      <main className="flex-1 ml-0 md:ml-64 p-margin-mobile md:p-margin-desktop overflow-y-auto">
      <div className="max-w-container-max mx-auto space-y-stack-lg">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
      <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">Hotspot Analysis</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">Predictive modeling and real-time identification of recurring waste accumulation zones across Kathmandu.</p>
      </div>
      <div className="flex gap-3">
      <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
      <span className="font-label-caps text-label-caps text-on-surface">Live Sync Active</span>
      </div>
      </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

      <div className="lg:col-span-8 card-base p-0 overflow-hidden relative min-h-[500px] flex flex-col group">
      <div className="absolute top-4 left-4 z-10 glass-panel p-3 rounded-xl flex items-center gap-3">
      <span className="material-symbols-outlined text-primary-container" data-icon="map" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
      <div>
      <h3 className="font-headline-md text-[16px] leading-tight text-primary font-bold">Kathmandu Valley</h3>
      <span className="font-label-caps text-label-caps text-outline">Accumulation Density Map</span>
      </div>
      </div>
      <div className="absolute top-4 right-4 z-10 glass-panel p-2 rounded-lg flex flex-col gap-2">
      <button aria-label="Zoom In" className="p-1.5 rounded-md hover:bg-black/5 text-on-surface transition-colors">
      <span className="material-symbols-outlined" data-icon="add" style={{ fontVariationSettings: "'FILL' 0" }}>add</span>
      </button>
      <button aria-label="Zoom Out" className="p-1.5 rounded-md hover:bg-black/5 text-on-surface transition-colors">
      <span className="material-symbols-outlined" data-icon="remove" style={{ fontVariationSettings: "'FILL' 0" }}>remove</span>
      </button>
      </div>
      <div className="flex-1 w-full bg-surface-container-low relative">

      <img alt="Kathmandu Heatmap" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply filter grayscale-[30%]" data-alt="A highly detailed, stylized minimalist map of Kathmandu, Nepal, viewed from directly above. The map uses a premium light-mode aesthetic with soft greys and whites for infrastructure. Vibrant, glowing heatmap overlays in varying shades of emerald green and intense teal highlight specific urban zones, representing waste accumulation density. The style is clean, modern, and civic-tech focused." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_wgCV3Tj2LG7WDKNCKwLplShnVp1hQsgmr8Of_GNGjDXPHxEyfY6Z6LaEF54nWm-_O6cmXuijX38nXlcZswRrdMZDAqelJjCo4eLI0Ij7mkVawNMVa8ReorvSHEGgOfDAii4EQmHyNcjC0A2TLlD7J61LR8g3i_Iv1UiLZaJ6kIvZBA7Omj0Mk9hU2yk0ZUgkuAZ88CfFuxlPnYQJVipWhle4Mffn4KjE4rKazG4N6sMxq2WlHhqqlg" />

      <div className="absolute top-[30%] left-[45%] h-12 w-12 bg-tertiary-fixed-dim/40 rounded-full animate-ping"></div>
      <div className="absolute top-[30%] left-[45%] h-12 w-12 bg-tertiary-container/80 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
      <span className="font-label-caps text-white text-[10px] font-bold">W-12</span>
      </div>
      <div className="absolute top-[60%] left-[25%] h-8 w-8 bg-tertiary-fixed-dim/30 rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
      <div className="absolute top-[60%] left-[25%] h-8 w-8 bg-tertiary-container/60 rounded-full border-2 border-white shadow-md flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
      </div>
      <div className="absolute bottom-4 left-4 z-10 glass-panel px-3 py-2 rounded-lg flex items-center gap-2 text-xs">
      <span className="font-label-caps text-outline uppercase">Density:</span>
      <div className="w-24 h-2 rounded-full bg-gradient-to-r from-surface-variant via-primary-fixed-dim to-tertiary-container"></div>
      </div>
      </div>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-gutter">

      <div className="card-base p-stack-md flex flex-col justify-between flex-1 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-fixed/30 to-transparent rounded-bl-full pointer-events-none"></div>
      <div className="flex justify-between items-start mb-4 relative z-10">
      <div>
      <h3 className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Resolution Rate</h3>
      <p className="font-headline-md text-3xl font-bold text-primary mt-1">84.2%</p>
      </div>
      <div className="p-2 bg-tertiary-fixed-dim/20 rounded-lg text-on-tertiary-container">
      <span className="material-symbols-outlined" data-icon="task_alt" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
      </div>
      </div>
      <div className="relative z-10 mt-auto">
      <div className="flex justify-between text-xs text-on-surface-variant mb-1 font-mono">
      <span>Target: 90%</span>
      <span className="text-tertiary-container font-semibold">+2.4% this week</span>
      </div>
      <div className="w-full bg-primary/10 rounded-full h-2 overflow-hidden">
      <div className="bg-tertiary-fixed-dim h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: "84.2%" }}></div>
      </div>
      </div>
      </div>

      <div className="card-base p-stack-md flex-1">
      <div className="flex justify-between items-center mb-4">
      <h3 className="font-headline-md text-[18px] font-bold text-primary">Forecasted Hotspots</h3>
      <span className="material-symbols-outlined text-outline text-sm" data-icon="trending_up" style={{ fontVariationSettings: "'FILL' 0" }}>trending_up</span>
      </div>
      <div className="space-y-3">

      <div className="flex items-center justify-between p-3 rounded-lg border border-outline-variant/30 hover:bg-surface-container-lowest transition-colors cursor-pointer group">
      <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-md bg-error-container/50 flex items-center justify-center text-on-error-container group-hover:scale-105 transition-transform">
      <span className="material-symbols-outlined text-sm" data-icon="warning" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
      </div>
      <div>
      <p className="font-button text-sm text-on-surface font-semibold">Ward 14, Kalanki</p>
      <p className="font-label-caps text-[10px] text-outline">High Probability - 48hrs</p>
      </div>
      </div>
      <span className="font-mono text-xs text-error font-semibold">92%</span>
      </div>

      <div className="flex items-center justify-between p-3 rounded-lg border border-outline-variant/30 hover:bg-surface-container-lowest transition-colors cursor-pointer group">
      <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-md bg-tertiary-fixed-dim/30 flex items-center justify-center text-on-tertiary-container group-hover:scale-105 transition-transform">
      <span className="material-symbols-outlined text-sm" data-icon="schedule" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
      </div>
      <div>
      <p className="font-button text-sm text-on-surface font-semibold">Ward 29, Thamel</p>
      <p className="font-label-caps text-[10px] text-outline">Med Probability - 72hrs</p>
      </div>
      </div>
      <span className="font-mono text-xs text-on-tertiary-container font-semibold">68%</span>
      </div>

      <div className="flex items-center justify-between p-3 rounded-lg border border-outline-variant/30 hover:bg-surface-container-lowest transition-colors cursor-pointer group">
      <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-md bg-surface-variant flex items-center justify-center text-on-surface-variant group-hover:scale-105 transition-transform">
      <span className="material-symbols-outlined text-sm" data-icon="info" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
      </div>
      <div>
      <p className="font-button text-sm text-on-surface font-semibold">Ward 10, Baneshwor</p>
      <p className="font-label-caps text-[10px] text-outline">Low Probability - 72hrs</p>
      </div>
      </div>
      <span className="font-mono text-xs text-on-surface-variant font-semibold">34%</span>
      </div>
      </div>
      <button className="w-full mt-4 py-2 border border-outline-variant rounded-lg font-button text-xs text-primary hover:bg-primary/5 transition-colors">
                                      View Full Forecast Report
                                  </button>
      </div>
      </div>
      </div>
      </div>
      </main>
      </div>
    </>
  );
}
