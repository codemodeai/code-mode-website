"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const capabilities = [
  { icon:"🧠", title:"Custom AI Agents", desc:"Multi-step agents that plan, use tools and execute complex tasks autonomously — built for your specific workflow." },
  { icon:"📚", title:"RAG Pipelines", desc:"Retrieval-augmented generation over your private data. Chat with your docs, contracts, codebase or knowledge base." },
  { icon:"🔗", title:"LLM Integrations", desc:"Add AI capabilities to any existing product. Summarisation, classification, extraction, generation — wired into your stack." },
  { icon:"⚙️", title:"Workflow Automation", desc:"Replace repetitive manual tasks with intelligent automation. From data entry to complex multi-system orchestration." },
  { icon:"👁️", title:"Monitoring & Evals", desc:"LLM observability, prompt versioning, regression testing and cost tracking so you can iterate confidently." },
  { icon:"🔒", title:"Secure & Private", desc:"On-premise deployment options, data isolation and full audit trails. We take AI security seriously." },
];

export default function AIAutomationPage() {
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

      <div className="relative overflow-hidden" style={{ background:"linear-gradient(135deg,#fff7ed,#ffedd5,#fef9f0)" }}>
        <div className="absolute inset-0" style={{ backgroundImage:"radial-gradient(circle at 20% 70%,rgba(249,115,22,0.2) 0%,transparent 60%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 md:px-16 py-24">
          <motion.div initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.65 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-md">🤖</div>
              <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-orange-600">AI & Automation</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-gray-900 mb-4">AI &<br />Automation</h1>
            <p className="text-xl text-orange-500 font-semibold mb-6">Replace manual work with intelligence.</p>
            <p className="text-[16px] text-gray-500 max-w-xl leading-relaxed mb-10">Custom AI agents, LLM integrations, RAG pipelines and workflow automation. Cut manual effort and unlock capabilities your competitors don&apos;t have.</p>
            <div className="flex flex-wrap gap-8 mb-10">
              {[["Timeline","4–12 weeks"],["Models","OpenAI · Anthropic · Open source"]].map(([l,v]) => (
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
          <h2 className="text-3xl font-black text-gray-900 mb-10">What we build.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map(({ icon,title,desc },i) => (
              <motion.div key={title} initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.5,delay:i*0.08 }} whileHover={{ y:-3 }} className="rounded-2xl border border-gray-100 bg-white p-6" style={{ boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-xl mb-4">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-8">Our AI stack.</h2>
          <div className="flex flex-wrap gap-3">
            {["OpenAI GPT-4o","Anthropic Claude","LangChain","LlamaIndex","Pinecone","Supabase pgvector","FastAPI","Python","Celery","Redis","LangSmith"].map(t => (
              <span key={t} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-[13px] font-semibold text-gray-700">{t}</span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl p-12 text-center" style={{ background:"linear-gradient(135deg,#fff7ed,#ffedd5)" }}>
          <h2 className="text-3xl font-black text-gray-900 mb-3">Ready to automate?</h2>
          <p className="text-gray-500 mb-8">Tell us the process you want to eliminate — we&apos;ll show you what&apos;s possible.</p>
          <Link href="/start"><motion.span whileHover={{ scale:1.05 }} className="inline-block rounded-xl bg-gray-900 px-10 py-4 text-[14px] font-bold text-white cursor-pointer">Start the conversation ↗</motion.span></Link>
        </div>
      </div>
    </main>
  );
}
