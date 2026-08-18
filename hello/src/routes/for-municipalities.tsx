import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/for-municipalities")({
  head: () => ({
    meta: [
      { title: "For Municipalities \u2014 Swachchha Nagar" },
      { name: "description", content: "A centralized command center for waste operations: telemetry, routing and analytics." },
      { property: "og:title", content: "For Municipalities \u2014 Swachchha Nagar" },
      { property: "og:description", content: "A centralized command center for waste operations: telemetry, routing and analytics." },
    ],
  }),
  component: ForMunicipalities,
});

function ForMunicipalities() {
  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-container-max rounded-full border border-white/40 dark:border-white/10 backdrop-blur-xl bg-surface/70 shadow-sm z-50">
      <div className="flex justify-between items-center px-8 py-3">
      <div className="font-display-lg text-headline-md tracking-tighter text-primary dark:text-primary-fixed">Swachchha Nagar</div>
      <div className="hidden md:flex gap-gutter items-center font-label-caps text-label-caps">
      <Link to="/" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors hover:scale-95 duration-200">Home</Link>
      <Link to="/how-it-works" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors hover:scale-95 duration-200">How It Works</Link>
      <Link to="/features" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors hover:scale-95 duration-200">Features</Link>
      <Link to="/for-municipalities" className="text-primary dark:text-tertiary-fixed-dim font-bold border-b-2 border-primary dark:border-tertiary-fixed-dim pb-1 hover:scale-95 transition-transform duration-200">For Municipalities</Link>
      <Link to="/about" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors hover:scale-95 duration-200">About</Link>
      </div>
      <button className="bg-primary-container text-on-primary font-button text-button px-6 py-2 rounded-full hover:bg-primary-container/90 transition-colors shadow-sm">
                      Report an Issue
                  </button>
      </div>
      </nav>

      <main className="flex-grow pt-[120px] pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">

      <section className="flex flex-col md:flex-row items-center justify-between gap-stack-lg mb-stack-lg mt-stack-lg">
      <div className="md:w-1/2 space-y-stack-md">
      <div className="inline-flex items-center gap-2 bg-tertiary-container/10 px-4 py-1.5 rounded-full">
      <span className="material-symbols-outlined text-primary-container text-sm">verified_user</span>
      <span className="font-label-caps text-label-caps text-primary-container uppercase">Enterprise Civic Solution</span>
      </div>
      <h1 className="font-display-lg text-display-lg text-primary leading-tight">
                          Engineering <span className="text-primary-container">Efficiency</span> for Modern Municipalities.
                      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                          Transform your city's waste management and infrastructure response with our centralized command platform. Data-driven insights, resource optimization, and direct citizen engagement.
                      </p>
      <div className="flex gap-4 pt-4">
      <button className="bg-primary-container text-on-primary font-button text-button px-8 py-3 rounded-lg hover:scale-95 transition-transform shadow-md">
                              Request a Demo
                          </button>
      <button className="bg-white border border-outline-variant text-primary font-button text-button px-8 py-3 rounded-lg hover:bg-surface-container-low transition-colors shadow-sm">
                              View Case Studies
                          </button>
      </div>
      </div>
      <div className="md:w-1/2 w-full relative">
      <div className="absolute inset-0 bg-primary-fixed-dim/20 blur-3xl rounded-full transform -translate-x-10 translate-y-10 z-0"></div>
      <div className="glass-card rounded-xl p-2 z-10 relative border-white/60">
      <img className="w-full h-auto rounded-lg object-cover shadow-sm" data-alt="A high-fidelity, light-mode dashboard UI mockup displaying urban infrastructure data. The dashboard features clean, modern typography, minimalist charts in shades of teal and deep green, and a sophisticated layout reminiscent of premium enterprise software. The background is a crisp white, contrasting with the dark green data visualization elements." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXfgz7IphFNbu6OasqIiFxDfx-Sj8Cdac-c7W2pAB1nteQtHQgvvwD1oZjwdfmIckHP6PdT4tXueTcJyCofSWMpsa9BgrS4TTJ1Ybu9F_LTyBEmog1G17YA8g12NbRWc4oceHBeuAJly9FuhCdPaMe0juXDl4eww1c-agu5_ekeYBh-JYVyZL1OwJTJyDGtTnfv_X3n6DQUDxx9l7XwiuvPGvXyg-c_U5Seqnx6hjFYn82gkXyFn17CA" />
      </div>
      </div>
      </section>


      <section className="mb-stack-lg py-stack-lg">
      <div className="text-center mb-stack-lg">
      <h2 className="font-headline-md text-headline-md text-primary mb-2">Centralized Command Center</h2>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">A single pane of glass for all municipal operations, replacing fragmented legacy systems with a cohesive, real-time dashboard.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
      <div className="col-span-1 md:col-span-2 glass-card rounded-xl p-stack-md flex flex-col justify-between overflow-hidden relative group">
      <div className="z-10 relative">
      <span className="font-label-caps text-label-caps text-primary-container mb-2 block">Real-time Visibility</span>
      <h3 className="font-headline-md text-headline-md text-primary mb-4">Monitor Infrastructure Live</h3>
      </div>
      <div className="mt-8 rounded-lg overflow-hidden border border-surface-variant relative h-[250px]">
      <img className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-500" data-alt="A detailed, modern map interface shown in light mode, highlighting specific city blocks with subtle teal and dark green overlays. The map is minimalist, removing street names and clutter to focus on data density. Small, elegant circular markers indicate active municipal work zones or reported issues, maintaining a premium B2B software aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0dkvpQ296T1o5c4PPBI6eksdQ3R_9CynvuN9_T02VPrpffjqU4Kn0GlDpvHSxQVxrsU7LUh-5bcd9U-BqOQbC9ZN5KGclNGil9Pq82MGVsqG2DgU6TX0k6_f1fRTXlZXqkBpi5z16BDvJ_S24eHXTIgk-TKV8zHMgVLG_Prwu-1CJ_y6om-gQVN5U-MXEZEpMlFA9MndMqxXx2pqqp4C9YntwY10KsWZwiJ0JmxUdP7VOU8XsM0d53w" />
      </div>
      </div>
      <div className="glass-card rounded-xl p-stack-md flex flex-col justify-between">
      <div>
      <span className="material-symbols-outlined text-primary-container text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
      <h3 className="font-headline-md text-headline-md text-primary mb-2">Predictive Maintenance</h3>
      <p className="font-body-md text-body-md text-on-surface-variant">Leverage historical data to predict infrastructure failures before they affect citizens.</p>
      </div>
      <div className="mt-4 pt-4 border-t border-surface-variant">
      <div className="flex items-center justify-between mb-2">
      <span className="font-label-caps text-label-caps text-on-surface-variant">System Accuracy</span>
      <span className="font-label-caps text-label-caps text-primary-container font-bold">94%</span>
      </div>
      <div className="w-full bg-surface-container-high rounded-full h-1.5">
      <div className="bg-tertiary-fixed h-1.5 rounded-full" style={{ width: "94%" }}></div>
      </div>
      </div>
      </div>
      </div>
      </section>

      <section className="mb-stack-lg bg-white rounded-2xl border border-surface-variant p-stack-lg shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-gutter">
      <div className="md:w-1/2">
      <h2 className="font-headline-md text-headline-md text-primary mb-4">Resource Optimization</h2>
      <p className="font-body-md text-body-md text-on-surface-variant mb-6">Stop deploying crews blindly. Our intelligent heatmaps aggregate citizen reports and sensor data to prioritize high-need areas, reducing fuel costs and improving response times.</p>
      <ul className="space-y-4 mb-8">
      <li className="flex items-start gap-3">
      <span className="material-symbols-outlined text-primary-container mt-0.5">route</span>
      <div>
      <strong className="font-body-md text-body-md text-primary block">Dynamic Routing</strong>
      <span className="font-body-md text-body-md text-on-surface-variant text-sm">Automated daily schedules based on priority.</span>
      </div>
      </li>
      <li className="flex items-start gap-3">
      <span className="material-symbols-outlined text-primary-container mt-0.5">monitoring</span>
      <div>
      <strong className="font-body-md text-body-md text-primary block">Asset Tracking</strong>
      <span className="font-body-md text-body-md text-on-surface-variant text-sm">Real-time location of all municipal vehicles.</span>
      </div>
      </li>
      </ul>
      </div>
      <div className="md:w-1/2 w-full h-[400px] rounded-xl overflow-hidden relative border border-surface-variant">
      <img className="absolute inset-0 w-full h-full object-cover" data-alt="A conceptual visualization of a data heatmap overlaid on a minimalist city grid. The heatmap uses a gradient from cool mint green to deep forest green to indicate areas of high municipal resource need. The design is abstract, clean, and highly technological, suitable for a presentation to enterprise government clients in a light-mode setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAer6T5YW2IkmXcLZgZUt56GAvPchRSsTMDfJrcovBOZfE-dKEtcECx1Q-CtNEitlHl0b6RURWKgsh8oU00EMk8-5SbWyDvFNyPSc15-FxRI1VltJWkNdGifuZes7ZF9RQreXIYyf2WD23dzG0x_HBvMiAabWfdb5mya_AANkVKsb_Av--tgAQQAw9zXnvjv3Xdo75Jeyhh7qE-xC6lmYtF6JMjDa58nEU2keqyjFgUTwCMx6k52_OsDw" />

      <div className="absolute bottom-4 left-4 right-4 glass-card p-4 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center">
      <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
      </div>
      <div>
      <div className="font-label-caps text-label-caps text-on-surface-variant">Fleet Efficiency</div>
      <div className="font-body-md text-body-md text-primary font-bold">+28% this quarter</div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </section>

      <section className="mb-stack-lg py-stack-lg">
      <div className="text-center mb-stack-lg">
      <h2 className="font-headline-md text-headline-md text-primary mb-2">Direct Citizen Engagement</h2>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">Close the loop between reports and resolution. Build trust through transparency.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
      <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-stack-md shadow-sm hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-lg enterprise-gradient flex items-center justify-center">
      <span className="material-symbols-outlined text-white">forum</span>
      </div>
      <h3 className="font-headline-md text-headline-md text-primary">Automated Feedback Loops</h3>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant mb-6">When a citizen reports a pothole or waste issue, the platform automatically updates them on the status—from 'Received' to 'Resolved'—without manual administrative work.</p>
      <div className="flex items-center gap-2">
      <span className="font-label-caps text-label-caps bg-tertiary-fixed-dim/20 text-tertiary-container px-2 py-1 rounded-md">Status: Resolved</span>
      <span className="material-symbols-outlined text-on-surface-variant text-sm">arrow_right_alt</span>
      <span className="font-label-caps text-label-caps bg-surface-variant text-on-surface-variant px-2 py-1 rounded-md">Notification Sent</span>
      </div>
      </div>
      <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-stack-md shadow-sm hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-lg enterprise-gradient flex items-center justify-center">
      <span className="material-symbols-outlined text-white">pie_chart</span>
      </div>
      <h3 className="font-headline-md text-headline-md text-primary">Civic Satisfaction Metrics</h3>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant mb-6">Track resolution times and citizen approval ratings on a unified dashboard to demonstrate ROI to city councils and stakeholders.</p>
      <div className="flex items-center justify-between bg-surface p-4 rounded-lg border border-surface-variant">
      <div>
      <div className="font-label-caps text-label-caps text-on-surface-variant">Avg. Resolution Time</div>
      <div className="font-headline-md text-headline-md text-primary">4.2 Days</div>
      </div>
      <span className="material-symbols-outlined text-tertiary-fixed-dim text-3xl">trending_down</span>
      </div>
      </div>
      </div>
      </section>

      <section className="mb-stack-lg enterprise-gradient rounded-2xl p-stack-lg text-center text-white relative overflow-hidden">

      <div className="absolute inset-0 opacity-10" data-alt="A subtle, abstract geometric pattern consisting of fine, interconnected lines and nodes, representing a digital network or civic infrastructure. The pattern is monochromatic, rendered in slightly lighter or darker shades of deep green to provide texture without distracting from foreground text in a modern UI component." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBR5T_Jhf1GHvkUOHSuaigjpztRYCOab4IJJHRPgszREQLxYUbuYbcogsaMKuZdRuT1aAx-POyeHNxmaZ-dqYlWSx0W0THZvXzpeHKWKXKQNN71p6FE5kMK5LdlK4tG3uO_sjPX47j8T0qM4A-TpvJrHdpWuA8biRyUjMRIJEELiIbYUgfBPrHFJEBTp2yj2vzanP0AJKeVOBAJUobbOT22755-Fsw5EN0_izeGOKZW38xoDb7zPEyjEQ')" }}></div>
      <div className="relative z-10 max-w-2xl mx-auto">
      <h2 className="font-display-lg text-headline-md text-white mb-4">Ready to upgrade your city's operating system?</h2>
      <p className="font-body-md text-body-md text-primary-fixed-dim mb-8">Join leading municipalities that have modernized their infrastructure management with Swachchha Nagar.</p>
      <button className="bg-white text-primary-container font-button text-button px-8 py-4 rounded-lg hover:scale-95 transition-transform shadow-lg">
                           Request a Full Demo
                       </button>
      </div>
      </section>
      </main>

      <footer className="w-full rounded-t-xl border-t border-outline-variant dark:border-outline bg-surface-container-lowest dark:bg-inverse-surface grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-stack-lg max-w-container-max mx-auto flat no shadows">
      <div className="col-span-1 md:col-span-2">
      <div className="font-display-lg text-headline-md text-primary dark:text-primary-fixed mb-4">Swachchha Nagar</div>
      <p className="font-body-md text-body-md text-on-surface-variant opacity-80 mb-4 max-w-sm">
                      © 2024 Swachchha Nagar. Engineering cleaner cities for Nepal.
                  </p>
      </div>
      <div className="col-span-1 flex flex-col gap-2">
      <span className="font-label-caps text-label-caps text-on-surface-variant mb-2">Platform</span>
      <a className="font-body-md text-body-md text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100 transition-opacity" href="#">Privacy Policy</a>
      <a className="font-body-md text-body-md text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100 transition-opacity" href="#">Terms of Service</a>
      </div>
      <div className="col-span-1 flex flex-col gap-2">
      <span className="font-label-caps text-label-caps text-on-surface-variant mb-2">Connect</span>
      <a className="font-body-md text-body-md text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100 transition-opacity" href="#">Muni Portal</a>
      <a className="font-body-md text-body-md text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100 transition-opacity" href="#">Contact Us</a>
      </div>
      </footer>
    </>
  );
}
