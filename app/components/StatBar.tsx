import React from "react";

type ResourceBarProps = {
    label: string;
    current: number;
    max: number;
    bonus?: number;
    gradient: string;
    base: number;
};

export function ResourceBar({ label, current, max, bonus = 0, gradient, base }: ResourceBarProps) {
    const percent = max > 0 ? (current / max) * 100 : 0;
    const basePercent = max > 0 ? (base / max) * 100 : 0;
    const displayBaseMarker = current < max;

    return (
        <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <div style={{ opacity: 0.75, fontSize: 13, fontWeight: 600 }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>
                    {current}/{max}
                    <span style={{ opacity: 0.6, fontSize: 11, marginLeft: 4 }}>
                        ({bonus >= 0 ? "+" : ""}{bonus})
                    </span>
                </div>
            </div>
            <div style={{ height: 10, background: "rgba(128,128,128,0.15)", borderRadius: 5, overflow: "hidden", position: "relative" }}>
                <div
                    style={{
                        width: `${percent}%`,
                        height: "100%",
                        background: gradient,
                        transition: "width 0.5s ease",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        left: `${basePercent}%`,
                        top: 0,
                        bottom: 0,
                        width: 2,
                        background: "rgba(255,255,255,0.8)",
                        display: displayBaseMarker ? "block" : "none",
                    }}
                />
            </div>
        </div>
    );
}

type AttributeBarProps = {
    label: string;
    base: number;
    total: number;
};

export function AttributeBar({ label, base, total }: AttributeBarProps) {
    const fillPercent = Math.min(100, Math.max(0, (total / 20) * 100));
    const basePercent = Math.min(100, Math.max(0, (base / 20) * 100));
    const bonus = total - base;
    return (
        <div style={{ display: "flex", alignItems: "center", fontSize: 13, marginBottom: 8 }}>
            <span style={{ fontWeight: 700, width: 32 }}>{label}</span>
            <div style={{ flex: 1, height: 6, background: "rgba(128,128,128,0.1)", borderRadius: 3, margin: "0 8px", position: "relative", overflow: "hidden" }}>
                <div style={{ width: `${fillPercent}%`, height: "100%", background: "linear-gradient(90deg, #ff4d4d, #4d4dff)", transition: "width 0.3s ease" }} />
                <div style={{ position: "absolute", left: `${basePercent}%`, top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,0.8)" }} />
            </div>
            <span style={{ width: 60, textAlign: "right", fontWeight: 700 }}>
                {total} <span style={{ opacity: 0.6, fontSize: 11 }}>({bonus >= 0 ? "+" : ""}{bonus})</span>
            </span>
        </div>
    );
}
