"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const process = [
  { step:"01", title:"Discovery & Architecture", desc:"We map your product requirements, user flows and data model. You get a full system architecture doc before a single line of code is written." },
  { step:"02", title:"Foundation Build", desc:"Auth, database schema, API structure, CI/CD and staging environment — the scaffolding that everything else sits on, done right the first time." },
  { step:"03", title:"Feature Development", desc:"Weekly sprints with live demos. Every feature is tested, reviewed and deployed to staging before it touches production." },
  { step:"04", title:"Launch & Handover", desc:"Production deployment, monitoring setup, full documentation and a 30-day post-launch support window so you're never left stranded." },
];

const faqs = [
  { q:"Do you build MVPs or full products?", a:"Both. We can scope a lean MVP to validate in 6 weeks, or a full-featured SaaS with admin, billing and analytics. We'll recommend what makes sense for your stage." },
  { q:"Do I own the code?", a:"100%. You get full source code ownership, all repositories and no vendor lock-in to us. It's yours from day one." },
  { q:"What if I already have a partial codebase?", a:"We can audit and extend existing code. We'll assess the state of the codebase in our discovery call and be honest about whether it's worth building on." },
  { q:"Can you handle design too?", a:"Yes — we have in-house UI/UX and can deliver full Figma designs alongside the build, or work from designs you already have." },
];

export default function SaaSDevelopmentPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 md:px-16 bg-white/90 backdrop-blur-md border-b border-black/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex items-center rounded-full px-[5px] py-[4px]" style={{ background:"linear-gradient(135deg,#faf8ff,#f3eefe)",border:"1.5px solid rgba(157,124,232,0.6)",boxShadow:"0 0 10px rgba(157,124,232,0.4)",width:68,height:30 }}>
            <div className="flex items-center justify-center" style={{ width:32,height:22 }}><span className="font-mono font-bold text-[10px]" style={{ color:"#6d42be" }}>&lt;/&gt;</span></div>
            <div className="rounded-full" style={{ width:22,height:22,background:"radial-gradient(circle at 35% 35%,#ede6fb,#9d7ce8 55%,#7d5ad0)" }} />
          </div>
          <span className="text-[17px] font-bold tracking-tight">Code<span className="text-orange-500">Mode</span></span>
        </Link>
        <Link href="/services" className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">← All services</Link>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background:"linear-gradient(135deg,#f5f3ff,#ede9fe,#faf5ff)" }}>
        <div className="absolute inset-0" style={{ backgroundImage:"radial-gradient(circle at 80% 30%,rgba(139,92,246,0.2) 0%,transparent 60%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 md:px-16 py-24">
          <motion.div initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.65 }}>
            <Link href="/services" className="inline-flex items-center gap-2 text-[12px] text-violet-500 font-semibold mb-8 hover:text-violet-700 transition-colors">← Back to services</Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-md">⚡</div>
              <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-violet-600">SaaS Development</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-gray-900 mb-4">SaaS Product<br />Development</h1>
            <p className="text-xl text-violet-600 font-semibold mb-6">From idea to production-ready product.</p>
            <p className="text-[16px] text-gray-500 max-w-xl leading-relaxed mb-10">We own the full stack — architecture, backend, frontend, auth, billing and devops. You get a scalable SaaS without hiring a team of 10.</p>
            <div className="flex flex-wrap gap-8 mb-10">
              {[["Timeline","6–16 weeks"],["Team","2–4 engineers"]].map(([l,v]) => (
                <div key={l}><p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{l}</p><p className="text-xl font-black text-gray-900">{v}</p></div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Link href="/start">
                <motion.span whileHover={{ scale:1.04 }} className="inline-block rounded-xl bg-gray-900 px-8 py-4 text-[14px] font-bold text-white cursor-pointer">Book a call ↗</motion.span>
              </Link>
              <Link href="/start" className="text-[14px] font-semibold text-gray-400 hover:text-gray-700 transition-colors">or send us a message</Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-20 flex flex-col gap-20">
        {/* Process */}
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-10">How we build it.</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {process.map(({ step,title,desc },i) => (
              <motion.div key={step} initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.5,delay:i*0.08 }} className="rounded-2xl border border-gray-100 bg-white p-7" style={{ boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
                <span className="text-[11px] font-mono text-violet-400 font-bold mb-3 block">{step}</span>
                <h3 className="text-lg font-black text-gray-900 mb-2">{title}</h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-8">Tech stack.</h2>
          <div className="flex flex-wrap gap-3">
            {["Next.js 15","TypeScript","Node.js","PostgreSQL","Prisma","Redis","Stripe","AWS","Vercel","Docker","GitHub Actions"].map(t => (
              <span key={t} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-[13px] font-semibold text-gray-700">{t}</span>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-8">Common questions.</h2>
          <div className="flex flex-col gap-4">
            {faqs.map(({ q,a }) => (
              <div key={q} className="rounded-2xl border border-gray-100 bg-white p-6" style={{ boxShadow:"0 2px 8px rgba(0,0,0,0.03)" }}>
                <p className="font-bold text-gray-900 mb-2">{q}</p>
                <p className="text-[13px] text-gray-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl p-12 text-center" style={{ background:"linear-gradient(135deg,#f5f3ff,#ede9fe)" }}>
          <h2 className="text-3xl font-black text-gray-900 mb-3">Ready to build your SaaS?</h2>
          <p className="text-gray-500 mb-8">Tell us about your idea — we&apos;ll get back within 24 hours with a scope.</p>
          <Link href="/start"><motion.span whileHover={{ scale:1.05 }} className="inline-block rounded-xl bg-gray-900 px-10 py-4 text-[14px] font-bold text-white cursor-pointer">Start the conversation ↗</motion.span></Link>
        </div>
      </div>
    </main>
  );
}
