"use client";
import { useStore } from "@/lib/store";
import { FileText, Download, Eye, Lock, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

function ShieldIcon({ size, style }: { size: number; style?: React.CSSProperties }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>);
}

export default function ReportsPage() {
  const { currentUser, cases } = useStore();
  const myCases = cases.filter((c) => c.userId === currentUser?.id);
  const completed = myCases.filter((c) => c.status === "Completed");
  const pending = myCases.filter((c) => c.status !== "Completed");
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8"><h1 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>My Reports</h1><p className="text-gray-500 mt-1">Download and view your certified legal verification reports.</p></div>
      {completed.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold tracking-widest mb-4" style={{ color: "var(--gold)" }}>COMPLETED REPORTS</h2>
          <div className="space-y-4">{completed.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(16,185,129,0.1)" }}><FileText size={24} style={{ color: "#10b981" }} /></div>
                  <div><p className="font-bold text-lg" style={{ color: "var(--navy)" }}>{c.service}</p><p className="text-sm text-gray-500">Case #{c.id} · Completed {c.updatedAt}</p><div className="flex items-center gap-2 mt-2"><CheckCircle size={14} style={{ color: "#10b981" }} /><span className="text-xs font-semibold" style={{ color: "#10b981" }}>Verified & Certified</span></div></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border" style={{ borderColor: "var(--gray-200)", color: "var(--navy)" }}><Eye size={15} /> Preview</button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold" style={{ backgroundColor: "var(--navy)", color: "white" }}><Download size={15} /> Download PDF</button>
                </div>
              </div>
              <div className="mt-5 p-4 rounded-xl" style={{ backgroundColor: "var(--gray-50)", border: "1px dashed var(--gray-200)" }}>
                <div className="flex items-center gap-2 mb-3"><ShieldIcon size={16} style={{ color: "var(--navy)" }} /><span className="text-xs font-bold" style={{ color: "var(--navy)" }}>CLEARSTATUS LEGAL — CERTIFIED VERIFICATION REPORT</span></div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div><p className="text-gray-400">Subject Name</p><p className="font-semibold" style={{ color: "var(--navy)" }}>{c.details.fullName}</p></div>
                  <div><p className="text-gray-400">Check Type</p><p className="font-semibold" style={{ color: "var(--navy)" }}>{c.service}</p></div>
                  <div><p className="text-gray-400">Passport No.</p><p className="font-semibold" style={{ color: "var(--navy)" }}>{c.details.passportNumber}</p></div>
                  <div><p className="text-gray-400">Result</p><p className="font-bold" style={{ color: "#10b981" }}>✓ CLEAR — No records found</p></div>
                </div>
              </div>
            </div>
          ))}</div>
        </div>
      )}
      {pending.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold tracking-widest mb-4" style={{ color: "var(--gray-400)" }}>PENDING REPORTS</h2>
          <div className="space-y-3">{pending.map((c) => (<div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-5 opacity-70"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100"><Clock size={20} className="text-gray-400" /></div><div className="flex-1"><p className="font-semibold" style={{ color: "var(--navy)" }}>{c.service}</p><p className="text-sm text-gray-400">Case #{c.id} · {c.status}</p></div><span className="text-xs text-gray-400 px-3 py-1 bg-gray-100 rounded-full">Processing</span></div></div>))}</div>
        </div>
      )}
      {myCases.length === 0 && (<div className="bg-white rounded-2xl border border-gray-100 p-16 text-center"><FileText size={48} className="mx-auto mb-4 text-gray-200" /><p className="font-semibold text-gray-400 mb-2">No reports yet</p><Link href="/dashboard/new-request" className="px-5 py-2.5 rounded-xl font-bold text-sm" style={{ backgroundColor: "var(--navy)", color: "white" }}>Start First Check</Link></div>)}
    </div>
  );
}
