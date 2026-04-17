"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useStore();
  const router = useRouter();
  useEffect(() => { if (!currentUser) router.push("/auth/login"); }, [currentUser, router]);
  if (!currentUser) return null;
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--gray-50)" }}>
      <DashboardSidebar role="client" />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
