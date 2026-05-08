import type { Rule, MatchResult } from "./types";

export function match(input: string, rules: Rule[]): MatchResult {
  const p = input.toLowerCase();
  for (const rule of rules) {
    if (!rule.enabled) continue;
    const activeAnyOf = rule.anyOf.filter((k) => k.trim());
    if (!activeAnyOf.length) continue;
    // OR: bar jedna anyOf mora biti prisutna
    if (!activeAnyOf.some((k) => p.includes(k.toLowerCase()))) continue;
    // AND: sve allOf moraju biti prisutne
    const activeAllOf = rule.allOf.filter((k) => k.trim());
    if (
      activeAllOf.length &&
      !activeAllOf.every((k) => p.includes(k.toLowerCase()))
    )
      continue;
    const responses = rule.responses.filter((r) => r.trim());
    if (!responses.length) continue;
    const response =
      rule.responseMode === "sequence"
        ? responses[rule.sequenceIndex % responses.length]
        : responses[Math.floor(Math.random() * responses.length)];
    return { ruleId: rule.id, response };
  }
  return { ruleId: null, response: "Ne razumem. Pokusaj nesto drugo!" };
}

export function advanceSequence(rules: Rule[], matchedId: string): Rule[] {
  return rules.map((r) =>
    r.id === matchedId && r.responseMode === "sequence"
      ? { ...r, sequenceIndex: r.sequenceIndex + 1 }
      : r,
  );
}

const r = (
  anyOf: string[],
  responses: string[],
  opts?: {
    allOf?: string[];
    responseMode?: "random" | "sequence";
  },
): Omit<Rule, "id"> => ({
  anyOf,
  allOf: opts?.allOf ?? [],
  responses,
  responseMode: opts?.responseMode ?? "random",
  sequenceIndex: 0,
  enabled: true,
});

export const DEFAULT_RULES: Rule[] = [
  {
    id: "1",
    ...r(["zdravo", "cao", "hej"], ["Zdravo!", "Cao!", "Hej, sta ima?"]),
  },
  {
    id: "2",
    ...r(["kako si"], ["Super, hvala!", "Odlicno, a ti?", "Nekako..."]),
  },
  { id: "3", ...r(["zoves"], ["Kako se zoves?"], { allOf: ["kako"] }) },
  { id: "4", ...r(["hvala"], ["Nema na cemu!", "Uvek!", "Molim :)"]) },
];

export const PEKI_PRESET: Rule[] = [
  // Pozdrav — OR logika, random
  {
    id: "k1",
    ...r(
      ["zdravo", "cao", "hej", "ej"],
      [
        "Cao! Ja sam Peki — digitalni potomak legendarnog Pecka!",
        "Hej! Sta ima novo?",
        "Zdravo! Spreman za razgovor.",
      ],
    ),
  },
  // Kako si — AND: mora biti i "kako" i "si"
  {
    id: "k2",
    ...r(
      ["si"],
      [
        "Super sam! A ti?",
        "Odlicno, hvala sto pitas.",
        "Ko zna... egzistencijalna kriza je normalna za bot moje generacije.",
      ],
      { allOf: ["kako"] },
    ),
  },
  // Ime — AND: kako + zoves
  {
    id: "k3",
    ...r(
      ["zoves"],
      ["Zovem se Peki! Naslednik Pecka, ali s boljim WiFi-jem."],
      { allOf: ["kako"] },
    ),
  },
  // AI tema
  {
    id: "k4",
    ...r(
      ["ai", "vestacka", "chatgpt", "gpt", "claude", "llm"],
      [
        "AI? Ja sam starija skola — nikakvi neuroni, samo cisti IF-ELSE!",
        "ChatGPT ima milijarde parametara. Ja imam 10-ak pravila. I dalje funkcionisem.",
        "Znas sta je razlika izmedju mene i ChatGPT-a? Ja cu ti reci tacno zasto nesto ne znam.",
      ],
    ),
  },
  // Programiranje
  {
    id: "k5",
    ...r(
      ["kod", "programir", "coding", "developer", "javascript", "python"],
      [
        "Programiranje je lepo! Moj tvorac me je napravio u TypeScriptu. Ironicno.",
        "Znas li da sam ja i sam program? Svaki put kad me pitas nesto, izvrsava se kod.",
        "Debug je 90% posla. Ostatak je Stack Overflow.",
      ],
    ),
  },
  // Hvala
  {
    id: "k6",
    ...r(
      ["hvala", "thanks", "thank"],
      ["Nema na cemu!", "Uvek!", "E, to mi drago!"],
    ),
  },
  // Dovidjenja — sequence (svaki put drugaci oprost)
  {
    id: "k7",
    ...r(
      ["dovidjenja", "pa", "ciao", "bye", "odlazim"],
      [
        "Dovidjenja! Vrati se uskoro.",
        "Pa! Bilo je lepo.",
        "Ciao! Pazi se.",
        "Zbogom! Peki ce te cekati.",
      ],
      { responseMode: "sequence" },
    ),
  },
  // Vreme/dan
  {
    id: "k8",
    ...r(
      ["vreme", "danas", "sutra"],
      [
        "Nemam prozor, ali pretpostavljam da je lepo.",
        "Za vreme pitaj nekog ko ima senzore. Ja sam samo tekst.",
        "Svaki dan je dobar dan kada imas stabilnu internet konekciju.",
      ],
    ),
  },
  // Pecko referenca
  {
    id: "k9",
    ...r(
      ["pecko", "pecka", "pisko"],
      [
        "Pecko mi je mentor! Legenda YU interneta iz 1999. Ja sam njegova 2026. iteracija.",
        "Pisko, Pecko, Peki — tradicija ide dalje!",
      ],
    ),
  },
  // Ne razumem — ostaje poslednje
  {
    id: "k10",
    ...r(
      ["?"],
      [
        "Dobro pitanje! Nemas pojma koliko me to veseli kada pitaju nesto sto ne znam.",
        "Hmm... to nije u mom recniku. Pokusaj nesto drugo.",
        "Ej, ja sam samo keyword bot. Ne ocekuj cuda.",
      ],
      { responseMode: "sequence" },
    ),
  },
];
