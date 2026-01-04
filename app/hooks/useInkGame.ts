import { useState, useEffect } from "react";
import { Story } from "inkjs";

type ChoiceView = { index: number; text: string };

const SAVE_KEYS = ["ink_save_1", "ink_save_2", "ink_save_3"] as const;
const ACTIVE_SLOT_KEY = "ink_active_slot";
const MAX_HISTORY_LINES = 100;

type UseInkGameProps = {
    syncSidebar: (s: Story, skipSync?: boolean, unlockAchievement?: (id: string) => void) => void;
    setMode: (mode: "menu" | "stats" | "game") => void;
    setMenuView: (view: "splash" | "saves" | "achievements" | "settings") => void;
    unlockAchievement: (id: string) => void;
};

export type SaveMetadata = {
    name: string;
    date: string;
};

export function useInkGame({ syncSidebar, setMode, setMenuView, unlockAchievement }: UseInkGameProps) {
    const [storyJson, setStoryJson] = useState<any | null>(null);
    const [story, setStory] = useState<Story | null>(null);
    const [lines, setLines] = useState<string[]>([]);
    const [choices, setChoices] = useState<ChoiceView[]>([]);
    const [activeSlot, setActiveSlot] = useState<number>(0);
    const [slotHasSave, setSlotHasSave] = useState<(SaveMetadata | null)[]>([null, null, null]);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetch("/story.json");
            const json = await res.json();
            setStoryJson(json);
            refreshSlotPresence();

            const raw = localStorage.getItem(ACTIVE_SLOT_KEY);
            const n = raw ? parseInt(raw, 10) : 0;
            if (Number.isFinite(n) && n >= 0 && n <= 2) setActiveSlot(n);
        })();
    }, []);

    function readSlotPresence(): (SaveMetadata | null)[] {
        if (typeof window === "undefined") return [null, null, null];
        return SAVE_KEYS.map(k => {
            const meta = localStorage.getItem(k + "_meta");
            return meta ? JSON.parse(meta) : null;
        });
    }

    function refreshSlotPresence() {
        setSlotHasSave(readSlotPresence());
    }

    function saveToSlot(s: Story, slot: number, currentLines: string[]) {
        localStorage.setItem(SAVE_KEYS[slot], s.state.toJson());
        localStorage.setItem(SAVE_KEYS[slot] + "_transcript", JSON.stringify(currentLines));

        // Save metadata
        const name = (s.variablesState["char_name"] as string) || "Traveler";
        const meta: SaveMetadata = {
            name,
            date: new Date().toLocaleDateString()
        };
        localStorage.setItem(SAVE_KEYS[slot] + "_meta", JSON.stringify(meta));

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
            clearSlot(slot);
            return { ok: false, loadedLines: [] };
        }
    }

    function clearSlot(slot: number, onComplete?: () => void) {
        localStorage.removeItem(SAVE_KEYS[slot]);
        localStorage.removeItem(SAVE_KEYS[slot] + "_transcript");
        localStorage.removeItem(SAVE_KEYS[slot] + "_meta");
        refreshSlotPresence();
        if (onComplete) onComplete();
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

    function startFreshInSlot(
        slot: number,
        chosenStats: { STR_BASE: number; CHA_BASE: number; WIT_BASE: number; HP_BASE: number; SP_BASE: number },
        chosenGender: "male" | "female" | "other",
        chosenName: string
    ) {
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
        s.variablesState["char_name"] = chosenName;

        setStory(s);
        setActiveSlot(slot);

        const { newLines, newChoices } = continueStory(s);

        setLines(newLines);
        setChoices(newChoices);
        syncSidebar(s, true, unlockAchievement);

        saveToSlot(s, slot, newLines);

        setIsTransitioning(true);
        setTimeout(() => {
            setMode("game");
            setIsTransitioning(false);
        }, 800);
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
        syncSidebar(s, true, unlockAchievement);

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
        syncSidebar(story, false, unlockAchievement);
    }

    function backToMenu() {
        setMode("menu");
        setMenuView("saves");
        setStory(null);
        setLines([]);
        setChoices([]);
        refreshSlotPresence();
    }

    function normalizeItemId(itemId: string): string {
        if (itemId.startsWith("ITEMS.")) {
            return itemId.substring(6); // Remove "ITEMS."
        }
        // Handle InkJS List item representation if necessary, e.g., "List(ITEMS.rusty_sword)"
        const match = itemId.match(/List\(ITEMS\.(\w+)\)/);
        if (match && match[1]) {
            return match[1];
        }
        return itemId;
    }

    function transferItemToCompanion(itemId: string) {
        if (!story) return;
        const cleanId = normalizeItemId(itemId);
        try {
            story.EvaluateFunction("transfer_to_companion_by_name", [cleanId]);
            saveToSlot(story, activeSlot, lines);
            syncSidebar(story);
        } catch (e) {
            console.error("Transfer failed", e);
        }
    }


    function transferItemFromCompanion(itemId: string): { success: boolean, message: string } {
        if (!story) return { success: false, message: "No story" };
        const cleanId = normalizeItemId(itemId);

        // Check REP
        const canTake = story.EvaluateFunction("check_can_take_item_current", []);

        if (canTake) {
            try {
                story.EvaluateFunction("transfer_from_companion_by_name", [cleanId]);
                saveToSlot(story, activeSlot, lines);
                syncSidebar(story);
                const msg = story.EvaluateFunction("get_npc_give_item_text_current", []) as string;
                return { success: true, message: msg };
            } catch (e) {
                console.error("Transfer failed", e);
                return { success: false, message: "Error" };
            }
        } else {
            const msg = story.EvaluateFunction("get_npc_refuse_item_text_current", []) as string;
            return { success: false, message: msg };
        }
    }

    function getCompanionDesc(): string {
        if (!story) return "";
        try {
            return story.EvaluateFunction("get_npc_desc_current", []) as string;
        } catch (e) {
            return "";
        }
    }

    function equipItem(itemId: string, slot: string) {
        if (!story) return;
        const cleanId = normalizeItemId(itemId);
        try {
            story.EvaluateFunction("equip_item_by_name", [slot, cleanId]);
            saveToSlot(story, activeSlot, lines);
            syncSidebar(story, false, unlockAchievement); // Sync and check achievements (Decked Out)
        } catch (e) {
            console.error("Equip failed", e);
        }
    }

    function unequipItem(slot: string) {
        if (!story) return;
        try {
            story.EvaluateFunction("unequip_item", [slot]);
            saveToSlot(story, activeSlot, lines);
            syncSidebar(story);
        } catch (e) {
            console.error("Unequip failed", e);
        }
    }

    function dropItem(itemId: string) {
        if (!story) return;
        const cleanId = normalizeItemId(itemId);
        try {
            story.EvaluateFunction("drop_item_by_name", [cleanId]);
            saveToSlot(story, activeSlot, lines);
            syncSidebar(story);
        } catch (e) {
            console.error("Drop failed", e);
        }
    }

    function useItem(itemId: string) {
        if (!story) return;
        const cleanId = normalizeItemId(itemId);
        try {
            story.EvaluateFunction("use_item_by_name", [cleanId]);
            saveToSlot(story, activeSlot, lines);
            syncSidebar(story);
        } catch (e) {
            console.error("Use failed", e);
        }
    }

    return {
        story,
        lines,
        choices,
        activeSlot,
        slotHasSave,
        isTransitioning,
        startFreshInSlot,
        loadSlot,
        clearSlot,
        choose,
        backToMenu,
        refreshSlotPresence,
        transferItemToCompanion,
        transferItemFromCompanion,
        getCompanionDesc,
        equipItem,
        unequipItem,
        dropItem,
        useItem
    };
}
