"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  { icon: "🛠️", title: "Tool Use & Function Calling", desc: "Give your agent tools — web search, code execution, database queries, API calls. Define tools as TypeScript functions." },
  { icon: "🧠", title: "Long-Term Memory", desc: "Vector-powered persistent memory. Your agent remembers users, past conversations and learned facts across sessions." },
  { icon: "🕸️", title: "Multi-Agent Orchestration", desc: "Spawn specialist sub-agents, route tasks by capability, and aggregate results. Build complex workflows without the complexity." },
  { icon: "⚡", title: "OpenAI + Anthropic", desc: "Switch models without rewriting logic. Claude 4, GPT-4o, or any OpenAI-compatible API — one unified interface." },
  { icon: "🔌", title: "REST API + Webhooks", desc: "Expose your agents over HTTP instantly. Webhooks for async task completion. SDKs for Node, Python and REST." },
  { icon: "📈", title: "Usage Monitoring", desc: "Token usage, latency, cost per run and success/failure rates — visible in a real-time dashboard or via the API." },
];

export default function AgentCorePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 md:px-16 bg-white/90 backdrop-blur-md border-b border-black/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex items-center rounded-full px-[5px] py-[4px]" style={{ background: "linear-gradient(135deg,#faf8ff,#f3eefe)", border: "1.5px solid rgba(157,124,232,0.6)", boxShadow: "0 0 10px rgba(157,124,232,0.4)", width: 68, height: 30 }}>
            <div className="flex items-center justify-center" style={{ width: 32, height: 22 }}>
              <span className="font-mono font-bold text-[10px] select-none" style={{ color: "#6d42be" }}>&lt;/&gt;</span>
            </div>
            <div className="rounded-full flex-shrink-0" style={{ width: 22, height: 22, background: "radial-gradient(circle at 35% 35%,#ede6fb,#9d7ce8 55%,#7d5ad0)" }} />
          </div>
          <span className="text-[17px] font-bold tracking-tight">Code<span className="text-orange-500">Mode</span></span>
        </Link>
        <Link href="/products" className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">← All products</Link>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#fff7ed 0%,#ffedd5 50%,#fef9f0 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 70%,rgba(157,124,232,0.2) 0%,transparent 60%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 md:px-16 py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-md">🤖</div>
              <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-orange-600">AI Infrastructure</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-gray-900 mb-4">AgentCore</h1>
            <p className="text-xl text-orange-500 font-semibold mb-6">Build production AI agents in hours.</p>
            <p className="text-[16px] text-gray-500 max-w-xl leading-relaxed mb-10">
              Plug-and-play AI agent framework with tool use, long-term memory and multi-agent orchestration. Stop building infrastructure — start building intelligence.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <motion.a href="/start" whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(157,124,232,0.4)" }} className="inline-block rounded-xl bg-gray-900 px-8 py-4 text-[14px] font-bold text-white">
                Book a call ↗
              </motion.a>
              <span className="text-[13px] text-gray-400">Designed for production. Built for scale.</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <h2 className="text-3xl font-black text-gray-900 mb-12">What AgentCore gives you.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ y: -3 }} className="rounded-2xl border border-gray-100 bg-white p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-xl mb-4">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-3xl p-12 text-center" style={{ background: "linear-gradient(135deg,#fff7ed,#ffedd5)" }}>
          <h2 className="text-3xl font-black text-gray-900 mb-3">Start building agents today.</h2>
          <p className="text-gray-500 mb-8">Designed for production. Get in touch to learn more.</p>
          <motion.a href="/start" whileHover={{ scale: 1.05 }} className="inline-block rounded-xl bg-gray-900 px-10 py-4 text-[14px] font-bold text-white">
            Book a call ↗
          </motion.a>
        </motion.div>
      </div>
    </main>
  );
}
