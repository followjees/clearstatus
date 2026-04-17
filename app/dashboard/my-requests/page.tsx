"use client";
import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { FileText, PlusCircle, Clock, CheckCircle, Eye } from "lucide-react";

const statusColor: Record<string,string> = {"Submitted":"#f59e0b","In Progress":"#3b82f6","Verification Ongoing":"#8b5cf6","Completed":"#10b981"};
const statusBg: Record<string,string> = {"Submitted":"rgba(245,158,11,0.1)","In Progress":"rgba(59,130,246,0.1)","Verification Ongoing":"rgba(139,92,246,0.1)","Completed":"rgba(16,185,129,0.1)"};

export default function MyRequestsPage() {
  const { currentUser, cases } = useStore();
  const [filter, setFilter] = useState("All");
  const myCases = cases.filter((c) => c.userId === currentUser?.id);
  const statuses = ["All","Submitted","In Progress","Verification Ongoing","Completed"];
  const filtered = filter === "All" ? myCases : myCases.filter((c) => c.status === filter);
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div><h1 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>My Requests</h1><p className="text-gray-500 mt-1">{myCases.length} total requests</p></div>
        <Link href="/dashboard/new-request" className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm" style={{ backgroundColor: "var(--navy)", color: "white" }}><PlusCircle size={16} /> New Request</Link>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {statuses.map((s) => (<button key={s} onClick={() => setFilter(s)} className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap" style={{ backgroundColor: filter===s ? "var(--navy)" : "var(--gray-100)", color: filter===s ? "white" : "var(--gray-600)" }}>{s}</button>))}
      </div>
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center"><FileText size={48} className="mx-auto mb-4 text-gray-200" /><p className="font-semibold text-gray-400 mb-2">No requests found</p><Link href="/dashboard/new-request" className="px-5 py-2.5 rounded-xl font-bold text-sm" style={{ backgroundColor: "var(--navy)", color: "white" }}>Create Request</Link></div>
      ) : (
        <div className="space-y-3">{filtered.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: statusBg[c.status] }}>
                  {c.status === "Completed" ? <CheckCircle size={20} style={{ color: statusColor[c.status] }} /> : <Clock size={20} style={{ color: statusColor[c.status] }} />}
                </div>
                <div><p className="font-bold" style={{ color: "var(--navy)" }}>{c.service}</p><p className="text-sm text-gray-500 mt-0.5">Case #{c.id} · Submitted {c.createdAt}</p>{c.assignedLawyer && <p className="text-xs text-gray-400 mt-1">Assigned to: {c.assignedLawyer}</p>}</div>
              </div>
              <div className="flex flex-col items-end gap-2"><span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: statusBg[c.status], color: statusColor[c.status] }}>{c.status}</span><span className="text-xs text-gray-400">{c.amount} AED</span></div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-gray-100">
                <div className="h-1.5 rounded-full" style={{ width: c.status==="Submitted"?"15%":c.status==="In Progress"?"45%":c.status==="Verification Ongoing"?"75%":"100%", backgroundColor: statusColor[c.status] }} />
              </div>
              {c.status === "Completed" && <Link href="/dashboard/reports" className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold" style={{ backgroundColor: "var(--navy)", color: "white" }}><Eye size={12} /> View Report</Link>}
              <Link href="/dashboard/messages" className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium border" style={{ borderColor: "var(--gray-200)", color: "var(--gray-600)" }}>Messages</Link>
            </div>
          </div>
        ))}</div>
      )}
    </div>
  );
}
