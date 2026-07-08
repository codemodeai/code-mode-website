"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") ?? "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push(from);
    } else {
      setError("Incorrect password. Try again.");
      setPassword("");
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(157,124,232,0.12) 0%,transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-gray-900 p-10 shadow-2xl">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="flex items-center rounded-full px-[5px] py-[4px]"
              style={{ background: "linear-gradient(135deg,#faf8ff,#f3eefe)", border: "1.5px solid rgba(157,124,232,0.6)", width: 60, height: 26 }}>
              <div className="flex items-center justify-center" style={{ width: 28, height: 18 }}>
                <span className="font-mono font-bold text-[9px] select-none" style={{ color: "#6d42be" }}>&lt;/&gt;</span>
              </div>
              <div className="rounded-full flex-shrink-0"
                style={{ width: 18, height: 18, background: "radial-gradient(circle at 35% 35%,#ede6fb,#9d7ce8 55%,#7d5ad0)" }} />
            </div>
            <span className="text-[15px] font-bold text-white">Code<span className="text-orange-500">Mode</span></span>
            <span className="ml-auto text-[10px] font-bold uppercase tracking-widest rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-orange-400">Admin</span>
          </div>

          <h1 className="text-2xl font-black text-white mb-1">Welcome back</h1>
          <p className="text-[13px] text-gray-400 mb-8">This area is restricted to internal team only.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoFocus
                className="rounded-xl border border-white/10 bg-gray-800 px-4 py-3 text-[14px] text-white placeholder-gray-500 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[13px] text-red-400 flex items-center gap-2"
              >
                <span>⚠</span> {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !password}
              className="rounded-xl bg-orange-500 py-3 text-[14px] font-bold text-white hover:bg-orange-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ boxShadow: "0 0 20px rgba(157,124,232,0.3)" }}
            >
              {loading ? "Verifying…" : "Enter Dashboard →"}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-[11px] text-gray-600">
            Not an admin?{" "}
            <a href="/" className="text-gray-400 hover:text-white transition-colors">Go back home</a>
          </p>
        </div>
      </motion.div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
