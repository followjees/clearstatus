"use client";
import { useStore } from "@/lib/store";
import { Star, FolderOpen, MessageSquare, UserPlus, CheckCircle, Clock } from "lucide-react";

const lawyers = [
  { name: "Sara Khalil", role: "Legal Consultant", specialties: ["Police Cases","Labour Law","Visa"], cases: 47, rating: 4.8, status: "Active" },
  { name: "Ravi Sharma", role: "Legal Researcher", specialties: ["Background Checks","Civil Law"], cases: 31, rating: 4.7, status: "Active" },
  { name: "Khalid Al-Mansoori", role: "Senior Partner", specialties: ["Travel Ban","Criminal Law"], cases: 62, rating: 4.9, status: "Active" },
  { name: "Aisha Al-Naqbi", role: "Family & Civil Law", specialties: ["Court Cases","Family Law"], cases: 28, rating: 4.9, status: "Active" },
];

export default function AdminLawyersPage() {
  const { cases } = useStore();
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>Lawyer Management</h1><p className="text-gray-500 mt-1">Manage your legal team and case assignments.</p></div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm" style={{ backgroundColor: "var(--navy)", color: "white" }}><UserPlus size={16} /> Add Lawyer</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lawyers.map((lawyer) => {
          const assigned = cases.filter((c) => c.assignedLawyer === lawyer.name);
          const activeCases = assigned.filter((c) => c.status !== "Completed");
          const completedCases = assigned.filter((c) => c.status === "Completed");
          return (
            <div key={lawyer.name} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0" style={{ backgroundColor: "var(--navy)", color: "var(--gold)" }}>{lawyer.name.split(" ").map((n) => n[0]).join("")}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg" style={{ color: "var(--navy)" }}>{lawyer.name}</h3>
                  <p className="text-sm text-gray-500">{lawyer.role}</p>
                  <div className="flex items-center gap-1 mt-1">{Array.from({length:5}).map((_,i) => (<Star key={i} size={12} fill={i<Math.floor(lawyer.rating)?"var(--gold)":"none"} style={{color:"var(--gold)"}} />))}<span className="text-xs text-gray-400 ml-1">{lawyer.rating}</span></div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(16,185,129,0.1)", color: "#10b981" }}>{lawyer.status}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-5">{lawyer.specialties.map((s) => (<span key={s} className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: "rgba(10,22,40,0.06)", color: "var(--navy)" }}>{s}</span>))}</div>
              <div className="grid grid-cols-3 gap-3 mb-5 p-3 rounded-xl" style={{ backgroundColor: "var(--gray-50)" }}>
                <div className="text-center"><FolderOpen size={16} className="mx-auto mb-1" style={{color:"var(--navy)"}} /><p className="text-lg font-bold" style={{color:"var(--navy)"}}>{lawyer.cases}</p><p className="text-xs text-gray-400">Total</p></div>
                <div className="text-center"><Clock size={16} className="mx-auto mb-1" style={{color:"#3b82f6"}} /><p className="text-lg font-bold" style={{color:"#3b82f6"}}>{activeCases.length}</p><p className="text-xs text-gray-400">Active</p></div>
                <div className="text-center"><CheckCircle size={16} className="mx-auto mb-1" style={{color:"#10b981"}} /><p className="text-lg font-bold" style={{color:"#10b981"}}>{completedCases.length}</p><p className="text-xs text-gray-400">Done</p></div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border" style={{ borderColor: "var(--gray-200)", color: "var(--navy)" }}><FolderOpen size={14} /> View Cases</button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium" style={{ backgroundColor: "var(--navy)", color: "white" }}><MessageSquare size={14} /> Message</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
