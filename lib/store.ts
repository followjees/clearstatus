import { create } from "zustand";

export type UserRole = "client" | "admin" | "lawyer";
export interface User { id: string; name: string; email: string; role: UserRole; }
export interface CaseRequest {
  id: string; userId: string; userName: string; service: string;
  status: "Submitted" | "In Progress" | "Verification Ongoing" | "Completed";
  createdAt: string; updatedAt: string;
  details: { fullName: string; passportNumber: string; nationality: string; emiratesId?: string; phone: string; email: string; notes?: string; };
  assignedLawyer?: string; reportUrl?: string; amount: number;
}
export interface Message { id: string; caseId: string; from: string; fromRole: UserRole | "system"; text: string; timestamp: string; read: boolean; }
interface AppState {
  currentUser: User | null; cases: CaseRequest[]; messages: Message[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addCase: (req: Omit<CaseRequest, "id" | "createdAt" | "updatedAt" | "status">) => string;
  updateCaseStatus: (id: string, status: CaseRequest["status"]) => void;
  addMessage: (msg: Omit<Message, "id" | "timestamp" | "read">) => void;
  markMessagesRead: (caseId: string) => void;
}
const MOCK_USERS: (User & { password: string })[] = [
  { id: "u1", name: "Ahmed Al-Rashidi", email: "client@demo.com", password: "demo123", role: "client" },
  { id: "u2", name: "Admin User", email: "admin@demo.com", password: "admin123", role: "admin" },
  { id: "u3", name: "Sara Khalil", email: "lawyer@demo.com", password: "lawyer123", role: "lawyer" },
];
const INITIAL_CASES: CaseRequest[] = [
  { id: "cs001", userId: "u1", userName: "Ahmed Al-Rashidi", service: "Travel Ban Check", status: "Completed", createdAt: "2026-04-01", updatedAt: "2026-04-05", details: { fullName: "Ahmed Al-Rashidi", passportNumber: "AE1234567", nationality: "Jordanian", phone: "+971-50-1234567", email: "client@demo.com" }, assignedLawyer: "Sara Khalil", reportUrl: "#", amount: 299 },
  { id: "cs002", userId: "u1", userName: "Ahmed Al-Rashidi", service: "Police Case Check", status: "In Progress", createdAt: "2026-04-10", updatedAt: "2026-04-12", details: { fullName: "Ahmed Al-Rashidi", passportNumber: "AE1234567", nationality: "Jordanian", phone: "+971-50-1234567", email: "client@demo.com" }, amount: 349 },
  { id: "cs003", userId: "u4", userName: "Priya Nair", service: "Background Check", status: "Verification Ongoing", createdAt: "2026-04-08", updatedAt: "2026-04-13", details: { fullName: "Priya Nair", passportNumber: "IN8877665", nationality: "Indian", phone: "+91-9876543210", email: "priya@example.com" }, amount: 499 },
  { id: "cs004", userId: "u5", userName: "James Osei", service: "Court Case Check", status: "Submitted", createdAt: "2026-04-14", updatedAt: "2026-04-14", details: { fullName: "James Osei", passportNumber: "GH5544332", nationality: "Ghanaian", phone: "+233-200-112233", email: "james@example.com" }, amount: 399 },
];
const INITIAL_MESSAGES: Message[] = [
  { id: "m1", caseId: "cs002", from: "Legal Team", fromRole: "system", text: "Your case has been received. Our team will begin verification within 24 hours.", timestamp: "2026-04-10T09:00:00Z", read: true },
  { id: "m2", caseId: "cs002", from: "Sara Khalil", fromRole: "lawyer", text: "Hi Ahmed, I'm handling your police case check. Could you confirm which emirate you worked in?", timestamp: "2026-04-11T14:30:00Z", read: false },
];
export const useStore = create<AppState>((set) => ({
  currentUser: null, cases: INITIAL_CASES, messages: INITIAL_MESSAGES,
  login: (email, password) => {
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (user) { const { password: _, ...userData } = user; set({ currentUser: userData }); return true; }
    return false;
  },
  logout: () => set({ currentUser: null }),
  addCase: (req) => {
    const id = `cs${Date.now()}`;
    const newCase: CaseRequest = { ...req, id, status: "Submitted", createdAt: new Date().toISOString().split("T")[0], updatedAt: new Date().toISOString().split("T")[0] };
    set((s) => ({ cases: [newCase, ...s.cases] }));
    set((s) => ({ messages: [...s.messages, { id: `m${Date.now()}`, caseId: id, from: "Legal Team", fromRole: "system" as const, text: "Your request has been received. Our team will review and begin processing within 24 hours.", timestamp: new Date().toISOString(), read: false }] }));
    return id;
  },
  updateCaseStatus: (id, status) => set((s) => ({ cases: s.cases.map((c) => c.id === id ? { ...c, status, updatedAt: new Date().toISOString().split("T")[0] } : c) })),
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, { ...msg, id: `m${Date.now()}`, timestamp: new Date().toISOString(), read: false }] })),
  markMessagesRead: (caseId) => set((s) => ({ messages: s.messages.map((m) => m.caseId === caseId ? { ...m, read: true } : m) })),
}));
