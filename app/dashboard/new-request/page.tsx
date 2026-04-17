"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { AlertTriangle, FileSearch, Gavel, UserCheck, ArrowRight, CheckCircle, CreditCard, Upload, ChevronLeft } from "lucide-react";

const services = [
  { id: "travel-ban", icon: AlertTriangle, title: "Travel Ban Check", price: 299, desc: "Verify if a travel ban exists against your name.", color: "#e74c3c", days: "24–48 hrs" },
  { id: "police-case", icon: FileSearch, title: "Police Case Check", price: 349, desc: "Check for police complaints or criminal records.", color: "#2980b9", days: "2–3 days" },
  { id: "court-case", icon: Gavel, title: "Court Case Check", price: 399, desc: "Search for civil or criminal court cases.", color: "#8e44ad", days: "3–5 days" },
  { id: "background-check", icon: UserCheck, title: "Background Screening", price: 499, desc: "Full comprehensive legal & financial background check.", color: "#27ae60", days: "5–7 days" },
];

export default function NewRequestPage() {
  const router = useRouter();
  const { currentUser, addCase } = useStore();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [details, setDetails] = useState({ fullName: "", passportNumber: "", nationality: "", emiratesId: "", phone: "", email: "", notes: "" });
  const [payMethod, setPayMethod] = useState("card");
  const [submitted, setSubmitted] = useState(false);
  const service = services.find((s) => s.id === selectedService);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    await new Promise((r) => setTimeout(r, 1500));
    if (currentUser && service) {
      addCase({ userId: currentUser.id, userName: currentUser.name, service: service.title, details, amount: service.price });
    }
    router.push("/dashboard/my-requests");
  };

  const steps = ["Service", "Details", "Documents", "Payment"];

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-8"><h1 className="text-2xl font-bold mb-1" style={{ color: "var(--navy)" }}>New Verification Request</h1><p className="text-gray-500">Complete the steps below to submit your case.</p></div>
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: step>i+1?"var(--green)":step===i+1?"var(--navy)":"var(--gray-100)", color: step>=i+1?"white":"var(--gray-400)" }}>{step>i+1?"✓":i+1}</div>
              <span className="text-xs font-medium" style={{ color: step===i+1?"var(--navy)":"var(--gray-400)" }}>{s}</span>
            </div>
            {i < steps.length-1 && <div className="w-8 h-px" style={{ backgroundColor: step>i+1?"var(--green)":"var(--gray-200)" }} />}
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
        {step === 1 && (
          <div>
            <h2 className="font-bold text-xl mb-6" style={{ color: "var(--navy)" }}>Select a Service</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {services.map((svc) => (
                <button key={svc.id} onClick={() => setSelectedService(svc.id)} className="text-left p-4 rounded-xl border-2 transition-all hover:scale-105" style={{ borderColor: selectedService===svc.id?svc.color:"var(--gray-100)", backgroundColor: selectedService===svc.id?`${svc.color}08`:"white" }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${svc.color}15` }}><svc.icon size={20} style={{ color: svc.color }} /></div>
                    <div className="flex-1"><p className="font-bold text-sm" style={{ color: "var(--navy)" }}>{svc.title}</p><p className="text-xs text-gray-500 mt-0.5 mb-2">{svc.desc}</p><div className="flex items-center justify-between"><span className="font-bold text-sm" style={{ color: svc.color }}>{svc.price} AED</span><span className="text-xs text-gray-400">{svc.days}</span></div></div>
                    {selectedService===svc.id && <CheckCircle size={18} style={{ color: svc.color }} />}
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => selectedService && setStep(2)} disabled={!selectedService} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm disabled:opacity-50" style={{ backgroundColor: "var(--navy)", color: "white" }}>Continue to Details <ArrowRight size={16} /></button>
          </div>
        )}
        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
            <h2 className="font-bold text-xl mb-6" style={{ color: "var(--navy)" }}>Personal Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><input required type="text" value={details.fullName} onChange={(e) => setDetails({...details,fullName:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm" placeholder="Ahmed Mohammed" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label><input required type="text" value={details.nationality} onChange={(e) => setDetails({...details,nationality:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm" placeholder="Jordanian" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Passport Number *</label><input required type="text" value={details.passportNumber} onChange={(e) => setDetails({...details,passportNumber:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm" placeholder="AE1234567" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Emirates ID</label><input type="text" value={details.emiratesId} onChange={(e) => setDetails({...details,emiratesId:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm" placeholder="784-xxxx-xxxxxxx-x" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label><input required type="tel" value={details.phone} onChange={(e) => setDetails({...details,phone:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm" placeholder="+971 50 000 0000" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input required type="email" value={details.email} onChange={(e) => setDetails({...details,email:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm" placeholder="your@email.com" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label><textarea rows={3} value={details.notes} onChange={(e) => setDetails({...details,notes:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm resize-none" placeholder="Any additional context..." /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setStep(1)} className="px-5 py-3 rounded-xl font-medium text-sm border border-gray-200 flex items-center gap-2" style={{ color: "var(--gray-600)" }}><ChevronLeft size={16} /> Back</button>
              <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm" style={{ backgroundColor: "var(--navy)", color: "white" }}>Continue <ArrowRight size={16} /></button>
            </div>
          </form>
        )}
        {step === 3 && (
          <div>
            <h2 className="font-bold text-xl mb-6" style={{ color: "var(--navy)" }}>Upload Documents</h2>
            <div className="space-y-4">
              {[{label:"Passport (main page) *",required:true},{label:"Emirates ID (front & back)",required:false},{label:"Visa / Entry stamp",required:false}].map((doc) => (
                <div key={doc.label} className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer">
                  <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm font-medium text-gray-600">{doc.label}</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG — max 5MB</p>
                  <button className="mt-3 px-4 py-1.5 rounded-lg text-xs font-semibold border" style={{ borderColor: "var(--navy)", color: "var(--navy)" }}>Choose File</button>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setStep(2)} className="px-5 py-3 rounded-xl font-medium text-sm border border-gray-200 flex items-center gap-2" style={{ color: "var(--gray-600)" }}><ChevronLeft size={16} /> Back</button>
              <button onClick={() => setStep(4)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm" style={{ backgroundColor: "var(--navy)", color: "white" }}>Continue <ArrowRight size={16} /></button>
            </div>
          </div>
        )}
        {step === 4 && (
          <form onSubmit={handleSubmit}>
            <h2 className="font-bold text-xl mb-6" style={{ color: "var(--navy)" }}>Payment</h2>
            <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: "var(--gray-50)" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--navy)" }}>Order Summary</p>
              <div className="flex justify-between text-sm mb-2"><span className="text-gray-600">{service?.title}</span><span className="font-semibold">{service?.price} AED</span></div>
              <div className="flex justify-between text-sm mb-3"><span className="text-gray-600">VAT (5%)</span><span className="font-semibold">{Math.round((service?.price||0)*0.05)} AED</span></div>
              <div className="flex justify-between font-bold border-t border-gray-200 pt-3"><span style={{color:"var(--navy)"}}>Total</span><span style={{color:"var(--gold)"}}>{Math.round((service?.price||0)*1.05)} AED</span></div>
            </div>
            <div className="space-y-3 mb-6">
              {[{id:"card",label:"Credit / Debit Card"},{id:"bank",label:"Bank Transfer"},{id:"crypto",label:"Cryptocurrency (USDT)"}].map((method) => (
                <label key={method.id} className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer" style={{ borderColor: payMethod===method.id?"var(--navy)":"var(--gray-200)" }}>
                  <input type="radio" name="payment" value={method.id} checked={payMethod===method.id} onChange={() => setPayMethod(method.id)} />
                  <div className="flex items-center gap-2"><CreditCard size={16} style={{color:"var(--navy)"}} /><span className="text-sm font-medium" style={{color:"var(--navy)"}}>{method.label}</span></div>
                </label>
              ))}
            </div>
            {payMethod === "card" && (
              <div className="space-y-3 mb-6">
                <input type="text" placeholder="Card Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" maxLength={19} />
                <div className="grid grid-cols-2 gap-3"><input type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" maxLength={5} /><input type="text" placeholder="CVV" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" maxLength={4} /></div>
                <input type="text" placeholder="Cardholder Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
              </div>
            )}
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(3)} className="px-5 py-3 rounded-xl font-medium text-sm border border-gray-200 flex items-center gap-2" style={{ color: "var(--gray-600)" }}><ChevronLeft size={16} /> Back</button>
              <button type="submit" disabled={submitted} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm disabled:opacity-70" style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}>{submitted ? "Processing..." : `Pay ${Math.round((service?.price||0)*1.05)} AED`}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
