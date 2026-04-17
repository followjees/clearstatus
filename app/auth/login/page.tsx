"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const login = useStore((s) => s.login);
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const success = login(form.email, form.password);
    setLoading(false);
    if (success) {
      const role = form.email.includes("admin") ? "admin" : form.email.includes("lawyer") ? "lawyer" : "client";
      router.push(role === "client" ? "/dashboard" : "/admin");
    } else {
      setError("Invalid email or password. Try: client@demo.com / demo123");
    }
  };

  const demoAccounts = [
    { label: "Client", email: "client@demo.com", pass: "demo123" },
    { label: "Admin", email: "admin@demo.com", pass: "admin123" },
    { label: "Lawyer", email: "lawyer@demo.com", pass: "lawyer123" },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--navy)" }}>
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16" style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)" }}>
        <Link href="/" className="flex items-center gap-2 mb-16"><Shield size={32} style={{ color: "var(--gold)" }} /><span className="text-white font-bold text-2xl">Clear<span style={{ color: "var(--gold)" }}>Status</span></span></Link>
        <h2 className="text-4xl font-bold text-white mb-4">Your Legal Clarity Awaits.</h2>
        <p className="text-white/60 text-lg leading-relaxed mb-8">Sign in to track your cases, download reports, and communicate with your legal team.</p>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--navy)" }}>Welcome back</h1>
          <p className="text-gray-500 mb-8">Sign in to access your dashboard</p>
          <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--gold)" }}>DEMO ACCOUNTS — click to fill</p>
            <div className="flex gap-2">
              {demoAccounts.map((acc) => (
                <button key={acc.label} onClick={() => setForm({ email: acc.email, password: acc.pass })} className="px-3 py-1.5 rounded-lg text-xs font-medium border" style={{ borderColor: "var(--navy)", color: "var(--navy)" }}>{acc.label}</button>
              ))}
            </div>
          </div>
          {error && (<div className="flex items-center gap-2 p-3 rounded-xl mb-4" style={{ backgroundColor: "rgba(239,68,68,0.08)", color: "var(--red)" }}><AlertCircle size={16} /><span className="text-sm">{error}</span></div>)}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" required value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm" placeholder="your@email.com" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative"><input type={show ? "text" : "password"} required value={form.password} onChange={(e) => setForm({...form,password:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm pr-12" placeholder="••••••••" /><button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
            </div>
            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105 disabled:opacity-60" style={{ backgroundColor: "var(--navy)", color: "white" }}>{loading ? "Signing in..." : <><span>Sign In</span><ArrowRight size={16} /></>}</button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">Don't have an account?{" "}<Link href="/auth/signup" className="font-semibold" style={{ color: "var(--navy)" }}>Create one free →</Link></p>
        </div>
      </div>
    </div>
  );
}
