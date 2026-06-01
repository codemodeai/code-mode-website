"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type Lead = {
  id: string; created_at: string; name: string; email: string;
  phone?: string; company?: string; role?: string;
  project_name?: string; project_type?: string; description?: string;
  platforms?: string; features?: string; timeline?: string;
  service?: string; budget?: string;
  designs?: string; codebase?: string; hear_about?: string; extra?: string;
  message?: string; source: string; status: string;
};

type Booking = {
  id: string; created_at: string; name: string; email: string;
  phone?: string; company?: string; service?: string; message?: string;
  date: string; time_slot: string; status: string;
};

type Tab = "overview" | "leads" | "bookings";

const statusColors: Record<string, string> = {
  new:       "bg-orange-500/20 text-orange-400 border-orange-500/30",
  contacted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  closed:    "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  confirmed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  completed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function fmtTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [calendarDate, setCalendarDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [l, b] = await Promise.all([
      fetch("/api/leads").then(r => r.json()),
      fetch("/api/bookings").then(r => r.json()),
    ]);
    setLeads(Array.isArray(l) ? l : []);
    setBookings(Array.isArray(b) ? b : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  async function updateLeadStatus(id: string, status: string) {
    setUpdatingId(id);
    await fetch("/api/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    setUpdatingId(null);
  }

  async function updateBookingStatus(id: string, status: string) {
    setUpdatingId(id);
    await fetch("/api/bookings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    setUpdatingId(null);
  }

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  const todayBookings = bookings.filter(b => b.date === calendarDate && b.status !== "cancelled");
  const newLeads = leads.filter(l => l.status === "new").length;
  const todayCount = bookings.filter(b => b.date === new Date().toISOString().split("T")[0] && b.status === "confirmed").length;

  // Build calendar week
  const weekDays: string[] = [];
  const base = new Date(calendarDate);
  const monday = new Date(base);
  monday.setDate(base.getDate() - ((base.getDay() + 6) % 7));
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekDays.push(d.toISOString().split("T")[0]);
  }

  const navItems: { id: Tab; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "leads",    label: "Leads",    icon: "📥" },
    { id: "bookings", label: "Bookings", icon: "📅" },
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-white flex">

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-60 bg-gray-900 border-r border-white/5 flex flex-col z-40">
        <div className="px-6 py-6 border-b border-white/5">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex items-center rounded-full px-[4px] py-[3px]"
              style={{ background: "linear-gradient(135deg,#fff8f3,#fff1e6)", border: "1.5px solid rgba(249,115,22,0.6)", width: 52, height: 22 }}>
              <span className="font-mono font-bold text-[8px] select-none text-center w-7" style={{ color: "#ea580c" }}>&lt;/&gt;</span>
              <div className="rounded-full" style={{ width: 16, height: 16, background: "radial-gradient(circle at 35% 35%,#fde68a,#f97316 55%,#c2410c)" }} />
            </div>
            <span className="text-[14px] font-bold">Code<span className="text-orange-500">Mode</span></span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
          {navItems.map(({ id, label, icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all flex items-center gap-2.5 ${
                tab === id ? "bg-orange-500/15 text-orange-400 border border-orange-500/20" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}>
              <span>{icon}</span> {label}
              {id === "leads" && newLeads > 0 && (
                <span className="ml-auto text-[10px] font-bold bg-orange-500 text-white rounded-full px-1.5 py-0.5">{newLeads}</span>
              )}
              {id === "bookings" && todayCount > 0 && (
                <span className="ml-auto text-[10px] font-bold bg-emerald-500 text-white rounded-full px-1.5 py-0.5">{todayCount}</span>
              )}
            </button>
          ))}
          <div className="mt-4 pt-4 border-t border-white/5">
            <a href="/book" target="_blank"
              className="w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2.5">
              🔗 Booking page ↗
            </a>
            <a href="/" target="_blank"
              className="w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2.5">
              🌐 Website ↗
            </a>
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-white/5">
          <button onClick={handleLogout} disabled={loggingOut}
            className="w-full px-4 py-2.5 rounded-xl text-[13px] font-semibold text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-left flex items-center gap-2">
            🚪 {loggingOut ? "Logging out…" : "Logout"}
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="ml-60 flex-1 p-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-white">
              {tab === "overview" ? "Overview" : tab === "leads" ? "Leads" : "Bookings"}
            </h1>
            <p className="text-[13px] text-gray-500 mt-1">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <button onClick={fetchAll} className="text-[12px] font-semibold text-gray-500 hover:text-white transition-colors flex items-center gap-1.5">
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64 text-gray-600">Loading…</div>
        ) : (
          <>
            {/* ── OVERVIEW ── */}
            {tab === "overview" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Total Leads", value: leads.length, sub: `${newLeads} new` },
                    { label: "Total Bookings", value: bookings.length, sub: `${bookings.filter(b=>b.status==="confirmed").length} confirmed` },
                    { label: "Today's Calls", value: todayCount, sub: new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short"}) },
                    { label: "Form Submissions", value: leads.filter(l=>l.source==="contact_form"||l.source==="start_form").length, sub: "all time" },
                  ].map(({ label, value, sub }) => (
                    <div key={label} className="rounded-2xl border border-white/5 bg-gray-900 p-6">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3">{label}</p>
                      <p className="text-4xl font-black text-white mb-1">{value}</p>
                      <p className="text-[12px] text-gray-500">{sub}</p>
                    </div>
                  ))}
                </div>

                {/* Recent leads */}
                <div className="rounded-2xl border border-white/5 bg-gray-900 p-6 mb-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-[14px] font-black text-white">Recent Leads</h2>
                    <button onClick={() => setTab("leads")} className="text-[12px] text-orange-400 hover:text-orange-300 font-semibold">View all →</button>
                  </div>
                  {leads.length === 0 ? (
                    <p className="text-[13px] text-gray-600 py-4">No leads yet. They'll appear here once someone fills a form.</p>
                  ) : (
                    <table className="w-full">
                      <thead><tr className="border-b border-white/5">
                        {["Name","Service","Source","Status"].map(h => (
                          <th key={h} className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-500 pb-3 pr-4">{h}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {leads.slice(0,5).map(l => (
                          <tr key={l.id} className="border-b border-white/5 last:border-0">
                            <td className="py-3 pr-4">
                              <p className="text-[13px] font-semibold text-white">{l.name}</p>
                              <p className="text-[11px] text-gray-500">{l.email}</p>
                            </td>
                            <td className="py-3 pr-4 text-[13px] text-gray-400">{l.service || "—"}</td>
                            <td className="py-3 pr-4">
                              <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500 border border-white/10 rounded-full px-2 py-0.5">{l.source.replace("_"," ")}</span>
                            </td>
                            <td className="py-3">
                              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusColors[l.status]}`}>{l.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Upcoming bookings */}
                <div className="rounded-2xl border border-white/5 bg-gray-900 p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-[14px] font-black text-white">Upcoming Calls</h2>
                    <button onClick={() => setTab("bookings")} className="text-[12px] text-orange-400 hover:text-orange-300 font-semibold">View calendar →</button>
                  </div>
                  {bookings.filter(b=>b.status==="confirmed" && b.date >= new Date().toISOString().split("T")[0]).length === 0 ? (
                    <p className="text-[13px] text-gray-600 py-4">No upcoming calls. Share the <a href="/book" target="_blank" className="text-orange-400 underline">/book</a> page to get bookings.</p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {bookings
                        .filter(b => b.status === "confirmed" && b.date >= new Date().toISOString().split("T")[0])
                        .slice(0, 5)
                        .map(b => (
                          <div key={b.id} className="flex items-center gap-4 rounded-xl bg-gray-800 px-4 py-3">
                            <div className="flex flex-col items-center w-12 shrink-0">
                              <span className="text-[10px] font-bold text-orange-400 uppercase">{new Date(b.date+"T00:00:00").toLocaleDateString("en-IN",{month:"short"})}</span>
                              <span className="text-xl font-black text-white">{new Date(b.date+"T00:00:00").getDate()}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-semibold text-white">{b.name}</p>
                              <p className="text-[11px] text-gray-400">{b.email} · {b.service || "General enquiry"}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-[13px] font-bold text-orange-400">{b.time_slot}</p>
                              <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${statusColors[b.status]}`}>{b.status}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── LEADS ── */}
            {tab === "leads" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="rounded-2xl border border-white/5 bg-gray-900 overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <p className="text-[13px] font-bold text-white">{leads.length} total leads</p>
                    <div className="flex gap-1.5">
                      {["new","contacted","closed"].map(s => (
                        <span key={s} className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusColors[s]}`}>
                          {leads.filter(l=>l.status===s).length} {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  {leads.length === 0 ? (
                    <div className="px-6 py-16 text-center text-gray-600 text-[13px]">
                      No leads yet. Wire up your forms or share the booking page.
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead><tr className="border-b border-white/5">
                        {["Contact","Service","Budget","Source","Date","Status","Action"].map(h => (
                          <th key={h} className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-500 px-5 py-3">{h}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {leads.map(l => (
                          <tr key={l.id}
                            onClick={() => setSelectedLead(l)}
                            className="border-b border-white/5 last:border-0 hover:bg-white/[0.04] transition-colors cursor-pointer">
                            <td className="px-5 py-4">
                              <p className="text-[13px] font-semibold text-white">{l.name}</p>
                              <p className="text-[11px] text-gray-500">{l.email}</p>
                              {l.phone && <p className="text-[11px] text-gray-600">{l.phone}</p>}
                            </td>
                            <td className="px-5 py-4 text-[12px] text-gray-400 max-w-[140px]">{l.service || "—"}</td>
                            <td className="px-5 py-4 text-[12px] text-gray-400">{l.budget || "—"}</td>
                            <td className="px-5 py-4">
                              <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500 border border-white/10 rounded-full px-2 py-0.5">{l.source.replace("_"," ")}</span>
                            </td>
                            <td className="px-5 py-4 text-[11px] text-gray-500">{fmt(l.created_at)}<br />{fmtTime(l.created_at)}</td>
                            <td className="px-5 py-4">
                              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusColors[l.status]}`}>{l.status}</span>
                            </td>
                            <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                              <select
                                value={l.status}
                                disabled={updatingId === l.id}
                                onChange={e => updateLeadStatus(l.id, e.target.value)}
                                className="rounded-lg border border-white/10 bg-gray-800 px-2 py-1 text-[11px] text-gray-300 outline-none cursor-pointer"
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── BOOKINGS CALENDAR ── */}
            {tab === "bookings" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Week navigation */}
                <div className="flex items-center gap-3 mb-6">
                  <button onClick={() => {
                    const d = new Date(calendarDate);
                    d.setDate(d.getDate() - 7);
                    setCalendarDate(d.toISOString().split("T")[0]);
                  }} className="rounded-xl border border-white/10 bg-gray-900 px-4 py-2 text-[13px] text-gray-400 hover:text-white transition-colors">← Prev week</button>

                  <div className="flex gap-1.5 flex-1 overflow-x-auto">
                    {weekDays.map(day => {
                      const dayBookings = bookings.filter(b => b.date === day && b.status !== "cancelled");
                      const isSelected = day === calendarDate;
                      const isToday = day === new Date().toISOString().split("T")[0];
                      const d = new Date(day + "T00:00:00");
                      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                      return (
                        <button key={day} onClick={() => setCalendarDate(day)}
                          className={`flex flex-col items-center rounded-xl px-3 py-2.5 min-w-[64px] transition-all ${
                            isSelected ? "bg-orange-500 text-white" :
                            isWeekend ? "bg-gray-800/40 text-gray-600 cursor-default" :
                            "bg-gray-900 border border-white/5 hover:border-white/20 text-gray-300"
                          }`}
                        >
                          <span className="text-[9px] font-bold uppercase tracking-wide opacity-70">{d.toLocaleDateString("en-IN",{weekday:"short"})}</span>
                          <span className={`text-[17px] font-black mt-0.5 ${isToday && !isSelected ? "text-orange-400" : ""}`}>{d.getDate()}</span>
                          {dayBookings.length > 0 && (
                            <span className={`text-[9px] font-bold mt-0.5 rounded-full px-1.5 ${isSelected ? "bg-white/20 text-white" : "bg-orange-500/20 text-orange-400"}`}>{dayBookings.length}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <button onClick={() => {
                    const d = new Date(calendarDate);
                    d.setDate(d.getDate() + 7);
                    setCalendarDate(d.toISOString().split("T")[0]);
                  }} className="rounded-xl border border-white/10 bg-gray-900 px-4 py-2 text-[13px] text-gray-400 hover:text-white transition-colors">Next week →</button>
                </div>

                {/* Day view */}
                <div className="rounded-2xl border border-white/5 bg-gray-900 overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <div>
                      <h2 className="text-[14px] font-black text-white">
                        {new Date(calendarDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                      </h2>
                      <p className="text-[12px] text-gray-500">{todayBookings.length} call{todayBookings.length !== 1 ? "s" : ""} scheduled</p>
                    </div>
                  </div>

                  {todayBookings.length === 0 ? (
                    <div className="px-6 py-16 text-center text-gray-600 text-[13px]">No bookings on this day.</div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {todayBookings
                        .sort((a, b) => a.time_slot.localeCompare(b.time_slot))
                        .map(b => (
                          <div key={b.id} onClick={() => setSelectedBooking(b)} className="px-6 py-5 flex items-start gap-5 hover:bg-white/[0.04] transition-colors cursor-pointer">
                            {/* Time */}
                            <div className="w-20 shrink-0 text-center">
                              <p className="text-[15px] font-black text-orange-400">{b.time_slot}</p>
                              <p className="text-[10px] text-gray-600">30 min</p>
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-[14px] font-bold text-white">{b.name}</p>
                                <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${statusColors[b.status]}`}>{b.status}</span>
                              </div>
                              <p className="text-[12px] text-gray-400">{b.email}{b.phone ? ` · ${b.phone}` : ""}</p>
                              {b.company && <p className="text-[12px] text-gray-500">{b.company}</p>}
                              {b.service && <p className="text-[12px] text-orange-400/70 mt-1">Re: {b.service}</p>}
                              {b.message && <p className="text-[12px] text-gray-500 mt-2 italic">&ldquo;{b.message}&rdquo;</p>}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                              <select
                                value={b.status}
                                disabled={updatingId === b.id}
                                onChange={e => updateBookingStatus(b.id, e.target.value)}
                                className="rounded-lg border border-white/10 bg-gray-800 px-2 py-1.5 text-[11px] text-gray-300 outline-none cursor-pointer"
                              >
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                              <a href={`mailto:${b.email}`}
                                className="text-center rounded-lg border border-white/10 bg-gray-800 px-3 py-1.5 text-[11px] text-gray-400 hover:text-white hover:border-white/20 transition-all">
                                ✉ Email
                              </a>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* All bookings table */}
                <div className="mt-6 rounded-2xl border border-white/5 bg-gray-900 overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/5">
                    <h2 className="text-[14px] font-black text-white">All Bookings</h2>
                  </div>
                  {bookings.length === 0 ? (
                    <div className="px-6 py-10 text-center text-gray-600 text-[13px]">No bookings yet. Share <a href="/book" target="_blank" className="text-orange-400 underline">/book</a> with leads.</div>
                  ) : (
                    <table className="w-full">
                      <thead><tr className="border-b border-white/5">
                        {["Contact","Date","Time","Service","Status","Action"].map(h => (
                          <th key={h} className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-500 px-5 py-3">{h}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {bookings.map(b => (
                          <tr key={b.id}
                            onClick={() => setSelectedBooking(b)}
                            className="border-b border-white/5 last:border-0 hover:bg-white/[0.04] transition-colors cursor-pointer">
                            <td className="px-5 py-4">
                              <p className="text-[13px] font-semibold text-white">{b.name}</p>
                              <p className="text-[11px] text-gray-500">{b.email}</p>
                            </td>
                            <td className="px-5 py-4 text-[13px] text-gray-300">{new Date(b.date+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</td>
                            <td className="px-5 py-4 text-[13px] font-bold text-orange-400">{b.time_slot}</td>
                            <td className="px-5 py-4 text-[12px] text-gray-400">{b.service || "—"}</td>
                            <td className="px-5 py-4">
                              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusColors[b.status]}`}>{b.status}</span>
                            </td>
                            <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                              <select value={b.status} disabled={updatingId === b.id}
                                onChange={e => updateBookingStatus(b.id, e.target.value)}
                                className="rounded-lg border border-white/10 bg-gray-800 px-2 py-1 text-[11px] text-gray-300 outline-none cursor-pointer">
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* ── Lead detail drawer ── */}
      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
              onClick={() => setSelectedLead(null)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-gray-900 border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-7 py-5 border-b border-white/10">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-0.5">Lead Detail</p>
                  <h2 className="text-xl font-black text-white">{selectedLead.name}</h2>
                </div>
                <button onClick={() => setSelectedLead(null)} className="text-gray-500 hover:text-white transition-colors text-2xl leading-none">×</button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-5">

                {/* Status + source */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${statusColors[selectedLead.status]}`}>{selectedLead.status}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gray-400">{selectedLead.source.replace(/_/g," ")}</span>
                  <span className="ml-auto text-[11px] text-gray-500">{fmt(selectedLead.created_at)} · {fmtTime(selectedLead.created_at)}</span>
                </div>

                {/* Contact info */}
                <div className="rounded-2xl border border-white/10 bg-gray-800 p-5 flex flex-col gap-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Contact Info</p>
                  <DetailRow label="Full Name" value={selectedLead.name} />
                  <DetailRow label="Email" value={selectedLead.email} link={`mailto:${selectedLead.email}`} />
                  <DetailRow label="Phone" value={selectedLead.phone} link={selectedLead.phone ? `tel:${selectedLead.phone}` : undefined} />
                  <DetailRow label="Company" value={selectedLead.company} />
                  <DetailRow label="Role" value={selectedLead.role} />
                </div>

                {/* Project info */}
                {(selectedLead.project_name || selectedLead.project_type || selectedLead.timeline || selectedLead.budget || selectedLead.service) && (
                  <div className="rounded-2xl border border-white/10 bg-gray-800 p-5 flex flex-col gap-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Project Info</p>
                    <DetailRow label="Project Name" value={selectedLead.project_name} />
                    <DetailRow label="Project Type" value={selectedLead.project_type} />
                    <DetailRow label="Service" value={selectedLead.service} />
                    <DetailRow label="Timeline" value={selectedLead.timeline} />
                    <DetailRow label="Budget" value={selectedLead.budget} />
                  </div>
                )}

                {/* Platforms & Features */}
                {(selectedLead.platforms || selectedLead.features) && (
                  <div className="rounded-2xl border border-white/10 bg-gray-800 p-5 flex flex-col gap-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Tech Requirements</p>
                    {selectedLead.platforms && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-2">Platforms</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedLead.platforms.split(", ").map(p => (
                            <span key={p} className="rounded-lg border border-white/10 bg-gray-700 px-2.5 py-1 text-[11px] text-gray-200">{p}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedLead.features && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-2">Key Features</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedLead.features.split(", ").map(f => (
                            <span key={f} className="rounded-lg border border-orange-500/20 bg-orange-500/10 px-2.5 py-1 text-[11px] text-orange-300">{f}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                {selectedLead.description && (
                  <div className="rounded-2xl border border-white/10 bg-gray-800 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Project Description</p>
                    <p className="text-[13px] text-gray-200 leading-relaxed whitespace-pre-wrap">{selectedLead.description}</p>
                  </div>
                )}

                {/* Additional context */}
                {(selectedLead.designs || selectedLead.codebase || selectedLead.hear_about) && (
                  <div className="rounded-2xl border border-white/10 bg-gray-800 p-5 flex flex-col gap-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Additional Context</p>
                    <DetailRow label="Existing Designs" value={selectedLead.designs} />
                    <DetailRow label="Codebase" value={selectedLead.codebase} />
                    <DetailRow label="Heard About Us" value={selectedLead.hear_about} />
                  </div>
                )}

                {/* Extra notes */}
                {selectedLead.extra && (
                  <div className="rounded-2xl border border-white/10 bg-gray-800 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Extra Notes</p>
                    <p className="text-[13px] text-gray-200 leading-relaxed whitespace-pre-wrap">{selectedLead.extra}</p>
                  </div>
                )}

                {/* Legacy message field */}
                {selectedLead.message && (
                  <div className="rounded-2xl border border-white/10 bg-gray-800 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Message</p>
                    <p className="text-[13px] text-gray-200 leading-relaxed whitespace-pre-wrap">{selectedLead.message}</p>
                  </div>
                )}

                {/* Update status */}
                <div className="rounded-2xl border border-white/10 bg-gray-800 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Update Status</p>
                  <div className="flex gap-2">
                    {["new","contacted","closed"].map(s => (
                      <button key={s} disabled={updatingId === selectedLead.id}
                        onClick={async () => {
                          await updateLeadStatus(selectedLead.id, s);
                          setSelectedLead(l => l ? { ...l, status: s } : null);
                        }}
                        className={`flex-1 rounded-xl py-2 text-[12px] font-bold uppercase tracking-wide transition-all border ${
                          selectedLead.status === s
                            ? statusColors[s]
                            : "border-white/10 text-gray-500 hover:text-white hover:border-white/20"
                        }`}
                      >{s}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer actions */}
              <div className="px-7 py-5 border-t border-white/10 flex gap-3">
                <a href={`mailto:${selectedLead.email}`}
                  className="flex-1 text-center rounded-xl bg-orange-500 py-3 text-[13px] font-bold text-white hover:bg-orange-400 transition-colors">
                  ✉ Send Email
                </a>
                {selectedLead.phone && (
                  <a href={`tel:${selectedLead.phone}`}
                    className="flex-1 text-center rounded-xl border border-white/10 py-3 text-[13px] font-semibold text-gray-300 hover:text-white hover:border-white/20 transition-all">
                    📞 Call
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Booking detail drawer ── */}
      <AnimatePresence>
        {selectedBooking && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
              onClick={() => setSelectedBooking(null)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-gray-900 border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-7 py-5 border-b border-white/10">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-0.5">Booking Detail</p>
                  <h2 className="text-xl font-black text-white">{selectedBooking.name}</h2>
                </div>
                <button onClick={() => setSelectedBooking(null)} className="text-gray-500 hover:text-white transition-colors text-2xl leading-none">×</button>
              </div>

              <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-5">

                {/* Time slot highlight */}
                <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 flex items-center gap-4">
                  <div className="text-4xl">📅</div>
                  <div>
                    <p className="text-[15px] font-black text-orange-400">
                      {new Date(selectedBooking.date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                    </p>
                    <p className="text-[13px] text-orange-300/70">{selectedBooking.time_slot} · 30-minute strategy call</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${statusColors[selectedBooking.status]}`}>{selectedBooking.status}</span>
                  <span className="ml-auto text-[11px] text-gray-500">Booked {fmt(selectedBooking.created_at)} · {fmtTime(selectedBooking.created_at)}</span>
                </div>

                {/* Contact info */}
                <div className="rounded-2xl border border-white/10 bg-gray-800 p-5 flex flex-col gap-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Contact Info</p>
                  <DetailRow label="Full Name" value={selectedBooking.name} />
                  <DetailRow label="Email" value={selectedBooking.email} link={`mailto:${selectedBooking.email}`} />
                  <DetailRow label="Phone" value={selectedBooking.phone} link={selectedBooking.phone ? `tel:${selectedBooking.phone}` : undefined} />
                  <DetailRow label="Company" value={selectedBooking.company} />
                </div>

                {/* Project info */}
                <div className="rounded-2xl border border-white/10 bg-gray-800 p-5 flex flex-col gap-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Project Info</p>
                  <DetailRow label="Service" value={selectedBooking.service} />
                </div>

                {/* Message */}
                {selectedBooking.message && (
                  <div className="rounded-2xl border border-white/10 bg-gray-800 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">What they&apos;re building</p>
                    <p className="text-[14px] text-gray-200 leading-relaxed whitespace-pre-wrap">{selectedBooking.message}</p>
                  </div>
                )}

                {/* Update status */}
                <div className="rounded-2xl border border-white/10 bg-gray-800 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Update Status</p>
                  <div className="flex gap-2">
                    {["confirmed","completed","cancelled"].map(s => (
                      <button key={s} disabled={updatingId === selectedBooking.id}
                        onClick={async () => {
                          await updateBookingStatus(selectedBooking.id, s);
                          setSelectedBooking(b => b ? { ...b, status: s } : null);
                        }}
                        className={`flex-1 rounded-xl py-2 text-[11px] font-bold uppercase tracking-wide transition-all border ${
                          selectedBooking.status === s
                            ? statusColors[s]
                            : "border-white/10 text-gray-500 hover:text-white hover:border-white/20"
                        }`}
                      >{s}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-7 py-5 border-t border-white/10 flex gap-3">
                <a href={`mailto:${selectedBooking.email}`}
                  className="flex-1 text-center rounded-xl bg-orange-500 py-3 text-[13px] font-bold text-white hover:bg-orange-400 transition-colors">
                  ✉ Send Meet Link
                </a>
                {selectedBooking.phone && (
                  <a href={`tel:${selectedBooking.phone}`}
                    className="flex-1 text-center rounded-xl border border-white/10 py-3 text-[13px] font-semibold text-gray-300 hover:text-white hover:border-white/20 transition-all">
                    📞 Call
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </main>
  );
}

function DetailRow({ label, value, link }: { label: string; value?: string | null; link?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[11px] font-bold uppercase tracking-wide text-gray-500 shrink-0 mt-0.5">{label}</span>
      {link ? (
        <a href={link} className="text-[13px] text-orange-400 hover:text-orange-300 font-medium text-right break-all">{value}</a>
      ) : (
        <span className="text-[13px] text-gray-200 font-medium text-right">{value}</span>
      )}
    </div>
  );
}
