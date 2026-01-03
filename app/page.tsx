"use client";

import { useEffect, useState, useRef } from "react";
import { Story } from "inkjs";

const SAVE_KEYS = ["ink_save_1", "ink_save_2", "ink_save_3"] as const;
const ACTIVE_SLOT_KEY = "ink_active_slot";
const MAX_HISTORY_LINES = 100;

type ChoiceView = { index: number; text: string };

export default function Page() {
  type Mode = "menu" | "stats" | "game";

  const [uiCoins, setUiCoins] = useState(0);
  const [uiEquippedWeapon, setUiEquippedWeapon] = useState("none");
  const [uiEquippedArmor, setUiEquippedArmor] = useState("none");
  const [uiEquippedOutfit, setUiEquippedOutfit] = useState("none");
  const [uiEquippedHat, setUiEquippedHat] = useState("none");
  const [uiEquippedNecklace, setUiEquippedNecklace] = useState("none");
  const [uiEquippedRing, setUiEquippedRing] = useState("none");

  const [uiInventory, setUiInventory] = useState<string[]>([]);
  const [uiStats, setUiStats] = useState<{
    STR: { base: number; total: number };
    CHA: { base: number; total: number };
    WIT: { base: number; total: number };
  }>({
    STR: { base: 0, total: 0 },
    CHA: { base: 0, total: 0 },
    WIT: { base: 0, total: 0 },
  });

  const [mode, setMode] = useState<Mode>("menu");
  const [pendingSlot, setPendingSlot] = useState<number | null>(null);

  const [stats, setStats] = useState({ STR_BASE: 5, CHA_BASE: 5, WIT_BASE: 5 });
  const STAT_POOL = 15; // example, change as you like

  const [storyJson, setStoryJson] = useState<any | null>(null);
  const [story, setStory] = useState<Story | null>(null);

  const [lines, setLines] = useState<string[]>([]);
  const [choices, setChoices] = useState<ChoiceView[]>([]);

  const [activeSlot, setActiveSlot] = useState<number>(0);
  const [slotHasSave, setSlotHasSave] = useState<boolean[]>([false, false, false]);

  function readSlotPresence(): boolean[] {
    return SAVE_KEYS.map(k => !!localStorage.getItem(k));
  }

  function refreshSlotPresence() {
    setSlotHasSave(readSlotPresence());
  }

  function saveToSlot(s: Story, slot: number, currentLines: string[]) {
    localStorage.setItem(SAVE_KEYS[slot], s.state.toJson());
    localStorage.setItem(SAVE_KEYS[slot] + "_transcript", JSON.stringify(currentLines));
    localStorage.setItem(ACTIVE_SLOT_KEY, String(slot));
    refreshSlotPresence();
  }

  function loadFromSlot(s: Story, slot: number): { ok: boolean; loadedLines: string[] } {
    const saved = localStorage.getItem(SAVE_KEYS[slot]);
    const savedTranscript = localStorage.getItem(SAVE_KEYS[slot] + "_transcript");

    if (!saved) return { ok: false, loadedLines: [] };

    try {
      s.state.LoadJson(saved);
      const lines = savedTranscript ? JSON.parse(savedTranscript) : [];
      // Safety clamp on load
      if (lines.length > MAX_HISTORY_LINES) {
        lines.splice(0, lines.length - MAX_HISTORY_LINES);
      }
      return { ok: true, loadedLines: lines };
    } catch {
      localStorage.removeItem(SAVE_KEYS[slot]);
      localStorage.removeItem(SAVE_KEYS[slot] + "_transcript");
      refreshSlotPresence();
      return { ok: false, loadedLines: [] };
    }
  }

  function clearSlot(slot: number) {
    localStorage.removeItem(SAVE_KEYS[slot]);
    localStorage.removeItem(SAVE_KEYS[slot] + "_transcript");
    refreshSlotPresence();
  }

  function continueStory(s: Story): { newLines: string[]; newChoices: ChoiceView[] } {
    const newLines: string[] = [];
    while (s.canContinue) {
      const t = (s as any).Continue().trim();
      if (t) newLines.push(t);
    }
    const newChoices = s.currentChoices.map(c => ({ index: c.index, text: c.text }));
    return { newLines, newChoices };
  }

  function startFreshInSlot(slot: number, chosenStats: { STR_BASE: number; CHA_BASE: number; WIT_BASE: number }) {
    if (!storyJson) return;

    const s = new Story(storyJson);

    // Set Ink globals before any Continue()
    s.variablesState["STR_BASE"] = chosenStats.STR_BASE;
    s.variablesState["CHA_BASE"] = chosenStats.CHA_BASE;
    s.variablesState["WIT_BASE"] = chosenStats.WIT_BASE;

    setStory(s);
    setActiveSlot(slot);

    setStory(s);
    setActiveSlot(slot);

    // Initial run
    const { newLines, newChoices } = continueStory(s);

    setLines(newLines);
    setChoices(newChoices);
    syncSidebar(s);

    saveToSlot(s, slot, newLines);

    setMode("game");
  }

  function StatEditor({
    stats,
    setStats,
    pool,
  }: {
    stats: { STR_BASE: number; CHA_BASE: number; WIT_BASE: number };
    setStats: (s: { STR_BASE: number; CHA_BASE: number; WIT_BASE: number }) => void;
    pool: number;
  }) {
    const total = stats.STR_BASE + stats.CHA_BASE + stats.WIT_BASE;
    const remaining = pool - total;

    function setOne(k: "STR_BASE" | "CHA_BASE" | "WIT_BASE", v: number) {
      const clamped = Math.max(0, Math.min(20, v));
      setStats({ ...stats, [k]: clamped });
    }

    const LABELS: Record<string, string> = {
      STR_BASE: "STR",
      CHA_BASE: "CHA",
      WIT_BASE: "INT",
    };

    return (
      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <div style={{ opacity: 0.85 }}>Remaining: {remaining}</div>

        {(["STR_BASE", "CHA_BASE", "WIT_BASE"] as const).map(k => (
          <div key={k} style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 50, fontWeight: 700 }}>{LABELS[k]}</div>
            <button onClick={() => setOne(k, stats[k] - 1)} disabled={stats[k] <= 0}>-</button>
            <div style={{ width: 30, textAlign: "center" }}>{stats[k]}</div>
            <button
              onClick={() => setOne(k, stats[k] + 1)}
              disabled={remaining <= 0}
            >
              +
            </button>
          </div>
        ))}
      </div>
    );
  }

  function beginNewGame(slot: number) {
    setPendingSlot(slot);
    setStats({ STR_BASE: 5, CHA_BASE: 5, WIT_BASE: 5 }); // defaults
    setMode("stats");
  }

  function confirmStats() {
    if (pendingSlot === null) return;
    startFreshInSlot(pendingSlot, stats);
    setPendingSlot(null);
  }

  function loadSlot(slot: number) {
    if (!storyJson) return;

    const s = new Story(storyJson);
    const { ok, loadedLines } = loadFromSlot(s, slot);

    if (!ok) {
      // If there is no save or it is corrupt, do nothing.
      return;
    }

    setStory(s);
    setActiveSlot(slot);

    // Resume (check if there is more content, though usually save is at choice)
    const { newLines, newChoices } = continueStory(s);

    const combinedLines = [...loadedLines, ...newLines];
    setLines(combinedLines);
    setChoices(newChoices);
    syncSidebar(s);

    // Normalize by resaving immediately.
    saveToSlot(s, slot, combinedLines);

    setMode("game");
  }

  function choose(i: number) {
    if (!story) return;
    story.ChooseChoiceIndex(i);

    const { newLines, newChoices } = continueStory(story);

    setLines(prev => {
      const updated = [...prev, ...newLines];
      // Limit history to prevent infinite storage growth
      if (updated.length > MAX_HISTORY_LINES) {
        updated.splice(0, updated.length - MAX_HISTORY_LINES);
      }

      saveToSlot(story, activeSlot, updated);
      return updated;
    });
    setChoices(newChoices);
    syncSidebar(story);
  }

  function backToMenu() {
    setMode("menu");
    setStory(null);
    setLines([]);
    setChoices([]);
    refreshSlotPresence();
  }

  function asNumber(v: any, fallback = 0) {
    if (typeof v === "number") return v;
    const n = parseInt(String(v ?? ""), 10);
    return Number.isFinite(n) ? n : fallback;
  }

  function asString(v: any, fallback = "none") {
    if (typeof v === "string") return v;
    if (v == null) return fallback;

    // inkjs list items / ink lists stringify nicely (e.g. "ITEMS.rusty_sword")
    if (typeof v.toString === "function") {
      const s = v.toString();
      return s ? s : fallback;
    }

    return String(v);
  }

  function normalizeItemId(raw: string) {
    // "ITEMS.rusty_sword" -> "rusty_sword"
    const s = raw.trim();
    const dot = s.lastIndexOf(".");
    return dot >= 0 ? s.slice(dot + 1) : s;
  }

  function inkListToIds(v: any): string[] {
    if (v == null) return [];

    // inkjs InkList stringifies to comma-separated items.
    // Example: "ITEMS.rusty_sword, ITEMS.old_sack"
    const s: string = typeof v === "string" ? v : (typeof v.toString === "function" ? v.toString() : "");
    if (!s) return [];

    return s
      .split(",")
      .map((t: string) => normalizeItemId(t))
      .filter(Boolean)
      .filter((id: string) => id !== "none"); // don’t show "none" in inventory
  }

  function syncSidebar(s: Story) {
    setUiCoins(asNumber((s as any).variablesState["coins"], 0));

    const eqWraw = asString((s as any).variablesState["eq_weapon"], "none");
    const eqAraw = asString((s as any).variablesState["eq_armor"], "none");
    const eqOraw = asString((s as any).variablesState["eq_outfit"], "none");
    const eqHraw = asString((s as any).variablesState["eq_hat"], "none");
    const eqNraw = asString((s as any).variablesState["eq_necklace"], "none");
    const eqRraw = asString((s as any).variablesState["eq_ring"], "none");

    // normalize "ITEMS.rusty_sword" -> "rusty_sword"
    setUiEquippedWeapon(normalizeItemId(eqWraw));
    setUiEquippedArmor(normalizeItemId(eqAraw));
    setUiEquippedOutfit(normalizeItemId(eqOraw));
    setUiEquippedHat(normalizeItemId(eqHraw));
    setUiEquippedNecklace(normalizeItemId(eqNraw));
    setUiEquippedRing(normalizeItemId(eqRraw));

    const invVal = (s as any).variablesState["inv"];
    const invIds = inkListToIds(invVal);

    // Turn ids into display names for your sidebar list
    setUiInventory(invIds.map(pretty));
    calculateAndSetStats(s, eqWraw, eqAraw, eqOraw, eqHraw, eqNraw, eqRraw);
  }

  const ITEM_STATS: Record<string, { STR?: number; CHA?: number; WIT?: number }> = {
    rusty_sword: { STR: 2 },
    leather_armor: { STR: 4 },
    old_sack: { CHA: -1 },
  };

  function calculateAndSetStats(
    s: Story,
    ...equippedRaw: string[]
  ) {
    const baseSTR = asNumber((s as any).variablesState["STR_BASE"], 0);
    const baseCHA = asNumber((s as any).variablesState["CHA_BASE"], 0);
    const baseWIT = asNumber((s as any).variablesState["WIT_BASE"], 0);

    let bonusSTR = 0;
    let bonusCHA = 0;
    let bonusWIT = 0;

    equippedRaw.forEach(raw => {
      const id = normalizeItemId(raw);
      const stats = ITEM_STATS[id];
      if (stats) {
        bonusSTR += stats.STR ?? 0;
        bonusCHA += stats.CHA ?? 0;
        bonusWIT += stats.WIT ?? 0;
      }
    });

    setUiStats({
      STR: { base: baseSTR, total: baseSTR + bonusSTR },
      CHA: { base: baseCHA, total: baseCHA + bonusCHA },
      WIT: { base: baseWIT, total: baseWIT + bonusWIT },
    });
  }

  const ITEM_NAMES: Record<string, string> = {
    none: "None",
    rusty_sword: "Rusty Sword",
    leather_armor: "Leather Armor",
    old_sack: "Old Sack",
  };

  function pretty(id: string) {
    const norm = normalizeItemId(id);
    return ITEM_NAMES[norm] ?? norm;
  }

  useEffect(() => {
    // Load story.json once on page load.
    (async () => {
      const res = await fetch("/story.json");
      const json = await res.json();
      setStoryJson(json);

      // Update save presence after localStorage is available.
      refreshSlotPresence();

      // Optional: keep last active slot highlighted in the menu.
      const raw = localStorage.getItem(ACTIVE_SLOT_KEY);
      const n = raw ? parseInt(raw, 10) : 0;
      if (Number.isFinite(n) && n >= 0 && n <= 2) setActiveSlot(n);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when lines or choices change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, choices]);

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      {mode === "menu" && (
        <div>
          <h1 style={{ marginBottom: 8 }}>Text RPG</h1>
          <p style={{ marginTop: 0, opacity: 0.8 }}>
            Choose a save slot.
          </p>

          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {[0, 1, 2].map(slot => (
              <div
                key={slot}
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 10,
                  padding: 12,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>
                    Save {slot + 1} {slotHasSave[slot] ? "" : "(empty)"}
                  </div>
                  <div style={{ opacity: 0.8, fontSize: 14 }}>
                    {slotHasSave[slot] ? "Progress saved on this device." : "Start a new run here."}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button onClick={() => beginNewGame(slot)}>
                    New Game
                  </button>

                  <button
                    onClick={() => loadSlot(slot)}
                    disabled={!slotHasSave[slot]}
                  >
                    Load
                  </button>

                  <button
                    onClick={() => clearSlot(slot)}
                    disabled={!slotHasSave[slot]}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 18, opacity: 0.75, fontSize: 13 }}>
            Saves use localStorage, so they live per browser per device until deleted.
          </div>
        </div>
      )}

      {mode === "stats" && (
        <div>
          <h1 style={{ marginBottom: 8 }}>Create Character</h1>

          <p style={{ marginTop: 0, opacity: 0.8 }}>
            Distribute {STAT_POOL} points.
          </p>

          <StatEditor
            stats={stats}
            setStats={setStats}
            pool={STAT_POOL}
          />

          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            <button onClick={() => { setMode("menu"); setPendingSlot(null); }}>
              Back
            </button>
            <button onClick={confirmStats} disabled={stats.STR_BASE + stats.CHA_BASE + stats.WIT_BASE !== STAT_POOL}>
              Confirm
            </button>
          </div>
        </div>
      )}

      {mode === "game" && (
        <div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
            <button onClick={backToMenu}>Back to Menu</button>
            <div style={{ opacity: 0.8, alignSelf: "center" }}>
              Playing: Save {activeSlot + 1}
            </div>
          </div>

          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            {/* Left: story */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
                height: "60vh", // Fixed height to allow scrolling
                overflowY: "auto",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: 16,
                background: "rgba(0,0,0,0.2)",
              }}
            >
              <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
                {lines.map((t, idx) => (
                  <p key={idx} style={{ marginTop: 0, marginBottom: 16 }}>
                    {t}
                  </p>
                ))}
              </div>

              <div style={{ display: "grid", gap: 10, marginTop: 18, paddingBottom: 20 }}>
                {choices.map(c => (
                  <button key={c.index} onClick={() => choose(c.index)}>
                    {c.text}
                  </button>
                ))}
              </div>

              <div ref={bottomRef} />
            </div>

            {/* Right: sidebar */}
            <aside
              style={{
                width: 260,
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 10,
                padding: 12,
                position: "sticky",
                top: 20,
              }}
            >
              <div style={{ fontWeight: 800, marginBottom: 10 }}>Save {activeSlot + 1}</div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ opacity: 0.75, fontSize: 13 }}>Coins</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{uiCoins}</div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ opacity: 0.75, fontSize: 13, marginBottom: 6 }}>Stats</div>
                {(["STR", "CHA", "WIT"] as const).map(stat => {
                  const { base, total } = uiStats[stat];
                  const diff = total - base;
                  return (
                    <div key={stat} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 2 }}>
                      <span style={{ fontWeight: 600, width: 30 }}>{stat}</span>
                      <span>
                        {total} <span style={{ opacity: 0.5, fontSize: 12 }}>({base}{diff >= 0 ? "+" : ""}{diff})</span>
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ opacity: 0.75, fontSize: 13, marginBottom: 4 }}>Equipped</div>
                <div style={{ fontSize: 14 }}>Weapon: {pretty(uiEquippedWeapon)}</div>
                <div style={{ fontSize: 14 }}>Armor: {pretty(uiEquippedArmor)}</div>
                <div style={{ fontSize: 14 }}>Outfit: {pretty(uiEquippedOutfit)}</div>
                <div style={{ fontSize: 14 }}>Hat: {pretty(uiEquippedHat)}</div>
                <div style={{ fontSize: 14 }}>Necklace: {pretty(uiEquippedNecklace)}</div>
                <div style={{ fontSize: 14 }}>Ring: {pretty(uiEquippedRing)}</div>
              </div>

              <div>
                <div style={{ opacity: 0.75, fontSize: 13, marginBottom: 6 }}>Inventory</div>
                {uiInventory.length === 0 ? (
                  <div style={{ opacity: 0.7, fontSize: 14 }}>Empty</div>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {uiInventory.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          </div>
        </div>
      )}
    </main>
  );
}