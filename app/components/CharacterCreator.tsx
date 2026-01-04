import React, { useState } from "react";
import { StatEditor } from "./StatEditor";

type BaseStats = {
    STR_BASE: number;
    CHA_BASE: number;
    WIT_BASE: number;
    HP_BASE: number;
    SP_BASE: number;
};

type CharacterCreatorProps = {
    stats: BaseStats;
    setStats: (s: BaseStats) => void;
    pool: number;
    gender: "male" | "female" | "other";
    setGender: (g: "male" | "female" | "other") => void;
    name: string;
    setName: (n: string) => void;
    confirmStats: () => void;
    onBack: () => void;
    textColor: string;
    pendingSlot: number | null;
    slotHasSave: (any | null)[];  // relaxed type for now to avoid circular dependency issues during refactor
    showOverwriteConfirm: boolean;
    setShowOverwriteConfirm: (v: boolean) => void;
    executeStatsConfirm: () => void;
    isDarkMode: boolean;
};

export function CharacterCreator({
    stats,
    setStats,
    pool,
    gender,
    setGender,
    name,
    setName,
    confirmStats,
    onBack,
    textColor,
    pendingSlot,
    slotHasSave,
    showOverwriteConfirm,
    setShowOverwriteConfirm,
    executeStatsConfirm,
    isDarkMode,
}: CharacterCreatorProps) {
    // Validation modal states
    const [showNoNameModal, setShowNoNameModal] = useState(false);
    const [showPointsWarningModal, setShowPointsWarningModal] = useState(false);

    const total = stats.STR_BASE + stats.CHA_BASE + stats.WIT_BASE + stats.HP_BASE + stats.SP_BASE;
    const allPointsAssigned = total === pool;

    function handleConfirmClick() {
        // Check for no name first
        if (name.trim().length === 0) {
            setShowNoNameModal(true);
            return;
        }

        // Check for unassigned points
        if (!allPointsAssigned) {
            setShowPointsWarningModal(true);
            return;
        }

        // All good, proceed with confirmation
        confirmStats();
    }

    function handleContinueAnyway() {
        setShowPointsWarningModal(false);
        confirmStats();
    }

    const modalOverlayStyle: React.CSSProperties = {
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "rgba(0,0,0,0.8)", zIndex: 5000, display: "flex",
        alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)"
    };

    const modalBoxStyle: React.CSSProperties = {
        background: isDarkMode ? "#1e1e1e" : "#fff", padding: 32,
        borderRadius: 16, border: "2px solid #4d4dff", maxWidth: 400, textAlign: "center",
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)", animation: "fadeIn 0.3s ease"
    };

    return (
        <div>
            <h1 style={{ marginBottom: 8 }}>Create Character</h1>
            <div style={{ marginBottom: 16, marginTop: 32 }}>
                <div style={{ opacity: 0.85, marginBottom: 8 }}>Name</div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={12}
                    placeholder="Enter Name"
                    style={{
                        padding: "10px 16px",
                        fontSize: 16,
                        background: "rgba(128,128,128,0.1)",
                        border: "1px solid rgba(128,128,128,0.3)",
                        borderRadius: 6,
                        color: textColor,
                        width: "100%",
                        boxSizing: "border-box",
                        outline: "none"
                    }}
                />
            </div>

            <div style={{ marginBottom: 24 }}>
                <div style={{ opacity: 0.85, marginBottom: 8, marginTop: 8 }}>Gender</div>
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

            <StatEditor stats={stats} setStats={setStats} pool={pool} />

            <div style={{ display: "flex", gap: 10, marginTop: 32, flexWrap: "wrap", alignItems: "center" }}>
                <button onClick={onBack} style={{ background: "rgba(128,128,128,0.2)", border: "none", color: textColor, padding: "8px 16px", borderRadius: 6, cursor: "pointer" }}>
                    Back
                </button>
                <button
                    onClick={handleConfirmClick}
                    style={{
                        background: "linear-gradient(90deg, #ff4d4d, #4d4dff)",
                        border: "none",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: 6,
                        cursor: "pointer",
                        fontWeight: 700
                    }}>
                    Confirm
                </button>
                {pendingSlot !== null && slotHasSave[pendingSlot] && (
                    <div style={{ color: "#ff4d4d", fontSize: 13, fontWeight: 600, animation: "fadeIn 0.5s ease" }}>
                        ⚠️ Confirmation will overwrite Slot {pendingSlot + 1}
                    </div>
                )}
            </div>

            {/* Overwrite Save Confirmation Modal */}
            {showOverwriteConfirm && (
                <div style={modalOverlayStyle}>
                    <div style={{
                        ...modalBoxStyle,
                        border: "2px solid #ff4d4d"
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

            {/* No Name Modal */}
            {showNoNameModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalBoxStyle}>
                        <h3 style={{
                            background: "linear-gradient(90deg, #ff4d4d, #4d4dff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            marginTop: 0
                        }}>No Name Entered</h3>
                        <p style={{ opacity: 0.8, lineHeight: 1.5 }}>
                            Your character needs a name before you can continue.
                        </p>
                        <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
                            <button
                                onClick={() => setShowNoNameModal(false)}
                                style={{
                                    background: "linear-gradient(90deg, #ff4d4d, #4d4dff)",
                                    border: "none",
                                    color: "#fff",
                                    padding: "10px 20px",
                                    borderRadius: 8,
                                    cursor: "pointer",
                                    fontWeight: 700
                                }}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Points Not Assigned Warning Modal */}
            {showPointsWarningModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalBoxStyle}>
                        <h3 style={{
                            background: "linear-gradient(90deg, #ff4d4d, #4d4dff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            marginTop: 0
                        }}>Unassigned Points</h3>
                        <p style={{ opacity: 0.8, lineHeight: 1.5 }}>
                            You still have <strong>{pool - total}</strong> attribute points remaining. Are you sure you want to continue without assigning them?
                        </p>
                        <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
                            <button
                                onClick={() => setShowPointsWarningModal(false)}
                                style={{ background: "rgba(128,128,128,0.2)", border: "none", color: textColor, padding: "10px 20px", borderRadius: 8, cursor: "pointer" }}
                            >
                                Go Back
                            </button>
                            <button
                                onClick={handleContinueAnyway}
                                style={{
                                    background: "linear-gradient(90deg, #ff4d4d, #4d4dff)",
                                    border: "none",
                                    color: "#fff",
                                    padding: "10px 20px",
                                    borderRadius: 8,
                                    cursor: "pointer",
                                    fontWeight: 700
                                }}
                            >
                                Continue Anyway
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
