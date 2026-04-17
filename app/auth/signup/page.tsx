"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { useStore } from "@/lib/store";

export default function SignupPage() {
  const router = useRouter();
  const login = useStore((s) => s.login);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", country: "", password: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const countries = ["United Arab Emirates","Jordan","India","Pakistan","Philippines","Egypt","Lebanon","Sri Lanka","Bangladesh","Nigeria","Kenya","UK","USA","Germany","Australia","Canada","Other"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    login("client@demo.com", "demo123");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--navy)" }}>
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16" style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)" }}>
        <Link href="/" className="flex items-center gap-2 mb-16"><Shield size={32} style={{ color: "var(--gold)" }} /><span className="text-white font-bold text-2xl">Clear<span style={{ color: "var(--gold)" }}>Status</span></span></Link>
        <h2 className="text-4xl font-bold text-white mb-4">Start Your Verification Today.</h2>
        <div className="space-y-3">{["Create your account in 60 seconds","Submit your first request immediately","Track everything in your dashboard","Download certified PDF reports"].map((item) => (<div key={item} className="flex items-center gap-3 text-white/70"><CheckCircle size={18} style={{ color: "var(--gold)" }} />{item}</div>))}</div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--navy)" }}>{step === 1 ? "Create your account" : "Secure your account"}</h1>
          <p className="text-gray-500 mb-8">{step === 1 ? "It's free and takes less than a minute" : "Choose a strong password"}</p>
          {step === 1 ? (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">First Name</label><input required type="text" value={form.firstName} onChange={(e) => setForm({...form,firstName:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm" placeholder="Ahmed" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label><input required type="text" value={form.lastName} onChange={(e) => setForm({...form,lastName:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm" placeholder="Al-Rashidi" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label><input required type="email" value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm" placeholder="your@email.com" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Country of Residence</label><select required value={form.country} onChange={(e) => setForm({...form,country:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm bg-white"><option value="">Select country...</option>{countries.map((c) => <option key={c}>{c}</option>)}</select></div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105" style={{ backgroundColor: "var(--navy)", color: "white" }}>Continue <ArrowRight size={16} /></button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><div className="relative"><input required type={show ? "text" : "password"} value={form.password} onChange={(e) => setForm({...form,password:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm pr-12" placeholder="Minimum 8 characters" minLength={8} /><button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label><input required type="password" value={form.confirm} onChange={(e) => setForm({...form,confirm:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm" placeholder="Repeat password" /></div>
              <div className="flex items-start gap-2"><input type="checkbox" id="agree" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 rounded" required /><label htmlFor="agree" className="text-sm text-gray-600">I agree to the <Link href="#" className="underline" style={{ color: "var(--navy)" }}>Terms of Service</Link> and <Link href="#" className="underline" style={{ color: "var(--navy)" }}>Privacy Policy</Link></label></div>
              <button type="submit" disabled={loading || !agreed} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm disabled:opacity-60" style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}>{loading ? "Creating account..." : "Create Account & Start Checking"}</button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-gray-400">← Back</button>
            </form>
          )}
          <p className="text-center text-sm text-gray-500 mt-6">Already have an account? <Link href="/auth/login" className="font-semibold" style={{ color: "var(--navy)" }}>Sign in →</Link></p>
        </div>
      </div>
    </div>
  );
}
