"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useStore();
  const router = useRouter();
  useEffect(() => {
    if (!currentUser) router.push("/auth/login");
    else if (currentUser.role === "client") router.push("/dashboard");
  }, [currentUser, router]);
  if (!currentUser || currentUser.role === "client") return null;
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--gray-50)" }}>
      <DashboardSidebar role={currentUser.role} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
