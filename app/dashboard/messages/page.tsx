"use client";
import { useState, useRef, useEffect } from "react";
import { useStore } from "@/lib/store";
import { Send, MessageSquare } from "lucide-react";

function ShieldIcon({ size, style }: { size: number; style?: React.CSSProperties }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>);
}

export default function MessagesPage() {
  const { currentUser, cases, messages, addMessage, markMessagesRead } = useStore();
  const myCases = cases.filter((c) => c.userId === currentUser?.id);
  const [selectedCase, setSelectedCase] = useState(myCases[0]?.id || "");
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const caseMessages = messages.filter((m) => m.caseId === selectedCase);
  const selectedCaseData = myCases.find((c) => c.id === selectedCase);

  useEffect(() => { if (selectedCase) markMessagesRead(selectedCase); }, [selectedCase]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [caseMessages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !selectedCase || !currentUser) return;
    addMessage({ caseId: selectedCase, from: currentUser.name, fromRole: "client", text: text.trim() });
    setText("");
  };

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) + " · " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  };

  if (myCases.length === 0) return (<div className="p-8 flex items-center justify-center h-full"><div className="text-center"><MessageSquare size={48} className="mx-auto mb-4 text-gray-200" /><p className="text-sm text-gray-400">Submit a request to start chatting with the legal team.</p></div></div>);

  return (
    <div className="flex h-screen max-h-[calc(100vh-0px)] overflow-hidden">
      <div className="w-72 border-r border-gray-100 bg-white flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-100"><h1 className="font-bold text-lg" style={{ color: "var(--navy)" }}>Messages</h1></div>
        <div className="flex-1 overflow-y-auto">
          {myCases.map((c) => {
            const unread = messages.filter((m) => m.caseId === c.id && !m.read).length;
            const lastMsg = messages.filter((m) => m.caseId === c.id).slice(-1)[0];
            return (
              <button key={c.id} onClick={() => setSelectedCase(c.id)} className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-50" style={{ backgroundColor: selectedCase===c.id ? "rgba(10,22,40,0.04)" : undefined }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--navy)" }}><ShieldIcon size={16} style={{ color: "var(--gold)" }} /></div>
                  <div className="flex-1 min-w-0"><p className="font-semibold text-sm truncate" style={{ color: "var(--navy)" }}>{c.service}</p><p className="text-xs text-gray-400 truncate">{lastMsg?.text || "No messages yet"}</p></div>
                  {unread > 0 && <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold shrink-0" style={{ backgroundColor: "var(--red)", color: "white" }}>{unread}</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--navy)" }}><ShieldIcon size={16} style={{ color: "var(--gold)" }} /></div>
            <div><p className="font-bold text-sm" style={{ color: "var(--navy)" }}>{selectedCaseData?.service || "Select a case"}</p><p className="text-xs text-gray-400">Legal Team · Case #{selectedCase}</p></div>
            <div className="ml-auto flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500" /><span className="text-xs text-gray-400">Online</span></div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {caseMessages.length === 0 && (<div className="text-center py-10"><MessageSquare size={32} className="mx-auto mb-2 text-gray-300" /><p className="text-sm text-gray-400">No messages yet. Send a message to start.</p></div>)}
          {caseMessages.map((msg) => {
            const isMe = msg.fromRole === "client";
            const isSystem = msg.fromRole === "system";
            if (isSystem) return (<div key={msg.id} className="flex justify-center"><div className="px-4 py-2 rounded-full text-xs bg-gray-100 text-gray-500">{msg.text}</div></div>);
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                {!isMe && <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 shrink-0 text-xs font-bold" style={{ backgroundColor: "var(--navy)", color: "var(--gold)" }}>{msg.from[0]}</div>}
                <div className="max-w-xs lg:max-w-md">
                  {!isMe && <p className="text-xs text-gray-400 mb-1">{msg.from}</p>}
                  <div className="px-4 py-2.5 rounded-2xl text-sm" style={{ backgroundColor: isMe ? "var(--navy)" : "var(--gray-100)", color: isMe ? "white" : "var(--gray-800)", borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px" }}>{msg.text}</div>
                  <p className="text-xs text-gray-400 mt-1" style={{ textAlign: isMe ? "right" : "left" }}>{formatTime(msg.timestamp)}</p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={handleSend} className="p-4 border-t border-gray-100">
          <div className="flex gap-3">
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm" placeholder="Type your message..." />
            <button type="submit" disabled={!text.trim()} className="w-12 h-12 rounded-xl flex items-center justify-center disabled:opacity-40" style={{ backgroundColor: "var(--navy)", color: "white" }}><Send size={18} /></button>
          </div>
        </form>
      </div>
    </div>
  );
}
