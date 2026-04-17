"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { CaseRequest } from "@/lib/store";
import { Search, User, X, CheckCircle, Clock, Upload, Filter } from "lucide-react";

const statusColor: Record<string,string> = {"Submitted":"#f59e0b","In Progress":"#3b82f6","Verification Ongoing":"#8b5cf6","Completed":"#10b981"};
const STATUSES: CaseRequest["status"][] = ["Submitted","In Progress","Verification Ongoing","Completed"];
const LAWYERS = ["Sara Khalil","Ravi Sharma","Khalid Al-Mansoori","Aisha Al-Naqbi"];

export default function AdminRequestsPage() {
  const { cases, updateCaseStatus } = useStore();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState<CaseRequest | null>(null);
  const [assignedLawyer, setAssignedLawyer] = useState("");

  const statuses = ["All", ...STATUSES];
  const filtered = cases.filter((c) => {
    const matchSearch = !search || c.userName.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase()) || c.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (caseId: string, status: CaseRequest["status"]) => {
    updateCaseStatus(caseId, status);
    if (selected?.id === caseId) setSelected({ ...selected, status });
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>All Requests</h1><p className="text-gray-500 mt-1">{cases.length} total cases in the system</p></div>
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm w-56 focus:outline-none" placeholder="Search by name or ID..." /></div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none">{statuses.map((s) => <option key={s}>{s}</option>)}</select>
        <div className="ml-auto text-sm text-gray-400 self-center">{filtered.length} results</div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-3">
          {filtered.map((c) => (
            <div key={c.id} onClick={() => setSelected(c)} className="bg-white rounded-2xl border border-gray-100 p-5 cursor-pointer hover:shadow-md transition-all" style={{ borderColor: selected?.id===c.id ? "var(--navy)" : undefined }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold" style={{ backgroundColor: "var(--navy)", color: "var(--gold)" }}>{c.userName[0]}</div>
                  <div><p className="font-bold text-sm" style={{ color: "var(--navy)" }}>{c.userName}</p><p className="text-xs text-gray-500">{c.service} · #{c.id}</p><p className="text-xs text-gray-400 mt-1">Submitted {c.createdAt}</p></div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${statusColor[c.status]}15`, color: statusColor[c.status] }}>{c.status}</span>
                  <span className="text-xs text-gray-400">{c.amount} AED</span>
                </div>
              </div>
              {c.assignedLawyer && <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><User size={11} /> {c.assignedLawyer}</p>}
            </div>
          ))}
          {filtered.length === 0 && (<div className="bg-white rounded-2xl border border-gray-100 p-12 text-center"><p className="text-gray-400">No cases match your filters.</p></div>)}
        </div>
        <div>
          {selected ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-8">
              <div className="flex items-center justify-between mb-5"><h3 className="font-bold" style={{ color: "var(--navy)" }}>Case Details</h3><button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button></div>
              <div className="space-y-3 mb-5">
                {[{label:"Case ID",value:`#${selected.id}`},{label:"Client",value:selected.userName},{label:"Service",value:selected.service},{label:"Passport",value:selected.details.passportNumber},{label:"Nationality",value:selected.details.nationality},{label:"Amount",value:`${selected.amount} AED`},{label:"Submitted",value:selected.createdAt}].map((f) => (<div key={f.label} className="flex items-start justify-between gap-2"><span className="text-xs text-gray-400 shrink-0">{f.label}</span><span className="text-xs font-semibold text-right" style={{ color: "var(--navy)" }}>{f.value}</span></div>))}
              </div>
              <div className="mb-4">
                <label className="text-xs font-semibold text-gray-400 block mb-2">UPDATE STATUS</label>
                <div className="space-y-2">{STATUSES.map((s) => (<button key={s} onClick={() => handleStatusChange(selected.id, s)} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left" style={{ backgroundColor: selected.status===s ? `${statusColor[s]}15` : "var(--gray-50)", color: selected.status===s ? statusColor[s] : "var(--gray-600)", border: selected.status===s ? `1px solid ${statusColor[s]}30` : "1px solid transparent" }}>{selected.status===s ? <CheckCircle size={14} /> : <Clock size={14} />}{s}</button>))}</div>
              </div>
              <div className="mb-4">
                <label className="text-xs font-semibold text-gray-400 block mb-2">ASSIGN LAWYER</label>
                <select value={assignedLawyer || selected.assignedLawyer || ""} onChange={(e) => setAssignedLawyer(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"><option value="">Unassigned</option>{LAWYERS.map((l) => <option key={l}>{l}</option>)}</select>
              </div>
              <button className="w-full py-2.5 rounded-xl font-bold text-sm" style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}>Save Changes</button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center sticky top-8"><Filter size={32} className="mx-auto mb-3 text-gray-200" /><p className="text-sm text-gray-400">Click a case to view details and take actions.</p></div>
          )}
        </div>
      </div>
    </div>
  );
}
