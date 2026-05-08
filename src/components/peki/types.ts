export type Rule = {
  id: string;
  anyOf: string[]; // OR — pogađa ako BILO KOJA od ovih postoji u inputu
  allOf: string[]; // AND — SVE od ovih moraju biti prisutne (opcionalno)
  responses: string[];
  responseMode: "random" | "sequence";
  sequenceIndex: number;
  enabled: boolean;
};

export type MatchResult = {
  ruleId: string | null;
  response: string | null;
};
