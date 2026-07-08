"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  { icon: "🔐", title: "Authentication", desc: "NextAuth.js with Google, GitHub and magic-link email sign-in. Sessions, middleware protection and role-based access out of the box." },
  { icon: "💳", title: "Stripe Billing", desc: "Subscriptions, one-time payments, usage-based billing and webhook handling — all pre-wired. Just add your price IDs." },
  { icon: "🗄️", title: "Supabase Database", desc: "PostgreSQL with Row Level Security, migrations, and typed client. Your data model is ready for multi-tenant SaaS from day one." },
  { icon: "📧", title: "Email (Resend)", desc: "Transactional emails with React Email templates — welcome, password reset, invoice receipts and more." },
  { icon: "🎨", title: "UI & Dark Mode", desc: "Tailwind CSS 4 + shadcn/ui components. Light and dark mode baked in. Fully customisable design system." },
  { icon: "📊", title: "Admin Dashboard", desc: "User management, subscription overview and basic analytics — all behind a protected /admin route." },
];

const stack = ["Next.js 15", "TypeScript", "Tailwind CSS 4", "NextAuth.js", "Stripe", "Supabase", "Resend", "React Email", "Vercel"];

export default function LaunchKitPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 md:px-16 bg-white/90 backdrop-blur-md border-b border-black/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex items-center">
            <div className="relative flex items-center rounded-full px-[5px] py-[4px]" style={{ background: "linear-gradient(135deg,#faf8ff,#f3eefe)", border: "1.5px solid rgba(157,124,232,0.6)", boxShadow: "0 0 10px rgba(157,124,232,0.4)", width: 68, height: 30 }}>
              <div className="flex items-center justify-center" style={{ width: 32, height: 22 }}>
                <span className="font-mono font-bold text-[10px] select-none" style={{ color: "#6d42be" }}>&lt;/&gt;</span>
              </div>
              <div className="rounded-full flex-shrink-0" style={{ width: 22, height: 22, background: "radial-gradient(circle at 35% 35%,#ede6fb,#9d7ce8 55%,#7d5ad0)" }} />
            </div>
          </div>
          <span className="text-[17px] font-bold tracking-tight">Code<span className="text-orange-500">Mode</span></span>
        </Link>
        <Link href="/products" className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">← All products</Link>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#f5f3ff 0%,#ede9fe 50%,#faf5ff 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 80% 30%,rgba(139,92,246,0.2) 0%,transparent 60%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 md:px-16 py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-md">🚀</div>
              <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-violet-600">SaaS Boilerplate</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-gray-900 mb-4">LaunchKit</h1>
            <p className="text-xl text-violet-600 font-semibold mb-6">Ship your SaaS in days, not months.</p>
            <p className="text-[16px] text-gray-500 max-w-xl leading-relaxed mb-10">
              Every infrastructure decision already made. Auth, billing, database, email — production-ready from the first commit so you can focus entirely on your product.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <motion.a href="/start" whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(139,92,246,0.4)" }} className="inline-block rounded-xl bg-gray-900 px-8 py-4 text-[14px] font-bold text-white">
                Book a call ↗
              </motion.a>
              <span className="text-[13px] text-gray-400">Clone, configure, deploy.</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-20">

        {/* Features */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <h2 className="text-3xl font-black text-gray-900 mb-12">Everything included.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ y: -3 }} className="rounded-2xl border border-gray-100 bg-white p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-xl mb-4">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stack */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Tech stack.</h2>
          <div className="flex flex-wrap gap-3">
            {stack.map(t => <span key={t} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-[13px] font-semibold text-gray-700">{t}</span>)}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-3xl p-12 text-center" style={{ background: "linear-gradient(135deg,#f5f3ff,#ede9fe)" }}>
          <h2 className="text-3xl font-black text-gray-900 mb-3">Ready to ship faster?</h2>
          <p className="text-gray-500 mb-8">Clone, configure, deploy. Done.</p>
          <motion.a href="/start" whileHover={{ scale: 1.05 }} className="inline-block rounded-xl bg-gray-900 px-10 py-4 text-[14px] font-bold text-white">
            Get started — Book a call ↗
          </motion.a>
        </motion.div>
      </div>
    </main>
  );
}
