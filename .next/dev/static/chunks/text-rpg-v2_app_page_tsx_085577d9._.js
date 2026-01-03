(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/text-rpg-v2/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/text-rpg-v2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/text-rpg-v2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$inkjs$2f$dist$2f$ink$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/text-rpg-v2/node_modules/inkjs/dist/ink.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const SAVE_KEYS = [
    "ink_save_1",
    "ink_save_2",
    "ink_save_3"
];
const ACTIVE_SLOT_KEY = "ink_active_slot";
const MAX_HISTORY_LINES = 100;
function Page() {
    _s();
    const avatarY = 5;
    const [uiCoins, setUiCoins] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [uiEquippedWeapon, setUiEquippedWeapon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("none");
    const [uiEquippedArmor, setUiEquippedArmor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("none");
    const [uiEquippedOutfit, setUiEquippedOutfit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("none");
    const [uiEquippedHat, setUiEquippedHat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("none");
    const [uiEquippedNecklace, setUiEquippedNecklace] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("none");
    const [uiEquippedRing, setUiEquippedRing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("none");
    const [uiInventory, setUiInventory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [uiStats, setUiStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        STR: {
            base: 0,
            total: 0
        },
        CHA: {
            base: 0,
            total: 0
        },
        WIT: {
            base: 0,
            total: 0
        }
    });
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("menu");
    const [pendingSlot, setPendingSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        STR_BASE: 5,
        CHA_BASE: 5,
        WIT_BASE: 5
    });
    const STAT_POOL = 15; // example, change as you like
    const [storyJson, setStoryJson] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [story, setStory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lines, setLines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [choices, setChoices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeSlot, setActiveSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [slotHasSave, setSlotHasSave] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        false,
        false,
        false
    ]);
    function readSlotPresence() {
        return SAVE_KEYS.map((k)=>!!localStorage.getItem(k));
    }
    function refreshSlotPresence() {
        setSlotHasSave(readSlotPresence());
    }
    function saveToSlot(s, slot, currentLines) {
        localStorage.setItem(SAVE_KEYS[slot], s.state.toJson());
        localStorage.setItem(SAVE_KEYS[slot] + "_transcript", JSON.stringify(currentLines));
        localStorage.setItem(ACTIVE_SLOT_KEY, String(slot));
        refreshSlotPresence();
    }
    function loadFromSlot(s, slot) {
        const saved = localStorage.getItem(SAVE_KEYS[slot]);
        const savedTranscript = localStorage.getItem(SAVE_KEYS[slot] + "_transcript");
        if (!saved) return {
            ok: false,
            loadedLines: []
        };
        try {
            s.state.LoadJson(saved);
            const lines = savedTranscript ? JSON.parse(savedTranscript) : [];
            // Safety clamp on load
            if (lines.length > MAX_HISTORY_LINES) {
                lines.splice(0, lines.length - MAX_HISTORY_LINES);
            }
            return {
                ok: true,
                loadedLines: lines
            };
        } catch  {
            localStorage.removeItem(SAVE_KEYS[slot]);
            localStorage.removeItem(SAVE_KEYS[slot] + "_transcript");
            refreshSlotPresence();
            return {
                ok: false,
                loadedLines: []
            };
        }
    }
    function clearSlot(slot) {
        localStorage.removeItem(SAVE_KEYS[slot]);
        localStorage.removeItem(SAVE_KEYS[slot] + "_transcript");
        refreshSlotPresence();
    }
    function continueStory(s) {
        const newLines = [];
        while(s.canContinue){
            const t = s.Continue().trim();
            if (t) newLines.push(t);
        }
        const newChoices = s.currentChoices.map((c)=>({
                index: c.index,
                text: c.text
            }));
        return {
            newLines,
            newChoices
        };
    }
    function startFreshInSlot(slot, chosenStats) {
        if (!storyJson) return;
        const s = new __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$inkjs$2f$dist$2f$ink$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Story"](storyJson);
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
    function StatEditor({ stats, setStats, pool }) {
        const total = stats.STR_BASE + stats.CHA_BASE + stats.WIT_BASE;
        const remaining = pool - total;
        function setOne(k, v) {
            const clamped = Math.max(0, Math.min(20, v));
            setStats({
                ...stats,
                [k]: clamped
            });
        }
        const LABELS = {
            STR_BASE: "STR",
            CHA_BASE: "CHA",
            WIT_BASE: "INT"
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: "grid",
                gap: 12,
                marginTop: 16
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        opacity: 0.85
                    },
                    children: [
                        "Remaining: ",
                        remaining
                    ]
                }, void 0, true, {
                    fileName: "[project]/text-rpg-v2/app/page.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this),
                [
                    "STR_BASE",
                    "CHA_BASE",
                    "WIT_BASE"
                ].map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 10,
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 50,
                                    fontWeight: 700
                                },
                                children: LABELS[k]
                            }, void 0, false, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOne(k, stats[k] - 1),
                                disabled: stats[k] <= 0,
                                children: "-"
                            }, void 0, false, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 30,
                                    textAlign: "center"
                                },
                                children: stats[k]
                            }, void 0, false, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOne(k, stats[k] + 1),
                                disabled: remaining <= 0,
                                children: "+"
                            }, void 0, false, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this)
                        ]
                    }, k, true, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/text-rpg-v2/app/page.tsx",
            lineNumber: 156,
            columnNumber: 7
        }, this);
    }
    function beginNewGame(slot) {
        setPendingSlot(slot);
        setStats({
            STR_BASE: 5,
            CHA_BASE: 5,
            WIT_BASE: 5
        }); // defaults
        setMode("stats");
    }
    function confirmStats() {
        if (pendingSlot === null) return;
        startFreshInSlot(pendingSlot, stats);
        setPendingSlot(null);
    }
    function loadSlot(slot) {
        if (!storyJson) return;
        const s = new __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$inkjs$2f$dist$2f$ink$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Story"](storyJson);
        const { ok, loadedLines } = loadFromSlot(s, slot);
        if (!ok) {
            // If there is no save or it is corrupt, do nothing.
            return;
        }
        setStory(s);
        setActiveSlot(slot);
        // Resume (check if there is more content, though usually save is at choice)
        const { newLines, newChoices } = continueStory(s);
        const combinedLines = [
            ...loadedLines,
            ...newLines
        ];
        setLines(combinedLines);
        setChoices(newChoices);
        syncSidebar(s);
        // Normalize by resaving immediately.
        saveToSlot(s, slot, combinedLines);
        setMode("game");
    }
    function choose(i) {
        if (!story) return;
        story.ChooseChoiceIndex(i);
        const { newLines, newChoices } = continueStory(story);
        setLines((prev)=>{
            const updated = [
                ...prev,
                ...newLines
            ];
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
    function asNumber(v, fallback = 0) {
        if (typeof v === "number") return v;
        const n = parseInt(String(v ?? ""), 10);
        return Number.isFinite(n) ? n : fallback;
    }
    function asString(v, fallback = "none") {
        if (typeof v === "string") return v;
        if (v == null) return fallback;
        // inkjs list items / ink lists stringify nicely (e.g. "ITEMS.rusty_sword")
        if (typeof v.toString === "function") {
            const s = v.toString();
            return s ? s : fallback;
        }
        return String(v);
    }
    function normalizeItemId(raw) {
        // "ITEMS.rusty_sword" -> "rusty_sword"
        const s = raw.trim();
        const dot = s.lastIndexOf(".");
        return dot >= 0 ? s.slice(dot + 1) : s;
    }
    function inkListToIds(v) {
        if (v == null) return [];
        // inkjs InkList stringifies to comma-separated items.
        // Example: "ITEMS.rusty_sword, ITEMS.old_sack"
        const s = typeof v === "string" ? v : typeof v.toString === "function" ? v.toString() : "";
        if (!s) return [];
        return s.split(",").map((t)=>normalizeItemId(t)).filter(Boolean).filter((id)=>id !== "none"); // don’t show "none" in inventory
    }
    function syncSidebar(s) {
        setUiCoins(asNumber(s.variablesState["coins"], 0));
        const eqWraw = asString(s.variablesState["eq_weapon"], "none");
        const eqAraw = asString(s.variablesState["eq_armor"], "none");
        const eqOraw = asString(s.variablesState["eq_outfit"], "none");
        const eqHraw = asString(s.variablesState["eq_hat"], "none");
        const eqNraw = asString(s.variablesState["eq_necklace"], "none");
        const eqRraw = asString(s.variablesState["eq_ring"], "none");
        // normalize "ITEMS.rusty_sword" -> "rusty_sword"
        setUiEquippedWeapon(normalizeItemId(eqWraw));
        setUiEquippedArmor(normalizeItemId(eqAraw));
        setUiEquippedOutfit(normalizeItemId(eqOraw));
        setUiEquippedHat(normalizeItemId(eqHraw));
        setUiEquippedNecklace(normalizeItemId(eqNraw));
        setUiEquippedRing(normalizeItemId(eqRraw));
        const invVal = s.variablesState["inv"];
        const invIds = inkListToIds(invVal);
        // Turn ids into display names for your sidebar list
        setUiInventory(invIds.map(pretty));
        calculateAndSetStats(s, eqWraw, eqAraw, eqOraw, eqHraw, eqNraw, eqRraw);
    }
    const ITEM_STATS = {
        rusty_sword: {
            STR: 2
        },
        leather_armor: {
            STR: 4
        },
        old_sack: {
            CHA: -1
        }
    };
    function calculateAndSetStats(s, ...equippedRaw) {
        const baseSTR = asNumber(s.variablesState["STR_BASE"], 0);
        const baseCHA = asNumber(s.variablesState["CHA_BASE"], 0);
        const baseWIT = asNumber(s.variablesState["WIT_BASE"], 0);
        let bonusSTR = 0;
        let bonusCHA = 0;
        let bonusWIT = 0;
        equippedRaw.forEach((raw)=>{
            const id = normalizeItemId(raw);
            const stats = ITEM_STATS[id];
            if (stats) {
                bonusSTR += stats.STR ?? 0;
                bonusCHA += stats.CHA ?? 0;
                bonusWIT += stats.WIT ?? 0;
            }
        });
        setUiStats({
            STR: {
                base: baseSTR,
                total: baseSTR + bonusSTR
            },
            CHA: {
                base: baseCHA,
                total: baseCHA + bonusCHA
            },
            WIT: {
                base: baseWIT,
                total: baseWIT + bonusWIT
            }
        });
    }
    const ITEM_NAMES = {
        none: "None",
        rusty_sword: "Rusty Sword",
        leather_armor: "Leather Armor",
        old_sack: "Old Sack"
    };
    function pretty(id) {
        const norm = normalizeItemId(id);
        return ITEM_NAMES[norm] ?? norm;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            // Load story.json once on page load.
            ({
                "Page.useEffect": async ()=>{
                    const res = await fetch("/story.json");
                    const json = await res.json();
                    setStoryJson(json);
                    // Update save presence after localStorage is available.
                    refreshSlotPresence();
                    // Optional: keep last active slot highlighted in the menu.
                    const raw = localStorage.getItem(ACTIVE_SLOT_KEY);
                    const n = raw ? parseInt(raw, 10) : 0;
                    if (Number.isFinite(n) && n >= 0 && n <= 2) setActiveSlot(n);
                }
            })["Page.useEffect"]();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Page.useEffect"], []);
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            // Auto-scroll to bottom when lines or choices change
            bottomRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["Page.useEffect"], [
        lines,
        choices
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            maxWidth: 720,
            margin: "40px auto",
            padding: 16
        },
        children: [
            mode === "menu" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            marginBottom: 8
                        },
                        children: "Text RPG"
                    }, void 0, false, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 387,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            marginTop: 0,
                            opacity: 0.8
                        },
                        children: "Choose a save slot."
                    }, void 0, false, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 388,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gap: 12,
                            marginTop: 18
                        },
                        children: [
                            0,
                            1,
                            2
                        ].map((slot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    borderRadius: 10,
                                    padding: 12,
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 10,
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontWeight: 700
                                                },
                                                children: [
                                                    "Save ",
                                                    slot + 1,
                                                    " ",
                                                    slotHasSave[slot] ? "" : "(empty)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 408,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    opacity: 0.8,
                                                    fontSize: 14
                                                },
                                                children: slotHasSave[slot] ? "Progress saved on this device." : "Start a new run here."
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 411,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 407,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: 10,
                                            flexWrap: "wrap"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>beginNewGame(slot),
                                                children: "New Game"
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 417,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>loadSlot(slot),
                                                disabled: !slotHasSave[slot],
                                                children: "Load"
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 421,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>clearSlot(slot),
                                                disabled: !slotHasSave[slot],
                                                children: "Delete"
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 428,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 416,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, slot, true, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 394,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 392,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 18,
                            opacity: 0.75,
                            fontSize: 13
                        },
                        children: "Saves use localStorage, so they live per browser per device until deleted."
                    }, void 0, false, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 439,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/text-rpg-v2/app/page.tsx",
                lineNumber: 386,
                columnNumber: 9
            }, this),
            mode === "stats" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            marginBottom: 8
                        },
                        children: "Create Character"
                    }, void 0, false, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 447,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            marginTop: 0,
                            opacity: 0.8
                        },
                        children: [
                            "Distribute ",
                            STAT_POOL,
                            " points."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 449,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatEditor, {
                        stats: stats,
                        setStats: setStats,
                        pool: STAT_POOL
                    }, void 0, false, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 453,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 10,
                            marginTop: 16,
                            flexWrap: "wrap"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setMode("menu");
                                    setPendingSlot(null);
                                },
                                children: "Back"
                            }, void 0, false, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 460,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: confirmStats,
                                disabled: stats.STR_BASE + stats.CHA_BASE + stats.WIT_BASE !== STAT_POOL,
                                children: "Confirm"
                            }, void 0, false, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 463,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 459,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/text-rpg-v2/app/page.tsx",
                lineNumber: 446,
                columnNumber: 9
            }, this),
            mode === "game" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 10,
                            flexWrap: "wrap",
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: backToMenu,
                                children: "Back to Menu"
                            }, void 0, false, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 473,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    opacity: 0.8,
                                    alignSelf: "center"
                                },
                                children: [
                                    "Playing: Save ",
                                    activeSlot + 1
                                ]
                            }, void 0, true, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 474,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 472,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 16,
                            alignItems: "flex-start"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    minWidth: 0,
                                    height: "60vh",
                                    overflowY: "auto",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: 8,
                                    padding: 16,
                                    background: "rgba(0,0,0,0.2)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            whiteSpace: "pre-wrap",
                                            lineHeight: 1.5
                                        },
                                        children: lines.map((t, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    marginTop: 0,
                                                    marginBottom: 16
                                                },
                                                children: t
                                            }, idx, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 495,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 493,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "grid",
                                            gap: 10,
                                            marginTop: 18,
                                            paddingBottom: 20
                                        },
                                        children: choices.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>choose(c.index),
                                                children: c.text
                                            }, c.index, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 503,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 501,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: bottomRef
                                    }, void 0, false, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 509,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 481,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                style: {
                                    width: 260,
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    borderRadius: 10,
                                    padding: 12,
                                    position: "sticky",
                                    top: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontWeight: 800,
                                            marginBottom: 10
                                        },
                                        children: [
                                            "Save ",
                                            activeSlot + 1
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 523,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    opacity: 0.75,
                                                    fontSize: 13
                                                },
                                                children: "Coins"
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 526,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 18,
                                                    fontWeight: 700
                                                },
                                                children: uiCoins
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 527,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 525,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    opacity: 0.75,
                                                    fontSize: 13,
                                                    marginBottom: 6
                                                },
                                                children: "Stats"
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 531,
                                                columnNumber: 17
                                            }, this),
                                            [
                                                "STR",
                                                "CHA",
                                                "WIT"
                                            ].map((stat)=>{
                                                const { base, total } = uiStats[stat];
                                                const diff = total - base;
                                                // specific color stops could be tweaked, but standard red->blue covers the range nicely
                                                const fillPercent = Math.min(100, Math.max(0, total / 20 * 100));
                                                const basePercent = Math.min(100, Math.max(0, base / 20 * 100));
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        fontSize: 13,
                                                        marginBottom: 6
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontWeight: 600,
                                                                width: 32
                                                            },
                                                            children: stat
                                                        }, void 0, false, {
                                                            fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                            lineNumber: 542,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                flex: 1,
                                                                height: 8,
                                                                background: "rgba(255,255,255,0.1)",
                                                                borderRadius: 4,
                                                                marginRight: 8,
                                                                marginLeft: 4,
                                                                position: "relative",
                                                                overflow: "hidden"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        width: `${fillPercent}%`,
                                                                        height: "100%",
                                                                        background: "linear-gradient(90deg, #ff4d4d, #4d4dff)",
                                                                        transition: "width 0.3s ease"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                                    lineNumber: 548,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        position: "absolute",
                                                                        left: `${basePercent}%`,
                                                                        top: 0,
                                                                        bottom: 0,
                                                                        width: 2,
                                                                        background: "rgba(255,255,255,0.8)",
                                                                        boxShadow: "0 0 2px rgba(0,0,0,0.5)"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                                    lineNumber: 556,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                            lineNumber: 545,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                width: 60,
                                                                textAlign: "right",
                                                                fontFamily: "monospace",
                                                                whiteSpace: "nowrap",
                                                                flexShrink: 0
                                                            },
                                                            children: [
                                                                total,
                                                                " ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        opacity: 0.5,
                                                                        fontSize: 11
                                                                    },
                                                                    children: [
                                                                        "(",
                                                                        diff >= 0 ? "+" : "",
                                                                        diff,
                                                                        ")"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                                    lineNumber: 569,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                            lineNumber: 568,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, stat, true, {
                                                    fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                    lineNumber: 541,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 530,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 24,
                                            position: "relative",
                                            height: 175 + avatarY * 2,
                                            borderRadius: 12,
                                            overflow: "visible"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: "absolute",
                                                    left: "50%",
                                                    top: "50%",
                                                    transform: "translate(-50%, -50%)",
                                                    width: 200,
                                                    height: 480,
                                                    backgroundImage: 'url("/assets/body_silhouette.png")',
                                                    backgroundSize: "contain",
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: "center",
                                                    opacity: 0.6,
                                                    mixBlendMode: "multiply",
                                                    filter: "invert(1)",
                                                    zIndex: 0
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 578,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                style: {
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    pointerEvents: "none",
                                                    opacity: 0.4,
                                                    zIndex: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                        x1: 62,
                                                        y1: 24,
                                                        x2: 130,
                                                        y2: 15 + avatarY,
                                                        stroke: "white",
                                                        strokeWidth: "1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                        lineNumber: 598,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                        x1: 62,
                                                        y1: 84,
                                                        x2: 110,
                                                        y2: 40 + avatarY,
                                                        stroke: "white",
                                                        strokeWidth: "1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                        lineNumber: 600,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                        x1: 62,
                                                        y1: 144,
                                                        x2: 92,
                                                        y2: 90 + avatarY,
                                                        stroke: "white",
                                                        strokeWidth: "1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                        lineNumber: 602,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                        x1: 200,
                                                        y1: 24,
                                                        x2: 130,
                                                        y2: 42 + avatarY,
                                                        stroke: "white",
                                                        strokeWidth: "1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                        lineNumber: 604,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                        x1: 200,
                                                        y1: 84,
                                                        x2: 130,
                                                        y2: 55 + avatarY,
                                                        stroke: "white",
                                                        strokeWidth: "1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                        lineNumber: 606,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                        x1: 200,
                                                        y1: 144,
                                                        x2: 167,
                                                        y2: 90 + avatarY,
                                                        stroke: "white",
                                                        strokeWidth: "1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                        lineNumber: 608,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 596,
                                                columnNumber: 17
                                            }, this),
                                            [
                                                {
                                                    id: "hat",
                                                    label: "Hat",
                                                    icon: "/assets/icon_hat.png",
                                                    x: 6,
                                                    y: 0,
                                                    slot: uiEquippedHat
                                                },
                                                {
                                                    id: "outfit",
                                                    label: "Outfit",
                                                    icon: "/assets/icon_outfit.png",
                                                    x: 6,
                                                    y: 60,
                                                    slot: uiEquippedOutfit
                                                },
                                                {
                                                    id: "ring",
                                                    label: "Ring",
                                                    icon: null,
                                                    x: 6,
                                                    y: 120,
                                                    slot: uiEquippedRing
                                                },
                                                {
                                                    id: "necklace",
                                                    label: "Necklace",
                                                    icon: "/assets/icon_necklace.png",
                                                    x: 200,
                                                    y: 0,
                                                    slot: uiEquippedNecklace
                                                },
                                                {
                                                    id: "armor",
                                                    label: "Armor",
                                                    icon: "/assets/icon_armor.png",
                                                    x: 200,
                                                    y: 60,
                                                    slot: uiEquippedArmor
                                                },
                                                {
                                                    id: "weapon",
                                                    label: "Weapon",
                                                    icon: "/assets/icon_weapon.png",
                                                    x: 200,
                                                    y: 120,
                                                    slot: uiEquippedWeapon
                                                }
                                            ].map((item)=>{
                                                const isEquipped = item.slot !== "none";
                                                const isRing = item.id === "ring";
                                                const displayName = isEquipped ? pretty(item.slot) : "Empty";
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "equipment-slot",
                                                    style: {
                                                        position: "absolute",
                                                        left: item.x,
                                                        top: item.y,
                                                        width: 52,
                                                        height: 52,
                                                        background: "transparent",
                                                        border: `2px solid ${isEquipped ? "rgba(77,77,255,0.8)" : "rgba(255,255,255,0.2)"}`,
                                                        borderRadius: 10,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        cursor: "pointer",
                                                        zIndex: 2,
                                                        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                                                        boxShadow: isEquipped ? "0 0 8px rgba(77,77,255,0.4)" : "none"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "slot-tooltip",
                                                            style: {
                                                                position: "absolute",
                                                                bottom: "calc(100% + 8px)",
                                                                left: "50%",
                                                                transform: "translateX(-50%)",
                                                                background: "rgba(30,30,40,0.95)",
                                                                color: isEquipped ? "#fff" : "#888",
                                                                padding: "6px 10px",
                                                                borderRadius: 6,
                                                                fontSize: 12,
                                                                fontWeight: 500,
                                                                whiteSpace: "nowrap",
                                                                opacity: 0,
                                                                pointerEvents: "none",
                                                                transition: "opacity 0.15s ease",
                                                                border: "1px solid rgba(255,255,255,0.1)",
                                                                zIndex: 10
                                                            },
                                                            children: displayName
                                                        }, void 0, false, {
                                                            fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                            lineNumber: 649,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: "100%",
                                                                height: "100%",
                                                                position: "relative",
                                                                overflow: "hidden",
                                                                borderRadius: 8
                                                            },
                                                            children: [
                                                                !isRing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: item.icon,
                                                                    alt: item.id,
                                                                    style: {
                                                                        position: "absolute",
                                                                        top: "10%",
                                                                        left: "10%",
                                                                        width: "80%",
                                                                        height: "80%",
                                                                        objectFit: "contain",
                                                                        opacity: 0.3,
                                                                        filter: "invert(1)"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                                    lineNumber: 683,
                                                                    columnNumber: 27
                                                                }, this),
                                                                isRing && !isEquipped && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        position: "absolute",
                                                                        top: "50%",
                                                                        left: "50%",
                                                                        transform: "translate(-50%, -50%)",
                                                                        width: 20,
                                                                        height: 20,
                                                                        border: "3px solid rgba(255,255,255,0.25)",
                                                                        borderRadius: "50%"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                                    lineNumber: 699,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        position: "absolute",
                                                                        top: 0,
                                                                        left: 0,
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        background: "linear-gradient(180deg, #ff4d4d, #4d4dff)",
                                                                        maskImage: isRing ? "radial-gradient(transparent 38%, black 42%, black 58%, transparent 62%)" : `url(${item.icon})`,
                                                                        WebkitMaskImage: isRing ? "radial-gradient(transparent 38%, black 42%, black 58%, transparent 62%)" : `url(${item.icon})`,
                                                                        maskSize: "80%",
                                                                        WebkitMaskSize: "80%",
                                                                        maskRepeat: "no-repeat",
                                                                        WebkitMaskRepeat: "no-repeat",
                                                                        maskPosition: "center",
                                                                        WebkitMaskPosition: "center",
                                                                        clipPath: isEquipped ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
                                                                        transition: "clip-path 0.3s ease"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                                    lineNumber: 712,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                            lineNumber: 674,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, item.id, true, {
                                                    fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                    lineNumber: 627,
                                                    columnNumber: 21
                                                }, this);
                                            }),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                                children: `
                  .equipment-slot:hover .slot-tooltip {
                    opacity: 1 !important;
                  }
                  .equipment-slot:hover {
                    border-color: rgba(255,255,255,0.5) !important;
                  }
                `
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 740,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 576,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    opacity: 0.75,
                                                    fontSize: 13,
                                                    marginBottom: 6
                                                },
                                                children: "Inventory"
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 751,
                                                columnNumber: 17
                                            }, this),
                                            uiInventory.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    opacity: 0.7,
                                                    fontSize: 14
                                                },
                                                children: "Empty"
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 753,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                style: {
                                                    margin: 0,
                                                    paddingLeft: 18
                                                },
                                                children: uiInventory.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: item
                                                    }, item, false, {
                                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                        lineNumber: 757,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 755,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 750,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 513,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 479,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/text-rpg-v2/app/page.tsx",
                lineNumber: 471,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/text-rpg-v2/app/page.tsx",
        lineNumber: 384,
        columnNumber: 5
    }, this);
}
_s(Page, "8az7K3Xg9tlaZytJ7vOXMgd83Vs=");
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=text-rpg-v2_app_page_tsx_085577d9._.js.map