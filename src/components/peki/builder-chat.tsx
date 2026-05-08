"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { match } from "./engine";
import type { Rule, MatchResult } from "./types";

type Message = {
  from: "user" | "bot";
  text: string;
  matchResult?: MatchResult;
};

type Props = {
  rules: Rule[];
  botName: string;
  onMatch: (ruleId: string | null) => void;
  onAdvanceSequence: (ruleId: string) => void;
};

export function BuilderChat({
  rules,
  botName,
  onMatch,
  onAdvanceSequence,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: `Zdravo! Ja sam ${botName}. Pitaj me nesto!` },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages([
      { from: "bot", text: `Zdravo! Ja sam ${botName}. Pitaj me nesto!` },
    ]);
  }, [botName]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");

    const result = match(trimmed, rules);
    onMatch(result.ruleId);
    if (result.ruleId) onAdvanceSequence(result.ruleId);

    setMessages((prev) => [
      ...prev,
      { from: "user", text: trimmed },
      { from: "bot", text: result.response ?? "...", matchResult: result },
    ]);

    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className="flex flex-col h-full rounded-lg border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b bg-muted/40 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        <span className="font-mono text-sm font-medium">{botName}</span>
        <span className="text-xs text-muted-foreground ml-auto">
          {rules.filter((r) => r.enabled).length} pravila aktivno
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex",
              msg.from === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm",
                msg.from === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted text-foreground rounded-bl-sm",
              )}
            >
              {msg.text}
              {msg.matchResult && (
                <div className="text-[10px] opacity-40 mt-0.5 font-mono">
                  {msg.matchResult.ruleId ? "✓ match" : "✗ no match"}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 p-3 border-t">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="ukucaj nesto..."
          autoFocus
          className="flex-1 bg-muted/50 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/50"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 transition-opacity"
        >
          Pošalji
        </button>
      </div>
    </div>
  );
}
