import React from "react";

type BaseStats = {
    STR_BASE: number;
    CHA_BASE: number;
    WIT_BASE: number;
    HP_BASE: number;
    SP_BASE: number;
};

type StatEditorProps = {
    stats: BaseStats;
    setStats: (s: BaseStats) => void;
    pool: number;
};

export function StatEditor({ stats, setStats, pool }: StatEditorProps) {
    const total = stats.STR_BASE + stats.CHA_BASE + stats.WIT_BASE + stats.HP_BASE + stats.SP_BASE;
    const remaining = pool - total;

    function setOne(k: keyof BaseStats, v: number) {
        const clamped = Math.max(8, Math.min(20, v));
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
        <div style={{ display: "grid", gap: 12 }}>
            <div style={{ opacity: 0.85 }}> Attributes (Points Remaining: {remaining})</div>

            {(["HP_BASE", "SP_BASE", "STR_BASE", "CHA_BASE", "WIT_BASE"] as const).map((k) => (
                <div key={k} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 10, alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <div style={{ width: 40, fontWeight: 700 }}>{LABELS[k].short}</div>
                        <div style={{ fontSize: 11, opacity: 0.6 }}>{LABELS[k].full}</div>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "flex-end" }}>
                        <button onClick={() => setOne(k, stats[k] - 1)} disabled={stats[k] <= 8}>
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
