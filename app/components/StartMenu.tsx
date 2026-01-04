import React from "react";

type SaveMetadata = {
    name: string;
    date: string;
};

type StartMenuProps = {
    menuView: "splash" | "saves" | "achievements" | "settings";
    setMenuView: (view: "splash" | "saves" | "achievements" | "settings") => void;
    isDarkMode: boolean;
    pendingDarkMode: boolean;
    setPendingDarkMode: (v: boolean) => void;
    confirmTheme: () => void;
    isMobileView: boolean;
    setIsMobileView: (v: boolean) => void;
    slotHasSave: (SaveMetadata | null)[];
    handleQuickNewGame: () => void;
    handleQuickContinue: () => void;
    achievements: Record<string, boolean>;
    loadSlot: (slot: number) => void;
    beginNewGame: (slot: number) => void;
    showDeleteConfirm: number | null;
    setShowDeleteConfirm: (slot: number | null) => void;
    clearSlot: (slot: number) => void;
    borderColor: string;
    textColor: string;
};

export function StartMenu({
    menuView,
    setMenuView,
    isDarkMode,
    pendingDarkMode,
    setPendingDarkMode,
    confirmTheme,
    isMobileView,
    setIsMobileView,
    slotHasSave,
    handleQuickNewGame,
    handleQuickContinue,
    achievements,
    loadSlot,
    beginNewGame,
    showDeleteConfirm,
    setShowDeleteConfirm,
    clearSlot,
    borderColor,
    textColor,
}: StartMenuProps) {
    return (
        <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
            {menuView === "splash" && (
                <div style={{ textAlign: "center", animation: "fadeIn 1s ease" }}>
                    <h1 style={{ fontSize: 48, marginBottom: 8, background: "linear-gradient(90deg, #ff4d4d, #4d4dff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        <br />
                        Text RPG
                    </h1>
                    <p style={{ opacity: 0.6, fontSize: 18, marginBottom: 32 }}>by ATrulyUniqueSpecimen</p>
                    <p style={{ maxWidth: 500, margin: "0 auto 48px", lineHeight: 1.6, opacity: 0.85 }}>
                        <br />
                        A choose your-own adventure text-based RPG.
                        <br />
                        <br />
                        This is a work in progress, and is not yet complete. Feel free to report bugs or suggest features for future implementation in the message box at the bottom of the game.
                        <br />
                        <br />
                        This is a free game, and will always remain so.
                        <br />
                        <br />
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
                            disabled={!slotHasSave.some(s => s !== null)}
                            style={{
                                background: slotHasSave.some(s => s !== null) ? "rgba(128,128,128,0.2)" : "rgba(128,128,128,0.1)",
                                border: "none", color: textColor, padding: "12px 32px", borderRadius: 8,
                                fontSize: 18, fontWeight: 700, cursor: slotHasSave.some(s => s !== null) ? "pointer" : "not-allowed",
                                opacity: slotHasSave.some(s => s !== null) ? 1 : 0.4
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
                        {[0, 1, 2].map(slot => {
                            const meta = slotHasSave[slot];
                            return (
                                <div key={slot} style={{ border: `1px solid ${borderColor}`, borderRadius: 10, padding: 12, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 20, background: "rgba(128,128,128,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                                            {slot + 1}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700 }}>
                                                {meta ? meta.name : `Slot ${slot + 1}`}
                                            </div>
                                            <div style={{ fontSize: 12, opacity: 0.5 }}>
                                                {meta ? `Saved: ${meta.date}` : "Empty Slot"}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", gap: 8, justifyContent: isMobileView && meta ? "center" : "flex-end", flexWrap: "wrap" }}>
                                        {meta ? (
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
                                                        onClick={() => {
                                                            clearSlot(showDeleteConfirm);
                                                            setShowDeleteConfirm(null);
                                                        }}
                                                        style={{ background: "#ff4d4d", border: "none", color: "#fff", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}
                                                    >
                                                        Yes, Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
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

            <div style={{ position: "fixed", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 20, zIndex: 10 }}>
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
    );
}
