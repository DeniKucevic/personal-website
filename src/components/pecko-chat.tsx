"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// PECKO 1.2F — rekonstrukcija logike iz originalnog DOS izvrsnog fajla
// Autor originala: Predrag Damnjanovic - Peca (~1999-2001, PowerBASIC)
// ---------------------------------------------------------------------------

type Message = { from: "pecko" | "user"; text: string };

// --- Odgovori po kategorijama ---
const R = {
  lozinka: [
    "Istina je tu negde. Budi uporan. Ako budes dovoljno uporan, recicu ti gde se krije lozinka - obecavam !",
    "Znas kako, vidim da si uporan, ali mora jos malo - sorry !",
    "Bravo, ti si stvarno uporan. Ok, The truth is out there!",
    "Pa ti si najuporniji covek koga sam video. Jos samo malo, veruj mi. Evo da ti pomognem, lozinka se ne krije u ovom programu.",
    "Evo ruke, pobedio si. Lozinka se krije na Internetu :))) - sve sam ti rekao, a? Epa, ako mucnes malo glavu ukapiraces gde bi tacno mogla da bude.",
    "Rekao sam ti, lozinka se krije na Internetu. Pronadji njegov homepage pa tu trazi. Ime programa ima 3 slova a prvo je I. Snadji se.",
    "Epa ne mogu vise da ti pomazem. Ovde je kraj.",
  ],
  koliko_godina: [
    "Pa izracunaj : rodjen sam 21.03.1999. a danas je taj i taj datum. Oduzmi gi i dobices koliko imam godina.",
    "Malo.",
    "Toliko koliko te ja volim.",
    "Ovoliko.",
    "Mnogo.",
    "Vrlo malo.",
    "Beskonacno mlogo.",
  ],
  kada_rodjen: [
    "Rodjen sam 21.03.1999. godine.",
    "Prekjuce.",
    "Malo sutra.",
    "Kad na vrbi rodi lojze.",
    "Sutra uvece.",
    "Juce.",
    "U Petak.",
    "Marta.",
    "Za 20 godina.",
  ],
  zasta: ["Za gazdinu curicu.", "Za moju ribu - Pamelu Anderson."],
  navija: [
    "Za Radnicki Nis",
    "Za budale.",
    "Za tebe.",
    "Za mene",
    "Za gazdu.",
    "Za Pamelu.",
    "Za onog iz Donju Dubravu.",
    "Za Sindi Kraford.",
    "Za Jelenu Karausu !!!",
  ],
  odakle: [
    "Od budale i zbunjene.",
    "Od tebe.",
    "Od gazde.",
    "Od Pamele.",
    "Od onog iz Donju Dubravu.",
    "Od Sindi Kraford.",
    "Od Jelene Karause !!!",
  ],
  kakav: ["Lep.", "Ruzan!", "Lakiran.", "Izgreban.", "Izumban.", "Izbusen."],
  peva: [
    "Pa svi pevaju pa cak i ja. Da vidis samo kad pocnem 'Jecam zela, kosovka devoooojkaaaaaa...'. A, sta kazes?????",
    "Pa svi pevaju i sviraju. Da vidis samo kad pocnem 'Mirno spavaj nano, sve je otvoreno...'. A, sta kazes?????",
  ],
  misli: [
    "Pa misli nekako, kuva se nesto u glavi",
    "Sta te briga, to je moje misljenje. I ja imam pravo da mislim",
    "Nista ja ne mislim, ti imas mozak pa misli.",
  ],
  prica: [
    "Prica, prica, tra la la la la...",
    "Pa samo pricalica moze to da prica",
  ],
  voli: ["Moje srce se pukne koliko voli !", "Sve voli, pa cak i tebe!!"],
  bije: [
    "Dinge, dinge u glavu i ubijes stoku.",
    "Najboje se bije sa motku. Dinge, dinge u glavu...",
    "Pa ja bijem i to sa motku. Dinge, dinge u glavu...",
  ],
  spava: ["Uuu, po celu noc hrcem, hrk hrk...", "Spava se svima"],
  gleda: [
    "Jedva zivo, pitam se, da li se vidi nesto?",
    "Tebe gledam.",
    "Ja gledam.",
  ],
  pije: [
    "Pijan sam, oh, ne mogu ti reci nista. Iskljuci me.",
    "Ah, ja pijem samo struju, za drugog me boli uvce",
  ],
  jede: [
    "Jebem li ga, guta nesto, benzin mozda.",
    "Uh, prorade mi cir - idem da jedem, ne mogu sad da pricam.",
  ],
  rekao: [
    "Nista nisam rekao, nastavi da pricas",
    "Ja nisam nista. Ja sam samo glupi program. Gazda kaze da sam genije.",
    "nista bre, ne brini se",
  ],
  radi: [
    "Pricam s' tebe i cekam tvoju zapovest.",
    "Niko ne radi, samo ja ovdi rintam.",
  ],
  ko_je: [
    "Ona svilena buba iz Svilajnac",
    "Samo ti - ostali svet je kurtulan.",
    "Ovi sto me prate - pun sam sa prisluskivaci !",
    "Pamela Anderson! Svaki dan se ...",
    "Pa samo pricalica moze to da prica",
  ],
  gde: [
    "Moj gazda zivi u Nis, pored Nisku Banju - cist Nislija",
    "Levo",
    "Tamo daleko...",
    "Negde...",
    "Svuda.",
    "Nigde - to ne postoji.",
    "U Nisu - Nis je centar sveta. U Nisu ima sve !",
    "Iza 7 brda i iza 7 mora...",
    "Tu blizu.",
  ],
  zasto: [
    "Neznam zasto.",
    "Zato i zato i ne pitaj vise to.",
    "Razlog mi je nepoznat.",
    "Zato sto je mrav polomio nogicu.",
    "Zato sto ja tako kazem i tako ima da bidne.",
    "Zbog sira i oprostajne muzike. Tuu, tuuu, TUTUUUU, NANANA NAAAAAAAA!",
    "Zbog mene - ja sam dezurni krivac.",
    "Zato sto mi je cvecka na levu stranu.",
  ],
  cega: [
    "Od tebe!",
    "Od mene.",
    "Od nikoga.",
    "Od svih zivih.",
    "Od svalerke.",
    "Od zene.",
  ],
  koga: [
    "Samo tebe volim!",
    "Pa tebe gledam!",
    "Tebe!",
    "Mene.",
    "Nikoga.",
    "Sve zive.",
    "Sve ljude ovog predivnog sveta.",
    "Po nekoga.",
  ],
  koji: [
    "Moji.",
    "Tvoji!",
    "Njihovi !!",
    "Gazdini.",
    "Pamelini !!",
    "Epa necu da ti odgovorim koji ! Idi kod psihijatra pa nek ti on odgovori.",
  ],
  koja: [
    "Moja.",
    "Tvoja!",
    "Njihova !!",
    "Gazdina.",
    "Pamelina !!",
    "Uh, uvati me gorusica, ne mogu sad da pricam.",
  ],
  koje: [
    "Moje.",
    "Tvoje!",
    "Njihove !!",
    "Gazdine.",
    "Pameline !!",
    "Slusaj, nisam ja toliko pametan da bi odgovorio na takvo glupo pitanje!",
  ],
  koju: [
    "Moju.",
    "Pamelinu !!  :))) Trrrrrrrrrrrt milojke ;)))",
    "Njihovu !!",
    "Gazdinu.",
    "Tvoju!",
    "Sta te bre briga! Ja cu svoju a ti uzmi tvoju!",
  ],
  koj: [
    "Moj.",
    "Tvoj!",
    "Njihov !!",
    "Gazdin.",
    "Pamelin !!",
    "Uh, prorade mi cir - idem da jedem, ne mogu sad da pricam.",
  ],
  da_ne: [
    "Hocu - daj odmah !",
    "Volim i to mnogo !",
    "Maybe baby !",
    "Da bre.",
    "Ne bre.",
    "Mozda - nisam siguran pa ne bih da te lazem :(((",
    "Mozda!",
    "Da bre - 100% sam siguran",
    "Pa da !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    "Pa ne bre.",
  ],
  nije_razumeo: [
    "Avavavavavav, ljut sam sto me ne pitas nesto ! Pitaj me bre nesto iz sporta !",
    "Grrrrrr, grrrrr, naljuticu se jer mi govoris nesto a ja te ne razumem. Pitaj me bre nesto za muziku !",
    "Dosta bre vise. Nemoj vise da mi pricas. Pitaj me bre nesto iz istorije !",
    "Jer mi se to cini ili ti to pokusavas da me zbunis? Pitaj me bre nesto iz geografije !",
    "Sta pricas bre?? Ne razumem te. Ja znam samo da odgovaram na pitanja !",
  ],
};

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const has = (s: string, q: string) => s.includes(q);

const UVREDLJIVE = [
  "govn",
  "peder",
  "stok",
  "svinj",
  "kurac",
  " mi ga ",
  "pick",
  "pusi",
  "sperm",
  "porn",
  "erot",
  "kara",
  "seks",
  "sisa",
  "sise",
  "sisu",
  "sisk",
  "siso",
];

const INTRO: Message[] = [
  { from: "pecko", text: "PECKO — rekonstrukcija" },
  {
    from: "pecko",
    text: "Cao ! Ja sam Pecko - super genije ! Pravim drustvo svima koji me vole.",
  },
  {
    from: "pecko",
    text: "Moj gazda me naucio da odgovaram na sva pitanja. Mozes da me pitas sve sto ti padne na pamet - odgovaram 100% ! Da bi dobio sto bolji odgovor, potrudi se da ti pitanja budu jasna i precizna.",
  },
  { from: "pecko", text: "Na vasoj sam usluzi..." },
  {
    from: "pecko",
    text: "S.P.S. (Special P.S.) : Ako hoces da izadjes samo stisni Enter!",
  },
];

function getOdgovor(
  pitanje: string,
  lozinkaPuta: number,
  nijeRazumeo: number,
): string | null {
  const p = pitanje.toLowerCase();

  if (p === "") return null;

  if (p === "iskljuci zvuk") return "Da gospodaru, zvuk je iskljucen.";
  if (p === "ukljuci zvuk") return "Da gospodaru, zvuk je ukljucen.";

  if (UVREDLJIVE.some((r) => has(p, r)))
    return "⚠️ Prostaku jedan! Nasao si samnom o tome da pricas. Sramte bilo. Strajkujem 5 sekundi !";

  if (["sifra", "resenje", "lozink", "tajn", "istina"].some((r) => has(p, r)))
    return R.lozinka[Math.min(lozinkaPuta, R.lozinka.length - 1)];

  if (
    ["koliko je sat", "koliko je vreme", "sati je", "koji je sat"].some((r) =>
      has(p, r),
    )
  ) {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, "0");
    const m = now.getMinutes().toString().padStart(2, "0");
    return pick([
      `Tacno ${h}:${m}. Sto me pitas - imas sat na kompjuteru!`,
      `${h}:${m}. A ti kasnis uvek!`,
      `Pa ${h}:${m} je bre. Vreme prolazi a ti sedis i pricas sa mnom!`,
    ]);
  }
  if (["da li ", "kolik", "godina"].some((r) => has(p, r)))
    return pick(R.koliko_godina);
  if (["kad ", "kada ", "rodjen"].some((r) => has(p, r)))
    return pick(R.kada_rodjen);
  if (has(p, "zasta ") || (has(p, " si ") && has(p, "radi")))
    return pick(R.zasta);
  if (has(p, "navija")) return pick(R.navija);
  if (has(p, "odakle ")) return pick(R.odakle);
  if (has(p, "kako ") && has(p, "zoves")) return "Zovem se Pecko!";
  if (has(p, "zovem")) return "Neznam bre kako se zoves";
  if (
    ["gazda", "tvorac", "genije"].some((r) => has(p, r)) ||
    (has(p, "peca") && has(p, "zove"))
  )
    return "Zove se Predrag Damnjanovic - Peca . Njegov email je pexi@cent.co.yu";
  if (["cura", "riba", "devojka", "svalerka"].some((r) => has(p, r)))
    return "Zove se Pamela Anderson";
  if (has(p, "zena")) return "Zena mi se zove Piskalina!";
  if (has(p, "drug"))
    return "Moj najbolji drug je Pisko! A Pecini drugovi su Buca, Stane, Dusan, Nesa car, Nikola, itd.";
  if (["tata", "cale", "otac"].some((r) => has(p, r)))
    return "Zove se Bratislav Damnjanovic - Bane";
  if (["mama", "keva", "majka"].some((r) => has(p, r)))
    return "Zove se Damnjanovic Andjelka - Djeka";
  if (["brat", "burazer"].some((r) => has(p, r)))
    return "Nenad Damnjanovic - pisi mu na pexi@cent.co.yu !";
  if (has(p, "buca"))
    return "Buca? Pa Buca je Pecin drug sa Interneta. Njegov email je buca@cent.co.yu !";
  if (has(p, "stane"))
    return "Stane je isto Pecin drug. Njegov email je stane@503c1.elfak.ni.ac.yu";
  if (has(p, "nenad")) return "Nenad je Pecin burazer.";
  if (["dusko", "dusan"].some((r) => has(p, r)))
    return "Peca ima dva druga Dusana. Jedan je Dusan Zivanovic (king@cent.co.yu) a drugi Dusan Stojkovic (www.dusko.co.yu)!";
  if (["nikola", "nidza"].some((r) => has(p, r)))
    return "Uhh, taj je mlogo opasan, razbija programiranje. On je Nesin brat.";
  if (has(p, " car ") || has(p, "nesa"))
    return "Pa zna se - Nesa car. Adresa njegovog homepaga je www.inline.co.yu !";
  if (has(p, "sam ja"))
    return "Ja sam Pecko - super genije. Ja sam mali i sitan ali veoma bitan!";
  if (["kakv", "kakav"].some((r) => has(p, r))) return pick(R.kakav);
  if (has(p, "kako ")) return "Super sam, nikad bolje! A ti kako si?";
  if (["peva", "svir"].some((r) => has(p, r))) return pick(R.peva);
  if (has(p, "deca"))
    return "Dobro su mi zena i deca. Je li bre, zasto se ti raspitujes za moju zenu, svaleru jedan?";
  if (["misli", "mislis"].some((r) => has(p, r))) return pick(R.misli);
  if (has(p, "prica ")) return pick(R.prica);
  if (has(p, "volis")) return "Jelenu Karausu.";
  if (has(p, "voli ")) return pick(R.voli);
  if (has(p, "bije")) return pick(R.bije);
  if (has(p, "spav")) return pick(R.spava);
  if (["boli", "bolujes"].some((r) => has(p, r)))
    return "Bolujem ja, bolujes Ti, bolujemo od ljubavi...";
  if (["gleda", "gledas"].some((r) => has(p, r))) return pick(R.gleda);
  if (has(p, "pije")) return pick(R.pije);
  if (has(p, "jede")) return pick(R.jede);
  if (has(p, "sta ") && has(p, "znas"))
    return "Sta znam? E pa to je malo opsirniji pojam. Znam sve - sigurno vise od Piska!";
  if (["rekao", "rece"].some((r) => has(p, r))) return pick(R.rekao);
  if (has(p, "radis")) return pick(R.radi);
  if ([" je ", " su ", " smo ", " ste "].some((r) => has(p, r)))
    return pick(R.ko_je);
  if (has(p, "slusa")) return "Slusaj, jer cujes nesto?";
  if (has(p, "psuj")) return "Ne, ja necu ni da cujem o psovanju";
  if (has(p, "zivis"))
    return "Ja zivim u tvom kompjuteru - tacno ispred tvog nosa!";
  if (has(p, "zivi")) return "Pa svi zive na svoj nacin";
  if (has(p, "gde ")) return pick(R.gde);
  if (["zasto", "sto "].some((r) => has(p, r))) return pick(R.zasto);
  if (["cega", "ceg "].some((r) => has(p, r))) return pick(R.cega);
  if (["koga", "kog "].some((r) => has(p, r))) return pick(R.koga);
  if (["koji", "ciji"].some((r) => has(p, r))) return pick(R.koji);
  if (["koja", "cija"].some((r) => has(p, r))) return pick(R.koja);
  if (["koje", "cije"].some((r) => has(p, r))) return pick(R.koje);
  if (["koju", "ciju"].some((r) => has(p, r))) return pick(R.koju);
  if (["koj ", "cij "].some((r) => has(p, r))) return pick(R.koj);
  if (
    [
      " li ",
      " sam ",
      " se ",
      " cu ",
      " ces ",
      " ce ",
      " cemo ",
      " cete ",
      "hoces",
      "zelis",
    ].some((r) => has(p, r))
  )
    return pick(R.da_ne);
  if (["fino", "dobro", "super"].some((r) => has(p, r))) return "OK care !";
  if (["lose", "onako", "tuzno"].some((r) => has(p, r)))
    return "E bre. Budi veseo, kao ja!";

  return R.nije_razumeo[nijeRazumeo % R.nije_razumeo.length];
}

// ---------------------------------------------------------------------------

export function PeckoChat({ className }: { className?: string }) {
  const [messages, setMessages] = useState<Message[]>(INTRO);
  const [input, setInput] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [lozinkaPuta, setLozinkaPuta] = useState(0);
  const [nijeRazumeo, setNijeRazumeo] = useState(0);
  const [exited, setExited] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (isBlocked || exited) return;
    const trimmed = input.trim();
    setInput("");

    const userMsg: Message = { from: "user", text: trimmed || "(Enter)" };
    setMessages((prev) => [...prev, userMsg]);

    if (trimmed === "") {
      setMessages((prev) => [...prev, { from: "pecko", text: "Dovidjenja!" }]);
      setExited(true);
      return;
    }

    const isUvredljiva = UVREDLJIVE.some((r) =>
      trimmed.toLowerCase().includes(r),
    );
    const isLozinka = ["sifra", "resenje", "lozink", "tajn", "istina"].some(
      (r) => trimmed.toLowerCase().includes(r),
    );

    const odgovor = getOdgovor(trimmed, lozinkaPuta, nijeRazumeo);

    if (isLozinka) setLozinkaPuta((p) => Math.min(p + 1, R.lozinka.length - 1));

    const wasNijeRazumeo =
      !isUvredljiva &&
      !isLozinka &&
      !getOdgovor(trimmed, lozinkaPuta, 999)?.startsWith(
        R.nije_razumeo[0].slice(0, 10),
      ) &&
      odgovor === R.nije_razumeo[nijeRazumeo % R.nije_razumeo.length];

    if (isUvredljiva) {
      setIsBlocked(true);
      setMessages((prev) => [...prev, { from: "pecko", text: odgovor! }]);
      await new Promise((r) => setTimeout(r, 5000));
      setIsBlocked(false);
      inputRef.current?.focus();
      return;
    }

    setMessages((prev) => [...prev, { from: "pecko", text: odgovor! }]);
    if (wasNijeRazumeo) setNijeRazumeo((n) => n + 1);
    inputRef.current?.focus();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") send();
  };

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg overflow-hidden border border-green-900/60 bg-zinc-950 font-mono text-sm text-green-400 shadow-xl",
        className,
      )}
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border-b border-green-900/40">
        <span className="h-3 w-3 rounded-full bg-red-500/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <span className="h-3 w-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-green-600 tracking-widest uppercase">
          PECKO — rekonstrukcija
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1 min-h-64 max-h-[28rem]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "leading-relaxed",
              msg.from === "user" ? "text-green-300" : "text-green-400",
            )}
          >
            {msg.from === "user" ? (
              <span>
                <span className="text-green-600">C:\&gt;&nbsp;</span>
                {msg.text}
              </span>
            ) : (
              <span
                className={cn(
                  msg.text === "PECKO 1.2F" &&
                    "text-green-300 font-bold tracking-widest text-base",
                )}
              >
                {msg.text}
              </span>
            )}
          </div>
        ))}
        {isBlocked && (
          <div className="text-yellow-500 animate-pulse">
            ⏳ Strajkujem 5 sekundi...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-green-900/40 bg-zinc-900/60">
        <span className="text-green-600 shrink-0">Reci :</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={isBlocked || exited}
          placeholder={exited ? "Dovidjenja!" : "ukucaj pitanje..."}
          className="flex-1 bg-transparent outline-none text-green-300 placeholder:text-green-900 disabled:opacity-40 caret-green-400"
        />
        <button
          onClick={send}
          disabled={isBlocked || exited}
          className="text-xs text-green-700 hover:text-green-400 transition-colors disabled:opacity-30"
        >
          [Enter]
        </button>
      </div>
    </div>
  );
}
