"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Bell,
  Bot,
  Box,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CircleCheck,
  FileSpreadsheet,
  Gauge,
  GripVertical,
  Hammer,
  LineChart,
  Timer,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  PackageCheck,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Truck,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Stock", icon: Box, count: "12" },
  { label: "Kanban", icon: ClipboardList, count: "04" },
  { label: "Maintenance", icon: Wrench, count: "03" },
  { label: "Packing Label", icon: PackageCheck },
  { label: "PDF / Excel Import", icon: FileSpreadsheet },
  { label: "Voucher Lookup", icon: Truck },
  { label: "Settings", icon: Settings },
];

const stats = [
  { label: "Stock items", value: "2,480", detail: "+8.4% from last month", icon: Box, tone: "blue" },
  { label: "Active kanban", value: "128", detail: "12 cards need attention", icon: ClipboardList, tone: "amber" },
  { label: "Pending maintenance", value: "07", detail: "2 scheduled for today", icon: Wrench, tone: "rose" },
  { label: "Dispatch readiness", value: "94.6%", detail: "+2.1% this week", icon: PackageCheck, tone: "green" },
];

const activity = [
  { title: "Kanban card updated", description: "Press line 03 · KBN-2084", time: "08:42", tone: "blue" },
  { title: "Maintenance completed", description: "Stamping machine · ST-04", time: "08:15", tone: "green" },
  { title: "New import processed", description: "Packing schedule · 24 rows", time: "Yesterday", tone: "amber" },
];

const productionLines = [
  { name: "Press line 01", value: 92, target: "1,240 units", status: "On target", color: "bg-emerald-500" },
  { name: "Press line 02", value: 78, target: "980 units", status: "Watching", color: "bg-amber-500" },
  { name: "Assembly line 03", value: 96, target: "1,420 units", status: "On target", color: "bg-emerald-500" },
];

const orders = [
  { id: "ORD-4821", customer: "Mitsuda Automotive", due: "Today, 16:00", progress: 86, status: "In production" },
  { id: "ORD-4814", customer: "Siam Components", due: "Tomorrow, 09:30", progress: 58, status: "Material check" },
  { id: "ORD-4798", customer: "Koyo Industrial", due: "24 Sep, 14:00", progress: 100, status: "Ready to ship" },
];

const maintenance = [
  { machine: "Stamping machine ST-04", task: "Hydraulic pressure inspection", time: "Today · 13:30", priority: "High" },
  { machine: "Robot arm RB-12", task: "Scheduled lubrication", time: "Tomorrow · 09:00", priority: "Normal" },
];

const trendData = [
  { day: "18 Sep", forecast: 3600, actual: 3420, delivery: 88 },
  { day: "19 Sep", forecast: 4100, actual: 3980, delivery: 91 },
  { day: "20 Sep", forecast: 3900, actual: 4250, delivery: 94 },
  { day: "21 Sep", forecast: 4700, actual: 4520, delivery: 92 },
  { day: "22 Sep", forecast: 5200, actual: 4980, delivery: 96 },
  { day: "23 Sep", forecast: 5100, actual: 5260, delivery: 94 },
  { day: "24 Sep", forecast: 5600, actual: 5480, delivery: 98 },
];

const deliveryData = [
  { name: "On time", value: 78, color: "#d8a64e" },
  { name: "At risk", value: 14, color: "#f59e0b" },
  { name: "Delayed", value: 8, color: "#e11d48" },
];

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [position, setPosition] = useState(() => {
    if (typeof window === "undefined") return { x: 0, y: 0 };
    const saved = window.localStorage.getItem("chr-nexus-profile-position");
    return saved ? JSON.parse(saved) : { x: 0, y: 0 };
  });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!dragging) window.localStorage.setItem("chr-nexus-profile-position", JSON.stringify(position));
  }, [position, dragging]);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      if (!dragging) return;
      setPosition({ x: Math.max(-window.innerWidth / 2 + 48, Math.min(window.innerWidth / 2 - 48, event.clientX - window.innerWidth / 2 - dragOffset.current.x)), y: Math.max(-window.innerHeight / 2 + 48, Math.min(window.innerHeight / 2 - 48, event.clientY - window.innerHeight / 2 - dragOffset.current.y)) });
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [dragging]);

  return (
    <main className="min-h-screen bg-[#eef1f4] text-[#20252d]">
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-[#272c33] text-slate-300 transition-all duration-300 lg:static ${collapsed ? "w-[76px]" : "w-[256px]"} ${mobileMenu ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="flex h-[82px] items-center border-b border-white/10 px-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#d8a64e] text-[#272c33]"><Gauge className="size-5" /></div>
              {!collapsed && <div><p className="truncate text-[15px] font-bold tracking-[0.14em] text-white">CHR-NEXUS</p><p className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-slate-500">Operations control</p></div>}
            </div>
            <button aria-label="Close navigation" onClick={() => setMobileMenu(false)} className="ml-auto rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden"><X /></button>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-6">
            <p className={`mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 ${collapsed ? "sr-only" : ""}`}>Workspace</p>
            <div className="flex flex-col gap-1">
              {navigation.map(({ label, icon: Icon, active, count }) => <button key={label} title={collapsed ? label : undefined} className={`group flex h-11 items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium transition ${active ? "border-l-2 border-[#d8a64e] bg-white/[0.09] text-white" : "border-l-2 border-transparent text-slate-400 hover:bg-white/[0.06] hover:text-slate-200"}`}><Icon className={`size-[18px] shrink-0 ${active ? "text-[#e0b766]" : "text-slate-500 group-hover:text-slate-300"}`} />{!collapsed && <><span className="flex-1 truncate">{label}</span>{count && <span className="rounded bg-white/[0.08] px-1.5 py-0.5 text-[10px] text-slate-400">{count}</span>}</>}</button>)}
            </div>
            {!collapsed && <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.04] p-3"><div className="flex items-center gap-2"><ShieldCheck className="size-4 text-[#d8a64e]" /><span className="text-[11px] font-semibold text-slate-300">System status</span></div><div className="mt-3 flex items-center justify-between text-[10px] text-slate-500"><span>All services operational</span><span className="size-2 rounded-full bg-emerald-400" /></div></div>}
          </nav>
          <div className="border-t border-white/10 p-3"><button onClick={() => setCollapsed(!collapsed)} className="flex h-10 w-full items-center justify-center gap-2 rounded-lg text-slate-400 transition hover:bg-white/[0.07] hover:text-white" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>{collapsed ? <ChevronRight className="size-4" /> : <><ChevronLeft className="size-4" /><span className="text-xs">Collapse sidebar</span></>}</button></div>
        </aside>
        {mobileMenu && <button aria-label="Close navigation overlay" onClick={() => setMobileMenu(false)} className="fixed inset-0 z-30 bg-black/30 lg:hidden" />}

        <section className="min-w-0 flex-1 nexus-enter-soft">
          <header className="flex h-[82px] items-center justify-between border-b border-slate-200/80 bg-[#f8f9fa] px-5 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3"><button onClick={() => setMobileMenu(true)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-200 lg:hidden" aria-label="Open navigation"><Menu /></button><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a2782f]">Overview</p><h1 className="text-xl font-bold tracking-tight text-slate-800">Good morning, Arisa</h1></div></div>
            <div className="flex items-center gap-3"><label className="hidden h-10 w-56 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-slate-400 shadow-sm md:flex"><Search className="size-4" /><input className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400" placeholder="Search anything..." aria-label="Search anything" /></label><button onClick={() => setChatOpen(true)} className="hidden size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-[#d8a64e] hover:text-[#a2782f] sm:flex" aria-label="Open AI assistant"><Sparkles className="size-[18px]" /></button><button className="relative size-10 rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-[#d8a64e] hover:text-[#a2782f]" aria-label="Notifications"><Bell className="mx-auto size-[18px]" /><span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-[#d8a64e] text-[9px] font-bold text-[#272c33]">3</span></button></div>
          </header>
          <div className="px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
            <div className="mx-auto max-w-[1400px]">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-2xl font-bold tracking-tight text-slate-800">Production overview</h2><p className="mt-1 text-sm text-slate-500">Here&apos;s what&apos;s happening across your operations today.</p></div><button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 shadow-sm hover:border-slate-300"><SlidersHorizontal className="size-4" /> Customize view</button></div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(({ label, value, detail, icon: Icon, tone }, index) => <article key={label} style={{ animationDelay: `${index * 80}ms` }} className="nexus-card nexus-enter rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_8px_rgba(30,40,50,0.03)]"><div className="flex items-start justify-between"><div className={`flex size-10 items-center justify-center rounded-lg ${tone === "blue" ? "bg-blue-50 text-blue-600" : tone === "amber" ? "bg-amber-50 text-amber-600" : tone === "rose" ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}`}><Icon className="size-[18px]" /></div><button className="text-slate-300 hover:text-slate-500" aria-label={`More options for ${label}`}><MoreHorizontal className="size-5" /></button></div><p className="mt-5 text-xs font-medium text-slate-500">{label}</p><p className="mt-1 text-2xl font-bold tracking-tight text-slate-800">{value}</p><p className="mt-2 text-[11px] text-slate-400">{detail}</p></article>)}</div>
              <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
                <article className="nexus-card nexus-enter rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_8px_rgba(30,40,50,0.03)]" style={{ animationDelay: "340ms" }}><div className="flex items-start justify-between"><div><p className="text-sm font-bold text-slate-800">Production activity</p><p className="mt-1 text-xs text-slate-400">Live updates from your production floor</p></div><button className="rounded-lg p-2 text-slate-400 hover:bg-slate-50" aria-label="Activity options"><MoreHorizontal className="size-5" /></button></div><div className="mt-6 flex h-44 items-end gap-2 border-b border-slate-100 px-1 sm:gap-4">{[42, 58, 51, 75, 64, 82, 70, 91, 78, 88, 80, 96].map((height, index) => <div key={index} className="group flex flex-1 flex-col items-center gap-2"><div className={`nexus-bar w-full max-w-8 rounded-t-sm transition group-hover:bg-[#c9983f] ${index === 11 ? "bg-[#d8a64e]" : "bg-slate-200"}`} style={{ height: `${height}%`, animationDelay: `${index * 55 + 420}ms` }} /><span className="text-[9px] text-slate-400">{["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"][index]}</span></div>)}</div><div className="mt-4 flex items-center justify-between text-[11px] text-slate-400"><span>Units processed</span><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#d8a64e]" />Current shift</span></div></article>
                <article className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_8px_rgba(30,40,50,0.03)]"><div className="flex items-start justify-between"><div><p className="text-sm font-bold text-slate-800">Recent activity</p><p className="mt-1 text-xs text-slate-400">Your team&apos;s latest actions</p></div><button className="text-xs font-semibold text-[#a2782f] hover:underline">View all</button></div><div className="mt-5 flex flex-col gap-5">{activity.map((item) => <div key={item.title} className="flex items-start gap-3"><div className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ${item.tone === "blue" ? "bg-blue-50 text-blue-600" : item.tone === "green" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}><div className="size-1.5 rounded-full bg-current" /></div><div className="min-w-0 flex-1"><p className="text-xs font-semibold text-slate-700">{item.title}</p><p className="mt-1 truncate text-[11px] text-slate-400">{item.description}</p></div><span className="text-[10px] text-slate-400">{item.time}</span></div>)}</div></article>
              </div>
              <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <article className="nexus-card nexus-enter rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_8px_rgba(30,40,50,0.03)]" style={{ animationDelay: "520ms" }}>
                  <div className="flex items-start justify-between"><div><p className="text-sm font-bold text-slate-800">Line efficiency</p><p className="mt-1 text-xs text-slate-400">Performance against today&apos;s production target</p></div><div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700"><Activity className="size-3.5" /> Live</div></div>
                  <div className="mt-5 flex flex-col gap-4">{productionLines.map((line) => <div key={line.name}><div className="mb-2 flex items-center justify-between gap-3 text-xs"><span className="font-semibold text-slate-700">{line.name}</span><span className="text-slate-400">{line.target}</span></div><div className="flex items-center gap-3"><div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100"><div className={`nexus-progress h-full rounded-full ${line.color}`} style={{ width: `${line.value}%` }} /></div><span className="w-9 text-right text-xs font-bold text-slate-700">{line.value}%</span><span className={`hidden w-20 text-right text-[10px] font-semibold sm:block ${line.value > 85 ? "text-emerald-600" : "text-amber-600"}`}>{line.status}</span></div></div>)}</div>
                  <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4"><div><p className="text-[10px] text-slate-400">OEE score</p><p className="mt-1 text-lg font-bold text-slate-800">88.4%</p></div><div><p className="text-[10px] text-slate-400">Downtime</p><p className="mt-1 text-lg font-bold text-slate-800">42 min</p></div><div><p className="text-[10px] text-slate-400">Shift target</p><p className="mt-1 text-lg font-bold text-slate-800">4,820</p></div></div>
                </article>
                <article className="nexus-card nexus-enter rounded-xl border border-slate-200/80 bg-[#272c33] p-5 text-white shadow-[0_2px_8px_rgba(30,40,50,0.03)]" style={{ animationDelay: "580ms" }}><div className="flex items-start justify-between"><div><p className="text-sm font-bold">Today&apos;s timeline</p><p className="mt-1 text-xs text-slate-400">Key events across the floor</p></div><CalendarClock className="size-5 text-[#d8a64e]" /></div><div className="mt-5 flex flex-col gap-4">{[["08:00", "Shift started", "Production floor opened"], ["12:00", "Lunch break", "All lines paused"], ["15:30", "Dispatch window", "12 orders queued"]].map(([time, title, detail], index) => <div key={time} className="flex gap-3"><div className="flex w-11 shrink-0 flex-col items-center"><span className={`size-2.5 rounded-full ${index === 0 ? "nexus-pulse bg-[#d8a64e]" : "bg-slate-600"}`} /><span className="mt-1 text-[10px] text-slate-500">{time}</span></div><div className="border-l border-slate-700 pb-1 pl-4"><p className="text-xs font-semibold text-slate-200">{title}</p><p className="mt-1 text-[10px] text-slate-500">{detail}</p></div></div>)}</div></article>
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
                <article className="nexus-card nexus-enter rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_8px_rgba(30,40,50,0.03)]" style={{ animationDelay: "620ms" }}>
                  <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm font-bold text-slate-800">Forecast vs actual output</p><p className="mt-1 text-xs text-slate-400">Production volume and dispatch reliability · last 7 days</p></div><div className="rounded-lg bg-slate-50 px-3 py-2 text-right"><p className="text-[10px] text-slate-400">Today&apos;s output</p><p className="text-sm font-bold text-slate-800">5,480 <span className="text-[10px] font-medium text-emerald-600">+7.2%</span></p></div></div>
                  <div className="mt-5 h-[240px] w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trendData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}><defs><linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d8a64e" stopOpacity={0.28} /><stop offset="100%" stopColor="#d8a64e" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#eef1f4" /><XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} /><YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} /><Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 11 }} /><Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: 10, paddingBottom: 12 }} /><Area type="monotone" dataKey="actual" name="Actual output" stroke="#d8a64e" strokeWidth={2.5} fill="url(#actualFill)" /><Line type="monotone" dataKey="forecast" name="Forecast" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="5 5" dot={false} /></AreaChart></ResponsiveContainer></div>
                </article>
                <article className="nexus-card nexus-enter rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_8px_rgba(30,40,50,0.03)]" style={{ animationDelay: "680ms" }}>
                  <div className="flex items-start justify-between"><div><p className="text-sm font-bold text-slate-800">Delivery health</p><p className="mt-1 text-xs text-slate-400">Order commitment status</p></div><Truck className="size-5 text-[#a2782f]" /></div>
                  <div className="mt-7 flex items-center justify-center"><div className="relative flex size-36 items-center justify-center rounded-full" style={{ background: "conic-gradient(#d8a64e 0 78%, #f59e0b 78% 92%, #e11d48 92% 100%)" }}><div className="flex size-24 flex-col items-center justify-center rounded-full bg-white"><span className="text-2xl font-bold text-slate-800">78%</span><span className="text-[10px] text-slate-400">on time</span></div></div></div>
                  <div className="mt-7 flex flex-col gap-3">{deliveryData.map((item) => <div key={item.name} className="flex items-center justify-between text-xs"><span className="flex items-center gap-2 text-slate-500"><span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span><span className="font-bold text-slate-700">{item.value}%</span></div>)}</div>
                </article>
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <article className="nexus-card nexus-enter rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_8px_rgba(30,40,50,0.03)]" style={{ animationDelay: "740ms" }}><div className="flex items-start justify-between"><div><p className="text-sm font-bold text-slate-800">Order progress</p><p className="mt-1 text-xs text-slate-400">Priority orders needing visibility</p></div><LineChart className="size-5 text-[#a2782f]" /></div><div className="mt-5 flex flex-col gap-4">{orders.map((order) => <div key={order.id} className="rounded-lg border border-slate-100 p-3 transition hover:border-[#ead6a9]"><div className="flex flex-wrap items-center justify-between gap-2"><div><span className="text-[10px] font-bold text-[#a2782f]">{order.id}</span><p className="mt-1 text-xs font-semibold text-slate-700">{order.customer}</p></div><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${order.progress === 100 ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{order.status}</span></div><div className="mt-3 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#d8a64e]" style={{ width: `${order.progress}%` }} /></div><span className="text-[10px] font-semibold text-slate-500">{order.progress}%</span><span className="hidden text-[10px] text-slate-400 sm:block">Due {order.due}</span></div></div>)}</div></article>
                <article className="nexus-card nexus-enter rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_8px_rgba(30,40,50,0.03)]" style={{ animationDelay: "700ms" }}><div className="flex items-start justify-between"><div><p className="text-sm font-bold text-slate-800">Maintenance queue</p><p className="mt-1 text-xs text-slate-400">Keep critical equipment healthy</p></div><Hammer className="size-5 text-rose-500" /></div><div className="mt-5 flex flex-col gap-3">{maintenance.map((item) => <div key={item.machine} className="flex gap-3 rounded-lg bg-slate-50 p-3"><div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-rose-500 shadow-sm"><Wrench className="size-4" /></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><p className="truncate text-xs font-semibold text-slate-700">{item.machine}</p><span className={`text-[10px] font-bold ${item.priority === "High" ? "text-rose-600" : "text-slate-400"}`}>{item.priority}</span></div><p className="mt-1 truncate text-[10px] text-slate-400">{item.task}</p><p className="mt-2 flex items-center gap-1 text-[10px] font-medium text-[#a2782f]"><Timer className="size-3" />{item.time}</p></div></div>)}</div><button className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-[#a2782f] hover:underline"><CircleCheck className="size-3.5" /> View maintenance plan</button></article>
              </div>

              <div className="mt-6 rounded-xl border border-[#eadfc9] bg-[#fffaf0] p-4 sm:flex sm:items-center sm:justify-between"><div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-lg bg-[#f4e6c8] text-[#a2782f]"><HelpCircle className="size-[18px]" /></div><div><p className="text-xs font-bold text-slate-700">Need help with your workflow?</p><p className="mt-0.5 text-[11px] text-slate-500">Ask the AI assistant to find data or guide your next action.</p></div></div><button onClick={() => setChatOpen(true)} className="mt-3 rounded-lg bg-[#272c33] px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 sm:mt-0">Open assistant</button></div>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-6 right-6 z-50" style={{ transform: `translate(${position.x}px, ${position.y}px)` }}><div className="relative">{profileOpen && <div className="absolute bottom-16 right-0 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl"><div className="flex items-center gap-3 border-b border-slate-100 p-3"><div className="flex size-9 items-center justify-center rounded-full bg-[#d8a64e] text-sm font-bold text-[#272c33]">AK</div><div><p className="text-xs font-bold text-slate-800">Arisa K.</p><p className="text-[10px] text-slate-400">Operations manager</p></div></div><div className="flex flex-col gap-0.5 py-2"><button className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-slate-50"><UserRound className="size-4 text-slate-400" />Edit profile</button><button className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-slate-50"><Settings className="size-4 text-slate-400" />Settings</button><button onClick={() => setChatOpen(true)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-slate-50"><Bot className="size-4 text-[#a2782f]" />AI assistant</button><button className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-rose-600 hover:bg-rose-50"><LogOut className="size-4" />Log out</button></div></div>}<button aria-label="Open profile menu" onClick={() => setProfileOpen(!profileOpen)} onMouseDown={(event) => { dragOffset.current = { x: event.clientX - (window.innerWidth / 2 + position.x), y: event.clientY - (window.innerHeight / 2 + position.y) }; setDragging(true); }} className={`group flex size-14 items-center justify-center rounded-full border-4 border-white bg-[#d8a64e] text-sm font-bold text-[#272c33] shadow-[0_8px_25px_rgba(42,46,53,0.22)] transition hover:scale-105 ${dragging ? "cursor-grabbing scale-105" : "cursor-grab"}`}><span>AK</span><GripVertical className="absolute -right-1 -top-1 size-4 rounded-full bg-[#272c33] p-0.5 text-white opacity-0 transition group-hover:opacity-100" /></button></div></div>

      {chatOpen && <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[390px] flex-col border-l border-slate-200 bg-[#f8f9fa] shadow-2xl"><div className="flex h-[82px] items-center justify-between border-b border-slate-200 bg-white px-5"><div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-lg bg-[#272c33] text-[#d8a64e]"><Sparkles className="size-[18px]" /></div><div><p className="text-sm font-bold text-slate-800">NEXUS assistant</p><p className="text-[10px] text-emerald-600">Ready to help</p></div></div><button onClick={() => setChatOpen(false)} aria-label="Close AI assistant" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X className="size-5" /></button></div><div className="flex-1 overflow-y-auto p-5"><div className="flex gap-3"><div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#272c33] text-[#d8a64e]"><Bot className="size-4" /></div><div className="rounded-2xl rounded-tl-sm bg-white p-3.5 shadow-sm"><p className="text-xs leading-5 text-slate-600">Hello Arisa. I can help you analyze operations, find records, or prepare your next workflow action.</p></div></div><div className="mt-5 flex justify-end"><div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#272c33] p-3.5 text-xs leading-5 text-white">Show me today&apos;s production status.</div></div><div className="mt-5 flex gap-3"><div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#272c33] text-[#d8a64e]"><Bot className="size-4" /></div><div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white p-3.5 shadow-sm"><p className="text-xs leading-5 text-slate-600">Current output is <strong>94.6%</strong> of the shift target. I found three areas you may want to review:</p><div className="mt-3 flex flex-col gap-2"><button className="flex items-center justify-between rounded-lg border border-slate-200 p-2.5 text-left text-[11px] hover:border-[#d8a64e]"><span className="flex items-center gap-2"><PackageCheck className="size-4 text-emerald-600" />Dispatch readiness</span><ChevronRight className="size-3 text-slate-400" /></button><button className="flex items-center justify-between rounded-lg border border-slate-200 p-2.5 text-left text-[11px] hover:border-[#d8a64e]"><span className="flex items-center gap-2"><Wrench className="size-4 text-rose-500" />Maintenance alerts</span><ChevronRight className="size-3 text-slate-400" /></button></div></div></div></div><div className="border-t border-slate-200 bg-white p-4"><div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2"><input className="min-w-0 flex-1 bg-transparent px-2 text-xs outline-none placeholder:text-slate-400" placeholder="Ask NEXUS anything..." aria-label="Ask NEXUS anything" /><button className="flex size-8 items-center justify-center rounded-md bg-[#272c33] text-white" aria-label="Send message"><MessageSquareText className="size-4" /></button></div><p className="mt-2 text-center text-[10px] text-slate-400">AI suggestions should be reviewed before execution.</p></div></div>}
    </main>
  );
}
