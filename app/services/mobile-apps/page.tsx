"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MobileAppsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 md:px-16 bg-white/90 backdrop-blur-md border-b border-black/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex items-center rounded-full px-[5px] py-[4px]" style={{ background:"linear-gradient(135deg,#fff8f3,#fff1e6)",border:"1.5px solid rgba(249,115,22,0.6)",boxShadow:"0 0 10px rgba(249,115,22,0.4)",width:68,height:30 }}>
            <div className="flex items-center justify-center" style={{ width:32,height:22 }}><span className="font-mono font-bold text-[10px]" style={{ color:"#ea580c" }}>&lt;/&gt;</span></div>
            <div className="rounded-full" style={{ width:22,height:22,background:"radial-gradient(circle at 35% 35%,#fde68a,#f97316 55%,#c2410c)" }} />
          </div>
          <span className="text-[17px] font-bold tracking-tight">Code<span className="text-orange-500">Mode</span></span>
        </Link>
        <Link href="/services" className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">← All services</Link>
      </nav>

      <div className="relative overflow-hidden" style={{ background:"linear-gradient(135deg,#eff6ff,#dbeafe,#eff6ff)" }}>
        <div className="absolute inset-0" style={{ backgroundImage:"radial-gradient(circle at 80% 30%,rgba(59,130,246,0.2) 0%,transparent 60%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 md:px-16 py-24">
          <motion.div initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.65 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-md">📱</div>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-600">Mobile Apps</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-gray-900 mb-4">Mobile App<br />Development</h1>
            <p className="text-xl text-blue-600 font-semibold mb-6">Native performance. Cross-platform speed.</p>
            <p className="text-[16px] text-gray-500 max-w-xl leading-relaxed mb-10">Cross-platform iOS & Android apps with native performance. From consumer apps to internal tools — built fast, tested thoroughly, supported long-term.</p>
            <div className="flex flex-wrap gap-8 mb-10">
              {[["Timeline","8–16 weeks"],["Platforms","iOS · Android · Web"]].map(([l,v]) => (
                <div key={l}><p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{l}</p><p className="text-xl font-black text-gray-900">{v}</p></div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Link href="/start"><motion.span whileHover={{ scale:1.04 }} className="inline-block rounded-xl bg-gray-900 px-8 py-4 text-[14px] font-bold text-white cursor-pointer">Book a call ↗</motion.span></Link>
              <Link href="/start" className="text-[14px] font-semibold text-gray-400 hover:text-gray-700 transition-colors">or send us a message</Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-20 flex flex-col gap-20">
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-10">What we deliver.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon:"🎨", title:"UX Design & Prototyping", desc:"Full Figma designs, interactive prototypes and user testing before a single line of code — so you know it works before you build it." },
              { icon:"📲", title:"iOS & Android App", desc:"One codebase, two platforms. React Native with Expo delivers near-native performance with a fraction of the cost of separate native apps." },
              { icon:"🔗", title:"Backend API", desc:"REST or GraphQL API, database, auth and third-party integrations — the full backend your app needs to function in production." },
              { icon:"🔔", title:"Push Notifications", desc:"Targeted push notifications via Expo or FCM. Trigger by user action, time or backend event — with deep link support." },
              { icon:"🏪", title:"App Store Submission", desc:"We handle Apple App Store and Google Play submission, review responses and post-launch metadata updates." },
              { icon:"📊", title:"Analytics & Crash Reporting", desc:"Sentry for error monitoring, Mixpanel or PostHog for product analytics — wired in from day one so you ship with confidence." },
            ].map(({ icon,title,desc },i) => (
              <motion.div key={title} initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.5,delay:i*0.08 }} whileHover={{ y:-3 }} className="rounded-2xl border border-gray-100 bg-white p-6" style={{ boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl mb-4">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-8">Tech stack.</h2>
          <div className="flex flex-wrap gap-3">
            {["React Native","Expo","TypeScript","Supabase","Firebase","Redux Toolkit","React Query","Fastlane","Sentry","Mixpanel","PostHog"].map(t => (
              <span key={t} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-[13px] font-semibold text-gray-700">{t}</span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl p-12 text-center" style={{ background:"linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
          <h2 className="text-3xl font-black text-gray-900 mb-3">Ready to go mobile?</h2>
          <p className="text-gray-500 mb-8">Tell us your app idea — we&apos;ll scope it and get back within 24 hours.</p>
          <Link href="/start"><motion.span whileHover={{ scale:1.05 }} className="inline-block rounded-xl bg-gray-900 px-10 py-4 text-[14px] font-bold text-white cursor-pointer">Start the conversation ↗</motion.span></Link>
        </div>
      </div>
    </main>
  );
}
