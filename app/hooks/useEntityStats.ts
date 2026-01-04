import { useState } from "react";
import { Story } from "inkjs";

type EntityStats = {
    STR: { base: number; total: number };
    CHA: { base: number; total: number };
    WIT: { base: number; total: number };
    HP: { cur: number; max: number; bonus?: number };
    SP: { cur: number; max: number; bonus?: number };
    REP: { base: number; total: number }; // Added REP
};

type EquipmentSet = {
    weapon: string;
    armor: string;
    outfit: string;
    hat: string;
    necklace: string;
    ring: string;
};

const ITEM_STATS: Record<string, { STR?: number; CHA?: number; WIT?: number; HP?: number; SP?: number; REP?: number }> = {
    rusty_sword: { STR: 2 },
    leather_armor: { STR: 1 },
    old_sack: { HP: 1, CHA: -1 },
    small_knife: { STR: 1 },
    // New items
    rugged_coat: { CHA: 1, HP: 1 },
    noble_cloak: { CHA: 3 },
    old_helmet: { STR: 1 },
    rugged_stetson: { CHA: 2 },
    fancy_bycocket: { CHA: 3 },
    headband_of_intellect: { WIT: 3 },
    shimmering_pendant: { WIT: 2, CHA: 1 },
    fine_silver_chain: { CHA: 2 },
    collar: { SP: 2, WIT: -1 },
    leash: { SP: 3, WIT: -3 },
    pocketwatch: { WIT: 4 },
    chainmail_bikini: { CHA: 3, STR: 1 },
    steel_breastplate: { STR: 4 },
    gauntlets: { STR: 2 },
    oversized_warhammer: { STR: 5 },
    simple_pendulum: { WIT: 1 },
    longsword: { STR: 3 },
    scythe: { STR: 3, WIT: 1 },
    ribbon_wand: { WIT: 2, CHA: 2 },
    spinnable_spiral: { WIT: 4 },
    ring_of_power: { STR: 3 },
    ring_of_intellect: { WIT: 3 },
    ring_of_influence: { CHA: 3 },
    ring_of_health: { HP: 3 },
    ring_of_restraint: { SP: 3 },
};

const ITEM_NAMES: Record<string, string> = {
    none: "None",
    rusty_sword: "Rusty Sword",
    leather_armor: "Leather Armor",
    old_sack: "Old Sack",
    small_knife: "Small Knife",
    potion_of_spirit: "Potion of Spirit",
    potion_of_stupidity: "Potion of Stupidity",
    // New items
    common_tunic: "Common Tunic",
    rugged_coat: "Rugged Coat",
    noble_cloak: "Noble Cloak",
    common_hood: "Common Hood",
    old_helmet: "Old Helmet",
    rugged_stetson: "Rugged Stetson",
    fancy_bycocket: "Fancy Bycocket",
    headband_of_intellect: "Headband of Intellect",
    shimmering_pendant: "Shimmering Pendant",
    fine_silver_chain: "Fine Silver Chain",
    collar: "Collar",
    leash: "Leash",
    pocketwatch: "Pocketwatch",
    chainmail_bikini: "Chainmail Bikini",
    steel_breastplate: "Steel Breastplate",
    gauntlets: "Gauntlets",
    oversized_warhammer: "Oversized Warhammer",
    simple_pendulum: "Simple Pendulum",
    longsword: "Longsword",
    scythe: "Scythe",
    ribbon_wand: "Ribbon Wand",
    spinnable_spiral: "Spinnable Spiral",
    ring_of_power: "Ring of Power",
    ring_of_intellect: "Ring of Intellect",
    ring_of_influence: "Ring of Influence",
    ring_of_health: "Ring of Health",
    ring_of_restraint: "Ring of Restraint",
};

export const ITEM_SLOTS: Record<string, string> = {
    rusty_sword: "weapon",
    leather_armor: "armor",
    old_sack: "outfit",
    small_knife: "weapon",
    potion_of_spirit: "consumable",
    potion_of_stupidity: "consumable",
    // New items
    common_tunic: "outfit",
    rugged_coat: "outfit",
    noble_cloak: "outfit",
    common_hood: "hat",
    old_helmet: "hat",
    rugged_stetson: "hat",
    fancy_bycocket: "hat",
    headband_of_intellect: "hat",
    shimmering_pendant: "necklace",
    fine_silver_chain: "necklace",
    collar: "necklace",
    leash: "necklace",
    pocketwatch: "necklace",
    chainmail_bikini: "armor",
    steel_breastplate: "armor",
    gauntlets: "armor",
    oversized_warhammer: "weapon",
    simple_pendulum: "weapon",
    longsword: "weapon",
    scythe: "weapon",
    ribbon_wand: "weapon",
    spinnable_spiral: "weapon",
    ring_of_power: "ring",
    ring_of_intellect: "ring",
    ring_of_influence: "ring",
    ring_of_health: "ring",
    ring_of_restraint: "ring",
};

export function useEntityStats() {
    const [uiCoins, setUiCoins] = useState(0);
    const [uiEquippedWeapon, setUiEquippedWeapon] = useState("none");
    const [uiEquippedArmor, setUiEquippedArmor] = useState("none");
    const [uiEquippedOutfit, setUiEquippedOutfit] = useState("none");
    const [uiEquippedHat, setUiEquippedHat] = useState("none");
    const [uiEquippedNecklace, setUiEquippedNecklace] = useState("none");
    const [uiEquippedRing, setUiEquippedRing] = useState("none");
    const [uiInventory, setUiInventory] = useState<{ id: string; name: string; count: number }[]>([]);
    const [uiStats, setUiStats] = useState<EntityStats>({
        STR: { base: 0, total: 0 },
        CHA: { base: 0, total: 0 },
        WIT: { base: 0, total: 0 },
        HP: { cur: 0, max: 0, bonus: 0 },
        SP: { cur: 0, max: 0, bonus: 0 },
        REP: { base: 0, total: 0 },
    });

    // Companion
    const [companionId, setCompanionId] = useState("npc_none");
    const [companionName, setCompanionName] = useState("");
    const [companionGender, setCompanionGender] = useState<"male" | "female" | "other">("other");
    const [companionCoins, setCompanionCoins] = useState(0);
    const [companionInventory, setCompanionInventory] = useState<{ id: string; name: string; count: number }[]>([]);
    const [companionEquipment, setCompanionEquipment] = useState<EquipmentSet>({
        weapon: "none", armor: "none", outfit: "none", hat: "none", necklace: "none", ring: "none"
    });
    const [companionStats, setCompanionStats] = useState<EntityStats>({
        STR: { base: 0, total: 0 },
        CHA: { base: 0, total: 0 },
        WIT: { base: 0, total: 0 },
        HP: { cur: 0, max: 0, bonus: 0 },
        SP: { cur: 0, max: 0, bonus: 0 },
        REP: { base: 0, total: 0 },
    });

    const [gender, setGender] = useState<"male" | "female" | "other">("male");
    const [charName, setCharName] = useState("Traveler");

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

    function getItemSlot(id: string) {
        return ITEM_SLOTS[normalizeItemId(id)] || "none";
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
        const baseREP = asNumber((s as any).variablesState["REP_BASE"], 0);

        let bonusSTR = 0;
        let bonusCHA = 0;
        let bonusWIT = 0;
        let bonusREP = 0;

        equippedRaw.forEach(raw => {
            const id = normalizeItemId(raw);
            const s_item = ITEM_STATS[id];
            if (s_item) {
                bonusSTR += s_item.STR ?? 0;
                bonusCHA += s_item.CHA ?? 0;
                bonusWIT += s_item.WIT ?? 0;
                bonusREP += s_item.REP ?? 0;
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
            REP: { base: baseREP, total: baseREP + bonusREP },
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
            return { id, name: pretty(id), count };
        });
        setUiInventory(invWithCounts);

        const gRaw = asString((s as any).variablesState["char_gender"], "male");
        setGender(gRaw as any);

        const nameRaw = asString((s as any).variablesState["char_name"], "Traveler");
        setCharName(nameRaw);

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

            setCompanionCoins(asNumber(s.EvaluateFunction("get_npc_coins_current"), 0));

            const invVar = `${compId.replace("npc_", "")}_inv`;
            const compInvVal = (s as any).variablesState[invVar];
            const compInvIds = inkListToIds(compInvVal);
            setCompanionInventory(compInvIds.map(id => {
                let count = 1;
                try {
                    count = asNumber(s.EvaluateFunction("get_npc_item_count_current", [id]), 1);
                } catch (e) { console.error("Error getting item count for", id, e); }
                return { id, name: pretty(id), count };
            }));

            const prefix = compId.replace("npc_", "");
            const compWeapon = normalizeItemId(asString((s as any).variablesState[`${prefix}_eq_weapon`], "none"));
            const compArmor = normalizeItemId(asString((s as any).variablesState[`${prefix}_eq_armor`], "none"));
            const compOutfit = normalizeItemId(asString((s as any).variablesState[`${prefix}_eq_outfit`], "none"));
            const compHat = normalizeItemId(asString((s as any).variablesState[`${prefix}_eq_hat`], "none"));
            const compNecklace = normalizeItemId(asString((s as any).variablesState[`${prefix}_eq_necklace`], "none"));
            const compRing = normalizeItemId(asString((s as any).variablesState[`${prefix}_eq_ring`], "none"));
            setCompanionEquipment({ weapon: compWeapon, armor: compArmor, outfit: compOutfit, hat: compHat, necklace: compNecklace, ring: compRing });

            // Fetch base stats dynamically from Ink to support variable changes (e.g. REP)
            const getCompStat = (stat: string) => {
                try {
                    return asNumber(s.EvaluateFunction("get_npc_stat_current", [stat]), 0);
                } catch (e) {
                    console.error("Error fetching companion stat", stat, e);
                    return 0;
                }
            };

            const base = {
                STR: getCompStat("STR"),
                CHA: getCompStat("CHA"),
                WIT: getCompStat("WIT"),
                HP: getCompStat("HP"),
                SP: getCompStat("SP"),
                HP_CUR: getCompStat("HP_CUR"),
                SP_CUR: getCompStat("SP_CUR"),
                REP: getCompStat("REP"),
            };

            let compBonusSTR = 0;
            let compBonusCHA = 0;
            let compBonusWIT = 0;
            let compBonusHP = 0;
            let compBonusSP = 0;
            let compBonusREP = 0;
            [compWeapon, compArmor, compOutfit, compHat, compNecklace, compRing].forEach(id => {
                const s_item = ITEM_STATS[id];
                if (s_item) {
                    compBonusSTR += s_item.STR ?? 0;
                    compBonusCHA += s_item.CHA ?? 0;
                    compBonusWIT += s_item.WIT ?? 0;
                    compBonusHP += s_item.HP ?? 0;
                    compBonusSP += s_item.SP ?? 0;
                    compBonusREP += s_item.REP ?? 0;
                }
            });
            setCompanionStats({
                STR: { base: base.STR, total: base.STR + compBonusSTR },
                CHA: { base: base.CHA, total: base.CHA + compBonusCHA },
                WIT: { base: base.WIT, total: base.WIT + compBonusWIT },
                HP: { cur: base.HP_CUR, max: base.HP + compBonusHP, bonus: compBonusHP },
                SP: { cur: base.SP_CUR, max: base.SP + compBonusSP, bonus: compBonusSP },
                REP: { base: base.REP, total: base.REP + compBonusREP },
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
                SP: { cur: 0, max: 0, bonus: 0 },
                REP: { base: 0, total: 0 },
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
        charName,
        syncSidebar,
        formatItemName: pretty,
        getItemSlot,
        // Helper to allow page.tsx to execute transfer
        ITEM_STATS
    };
}
