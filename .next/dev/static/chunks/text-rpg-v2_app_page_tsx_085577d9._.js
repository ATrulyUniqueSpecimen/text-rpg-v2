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
function Page() {
    _s();
    const [uiCoins, setUiCoins] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [uiEquippedWeapon, setUiEquippedWeapon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("none");
    const [uiEquippedArmor, setUiEquippedArmor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("none");
    const [uiEquippedOutfit, setUiEquippedOutfit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("none");
    const [uiEquippedHat, setUiEquippedHat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("none");
    const [uiEquippedNecklace, setUiEquippedNecklace] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("none");
    const [uiEquippedRing, setUiEquippedRing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("none");
    const [uiInventory, setUiInventory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
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
    function saveToSlot(s, slot) {
        localStorage.setItem(SAVE_KEYS[slot], s.state.toJson());
        localStorage.setItem(ACTIVE_SLOT_KEY, String(slot));
        refreshSlotPresence();
    }
    function loadFromSlot(s, slot) {
        const saved = localStorage.getItem(SAVE_KEYS[slot]);
        if (!saved) return false;
        try {
            s.state.LoadJson(saved);
            return true;
        } catch  {
            localStorage.removeItem(SAVE_KEYS[slot]);
            refreshSlotPresence();
            return false;
        }
    }
    function clearSlot(slot) {
        localStorage.removeItem(SAVE_KEYS[slot]);
        refreshSlotPresence();
    }
    function buildUIFromStory(s, resetTranscript) {
        const newLines = [];
        while(s.canContinue){
            const t = s.Continue().trim();
            if (t) newLines.push(t);
        }
        if (resetTranscript) setLines(newLines);
        else if (newLines.length) setLines((prev)=>[
                ...prev,
                ...newLines
            ]);
        setChoices(s.currentChoices.map((c)=>({
                index: c.index,
                text: c.text
            })));
        syncSidebar(s);
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
        setLines([]);
        setChoices([]);
        buildUIFromStory(s, true);
        saveToSlot(s, slot);
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
                    lineNumber: 132,
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
                                lineNumber: 136,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOne(k, stats[k] - 1),
                                disabled: stats[k] <= 0,
                                children: "-"
                            }, void 0, false, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 137,
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
                                lineNumber: 138,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOne(k, stats[k] + 1),
                                disabled: remaining <= 0,
                                children: "+"
                            }, void 0, false, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this)
                        ]
                    }, k, true, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/text-rpg-v2/app/page.tsx",
            lineNumber: 131,
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
        const ok = loadFromSlot(s, slot);
        if (!ok) {
            // If there is no save or it is corrupt, do nothing.
            return;
        }
        setStory(s);
        setActiveSlot(slot);
        setLines([]);
        setChoices([]);
        buildUIFromStory(s, true);
        // Normalize by resaving immediately.
        saveToSlot(s, slot);
        setMode("game");
    }
    function choose(i) {
        if (!story) return;
        story.ChooseChoiceIndex(i);
        buildUIFromStory(story, false);
        saveToSlot(story, activeSlot);
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
                        lineNumber: 303,
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
                        lineNumber: 304,
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
                                                lineNumber: 324,
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
                                                lineNumber: 327,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 323,
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
                                                lineNumber: 333,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>loadSlot(slot),
                                                disabled: !slotHasSave[slot],
                                                children: "Load"
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 337,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>clearSlot(slot),
                                                disabled: !slotHasSave[slot],
                                                children: "Delete"
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 344,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 332,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, slot, true, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 310,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 308,
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
                        lineNumber: 355,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/text-rpg-v2/app/page.tsx",
                lineNumber: 302,
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
                        lineNumber: 363,
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
                        lineNumber: 365,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatEditor, {
                        stats: stats,
                        setStats: setStats,
                        pool: STAT_POOL
                    }, void 0, false, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 369,
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
                                lineNumber: 376,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: confirmStats,
                                disabled: stats.STR_BASE + stats.CHA_BASE + stats.WIT_BASE !== STAT_POOL,
                                children: "Confirm"
                            }, void 0, false, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 379,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 375,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/text-rpg-v2/app/page.tsx",
                lineNumber: 362,
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
                                lineNumber: 389,
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
                                lineNumber: 390,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 388,
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
                                    minWidth: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            whiteSpace: "pre-wrap",
                                            lineHeight: 1.5
                                        },
                                        children: lines.map((t, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: t
                                            }, idx, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 400,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 398,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "grid",
                                            gap: 10,
                                            marginTop: 18
                                        },
                                        children: choices.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>choose(c.index),
                                                children: c.text
                                            }, c.index, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 406,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 404,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 397,
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
                                        lineNumber: 424,
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
                                                lineNumber: 427,
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
                                                lineNumber: 428,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 426,
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
                                                    fontSize: 13,
                                                    marginBottom: 4
                                                },
                                                children: "Equipped"
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 432,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 14
                                                },
                                                children: [
                                                    "Weapon: ",
                                                    pretty(uiEquippedWeapon)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 433,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 14
                                                },
                                                children: [
                                                    "Armor: ",
                                                    pretty(uiEquippedArmor)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 434,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 14
                                                },
                                                children: [
                                                    "Outfit: ",
                                                    pretty(uiEquippedOutfit)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 435,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 14
                                                },
                                                children: [
                                                    "Hat: ",
                                                    pretty(uiEquippedHat)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 436,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 14
                                                },
                                                children: [
                                                    "Necklace: ",
                                                    pretty(uiEquippedNecklace)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 437,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$text$2d$rpg$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 14
                                                },
                                                children: [
                                                    "Ring: ",
                                                    pretty(uiEquippedRing)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 438,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 431,
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
                                                lineNumber: 442,
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
                                                lineNumber: 444,
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
                                                        lineNumber: 448,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                                lineNumber: 446,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                                        lineNumber: 441,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/text-rpg-v2/app/page.tsx",
                                lineNumber: 414,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/text-rpg-v2/app/page.tsx",
                        lineNumber: 395,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/text-rpg-v2/app/page.tsx",
                lineNumber: 387,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/text-rpg-v2/app/page.tsx",
        lineNumber: 300,
        columnNumber: 5
    }, this);
}
_s(Page, "l+oe0GoOInN0lrn4gSXf3Na2Rls=");
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=text-rpg-v2_app_page_tsx_085577d9._.js.map