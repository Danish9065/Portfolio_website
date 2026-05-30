import { Bot, Send, X } from "lucide-react";
import { useState } from "react";
import { sendChatMessage } from "../api/chat";
import { trackEvent } from "../lib/events";

type Message = { role: "user" | "assistant"; text: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: "Ask me about projects, services, skills, or how to contact the portfolio owner." }]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((current) => [...current, { role: "user", text }]);
    setLoading(true);
    try {
      const response = await sendChatMessage(text, sessionId);
      setSessionId(response.session_id);
      setMessages((current) => [...current, { role: "assistant", text: response.message }]);
    } catch (error) {
      setMessages((current) => [...current, { role: "assistant", text: error instanceof Error ? error.message : "Chat failed." }]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        className="fixed bottom-5 right-5 z-40 rounded-full bg-accent p-4 text-ink shadow-glow"
        aria-label="Open AI assistant"
        onClick={() => { setOpen(true); trackEvent("chat_opened"); }}
      >
        <Bot />
      </button>
    );
  }

  return (
    <aside className="fixed bottom-5 right-5 z-40 flex h-[520px] max-h-[calc(100vh-40px)] w-[min(380px,calc(100vw-32px))] flex-col rounded-lg border border-line bg-ink shadow-2xl">
      <header className="flex items-center justify-between border-b border-line p-4">
        <div>
          <p className="font-semibold text-white">Portfolio assistant</p>
          <p className="text-xs text-muted">Ask about projects, services, and skills</p>
        </div>
        <button aria-label="Close chat" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
      </header>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`rounded-md p-3 text-sm leading-6 ${message.role === "user" ? "ml-8 bg-accent text-ink" : "mr-8 bg-panel text-mist"}`}>{message.text}</div>
        ))}
        {loading ? <p className="text-sm text-muted">Thinking...</p> : null}
      </div>
      <div className="flex gap-2 border-t border-line p-3">
        <input className="min-w-0 flex-1 rounded-md border border-line bg-panel px-3 py-2 text-sm" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void send(); }} placeholder="Ask a question" />
        <button className="rounded-md bg-accent p-2 text-ink" aria-label="Send" onClick={() => void send()}><Send className="h-5 w-5" /></button>
      </div>
    </aside>
  );
}
