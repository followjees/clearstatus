"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, PlusCircle, FolderOpen, FileText, MessageSquare, User, LogOut, Shield, Settings, X, Menu } from "lucide-react";
import { useStore } from "@/lib/store";
import { useState } from "react";

const clientNav = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: PlusCircle, label: "New Request", href: "/dashboard/new-request" },
  { icon: FolderOpen, label: "My Requests", href: "/dashboard/my-requests" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];
const adminNav = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: FolderOpen, label: "All Requests", href: "/admin/requests" },
  { icon: User, label: "Lawyers", href: "/admin/lawyers" },
  { icon: Settings, label: "Settings", href: "/admin" },
];

export default function DashboardSidebar({ role = "client" }: { role?: "client" | "admin" | "lawyer" }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, messages } = useStore();
  const [open, setOpen] = useState(false);
  const nav = role === "client" ? clientNav : adminNav;
  const unread = messages.filter((m) => !m.read).length;
  const handleLogout = () => { logout(); router.push("/auth/login"); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <Shield size={24} style={{ color: "var(--gold)" }} />
          <span className="font-bold text-lg text-white">Clear<span style={{ color: "var(--gold)" }}>Status</span></span>
        </Link>
        {role !== "client" && <span className="text-xs mt-1 block" style={{ color: "var(--gold)" }}>{role === "admin" ? "Admin Portal" : "Lawyer Portal"}</span>}
      </div>
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}>{currentUser?.name?.[0] || "U"}</div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">{currentUser?.name || "Guest"}</p>
            <p className="text-xs text-white/40 truncate">{currentUser?.email}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ backgroundColor: active ? "rgba(201,168,76,0.15)" : "transparent", color: active ? "var(--gold)" : "rgba(255,255,255,0.65)" }}>
              <item.icon size={18} />
              {item.label}
              {item.label === "Messages" && unread > 0 && (
                <span className="ml-auto w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold" style={{ backgroundColor: "var(--red)", color: "white" }}>{unread}</span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 pb-4 border-t border-white/10 pt-4">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">
          <LogOut size={18} />Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button onClick={() => setOpen(!open)} className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--navy)", color: "white" }}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} />}
      <aside className={`lg:hidden fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`} style={{ backgroundColor: "var(--navy)" }}>
        <SidebarContent />
      </aside>
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 h-screen sticky top-0" style={{ backgroundColor: "var(--navy)" }}>
        <SidebarContent />
      </aside>
    </>
  );
}
