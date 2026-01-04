"use client";

import { useEffect, useState, useRef } from "react";
import { Story } from "inkjs";

const SAVE_KEYS = ["ink_save_1", "ink_save_2", "ink_save_3"] as const;
const ACTIVE_SLOT_KEY = "ink_active_slot";
const MAX_HISTORY_LINES = 100;

type ChoiceView = { index: number; text: string };

type BaseStats = {
  STR_BASE: number;
  CHA_BASE: number;
  WIT_BASE: number;
  HP_BASE: number;
  SP_BASE: number;
};

function StatEditor({
  stats,
  setStats,
  pool,
}: {
  stats: BaseStats;
  setStats: (s: BaseStats) => void;
  pool: number;
}) {
  const total = stats.STR_BASE + stats.CHA_BASE + stats.WIT_BASE + stats.HP_BASE + stats.SP_BASE;
  const remaining = pool - total;

  function setOne(k: keyof BaseStats, v: number) {
    const clamped = Math.max(1, Math.min(20, v));
    setStats({ ...stats, [k]: clamped });
  }

  const LABELS: Record<string, { short: string; full: string }> = {
    HP_BASE: { short: "HP", full: "Health" },
    SP_BASE: { short: "SP", full: "Spirit" },
    STR_BASE: { short: "STR", full: "Strength" },
    CHA_BASE: { short: "CHA", full: "Charisma" },
    WIT_BASE: { short: "INT", full: "Intelligence" },
  };

  return (
    <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
      <div style={{ opacity: 0.85 }}>Remaining: {remaining}</div>

      {(["HP_BASE", "SP_BASE", "STR_BASE", "CHA_BASE", "WIT_BASE"] as const).map((k) => (
        <div key={k} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 10, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ width: 40, fontWeight: 700 }}>{LABELS[k].short}</div>
            <div style={{ fontSize: 11, opacity: 0.6 }}>{LABELS[k].full}</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "flex-end" }}>
            <button onClick={() => setOne(k, stats[k] - 1)} disabled={stats[k] <= 1}>
              -
            </button>
            <div style={{ width: 30, textAlign: "center", fontWeight: 700 }}>{stats[k]}</div>
            <button onClick={() => setOne(k, stats[k] + 1)} disabled={remaining <= 0}>
              +
            </button>
          </div>
          <div style={{ gridColumn: "1 / span 2", height: 4, background: "rgba(128,128,128,0.1)", borderRadius: 2, overflow: "hidden" }}>
            <div
              style={{
                width: `${(stats[k] / 20) * 100}%`,
                height: "100%",
                background:
                  k === "HP_BASE"
                    ? "linear-gradient(90deg, #ff9d4d, #9d4dff)"
                    : k === "SP_BASE"
                      ? "linear-gradient(90deg, #ff4dff, #4dff4d)"
                      : "linear-gradient(90deg, #ff4d4d, #4d4dff)",
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  type Mode = "menu" | "stats" | "game";

  const avatarY = 5;

  const [uiCoins, setUiCoins] = useState(0);
  const [uiEquippedWeapon, setUiEquippedWeapon] = useState("none");
  const [uiEquippedArmor, setUiEquippedArmor] = useState("none");
  const [uiEquippedOutfit, setUiEquippedOutfit] = useState("none");
  const [uiEquippedHat, setUiEquippedHat] = useState("none");
  const [uiEquippedNecklace, setUiEquippedNecklace] = useState("none");
  const [uiEquippedRing, setUiEquippedRing] = useState("none");

  const [uiInventory, setUiInventory] = useState<{ name: string; count: number }[]>([]);
  const [uiStats, setUiStats] = useState<{
    STR: { base: number; total: number };
    CHA: { base: number; total: number };
    WIT: { base: number; total: number };
    HP: { cur: number; max: number; bonus?: number };
    SP: { cur: number; max: number; bonus?: number };
  }>({
    STR: { base: 0, total: 0 },
    CHA: { base: 0, total: 0 },
    WIT: { base: 0, total: 0 },
    HP: { cur: 0, max: 0, bonus: 0 },
    SP: { cur: 0, max: 0, bonus: 0 },
  });

  const [mode, setMode] = useState<Mode>("menu");
  const [menuView, setMenuView] = useState<"splash" | "saves" | "achievements" | "settings">("splash");
  const [pendingSlot, setPendingSlot] = useState<number | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [pendingDarkMode, setPendingDarkMode] = useState(true);

  const [isMobileView, setIsMobileView] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ink_mobile_view");
      if (saved !== null) return saved === "true";
      return window.innerWidth < 600;
    }
    return false;
  });

  const [achievements, setAchievements] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ink_achievements");
      if (saved) return JSON.parse(saved);
    }
    return { victory: false, peaceful: false, decked_out: false };
  });

  const [stats, setStats] = useState({ STR_BASE: 4, CHA_BASE: 4, WIT_BASE: 4, HP_BASE: 4, SP_BASE: 4 });
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const STAT_POOL = 25;

  const [storyJson, setStoryJson] = useState<any | null>(null);
  const [story, setStory] = useState<Story | null>(null);

  const [lines, setLines] = useState<string[]>([]);
  const [choices, setChoices] = useState<ChoiceView[]>([]);

  const [activeSlot, setActiveSlot] = useState<number>(0);
  const [slotHasSave, setSlotHasSave] = useState<boolean[]>([false, false, false]);

  const [notification, setNotification] = useState<{ id: string; name: string; desc: string; status: "entering" | "active" | "exiting" } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showOverwriteConfirm, setShowOverwriteConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showCharacterMenu, setShowCharacterMenu] = useState(false);

  function readSlotPresence(): boolean[] {
    if (typeof window === "undefined") return [false, false, false];
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
    setShowDeleteConfirm(null);
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

  function startFreshInSlot(slot: number, chosenStats: { STR_BASE: number; CHA_BASE: number; WIT_BASE: number; HP_BASE: number; SP_BASE: number }, chosenGender: "male" | "female" | "other") {
    if (!storyJson) return;

    const s = new Story(storyJson);

    s.variablesState["STR_BASE"] = chosenStats.STR_BASE;
    s.variablesState["CHA_BASE"] = chosenStats.CHA_BASE;
    s.variablesState["WIT_BASE"] = chosenStats.WIT_BASE;
    s.variablesState["HP_BASE"] = chosenStats.HP_BASE;
    s.variablesState["SP_BASE"] = chosenStats.SP_BASE;
    s.variablesState["HP_CUR"] = chosenStats.HP_BASE;
    s.variablesState["SP_CUR"] = 0;
    s.variablesState["char_gender"] = chosenGender;

    setStory(s);
    setActiveSlot(slot);

    const { newLines, newChoices } = continueStory(s);

    setLines(newLines);
    setChoices(newChoices);
    syncSidebar(s, true);

    saveToSlot(s, slot, newLines);

    setIsTransitioning(true);
    setTimeout(() => {
      setMode("game");
      setIsTransitioning(false);
    }, 800);
  }

  function beginNewGame(slot: number) {
    setPendingSlot(slot);
    setStats({ STR_BASE: 4, CHA_BASE: 4, WIT_BASE: 4, HP_BASE: 4, SP_BASE: 4 });
    setGender("male");
    setMode("stats");
    setShowOverwriteConfirm(false);
  }

  function handleQuickNewGame() {
    const emptySlot = slotHasSave.indexOf(false);
    if (emptySlot !== -1) {
      beginNewGame(emptySlot);
    } else {
      setMenuView("saves");
    }
  }

  function handleQuickContinue() {
    if (slotHasSave[activeSlot]) {
      loadSlot(activeSlot);
    } else {
      const firstSave = slotHasSave.indexOf(true);
      if (firstSave !== -1) {
        setMenuView("saves");
      }
    }
  }

  function confirmStats() {
    if (pendingSlot === null) return;
    if (slotHasSave[pendingSlot]) {
      setShowOverwriteConfirm(true);
    } else {
      executeStatsConfirm();
    }
  }

  function executeStatsConfirm() {
    if (pendingSlot === null) return;
    startFreshInSlot(pendingSlot, stats, gender);
    setPendingSlot(null);
    setShowOverwriteConfirm(false);
  }

  function loadSlot(slot: number) {
    if (!storyJson) return;

    const s = new Story(storyJson);
    const { ok, loadedLines } = loadFromSlot(s, slot);

    if (!ok) return;

    setStory(s);
    setActiveSlot(slot);

    const { newLines, newChoices } = continueStory(s);

    const combinedLines = [...loadedLines, ...newLines];
    setLines(combinedLines);
    setChoices(newChoices);
    syncSidebar(s, true);

    saveToSlot(s, slot, combinedLines);

    setIsTransitioning(true);
    setTimeout(() => {
      setMode("game");
      setIsTransitioning(false);
    }, 800);
  }

  function choose(i: number) {
    if (!story) return;
    story.ChooseChoiceIndex(i);

    const { newLines, newChoices } = continueStory(story);

    setLines(prev => {
      const updated = [...prev, ...newLines];
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
    setMenuView("saves");
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
    if (typeof v.toString === "function") {
      const s = v.toString();
      return s ? s : fallback;
    }
    return String(v);
  }

  function normalizeItemId(raw: string) {
    const s = raw.trim();
    const dot = s.lastIndexOf(".");
    return dot >= 0 ? s.slice(dot + 1) : s;
  }

  function inkListToIds(v: any): string[] {
    if (v == null) return [];
    const s: string = typeof v === "string" ? v : (typeof v.toString === "function" ? v.toString() : "");
    if (!s) return [];
    return s.split(",").map((t: string) => normalizeItemId(t)).filter(Boolean).filter((id: string) => id !== "none");
  }

  function syncSidebar(s: Story, skipSync = false) {
    setUiCoins(asNumber((s as any).variablesState["coins"], 0));

    const eqWraw = asString((s as any).variablesState["eq_weapon"], "none");
    const eqAraw = asString((s as any).variablesState["eq_armor"], "none");
    const eqOraw = asString((s as any).variablesState["eq_outfit"], "none");
    const eqHraw = asString((s as any).variablesState["eq_hat"], "none");
    const eqNraw = asString((s as any).variablesState["eq_necklace"], "none");
    const eqRraw = asString((s as any).variablesState["eq_ring"], "none");

    setUiEquippedWeapon(normalizeItemId(eqWraw));
    setUiEquippedArmor(normalizeItemId(eqAraw));
    setUiEquippedOutfit(normalizeItemId(eqOraw));
    setUiEquippedHat(normalizeItemId(eqHraw));
    setUiEquippedNecklace(normalizeItemId(eqNraw));
    setUiEquippedRing(normalizeItemId(eqRraw));

    const invVal = (s as any).variablesState["inv"];
    const invIds = inkListToIds(invVal);
    // Read item counts from Ink
    const invWithCounts = invIds.map(id => {
      const countVar = `${id}_count`;
      const count = asNumber((s as any).variablesState[countVar], 1);
      return { name: pretty(id), count };
    });
    setUiInventory(invWithCounts);

    const gRaw = asString((s as any).variablesState["char_gender"], "male");
    setGender(gRaw as any);

    calculateAndSetStats(s, !!skipSync, eqWraw, eqAraw, eqOraw, eqHraw, eqNraw, eqRraw);

    if ((s as any).variablesState["goblin_defeated"]) unlockAchievement("victory");
    if ((s as any).variablesState["peaceful_resolution"]) unlockAchievement("peaceful");

    const equippedCount = [eqWraw, eqAraw, eqOraw, eqHraw, eqNraw, eqRraw].filter(id => normalizeItemId(id) !== "none").length;
    if (equippedCount >= 3) unlockAchievement("decked_out");
  }

  const ITEM_STATS: Record<string, { STR?: number; CHA?: number; WIT?: number; HP?: number; SP?: number }> = {
    rusty_sword: { STR: 2 },
    leather_armor: { STR: 4 },
    old_sack: { HP: 1, CHA: -1 },
    small_knife: { STR: 1 },
  };

  function calculateAndSetStats(s: Story, skipSync: boolean, ...equippedRaw: string[]) {
    const baseSTR = asNumber((s as any).variablesState["STR_BASE"], 0);
    const baseCHA = asNumber((s as any).variablesState["CHA_BASE"], 0);
    const baseWIT = asNumber((s as any).variablesState["WIT_BASE"], 0);
    const baseHP = asNumber((s as any).variablesState["HP_BASE"], 0);
    const baseSP = asNumber((s as any).variablesState["SP_BASE"], 0);

    let bonusSTR = 0;
    let bonusCHA = 0;
    let bonusWIT = 0;

    equippedRaw.forEach(raw => {
      const id = normalizeItemId(raw);
      const s_item = ITEM_STATS[id];
      if (s_item) {
        bonusSTR += s_item.STR ?? 0;
        bonusCHA += s_item.CHA ?? 0;
        bonusWIT += s_item.WIT ?? 0;
      }
    });

    const totalHPMax = baseHP + (equippedRaw.map(r => ITEM_STATS[normalizeItemId(r)]?.HP ?? 0).reduce((a, b) => a + b, 0));
    const totalSPMax = baseSP + (equippedRaw.map(r => ITEM_STATS[normalizeItemId(r)]?.SP ?? 0).reduce((a, b) => a + b, 0));

    if (!skipSync) {
      if (totalHPMax !== uiStats.HP.max && s.variablesState["HP_CUR"] !== undefined) {
        const delta = totalHPMax - uiStats.HP.max;
        const newCur = Math.max(0, (s.variablesState["HP_CUR"] as number) + delta);
        s.variablesState["HP_CUR"] = newCur;
      }
      if (totalSPMax !== uiStats.SP.max && s.variablesState["SP_CUR"] !== undefined) {
        const delta = totalSPMax - uiStats.SP.max;
        const newCur = Math.max(0, (s.variablesState["SP_CUR"] as number) + delta);
        s.variablesState["SP_CUR"] = newCur;
      }
    }

    setUiStats({
      STR: { base: baseSTR, total: baseSTR + bonusSTR },
      CHA: { base: baseCHA, total: baseCHA + bonusCHA },
      WIT: { base: baseWIT, total: baseWIT + bonusWIT },
      HP: { cur: asNumber(s.variablesState["HP_CUR"], 0), max: totalHPMax, bonus: totalHPMax - baseHP },
      SP: { cur: asNumber(s.variablesState["SP_CUR"], 0), max: totalSPMax, bonus: totalSPMax - baseSP },
    });
  }

  const ITEM_NAMES: Record<string, string> = {
    none: "None",
    rusty_sword: "Rusty Sword",
    leather_armor: "Leather Armor",
    old_sack: "Old Sack",
    small_knife: "Small Knife",
    potion_of_spirit: "Potion of Spirit",
    potion_of_stupidity: "Potion of Stupidity",
  };

  function pretty(id: string) {
    const norm = normalizeItemId(id);
    return ITEM_NAMES[norm] ?? norm;
  }

  useEffect(() => {
    (async () => {
      const res = await fetch("/story.json");
      const json = await res.json();
      setStoryJson(json);
      refreshSlotPresence();

      const raw = localStorage.getItem(ACTIVE_SLOT_KEY);
      const n = raw ? parseInt(raw, 10) : 0;
      if (Number.isFinite(n) && n >= 0 && n <= 2) setActiveSlot(n);


      const savedTheme = localStorage.getItem("ink_theme");
      if (savedTheme) {
        const dark = savedTheme === "dark";
        setIsDarkMode(dark);
        setPendingDarkMode(dark);
      }
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem("ink_achievements", JSON.stringify(achievements));
  }, [achievements]);

  function unlockAchievement(id: string) {
    if (!achievements[id]) {
      setAchievements(prev => ({ ...prev, [id]: true }));
      const ach = [
        { id: "victory", name: "Victory!", desc: "Defeat the goblin" },
        { id: "peaceful", name: "A Peaceful Resolution", desc: "Surrender to the goblin or persuade it to surrender" },
        { id: "decked_out", name: "Decked Out", desc: "Equip three pieces of gear" }
      ].find(a => a.id === id);

      if (ach) {
        // Step 1: Slide in grey (entering)
        setNotification({ ...ach, status: "entering" });

        // Step 2: Land and transition to gradient (active)
        setTimeout(() => {
          setNotification(prev => prev ? { ...prev, status: "active" } : null);
        }, 1000);

        // Step 3: Slide out (exiting)
        setTimeout(() => {
          setNotification(prev => prev ? { ...prev, status: "exiting" } : null);
        }, 6000);

        // Step 4: Cleanup
        setTimeout(() => {
          setNotification(null);
        }, 6500);
      }
    }
  }

  function confirmTheme() {
    setIsDarkMode(pendingDarkMode);
    localStorage.setItem("ink_theme", pendingDarkMode ? "dark" : "light");
    setMenuView("splash");
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastLineRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (lastLineRef.current && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = lastLineRef.current.offsetTop - 18;
    }
  }, [lines, choices, mode]);

  const bgColor = isDarkMode ? "#121212" : "#f5f5f5";
  const textColor = isDarkMode ? "#ffffff" : "#121212";
  const borderColor = isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";

  return (
    <div style={{ minHeight: "100vh", background: bgColor, color: textColor, transition: "background 0.3s ease, color 0.3s ease" }}>
      <main style={{ maxWidth: mode === "game" ? 1000 : 720, margin: "0 auto", padding: "40px 16px", width: "100%", boxSizing: "border-box" }}>
        {mode === "menu" && (
          <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
            {menuView === "splash" && (
              <div style={{ textAlign: "center", animation: "fadeIn 1s ease" }}>
                <h1 style={{ fontSize: 48, marginBottom: 8, background: "linear-gradient(90deg, #ff4d4d, #4d4dff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Text RPG
                </h1>
                <p style={{ opacity: 0.6, fontSize: 18, marginBottom: 32 }}>by ATrulyUniqueSpecimen</p>
                <p style={{ maxWidth: 500, margin: "0 auto 48px", lineHeight: 1.6, opacity: 0.85 }}>
                  A deep, choice-driven odyssey where your every decision shapes the world.
                  Explore mysterious lands, master your spirit, and forge your own destiny in this
                  text-based adventure.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  <button
                    onClick={handleQuickNewGame}
                    style={{
                      background: "linear-gradient(90deg, #ff4d4d, #4d4dff)",
                      border: "none", color: "#fff", padding: "12px 32px", borderRadius: 8,
                      fontSize: 18, fontWeight: 700, cursor: "pointer"
                    }}
                  >
                    New Game
                  </button>
                  <button
                    onClick={handleQuickContinue}
                    disabled={!slotHasSave.some(s => s === true)}
                    style={{
                      background: slotHasSave.some(s => s === true) ? "rgba(128,128,128,0.2)" : "rgba(128,128,128,0.1)",
                      border: "none", color: textColor, padding: "12px 32px", borderRadius: 8,
                      fontSize: 18, fontWeight: 700, cursor: slotHasSave.some(s => s === true) ? "pointer" : "not-allowed",
                      opacity: slotHasSave.some(s => s === true) ? 1 : 0.4
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {menuView === "saves" && (
              <div style={{ animation: "fadeIn 0.5s ease" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <h2 style={{ margin: 0 }}>Save Files</h2>
                  <button onClick={() => setMenuView("splash")} style={{ background: "rgba(128,128,128,0.1)", border: `1px solid ${borderColor}`, color: textColor, padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>Back to Home</button>
                </div>
                <div style={{ display: "grid", gap: 12 }}>
                  {[0, 1, 2].map(slot => (
                    <div key={slot} style={{ border: `1px solid ${borderColor}`, borderRadius: 10, padding: 12, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 20, background: "rgba(128,128,128,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                          {slot + 1}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700 }}>Slot {slot + 1}</div>
                          <div style={{ fontSize: 12, opacity: 0.5 }}>{slotHasSave[slot] ? "Save Data Present" : "Empty Slot"}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8, justifyContent: isMobileView && slotHasSave[slot] ? "center" : "flex-end", flexWrap: "wrap" }}>
                        {slotHasSave[slot] ? (
                          <>
                            <button onClick={() => loadSlot(slot)} style={{ background: "linear-gradient(90deg, #ff4d4d, #4d4dff)", border: "none", color: "#fff", cursor: "pointer", padding: "8px 16px", borderRadius: 6 }}>Load</button>
                            <button onClick={() => beginNewGame(slot)} style={{ background: "rgba(128,128,128,0.2)", border: "none", color: textColor, cursor: "pointer", padding: "8px 16px", borderRadius: 6 }}>Overwrite</button>
                            <button onClick={() => setShowDeleteConfirm(slot)} style={{ background: "rgba(255,0,0,0.1)", border: `1px solid rgba(255,0,0,0.2)`, color: "#ff4d4d", cursor: "pointer", padding: "8px 16px", borderRadius: 6 }}>Delete</button>
                          </>
                        ) : (
                          <button onClick={() => beginNewGame(slot)} style={{ background: "linear-gradient(90deg, #ff4d4d, #4d4dff)", border: "none", color: "#fff", cursor: "pointer", padding: "8px 16px", borderRadius: 6 }}>New Game</button>
                        )}
                      </div>

                      {showDeleteConfirm !== null && (
                        <div style={{
                          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                          background: "rgba(0,0,0,0.8)", zIndex: 5000, display: "flex",
                          alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)"
                        }}>
                          <div style={{
                            background: isDarkMode ? "#1e1e1e" : "#fff", padding: 32,
                            borderRadius: 16, border: `2px solid #ff4d4d`, maxWidth: 400, textAlign: "center",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.5)", animation: "fadeIn 0.3s ease"
                          }}>
                            <h3 style={{ color: "#ff4d4d", marginTop: 0 }}>Delete Save?</h3>
                            <p style={{ opacity: 0.8, lineHeight: 1.5 }}>
                              Are you sure you want to delete the save in <strong>Slot {showDeleteConfirm + 1}</strong>? This action cannot be undone.
                            </p>
                            <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                style={{ background: "rgba(128,128,128,0.2)", border: "none", color: textColor, padding: "10px 20px", borderRadius: 8, cursor: "pointer" }}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => clearSlot(showDeleteConfirm)}
                                style={{ background: "#ff4d4d", border: "none", color: "#fff", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}
                              >
                                Yes, Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {menuView === "achievements" && (
              <div style={{ animation: "fadeIn 0.5s ease" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <h2 style={{ margin: 0 }}>Achievements</h2>
                  <button onClick={() => setMenuView("splash")} style={{ background: "rgba(128,128,128,0.1)", border: `1px solid ${borderColor}`, color: textColor, padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>Back to Home</button>
                </div>
                <div style={{ display: "grid", gap: 16 }}>
                  {[
                    { id: "victory", name: "Victory!", desc: "Defeat the goblin" },
                    { id: "peaceful", name: "A Peaceful Resolution", desc: "Surrender to the goblin or persuade it to surrender" },
                    { id: "decked_out", name: "Decked Out", desc: "Equip three pieces of gear" }
                  ].map(ach => (
                    <div key={ach.id} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{
                        position: "relative", width: 56, height: 56,
                        background: isDarkMode ? "transparent" : "rgba(255,255,255,0.4)",
                        border: `2px solid ${achievements[ach.id] ? "rgba(77,77,255,0.8)" : "rgba(128,128,128,0.2)"}`,
                        borderRadius: 12, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: achievements[ach.id] ? "0 0 10px rgba(77,77,255,0.3)" : "none"
                      }}>
                        <svg viewBox="0 0 24 24" style={{ width: "70%", height: "70%", fill: achievements[ach.id] ? "none" : "rgba(128,128,128,0.4)" }}>
                          <path d="M19,5h-2V3H7v2H5C3.9,5,3,5.9,3,7v1c0,2.5,1.9,4.6,4.3,4.9c0.7,1.1,1.7,2,3,2.4V19H7v2h10v-2h-3.3v-3.7c1.2-0.4,2.2-1.3,3-2.4C19.1,12.6,21,10.5,21,8V7C21,5.9,20.1,5,19,5z M5,8V7h2v3.8C5.6,10.3,5,9.2,5,8z M19,8c0,1.2-0.6,2.3-1.6,2.8V7h2V8z" />
                          {achievements[ach.id] && (
                            <defs>
                              <linearGradient id={`grad-${ach.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#ff4d4d" />
                                <stop offset="100%" stopColor="#4d4dff" />
                              </linearGradient>
                            </defs>
                          )}
                          <path
                            d="M19,5h-2V3H7v2H5C3.9,5,3,5.9,3,7v1c0,2.5,1.9,4.6,4.3,4.9c0.7,1.1,1.7,2,3,2.4V19H7v2h10v-2h-3.3v-3.7c1.2-0.4,2.2-1.3,3-2.4C19.1,12.6,21,10.5,21,8V7C21,5.9,20.1,5,19,5z M5,8V7h2v3.8C5.6,10.3,5,9.2,5,8z M19,8c0,1.2-0.6,2.3-1.6,2.8V7h2V8z"
                            fill={achievements[ach.id] ? `url(#grad-${ach.id})` : "none"}
                          />
                        </svg>
                      </div>
                      <div>
                        <div style={{
                          fontWeight: 700,
                          fontSize: 16,
                          background: achievements[ach.id] ? "linear-gradient(90deg, #ff4d4d, #4d4dff)" : "none",
                          WebkitBackgroundClip: achievements[ach.id] ? "text" : "none",
                          WebkitTextFillColor: achievements[ach.id] ? "transparent" : "inherit",
                          color: achievements[ach.id] ? "inherit" : "rgba(128,128,128,0.5)",
                          opacity: achievements[ach.id] ? 1 : 0.6,
                          animation: achievements[ach.id] ? "gradientSlide 2s ease forwards" : "none"
                        }}>
                          {ach.name}
                        </div>
                        <div style={{ fontSize: 13, opacity: 0.5 }}>{ach.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {menuView === "settings" && (
              <div style={{ animation: "fadeIn 0.5s ease" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <h2 style={{ margin: 0 }}>Settings</h2>
                  <button onClick={() => setMenuView("splash")} style={{ background: "rgba(128,128,128,0.1)", border: `1px solid ${borderColor}`, color: textColor, padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>Back to Home</button>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, border: `1px solid ${borderColor}`, borderRadius: 10 }}>
                  <span>Dark Mode</span>
                  <div
                    onClick={() => setPendingDarkMode(!pendingDarkMode)}
                    style={{
                      width: 50, height: 26, background: pendingDarkMode ? "linear-gradient(90deg, #ff4d4d, #4d4dff)" : "rgba(128,128,128,0.3)",
                      borderRadius: 13, position: "relative", cursor: "pointer", transition: "all 0.3s ease"
                    }}
                  >
                    <div style={{
                      width: 20, height: 20, background: "#fff", borderRadius: 10, position: "absolute",
                      top: 3, left: pendingDarkMode ? 27 : 3, transition: "all 0.3s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                    }} />
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, border: `1px solid ${borderColor}`, borderRadius: 10, marginTop: 12 }}>
                  <span>Mobile View</span>
                  <div
                    onClick={() => {
                      const newVal = !isMobileView;
                      setIsMobileView(newVal);
                      localStorage.setItem("ink_mobile_view", String(newVal));
                    }}
                    style={{
                      width: 50, height: 26, background: isMobileView ? "linear-gradient(90deg, #ff4d4d, #4d4dff)" : "rgba(128,128,128,0.3)",
                      borderRadius: 13, position: "relative", cursor: "pointer", transition: "all 0.3s ease"
                    }}
                  >
                    <div style={{
                      width: 20, height: 20, background: "#fff", borderRadius: 10, position: "absolute",
                      top: 3, left: isMobileView ? 27 : 3, transition: "all 0.3s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                    }} />
                  </div>
                </div>
                <button
                  onClick={confirmTheme}
                  style={{ width: "100%", marginTop: 24, padding: 12, background: "linear-gradient(90deg, #ff4d4d, #4d4dff)", border: "none", borderRadius: 8, fontWeight: 700, color: "#fff", cursor: "pointer" }}
                >
                  Confirm Changes
                </button>
              </div>
            )}

            <div style={{ position: "fixed", bottom: 40, left: 40, display: "flex", gap: 20 }}>
              {[
                { id: "achievements", icon: "M19,5h-2V3H7v2H5C3.9,5,3,5.9,3,7v1c0,2.5,1.9,4.6,4.3,4.9c0.7,1.1,1.7,2,3,2.4V19H7v2h10v-2h-3.3v-3.7c1.2-0.4,2.2-1.3,3-2.4C19.1,12.6,21,10.5,21,8V7C21,5.9,20.1,5,19,5z M5,8V7h2v3.8C5.6,10.3,5,9.2,5,8z M19,8c0,1.2-0.6,2.3-1.6,2.8V7h2V8z" },
                { id: "saves", icon: "M17,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V7L17,3z M12,19c-1.66,0-3-1.34-3-3s1.34-3,3-3s3,1.34,3,3S13.66,19,12,19z M15,9H5V5h10V9z" },
                { id: "settings", icon: "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29l-2.39-0.96c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.85,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.5c-1.93,0-3.5-1.57-3.5-3.5 s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.93,15.5,12,15.5z" }
              ].map(nav => (
                <div
                  key={nav.id}
                  onClick={() => setMenuView(nav.id as any)}
                  style={{
                    cursor: "pointer",
                    opacity: menuView === nav.id ? 1 : 0.4,
                    transform: menuView === nav.id ? "scale(1.1)" : "scale(1)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <svg viewBox="0 0 24 24" style={{ width: 32, height: 32, fill: menuView === nav.id ? "url(#nav-grad)" : textColor }}>
                    {menuView === nav.id && (
                      <defs>
                        <linearGradient id="nav-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ff4d4d" />
                          <stop offset="100%" stopColor="#4d4dff" />
                        </linearGradient>
                      </defs>
                    )}
                    <path d={nav.icon} />
                  </svg>
                </div>
              ))}
            </div>

            <style jsx>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>
        )}

        {mode === "stats" && (
          <div>
            <h1 style={{ marginBottom: 8 }}>Create Character</h1>
            <p style={{ marginTop: 0, opacity: 0.8 }}>
              Choose your appearance and distribute {STAT_POOL} points.
            </p>

            <div style={{ marginBottom: 16 }}>
              <div style={{ opacity: 0.85, marginBottom: 8 }}>Gender</div>
              <div style={{ display: "flex", gap: 8 }}>
                {(["male", "female", "other"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    style={{
                      padding: "8px 16px",
                      background: g === gender ? "linear-gradient(90deg, #ff4d4d, #4d4dff)" : "rgba(128,128,128,0.2)",
                      border: "none",
                      borderRadius: 6,
                      color: "#fff",
                      fontWeight: 500,
                      cursor: "pointer",
                      textTransform: "capitalize"
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <StatEditor stats={stats} setStats={setStats} pool={STAT_POOL} />

            <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap", alignItems: "center" }}>
              <button onClick={() => { setMode("menu"); setMenuView("saves"); setPendingSlot(null); }} style={{ background: "rgba(128,128,128,0.2)", border: "none", color: textColor, padding: "8px 16px", borderRadius: 6, cursor: "pointer" }}>
                Back
              </button>
              <button onClick={confirmStats} disabled={stats.STR_BASE + stats.CHA_BASE + stats.WIT_BASE + stats.HP_BASE + stats.SP_BASE !== STAT_POOL} style={{ background: "linear-gradient(90deg, #ff4d4d, #4d4dff)", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontWeight: 700 }}>
                Confirm
              </button>
              {pendingSlot !== null && slotHasSave[pendingSlot] && (
                <div style={{ color: "#ff4d4d", fontSize: 13, fontWeight: 600, animation: "fadeIn 0.5s ease" }}>
                  ⚠️ Confirmation will overwrite Slot {pendingSlot + 1}
                </div>
              )}
            </div>

            {showOverwriteConfirm && (
              <div style={{
                position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                background: "rgba(0,0,0,0.8)", zIndex: 5000, display: "flex",
                alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)"
              }}>
                <div style={{
                  background: isDarkMode ? "#1e1e1e" : "#fff", padding: 32,
                  borderRadius: 16, border: `2px solid #ff4d4d`, maxWidth: 400, textAlign: "center",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.5)", animation: "fadeIn 0.3s ease"
                }}>
                  <h3 style={{ color: "#ff4d4d", marginTop: 0 }}>Overwrite Save?</h3>
                  <p style={{ opacity: 0.8, lineHeight: 1.5 }}>
                    Are you sure you want to overwrite the existing save in <strong>Slot {pendingSlot! + 1}</strong>? This action cannot be undone.
                  </p>
                  <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
                    <button
                      onClick={() => setShowOverwriteConfirm(false)}
                      style={{ background: "rgba(128,128,128,0.2)", border: "none", color: textColor, padding: "10px 20px", borderRadius: 8, cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={executeStatsConfirm}
                      style={{ background: "#ff4d4d", border: "none", color: "#fff", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}
                    >
                      Yes, Overwrite
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {mode === "game" && (
          <div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16, justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={backToMenu} style={{ background: "rgba(128,128,128,0.2)", border: "none", color: textColor, padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}>Back to Menu</button>
              <button
                onClick={() => setShowCharacterMenu(!showCharacterMenu)}
                style={{
                  background: "rgba(128,128,128,0.2)",
                  border: "none", color: textColor,
                  padding: "6px 12px", borderRadius: 6, cursor: "pointer"
                }}
              >
                {showCharacterMenu ? "Hide Character" : "Show Character"}
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: isMobileView ? "column" : "row", gap: 16, alignItems: isMobileView ? "stretch" : "flex-start" }}>
              {/* Mobile Character Menu - Shown above dialogue when visible */}
              {isMobileView && showCharacterMenu && (
                <aside
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    border: `1px solid ${borderColor}`,
                    borderRadius: 12,
                    padding: 16,
                    background: isDarkMode ? "transparent" : "rgba(255,255,255,0.5)",
                    animation: "fadeIn 0.3s ease",
                    overflow: "hidden",
                    boxSizing: "border-box"
                  }}
                >
                  <div style={{ fontWeight: 800, marginBottom: 12, fontSize: 14, opacity: 0.6 }}>Slot {activeSlot + 1}</div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ opacity: 0.75, fontSize: 13, marginBottom: 2 }}>Coins</div>
                    <div style={{ fontSize: 20, fontWeight: 800 }}>{uiCoins}</div>
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                      <div style={{ opacity: 0.75, fontSize: 13, fontWeight: 600 }}>HP</div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>
                        {uiStats.HP.cur}/{uiStats.HP.max}
                        {uiStats.HP.bonus !== 0 && <span style={{ opacity: 0.6, fontSize: 11, marginLeft: 4 }}>({uiStats.HP.bonus! >= 0 ? "+" : ""}{uiStats.HP.bonus})</span>}
                      </div>
                    </div>
                    <div style={{ height: 10, background: "rgba(128,128,128,0.15)", borderRadius: 5, overflow: "hidden", position: "relative" }}>
                      <div style={{ width: `${uiStats.HP.max > 0 ? (uiStats.HP.cur / uiStats.HP.max) * 100 : 0}%`, height: "100%", background: "linear-gradient(90deg, #ff9d4d, #9d4dff)", transition: "width 0.5s ease" }} />
                      <div style={{ position: "absolute", left: `${uiStats.HP.max > 0 ? (stats.HP_BASE / uiStats.HP.max) * 100 : 0}%`, top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,0.8)", display: uiStats.HP.cur < uiStats.HP.max ? "block" : "none" }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                      <div style={{ opacity: 0.75, fontSize: 13, fontWeight: 600 }}>SP</div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>
                        {uiStats.SP.cur}/{uiStats.SP.max}
                        {uiStats.SP.bonus !== 0 && <span style={{ opacity: 0.6, fontSize: 11, marginLeft: 4 }}>({uiStats.SP.bonus! >= 0 ? "+" : ""}{uiStats.SP.bonus})</span>}
                      </div>
                    </div>
                    <div style={{ height: 10, background: "rgba(128,128,128,0.15)", borderRadius: 5, overflow: "hidden", position: "relative" }}>
                      <div style={{ width: `${uiStats.SP.max > 0 ? (uiStats.SP.cur / uiStats.SP.max) * 100 : 0}%`, height: "100%", background: "linear-gradient(90deg, #ff4dff, #4dff4d)", transition: "width 0.5s ease" }} />
                      <div style={{ position: "absolute", left: `${uiStats.SP.max > 0 ? (stats.SP_BASE / uiStats.SP.max) * 100 : 0}%`, top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,0.8)", display: uiStats.SP.cur < uiStats.SP.max ? "block" : "none" }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ opacity: 0.75, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Attributes</div>
                    {(["STR", "CHA", "WIT"] as const).map(stat => {
                      const { base, total } = uiStats[stat];
                      const diff = total - base;
                      const fillPercent = Math.min(100, Math.max(0, (total / 20) * 100));
                      const basePercent = Math.min(100, Math.max(0, (base / 20) * 100));
                      return (
                        <div key={stat} style={{ display: "flex", alignItems: "center", fontSize: 13, marginBottom: 8 }}>
                          <span style={{ fontWeight: 700, width: 32 }}>{stat === "WIT" ? "INT" : stat}</span>
                          <div style={{ flex: 1, height: 6, background: "rgba(128,128,128,0.1)", borderRadius: 3, margin: "0 8px", position: "relative", overflow: "hidden" }}>
                            <div style={{ width: `${fillPercent}%`, height: "100%", background: "linear-gradient(90deg, #ff4d4d, #4d4dff)", transition: "width 0.3s ease" }} />
                            <div style={{ position: "absolute", left: `${basePercent}%`, top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,0.8)" }} />
                          </div>
                          <span style={{ width: 45, textAlign: "right", fontWeight: 700 }}>{total}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ marginBottom: 24, position: "relative", height: 180, width: "100%", maxWidth: 260, margin: "0 auto" }}>
                    <div style={{
                      position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
                      width: 200, height: 480,
                      backgroundImage: `url(${gender === "female" ? "/assets/body_silhouette_female.png" : "/assets/body_silhouette.png"})`,
                      backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                      opacity: 0.6, filter: isDarkMode ? "invert(1)" : "none"
                    }} />
                    <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.3 }}>
                      <line x1={58} y1={24} x2={130} y2={15 + avatarY} stroke={textColor} strokeWidth="1" />
                      <line x1={58} y1={84} x2={110} y2={40 + avatarY} stroke={textColor} strokeWidth="1" />
                      <line x1={58} y1={144} x2={92} y2={90 + avatarY} stroke={textColor} strokeWidth="1" />
                      <line x1={200} y1={24} x2={130} y2={42 + avatarY} stroke={textColor} strokeWidth="1" />
                      <line x1={200} y1={84} x2={130} y2={55 + avatarY} stroke={textColor} strokeWidth="1" />
                      <line x1={200} y1={144} x2={167} y2={90 + avatarY} stroke={textColor} strokeWidth="1" />
                    </svg>
                    {(
                      [
                        { id: "hat", icon: "/assets/icon_hat.png", x: 6, y: 0, slot: uiEquippedHat },
                        { id: "outfit", icon: "/assets/icon_outfit.png", x: 6, y: 60, slot: uiEquippedOutfit },
                        { id: "ring", icon: null, x: 6, y: 120, slot: uiEquippedRing },
                        { id: "necklace", icon: "/assets/icon_necklace.png", x: 200, y: 0, slot: uiEquippedNecklace },
                        { id: "armor", icon: "/assets/icon_armor.png", x: 200, y: 60, slot: uiEquippedArmor },
                        { id: "weapon", icon: "/assets/icon_weapon.png", x: 200, y: 120, slot: uiEquippedWeapon },
                      ] as const
                    ).map((item) => {
                      const isEquipped = item.slot !== "none";
                      const isRing = item.id === "ring";
                      return (
                        <div key={item.id} className="equipment-slot" style={{
                          position: "absolute", left: item.x, top: item.y, width: 48, height: 48,
                          background: isDarkMode ? "transparent" : "rgba(255,255,255,0.4)",
                          border: `2px solid ${isEquipped ? "rgba(77,77,255,0.8)" : "rgba(128,128,128,0.2)"}`,
                          borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", zIndex: 2, transition: "all 0.2s ease",
                          boxShadow: isEquipped ? "0 0 8px rgba(77,77,255,0.3)" : "none"
                        }}>
                          <span className="slot-tooltip" style={{
                            position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
                            background: textColor, color: bgColor, padding: "4px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700,
                            whiteSpace: "nowrap", opacity: 0, pointerEvents: "none", transition: "opacity 0.15s ease", zIndex: 10
                          }}>
                            {isEquipped ? pretty(item.slot) : "Empty"}
                          </span>
                          <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", borderRadius: 8 }}>
                            {!isRing && <img src={item.icon!} style={{ position: "absolute", top: "15%", left: "15%", width: "70%", height: "70%", objectFit: "contain", opacity: 0.2, filter: isDarkMode ? "invert(1)" : "none" }} />}
                            {isRing && !isEquipped && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 18, height: 18, border: "2px solid rgba(128,128,128,0.2)", borderRadius: "50%" }} />}
                            <div style={{
                              position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                              background: "linear-gradient(90deg, #ff4d4d, #4d4dff)",
                              maskImage: isRing ? "radial-gradient(transparent 38%, black 42%, black 58%, transparent 62%)" : `url(${item.icon})`,
                              WebkitMaskImage: isRing ? "radial-gradient(transparent 38%, black 42%, black 58%, transparent 62%)" : `url(${item.icon})`,
                              maskSize: "75%", WebkitMaskSize: "75%", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center",
                              clipPath: isEquipped ? "inset(0 0 0 0)" : "inset(100% 0 0 0)", transition: "clip-path 0.4s ease-out"
                            }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <div style={{ opacity: 0.5, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Inventory</div>
                    {uiInventory.length === 0 ? <div style={{ opacity: 0.4, fontSize: 13, fontStyle: "italic" }}>No items</div> : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {uiInventory.map(item => <div key={item.name} style={{ fontSize: 13, background: "rgba(128,128,128,0.1)", padding: "4px 8px", borderRadius: 4 }}>{item.name}{item.count > 1 && ` (${item.count})`}</div>)}
                      </div>
                    )}
                  </div>
                </aside>
              )}

              {/* Dialogue Box - Always visible */}
              <div
                ref={scrollContainerRef}
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: "65vh",
                  overflowY: "auto",
                  border: `1px solid ${borderColor}`,
                  borderRadius: 12,
                  padding: 20,
                  background: isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.8)",
                  scrollBehavior: "smooth",
                  position: "relative"
                }}
              >
                <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6, fontSize: 15 }}>
                  {lines.map((t, idx) => (
                    <p
                      key={idx}
                      ref={idx === lines.length - 1 ? lastLineRef : null}
                      style={{ marginTop: 0, marginBottom: 16 }}
                    >
                      {t}
                    </p>
                  ))}
                </div>

                <div style={{ display: "grid", gap: 10, marginTop: 24, paddingBottom: "65vh" }}>
                  {choices.map(c => (
                    <button key={c.index} onClick={() => choose(c.index)} style={{ textAlign: "left", padding: "12px 18px", background: "rgba(128,128,128,0.1)", border: `1px solid ${borderColor}`, borderRadius: 8, color: textColor, cursor: "pointer", transition: "all 0.2s ease" }}>
                      {c.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop Character Menu - Shown to the right when visible */}
              {!isMobileView && showCharacterMenu && (
                <aside
                  style={{
                    width: 260,
                    border: `1px solid ${borderColor}`,
                    borderRadius: 12,
                    padding: 16,
                    position: "sticky",
                    top: 20,
                    background: isDarkMode ? "transparent" : "rgba(255,255,255,0.5)",
                    animation: "fadeIn 0.3s ease"
                  }}
                >
                  <div style={{ fontWeight: 800, marginBottom: 12, fontSize: 14, opacity: 0.6 }}>Slot {activeSlot + 1}</div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ opacity: 0.75, fontSize: 13, marginBottom: 2 }}>Coins</div>
                    <div style={{ fontSize: 20, fontWeight: 800 }}>{uiCoins}</div>
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                      <div style={{ opacity: 0.75, fontSize: 13, fontWeight: 600 }}>HP</div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>
                        {uiStats.HP.cur}/{uiStats.HP.max}
                        {uiStats.HP.bonus !== 0 && <span style={{ opacity: 0.6, fontSize: 11, marginLeft: 4 }}>({uiStats.HP.bonus! >= 0 ? "+" : ""}{uiStats.HP.bonus})</span>}
                      </div>
                    </div>
                    <div style={{ height: 10, background: "rgba(128,128,128,0.15)", borderRadius: 5, overflow: "hidden", position: "relative" }}>
                      <div style={{ width: `${uiStats.HP.max > 0 ? (uiStats.HP.cur / uiStats.HP.max) * 100 : 0}%`, height: "100%", background: "linear-gradient(90deg, #ff9d4d, #9d4dff)", transition: "width 0.5s ease" }} />
                      <div style={{ position: "absolute", left: `${uiStats.HP.max > 0 ? (stats.HP_BASE / uiStats.HP.max) * 100 : 0}%`, top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,0.8)", display: uiStats.HP.cur < uiStats.HP.max ? "block" : "none" }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                      <div style={{ opacity: 0.75, fontSize: 13, fontWeight: 600 }}>SP</div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>
                        {uiStats.SP.cur}/{uiStats.SP.max}
                        {uiStats.SP.bonus !== 0 && <span style={{ opacity: 0.6, fontSize: 11, marginLeft: 4 }}>({uiStats.SP.bonus! >= 0 ? "+" : ""}{uiStats.SP.bonus})</span>}
                      </div>
                    </div>
                    <div style={{ height: 10, background: "rgba(128,128,128,0.15)", borderRadius: 5, overflow: "hidden", position: "relative" }}>
                      <div style={{ width: `${uiStats.SP.max > 0 ? (uiStats.SP.cur / uiStats.SP.max) * 100 : 0}%`, height: "100%", background: "linear-gradient(90deg, #ff4dff, #4dff4d)", transition: "width 0.5s ease" }} />
                      <div style={{ position: "absolute", left: `${uiStats.SP.max > 0 ? (stats.SP_BASE / uiStats.SP.max) * 100 : 0}%`, top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,0.8)", display: uiStats.SP.cur < uiStats.SP.max ? "block" : "none" }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ opacity: 0.75, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Attributes</div>
                    {(["STR", "CHA", "WIT"] as const).map(stat => {
                      const { base, total } = uiStats[stat];
                      const diff = total - base;
                      const fillPercent = Math.min(100, Math.max(0, (total / 20) * 100));
                      const basePercent = Math.min(100, Math.max(0, (base / 20) * 100));
                      return (
                        <div key={stat} style={{ display: "flex", alignItems: "center", fontSize: 13, marginBottom: 8 }}>
                          <span style={{ fontWeight: 700, width: 32 }}>{stat === "WIT" ? "INT" : stat}</span>
                          <div style={{ flex: 1, height: 6, background: "rgba(128,128,128,0.1)", borderRadius: 3, margin: "0 8px", position: "relative", overflow: "hidden" }}>
                            <div style={{ width: `${fillPercent}%`, height: "100%", background: "linear-gradient(90deg, #ff4d4d, #4d4dff)", transition: "width 0.3s ease" }} />
                            <div style={{ position: "absolute", left: `${basePercent}%`, top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,0.8)" }} />
                          </div>
                          <span style={{ width: 45, textAlign: "right", fontWeight: 700 }}>{total}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ marginBottom: 24, position: "relative", height: 180, width: isMobileView ? "100%" : 260, maxWidth: 260, margin: isMobileView ? "0 auto" : undefined }}>
                    <div style={{
                      position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
                      width: 200, height: 480,
                      backgroundImage: `url(${gender === "female" ? "/assets/body_silhouette_female.png" : "/assets/body_silhouette.png"})`,
                      backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                      opacity: 0.6, filter: isDarkMode ? "invert(1)" : "none"
                    }} />
                    <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.3 }}>
                      <line x1={58} y1={24} x2={130} y2={15 + avatarY} stroke={textColor} strokeWidth="1" />
                      <line x1={58} y1={84} x2={110} y2={40 + avatarY} stroke={textColor} strokeWidth="1" />
                      <line x1={58} y1={144} x2={92} y2={90 + avatarY} stroke={textColor} strokeWidth="1" />
                      <line x1={200} y1={24} x2={130} y2={42 + avatarY} stroke={textColor} strokeWidth="1" />
                      <line x1={200} y1={84} x2={130} y2={55 + avatarY} stroke={textColor} strokeWidth="1" />
                      <line x1={200} y1={144} x2={167} y2={90 + avatarY} stroke={textColor} strokeWidth="1" />
                    </svg>
                    {(
                      [
                        { id: "hat", icon: "/assets/icon_hat.png", x: 6, y: 0, slot: uiEquippedHat },
                        { id: "outfit", icon: "/assets/icon_outfit.png", x: 6, y: 60, slot: uiEquippedOutfit },
                        { id: "ring", icon: null, x: 6, y: 120, slot: uiEquippedRing },
                        { id: "necklace", icon: "/assets/icon_necklace.png", x: 200, y: 0, slot: uiEquippedNecklace },
                        { id: "armor", icon: "/assets/icon_armor.png", x: 200, y: 60, slot: uiEquippedArmor },
                        { id: "weapon", icon: "/assets/icon_weapon.png", x: 200, y: 120, slot: uiEquippedWeapon },
                      ] as const
                    ).map((item) => {
                      const isEquipped = item.slot !== "none";
                      const isRing = item.id === "ring";
                      return (
                        <div key={item.id} className="equipment-slot" style={{
                          position: "absolute", left: item.x, top: item.y, width: 48, height: 48,
                          background: isDarkMode ? "transparent" : "rgba(255,255,255,0.4)",
                          border: `2px solid ${isEquipped ? "rgba(77,77,255,0.8)" : "rgba(128,128,128,0.2)"}`,
                          borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", zIndex: 2, transition: "all 0.2s ease",
                          boxShadow: isEquipped ? "0 0 8px rgba(77,77,255,0.3)" : "none"
                        }}>
                          <span className="slot-tooltip" style={{
                            position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
                            background: textColor, color: bgColor, padding: "4px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700,
                            whiteSpace: "nowrap", opacity: 0, pointerEvents: "none", transition: "opacity 0.15s ease", zIndex: 10
                          }}>
                            {isEquipped ? pretty(item.slot) : "Empty"}
                          </span>
                          <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", borderRadius: 8 }}>
                            {!isRing && <img src={item.icon!} style={{ position: "absolute", top: "15%", left: "15%", width: "70%", height: "70%", objectFit: "contain", opacity: 0.2, filter: isDarkMode ? "invert(1)" : "none" }} />}
                            {isRing && !isEquipped && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 18, height: 18, border: "2px solid rgba(128,128,128,0.2)", borderRadius: "50%" }} />}
                            <div style={{
                              position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                              background: "linear-gradient(90deg, #ff4d4d, #4d4dff)",
                              maskImage: isRing ? "radial-gradient(transparent 38%, black 42%, black 58%, transparent 62%)" : `url(${item.icon})`,
                              WebkitMaskImage: isRing ? "radial-gradient(transparent 38%, black 42%, black 58%, transparent 62%)" : `url(${item.icon})`,
                              maskSize: "75%", WebkitMaskSize: "75%", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center",
                              clipPath: isEquipped ? "inset(0 0 0 0)" : "inset(100% 0 0 0)", transition: "clip-path 0.4s ease-out"
                            }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <div style={{ opacity: 0.5, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Inventory</div>
                    {uiInventory.length === 0 ? <div style={{ opacity: 0.4, fontSize: 13, fontStyle: "italic" }}>No items</div> : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {uiInventory.map(item => <div key={item.name} style={{ fontSize: 13, background: "rgba(128,128,128,0.1)", padding: "4px 8px", borderRadius: 4 }}>{item.name}{item.count > 1 && ` (${item.count})`}</div>)}
                      </div>
                    )}
                  </div>
                </aside>
              )}
            </div>
          </div>
        )
        }
      </main >

      {/* Achievement Notification Popup */}
      {
        notification && (
          <div style={{
            position: "fixed", top: 20, right: 20, zIndex: 3000,
            background: isDarkMode ? "#1e1e1e" : "#fff",
            border: "2px solid rgba(77,77,255,0.8)",
            borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            animation: notification.status === "entering" ? "slideInRight 0.5s ease forwards" : notification.status === "exiting" ? "slideOutRight 0.5s ease forwards" : "none"
          }}>
            <div style={{
              position: "relative", width: 56, height: 56,
              background: isDarkMode ? "transparent" : "rgba(255,255,255,0.4)",
              border: "2px solid rgba(77,77,255,0.8)",
              borderRadius: 12, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 10px rgba(77,77,255,0.3)"
            }}>
              <svg viewBox="0 0 24 24" style={{ width: "70%", height: "70%" }}>
                <defs>
                  <linearGradient id="pop-grad-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff4d4d" />
                    <stop offset="100%" stopColor="#4d4dff" />
                  </linearGradient>
                </defs>
                <path
                  d="M19,5h-2V3H7v2H5C3.9,5,3,5.9,3,7v1c0,2.5,1.9,4.6,4.3,4.9c0.7,1.1,1.7,2,3,2.4V19H7v2h10v-2h-3.3v-3.7c1.2-0.4,2.2-1.3,3-2.4C19.1,12.6,21,10.5,21,8V7C21,5.9,20.1,5,19,5z M5,8V7h2v3.8C5.6,10.3,5,9.2,5,8z M19,8c0,1.2-0.6,2.3-1.6,2.8V7h2V8z"
                  fill="rgba(128,128,128,0.4)"
                />
                <path
                  d="M19,5h-2V3H7v2H5C3.9,5,3,5.9,3,7v1c0,2.5,1.9,4.6,4.3,4.9c0.7,1.1,1.7,2,3,2.4V19H7v2h10v-2h-3.3v-3.7c1.2-0.4,2.2-1.3,3-2.4C19.1,12.6,21,10.5,21,8V7C21,5.9,20.1,5,19,5z M5,8V7h2v3.8C5.6,10.3,5,9.2,5,8z M19,8c0,1.2-0.6,2.3-1.6,2.8V7h2V8z"
                  fill="url(#pop-grad-vertical)"
                  style={{
                    clipPath: notification.status === "active" ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
                    transition: "clip-path 0.5s ease-out"
                  }}
                />
              </svg>
            </div>
            <div>
              <div style={{ position: "relative" }}>
                <div style={{
                  fontWeight: 800, fontSize: 16, marginBottom: 2,
                  color: "rgba(128,128,128,0.6)"
                }}>
                  Achievement Unlocked!
                </div>
                <div style={{
                  position: "absolute", top: 0, left: 0,
                  fontWeight: 800, fontSize: 16, width: "100%",
                  background: "linear-gradient(90deg, #ff4d4d, #4d4dff)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  clipPath: notification.status === "active" ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                  transition: "clip-path 0.5s ease-out",
                  pointerEvents: "none"
                }}>
                  Achievement Unlocked!
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{notification.name}</div>
              <div style={{ fontSize: 12, opacity: 0.6 }}>{notification.desc}</div>
            </div>
          </div>
        )
      }

      {/* Screen Transition Overlay */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: bgColor, zIndex: 4000, pointerEvents: "none",
        opacity: isTransitioning ? 1 : 0, transition: "opacity 0.5s ease"
      }} />

      <style>{`
        .equipment-slot:hover .slot-tooltip { opacity: 1 !important; }
        .equipment-slot:hover { border-color: ${textColor} !important; transform: translateY(-2px); }
        button { transition: all 0.2s ease; font-family: inherit; }
        button:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-1px); }
        button:active:not(:disabled) { transform: translateY(0); }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { transform: translateX(110%); }
          to { transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); }
          to { transform: translateX(110%); }
        }
        @keyframes gradientSlide {
          from { background-position: 0% 100%; }
          to { background-position: 0% 0%; }
        }
      `}</style>
    </div >
  );
}