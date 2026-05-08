"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Rule } from "./types";

type Props = {
  rule: Rule;
  isActive: boolean;
  onChange: (rule: Rule) => void;
  onDelete: () => void;
};

export function RuleCard({ rule, isActive, onChange, onDelete }: Props) {
  const [expanded, setExpanded] = useState(true);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: rule.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  const updateAnyOf = (i: number, val: string) => {
    const anyOf = [...rule.anyOf];
    anyOf[i] = val;
    onChange({ ...rule, anyOf });
  };
  const addAnyOf = () => onChange({ ...rule, anyOf: [...rule.anyOf, ""] });
  const removeAnyOf = (i: number) =>
    onChange({ ...rule, anyOf: rule.anyOf.filter((_, idx) => idx !== i) });

  const updateAllOf = (i: number, val: string) => {
    const allOf = [...rule.allOf];
    allOf[i] = val;
    onChange({ ...rule, allOf });
  };
  const addAllOf = () => onChange({ ...rule, allOf: [...rule.allOf, ""] });
  const removeAllOf = (i: number) =>
    onChange({ ...rule, allOf: rule.allOf.filter((_, idx) => idx !== i) });

  const updateResponse = (i: number, val: string) => {
    const responses = [...rule.responses];
    responses[i] = val;
    onChange({ ...rule, responses });
  };
  const addResponse = () =>
    onChange({ ...rule, responses: [...rule.responses, ""] });
  const removeResponse = (i: number) =>
    onChange({
      ...rule,
      responses: rule.responses.filter((_, idx) => idx !== i),
    });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-lg border bg-card text-card-foreground transition-all",
        isDragging && "opacity-50 shadow-2xl",
        isActive && "ring-2 ring-primary border-primary",
        !rule.enabled && "opacity-50",
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {isActive && (
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
        )}

        {/* Keyword preview in header */}
        <div className="flex-1 flex flex-wrap gap-1 min-w-0">
          {rule.anyOf.filter((k) => k.trim()).length > 0 ? (
            rule.anyOf
              .filter((k) => k.trim())
              .map((k, i) => (
                <span
                  key={i}
                  className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-foreground"
                >
                  {k}
                </span>
              ))
          ) : (
            <span className="text-xs text-muted-foreground/50 font-mono">
              bez ključne reči...
            </span>
          )}
          {rule.allOf
            .filter((k) => k.trim())
            .map((k, i) => (
              <span
                key={i}
                className="text-xs font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20"
              >
                +{k}
              </span>
            ))}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onChange({ ...rule, enabled: !rule.enabled })}
            className={cn(
              "text-xs px-2 py-0.5 rounded-full border transition-colors",
              rule.enabled
                ? "border-primary/40 text-primary bg-primary/10"
                : "border-border text-muted-foreground",
            )}
          >
            {rule.enabled ? "on" : "off"}
          </button>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-muted-foreground hover:text-foreground p-1"
          >
            {expanded ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            onClick={onDelete}
            className="text-muted-foreground hover:text-destructive p-1 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-3 pb-3 space-y-3 border-t pt-3">
          {/* anyOf keywords */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">BILO KOJA</span> od
              ovih reči mora biti u poruci
            </p>
            {rule.anyOf.map((k, i) => (
              <div key={i} className="flex gap-1.5 items-center">
                <input
                  value={k}
                  onChange={(e) => updateAnyOf(i, e.target.value)}
                  placeholder="ključna reč..."
                  className="flex-1 text-sm font-mono bg-muted/50 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/40"
                />
                {rule.anyOf.length > 1 && (
                  <button
                    onClick={() => removeAnyOf(i)}
                    className="text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addAnyOf}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Plus className="h-3 w-3" /> dodaj OR reč
            </button>
          </div>

          {/* allOf keywords */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">SVE</span> ove reči
              moraju biti u poruci{" "}
              <span className="opacity-60">(AND — opcionalno)</span>
            </p>
            {rule.allOf.map((k, i) => (
              <div key={i} className="flex gap-1.5 items-center">
                <input
                  value={k}
                  onChange={(e) => updateAllOf(i, e.target.value)}
                  placeholder="obavezna reč..."
                  className="flex-1 text-sm font-mono bg-primary/5 border border-primary/20 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/40"
                />
                <button
                  onClick={() => removeAllOf(i)}
                  className="text-muted-foreground hover:text-destructive shrink-0"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <button
              onClick={addAllOf}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Plus className="h-3 w-3" /> dodaj AND uslov
            </button>
          </div>

          {/* Responses */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Odgovori</p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    onChange({
                      ...rule,
                      responseMode: "random",
                      sequenceIndex: 0,
                    })
                  }
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-l border transition-colors",
                    rule.responseMode === "random"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:bg-muted/50",
                  )}
                >
                  nasumično
                </button>
                <button
                  onClick={() =>
                    onChange({
                      ...rule,
                      responseMode: "sequence",
                      sequenceIndex: 0,
                    })
                  }
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-r border-y border-r transition-colors",
                    rule.responseMode === "sequence"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:bg-muted/50",
                  )}
                >
                  po redu
                </button>
              </div>
            </div>

            {rule.responseMode === "sequence" && (
              <p className="text-xs text-muted-foreground/60 italic">
                Svaki put kad se pogodi, daje sledeći odgovor po redu.
              </p>
            )}

            {rule.responses.map((r, i) => (
              <div key={i} className="flex gap-1.5 items-center">
                <span
                  className={cn(
                    "text-xs font-mono w-4 shrink-0",
                    rule.responseMode === "sequence" &&
                      i ===
                        rule.sequenceIndex %
                          Math.max(
                            rule.responses.filter((x) => x.trim()).length,
                            1,
                          )
                      ? "text-primary font-bold"
                      : "text-muted-foreground",
                  )}
                >
                  {rule.responseMode === "sequence" ? `${i + 1}.` : "→"}
                </span>
                <input
                  value={r}
                  onChange={(e) => updateResponse(i, e.target.value)}
                  placeholder="odgovor..."
                  className="flex-1 text-sm bg-muted/50 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/40"
                />
                {rule.responses.length > 1 && (
                  <button
                    onClick={() => removeResponse(i)}
                    className="text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addResponse}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Plus className="h-3 w-3" /> dodaj odgovor
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
