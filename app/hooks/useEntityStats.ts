import { useState } from "react";
import { Story } from "inkjs";

type EntityStats = {
    STR: { base: number; total: number };
    CHA: { base: number; total: number };
    WIT: { base: number; total: number };
    HP: { cur: number; max: number; bonus?: number };
    SP: { cur: number; max: number; bonus?: number };
};

type EquipmentSet = {
    weapon: string;
    armor: string;
    outfit: string;
    hat: string;
    necklace: string;
    ring: string;
};

const ITEM_STATS: Record<string, { STR?: number; CHA?: number; WIT?: number; HP?: number; SP?: number }> = {
    rusty_sword: { STR: 2 },
    leather_armor: { STR: 4 },
    old_sack: { HP: 1, CHA: -1 },
    small_knife: { STR: 1 },
};

const ITEM_NAMES: Record<string, string> = {
    none: "None",
    rusty_sword: "Rusty Sword",
    leather_armor: "Leather Armor",
    old_sack: "Old Sack",
    small_knife: "Small Knife",
    potion_of_spirit: "Potion of Spirit",
    potion_of_stupidity: "Potion of Stupidity",
};

export function useEntityStats() {
    const [uiCoins, setUiCoins] = useState(0);
    const [uiEquippedWeapon, setUiEquippedWeapon] = useState("none");
    const [uiEquippedArmor, setUiEquippedArmor] = useState("none");
    const [uiEquippedOutfit, setUiEquippedOutfit] = useState("none");
    const [uiEquippedHat, setUiEquippedHat] = useState("none");
    const [uiEquippedNecklace, setUiEquippedNecklace] = useState("none");
    const [uiEquippedRing, setUiEquippedRing] = useState("none");
    const [uiInventory, setUiInventory] = useState<{ name: string; count: number }[]>([]);
    const [uiStats, setUiStats] = useState<EntityStats>({
        STR: { base: 0, total: 0 },
        CHA: { base: 0, total: 0 },
        WIT: { base: 0, total: 0 },
        HP: { cur: 0, max: 0, bonus: 0 },
        SP: { cur: 0, max: 0, bonus: 0 },
    });

    // Companion
    const [companionId, setCompanionId] = useState("npc_none");
    const [companionName, setCompanionName] = useState("");
    const [companionGender, setCompanionGender] = useState<"male" | "female" | "other">("other");
    const [companionCoins, setCompanionCoins] = useState(0);
    const [companionInventory, setCompanionInventory] = useState<{ name: string; count: number }[]>([]);
    const [companionEquipment, setCompanionEquipment] = useState<EquipmentSet>({
        weapon: "none", armor: "none", outfit: "none", hat: "none", necklace: "none", ring: "none"
    });
    const [companionStats, setCompanionStats] = useState<EntityStats>({
        STR: { base: 0, total: 0 },
        CHA: { base: 0, total: 0 },
        WIT: { base: 0, total: 0 },
        HP: { cur: 0, max: 0, bonus: 0 },
        SP: { cur: 0, max: 0, bonus: 0 },
    });

    const [gender, setGender] = useState<"male" | "female" | "other">("male");

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

    function pretty(id: string) {
        const norm = normalizeItemId(id);
        return ITEM_NAMES[norm] ?? norm;
    }

    function inkListToIds(v: any): string[] {
        if (v == null) return [];
        const s: string = typeof v === "string" ? v : (typeof v.toString === "function" ? v.toString() : "");
        if (!s) return [];
        return s.split(",").map((t: string) => normalizeItemId(t)).filter(Boolean).filter((id: string) => id !== "none");
    }

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

    function syncSidebar(s: Story, skipSync = false, unlockAchievement?: (id: string) => void) {
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
        const invWithCounts = invIds.map(id => {
            const countVar = `${id}_count`;
            const count = asNumber((s as any).variablesState[countVar], 1);
            return { name: pretty(id), count };
        });
        setUiInventory(invWithCounts);

        const gRaw = asString((s as any).variablesState["char_gender"], "male");
        setGender(gRaw as any);

        calculateAndSetStats(s, !!skipSync, eqWraw, eqAraw, eqOraw, eqHraw, eqNraw, eqRraw);

        if (unlockAchievement) {
            if ((s as any).variablesState["goblin_defeated"]) unlockAchievement("victory");
            if ((s as any).variablesState["peaceful_resolution"]) unlockAchievement("peaceful");
            const equippedCount = [eqWraw, eqAraw, eqOraw, eqHraw, eqNraw, eqRraw].filter(id => normalizeItemId(id) !== "none").length;
            if (equippedCount >= 3) unlockAchievement("decked_out");
        }

        // Companion Logic ...
        const compRaw = asString((s as any).variablesState["current_companion"], "npc_none");
        const compId = normalizeItemId(compRaw);
        setCompanionId(compId);

        if (compId !== "npc_none") {
            const NPC_NAMES: Record<string, string> = { npc_goblin: "Goblin", npc_kobold: "Kobold" };
            const NPC_GENDERS: Record<string, "male" | "female" | "other"> = { npc_goblin: "male", npc_kobold: "female" };
            setCompanionName(NPC_NAMES[compId] || "Unknown");
            setCompanionGender(NPC_GENDERS[compId] || "other");

            const coinsVar = `${compId.replace("npc_", "")}_coins`;
            setCompanionCoins(asNumber((s as any).variablesState[coinsVar], 0));

            const invVar = `${compId.replace("npc_", "")}_inv`;
            const compInvVal = (s as any).variablesState[invVar];
            const compInvIds = inkListToIds(compInvVal);
            setCompanionInventory(compInvIds.map(id => ({ name: pretty(id), count: 1 })));

            const prefix = compId.replace("npc_", "");
            const compWeapon = normalizeItemId(asString((s as any).variablesState[`${prefix}_eq_weapon`], "none"));
            const compArmor = normalizeItemId(asString((s as any).variablesState[`${prefix}_eq_armor`], "none"));
            const compOutfit = normalizeItemId(asString((s as any).variablesState[`${prefix}_eq_outfit`], "none"));
            const compHat = normalizeItemId(asString((s as any).variablesState[`${prefix}_eq_hat`], "none"));
            const compNecklace = normalizeItemId(asString((s as any).variablesState[`${prefix}_eq_necklace`], "none"));
            const compRing = normalizeItemId(asString((s as any).variablesState[`${prefix}_eq_ring`], "none"));
            setCompanionEquipment({ weapon: compWeapon, armor: compArmor, outfit: compOutfit, hat: compHat, necklace: compNecklace, ring: compRing });

            const NPC_BASE_STATS: Record<string, { STR: number; CHA: number; WIT: number; HP: number; SP: number }> = {
                npc_goblin: { STR: 4, CHA: 4, WIT: 4, HP: 4, SP: 4 },
                npc_kobold: { STR: 4, CHA: 4, WIT: 4, HP: 4, SP: 4 },
            };
            const base = NPC_BASE_STATS[compId] || { STR: 0, CHA: 0, WIT: 0, HP: 0, SP: 0 };
            let compBonusSTR = 0;
            let compBonusCHA = 0;
            let compBonusWIT = 0;
            let compBonusHP = 0;
            let compBonusSP = 0;
            [compWeapon, compArmor, compOutfit, compHat, compNecklace, compRing].forEach(id => {
                const s_item = ITEM_STATS[id];
                if (s_item) {
                    compBonusSTR += s_item.STR ?? 0;
                    compBonusCHA += s_item.CHA ?? 0;
                    compBonusWIT += s_item.WIT ?? 0;
                    compBonusHP += s_item.HP ?? 0;
                    compBonusSP += s_item.SP ?? 0;
                }
            });
            setCompanionStats({
                STR: { base: base.STR, total: base.STR + compBonusSTR },
                CHA: { base: base.CHA, total: base.CHA + compBonusCHA },
                WIT: { base: base.WIT, total: base.WIT + compBonusWIT },
                HP: { cur: Math.max(0, base.HP + compBonusHP), max: base.HP + compBonusHP, bonus: compBonusHP },
                SP: { cur: 0, max: base.SP + compBonusSP, bonus: compBonusSP },
            });
        } else {
            setCompanionName("");
            setCompanionInventory([]);
            setCompanionEquipment({ weapon: "none", armor: "none", outfit: "none", hat: "none", necklace: "none", ring: "none" });
            setCompanionStats({
                STR: { base: 0, total: 0 },
                CHA: { base: 0, total: 0 },
                WIT: { base: 0, total: 0 },
                HP: { cur: 0, max: 0, bonus: 0 },
                SP: { cur: 0, max: 0, bonus: 0 }
            });
        }
    }

    return {
        uiCoins,
        uiEquippedWeapon,
        uiEquippedArmor,
        uiEquippedOutfit,
        uiEquippedHat,
        uiEquippedNecklace,
        uiEquippedRing,
        uiInventory,
        uiStats,
        companionId,
        companionName,
        companionGender,
        companionCoins,
        companionInventory,
        companionEquipment,
        companionStats,
        gender,
        setGender,
        syncSidebar,
        formatItemName: pretty
    };
}
