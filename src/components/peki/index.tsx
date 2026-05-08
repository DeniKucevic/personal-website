"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Plus, RotateCcw, Bot, Download, Upload } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { nanoid } from "./nanoid";
import { RuleCard } from "./rule-card";
import { BuilderChat } from "./builder-chat";
import { DEFAULT_RULES, PEKI_PRESET, advanceSequence } from "./engine";
import type { Rule } from "./types";

const LS_KEY = "peki-builder-v1";
type SavedState = { botName: string; rules: Rule[] };

function loadInitial(): SavedState {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
  }
  return { botName: "Moj bot", rules: DEFAULT_RULES };
}

export function PeckoBuilder() {
  const [rules, setRules] = useState<Rule[]>(() => loadInitial().rules);
  const [botName, setBotName] = useState<string>(() => loadInitial().botName);
  const [activeRuleId, setActiveRuleId] = useState<string | null>(null);
  const importRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ botName, rules }));
    } catch {}
  }, [botName, rules]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setRules((prev) => {
        const oldIndex = prev.findIndex((r) => r.id === active.id);
        const newIndex = prev.findIndex((r) => r.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const addRule = () =>
    setRules((prev) => [
      ...prev,
      {
        id: nanoid(),
        anyOf: [""],
        allOf: [],
        responses: [""],
        responseMode: "random",
        sequenceIndex: 0,
        enabled: true,
      },
    ]);

  const updateRule = useCallback(
    (id: string, updated: Rule) =>
      setRules((prev) => prev.map((r) => (r.id === id ? updated : r))),
    [],
  );

  const deleteRule = useCallback(
    (id: string) => setRules((prev) => prev.filter((r) => r.id !== id)),
    [],
  );

  const handleMatch = useCallback((ruleId: string | null) => {
    setActiveRuleId(ruleId);
    if (ruleId) setTimeout(() => setActiveRuleId(null), 2000);
  }, []);

  const handleAdvanceSequence = useCallback(
    (ruleId: string) => setRules((prev) => advanceSequence(prev, ruleId)),
    [],
  );

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ botName, rules }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${botName.toLowerCase().replace(/\s+/g, "-")}-bot.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string) as SavedState;
        if (data.rules && data.botName) {
          setRules(
            data.rules.map((r: Rule) => ({
              ...r,
              id: nanoid(),
              sequenceIndex: 0,
            })),
          );
          setBotName(data.botName);
        }
      } catch {}
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Ime bota:</label>
          <input
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            className="bg-muted/50 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-1 focus:ring-primary/50 w-36"
          />
        </div>

        <div className="ml-auto flex gap-2 flex-wrap">
          <button
            onClick={() => {
              setRules(
                PEKI_PRESET.map((r) => ({
                  ...r,
                  id: nanoid(),
                  sequenceIndex: 0,
                })),
              );
              setBotName("Peki");
            }}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border hover:bg-muted/50"
          >
            <Bot className="h-3.5 w-3.5" /> Preset: PEKI
          </button>

          <button
            onClick={() => {
              setRules(DEFAULT_RULES);
              setBotName("Moj bot");
            }}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border hover:bg-muted/50"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>

          <input
            ref={importRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
          />
          <button
            onClick={() => importRef.current?.click()}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border hover:bg-muted/50"
          >
            <Upload className="h-3.5 w-3.5" /> Import
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border hover:bg-muted/50"
          >
            <Download className="h-3.5 w-3.5" /> Export
          </button>

          <button
            onClick={addRule}
            className="flex items-center gap-1.5 text-sm bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="h-3.5 w-3.5" /> Novo pravilo
          </button>
        </div>
      </div>

      {/* Explainer */}
      <div className="rounded-lg bg-muted/40 border px-4 py-3 text-sm text-muted-foreground">
        <strong className="text-foreground">Kako radi:</strong> Bot prolazi kroz
        pravila <strong className="text-foreground">odozgo nadole</strong>. Čim
        nađe ključnu reč u poruci — staje i daje odgovor.{" "}
        <strong className="text-foreground">Redosled je važan!</strong> Prevuci
        pravila da promeniš prioritet. Bot se automatski čuva u browseru.
        Exportuj i podeli JSON fajl da drugi učitaju tvog bota.
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Pravila — {rules.length} ukupno
            </p>
            <p className="text-xs text-muted-foreground">
              ← prevuci za redosled
            </p>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={rules.map((r) => r.id)}
              strategy={verticalListSortingStrategy}
            >
              {rules.map((rule) => (
                <RuleCard
                  key={rule.id}
                  rule={rule}
                  isActive={rule.id === activeRuleId}
                  onChange={(updated) => updateRule(rule.id, updated)}
                  onDelete={() => deleteRule(rule.id)}
                />
              ))}
            </SortableContext>
          </DndContext>

          {rules.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm border rounded-lg border-dashed">
              Nema pravila. Dodaj prvo pravilo ili učitaj PEKI preset.
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-4 h-[32rem]">
          <BuilderChat
            rules={rules}
            botName={botName}
            onMatch={handleMatch}
            onAdvanceSequence={handleAdvanceSequence}
          />
        </div>
      </div>
    </div>
  );
}
