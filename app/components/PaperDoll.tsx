import React from "react";

type Equipment = {
    weapon: string;
    armor: string;
    outfit: string;
    hat: string;
    necklace: string;
    ring: string;
};

type PaperDollProps = {
    gender: "male" | "female" | "other";
    equipment: Equipment;
    isDarkMode: boolean;
    formatItemName: (id: string) => string;
    textColor: string;
    bgColor: string;
    isMobile?: boolean;
};

export function PaperDoll({ gender, equipment, isDarkMode, formatItemName, textColor, bgColor, isMobile }: PaperDollProps) {
    // Logic derived from companion menu to ensure correct alignment for both genders
    const avatarY = gender === "female" ? 0 : 0;
    const slotShiftX = 16;

    const slots = [
        { id: "hat", icon: "/assets/icon_hat.png", x: -6 + slotShiftX, y: 0, slot: equipment.hat },
        { id: "outfit", icon: "/assets/icon_outfit.png", x: -6 + slotShiftX, y: 60, slot: equipment.outfit },
        { id: "ring", icon: null, x: -6 + slotShiftX, y: 120, slot: equipment.ring },
        { id: "necklace", icon: "/assets/icon_necklace.png", x: 180 + slotShiftX, y: 0, slot: equipment.necklace },
        { id: "armor", icon: "/assets/icon_armor.png", x: 180 + slotShiftX, y: 60, slot: equipment.armor },
        { id: "weapon", icon: "/assets/icon_weapon.png", x: 180 + slotShiftX, y: 120, slot: equipment.weapon },
    ] as const;

    return (
        <div style={{ marginBottom: 24, position: "relative", height: 180, width: "100%", maxWidth: 260, margin: "0 auto" }}>
            {/* Silhouette */}
            <div style={{
                position: "absolute", left: "50%", top: "50%",
                transform: isMobile ? "translate(calc(-50% - 0px), -50%)" : "translate(-50%, -50%)",
                width: 200, height: 480,
                backgroundImage: `url(${(gender + "").toLowerCase() === "female" ? "/assets/body_silhouette_female.png" : "/assets/body_silhouette.png"})`,
                backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                opacity: 0.6, filter: isDarkMode ? "invert(1)" : "none"
            }} />

            {/* Connection Lines */}
            <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.3 }}>
                <line x1={46 + slotShiftX} y1={24} x2={113 + slotShiftX} y2={15 + avatarY} stroke={textColor} strokeWidth="1" />
                <line x1={46 + slotShiftX} y1={84} x2={100 + slotShiftX} y2={40 + avatarY} stroke={textColor} strokeWidth="1" />
                <line x1={46 + slotShiftX} y1={144} x2={76 + slotShiftX} y2={94 + avatarY} stroke={textColor} strokeWidth="1" />
                <line x1={180 + slotShiftX} y1={24} x2={113 + slotShiftX} y2={42 + avatarY} stroke={textColor} strokeWidth="1" />
                <line x1={180 + slotShiftX} y1={84} x2={113 + slotShiftX} y2={55 + avatarY} stroke={textColor} strokeWidth="1" />
                <line x1={180 + slotShiftX} y1={144} x2={150 + slotShiftX} y2={90 + avatarY} stroke={textColor} strokeWidth="1" />
            </svg>

            {/* Slots */}
            {slots.map((item) => {
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
                            {isEquipped ? formatItemName(item.slot) : "Empty"}
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
    );
}
