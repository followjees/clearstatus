"use client";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { PlusCircle, Clock, CheckCircle, FileText, MessageSquare, ArrowRight, TrendingUp, AlertCircle } from "lucide-react";

const statusColor: Record<string,string> = {"Submitted":"#f59e0b","In Progress":"#3b82f6","Verification Ongoing":"#8b5cf6","Completed":"#10b981"};
const statusBg: Record<string,string> = {"Submitted":"rgba(245,158,11,0.1)","In Progress":"rgba(59,130,246,0.1)","Verification Ongoing":"rgba(139,92,246,0.1)","Completed":"rgba(16,185,129,0.1)"};

export default function DashboardHome() {
  const { currentUser, cases, messages } = useStore();
  const myCases = cases.filter((c) => c.userId === currentUser?.id);
  const active = myCases.filter((c) => c.status !== "Completed");
  const completed = myCases.filter((c) => c.status === "Completed");
  const unread = messages.filter((m) => !m.read).length;
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div><h1 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>Welcome back, {currentUser?.name?.split(" ")[0]} 👋</h1><p className="text-gray-500 mt-1">Here's a summary of your legal verification status.</p></div>
        <Link href="/dashboard/new-request" className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm" style={{ backgroundColor: "var(--navy)", color: "white" }}><PlusCircle size={16} /> New Request</Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[{label:"Active Cases",value:active.length,icon:Clock,color:"#3b82f6",bg:"rgba(59,130,246,0.08)"},{label:"Completed",value:completed.length,icon:CheckCircle,color:"#10b981",bg:"rgba(16,185,129,0.08)"},{label:"Total Reports",value:completed.length,icon:FileText,color:"var(--gold)",bg:"rgba(201,168,76,0.08)"},{label:"Unread Messages",value:unread,icon:MessageSquare,color:"#e74c3c",bg:"rgba(231,76,60,0.08)"}].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg }}><stat.icon size={20} style={{ color: stat.color }} /></div><TrendingUp size={14} className="text-gray-300" /></div>
            <p className="text-2xl font-bold" style={{ color: "var(--navy)" }}>{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5"><h2 className="font-bold text-lg" style={{ color: "var(--navy)" }}>Recent Requests</h2><Link href="/dashboard/my-requests" className="text-sm font-medium flex items-center gap-1" style={{ color: "var(--gold)" }}>View all <ArrowRight size={14} /></Link></div>
          {myCases.length === 0 ? (<div className="text-center py-10"><AlertCircle size={40} className="mx-auto mb-3 text-gray-300" /><p className="text-gray-400 mb-4">No requests yet</p><Link href="/dashboard/new-request" className="px-5 py-2 rounded-xl text-sm font-bold" style={{ backgroundColor: "var(--navy)", color: "white" }}>Start First Check</Link></div>) : (
            <div className="space-y-3">{myCases.slice(0,4).map((c) => (<div key={c.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50"><div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: statusBg[c.status] }}><FileText size={18} style={{ color: statusColor[c.status] }} /></div><div className="flex-1 min-w-0"><p className="font-semibold text-sm truncate" style={{ color: "var(--navy)" }}>{c.service}</p><p className="text-xs text-gray-400">Submitted {c.createdAt} · #{c.id}</p></div><span className="px-2.5 py-1 rounded-full text-xs font-semibold shrink-0" style={{ backgroundColor: statusBg[c.status], color: statusColor[c.status] }}>{c.status}</span></div>))}</div>
          )}
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-bold text-sm mb-4" style={{ color: "var(--navy)" }}>Quick Actions</h2>
            <div className="space-y-2">{[{label:"New Travel Ban Check",href:"/dashboard/new-request"},{label:"View Reports",href:"/dashboard/reports"},{label:"Message Legal Team",href:"/dashboard/messages"},{label:"Book a Lawyer",href:"/lawyers"}].map((action) => (<Link key={action.label} href={action.href} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50" style={{ color: "var(--navy)" }}>{action.label}<ArrowRight size={14} className="text-gray-400" /></Link>))}</div>
          </div>
          <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)" }}>
            <PlusCircle size={24} className="mb-3" style={{ color: "var(--gold)" }} />
            <p className="font-bold mb-1">Start a new check</p>
            <p className="text-sm text-white/60 mb-4">Travel ban, police case, court case, or background screening.</p>
            <Link href="/dashboard/new-request" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold" style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}>New Request <ArrowRight size={14} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
