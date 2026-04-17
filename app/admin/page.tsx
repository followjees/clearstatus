"use client";
import { useStore } from "@/lib/store";
import { FolderOpen, CheckCircle, Clock, TrendingUp, ArrowRight, DollarSign, BarChart2 } from "lucide-react";
import Link from "next/link";

const statusColor: Record<string,string> = {"Submitted":"#f59e0b","In Progress":"#3b82f6","Verification Ongoing":"#8b5cf6","Completed":"#10b981"};

export default function AdminPage() {
  const { cases } = useStore();
  const total = cases.length;
  const completed = cases.filter((c) => c.status === "Completed").length;
  const active = cases.filter((c) => c.status !== "Completed").length;
  const revenue = cases.filter((c) => c.status === "Completed").reduce((s, c) => s + c.amount, 0);
  const recent = [...cases].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  const serviceCounts = cases.reduce<Record<string,number>>((acc, c) => { acc[c.service] = (acc[c.service] || 0) + 1; return acc; }, {});
  const statusCounts = cases.reduce<Record<string,number>>((acc, c) => { acc[c.status] = (acc[c.status] || 0) + 1; return acc; }, {});
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8"><h1 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>Admin Overview</h1><p className="text-gray-500 mt-1">Platform-wide analytics and case management.</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[{label:"Total Cases",value:total,icon:FolderOpen,color:"var(--navy)",bg:"rgba(10,22,40,0.08)"},{label:"Active Cases",value:active,icon:Clock,color:"#3b82f6",bg:"rgba(59,130,246,0.08)"},{label:"Completed",value:completed,icon:CheckCircle,color:"#10b981",bg:"rgba(16,185,129,0.08)"},{label:"Revenue (AED)",value:revenue.toLocaleString(),icon:DollarSign,color:"var(--gold)",bg:"rgba(201,168,76,0.08)"}].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg }}><stat.icon size={20} style={{ color: stat.color }} /></div><TrendingUp size={14} className="text-gray-300" /></div>
            <p className="text-2xl font-bold" style={{ color: "var(--navy)" }}>{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5"><h2 className="font-bold text-lg" style={{ color: "var(--navy)" }}>Recent Cases</h2><Link href="/admin/requests" className="text-sm font-medium flex items-center gap-1" style={{ color: "var(--gold)" }}>View all <ArrowRight size={14} /></Link></div>
          <div className="space-y-3">{recent.map((c) => (<div key={c.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50"><div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${statusColor[c.status]}15` }}><FolderOpen size={18} style={{ color: statusColor[c.status] }} /></div><div className="flex-1 min-w-0"><p className="font-semibold text-sm truncate" style={{ color: "var(--navy)" }}>{c.service}</p><p className="text-xs text-gray-400">{c.userName} · {c.createdAt}</p></div><span className="px-2.5 py-1 rounded-full text-xs font-semibold shrink-0" style={{ backgroundColor: `${statusColor[c.status]}15`, color: statusColor[c.status] }}>{c.status}</span></div>))}</div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-sm mb-4" style={{ color: "var(--navy)" }}>By Service</h3>
            <div className="space-y-3">{Object.entries(serviceCounts).map(([service, count]) => (<div key={service}><div className="flex justify-between text-xs mb-1"><span className="text-gray-600 truncate">{service}</span><span className="font-bold" style={{ color: "var(--navy)" }}>{count}</span></div><div className="h-1.5 rounded-full bg-gray-100"><div className="h-1.5 rounded-full" style={{ width: `${(count/total)*100}%`, backgroundColor: "var(--navy)" }} /></div></div>))}</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-sm mb-4" style={{ color: "var(--navy)" }}>By Status</h3>
            <div className="space-y-2">{Object.entries(statusCounts).map(([status, count]) => (<div key={status} className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusColor[status] }} /><span className="text-xs text-gray-600">{status}</span></div><span className="text-xs font-bold" style={{ color: "var(--navy)" }}>{count}</span></div>))}</div>
          </div>
          <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)" }}>
            <BarChart2 size={20} className="mb-2" style={{ color: "var(--gold)" }} />
            <p className="text-white/60 text-xs">Total Revenue</p>
            <p className="text-3xl font-bold text-white mt-1">{revenue.toLocaleString()}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--gold)" }}>AED from {completed} completed cases</p>
          </div>
        </div>
      </div>
    </div>
  );
}
