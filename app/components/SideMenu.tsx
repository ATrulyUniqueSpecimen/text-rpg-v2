import React from "react";
import { ResourceBar, AttributeBar } from "./StatBar";
import { PaperDoll } from "./PaperDoll";
import { InventoryList, ItemAction } from "./InventoryList";



type Stats = {
    STR: { base: number; total: number };
    CHA: { base: number; total: number };
    WIT: { base: number; total: number };
    HP: { cur: number; max: number; bonus?: number };
    SP: { cur: number; max: number; bonus?: number };
    REP?: { base: number; total: number }; // Optional because not all entities have REP (player doesn't visualize it this way usually, but passed in stats)
};

type Equipment = {
    weapon: string;
    armor: string;
    outfit: string;
    hat: string;
    necklace: string;
    ring: string;
};

type SideMenuProps = {
    title: string;
    coins: number;
    stats: Stats;
    gender: "male" | "female" | "other";
    equipment: Equipment;
    inventory: { id?: string; name: string; count: number }[];
    isMobile: boolean;
    isDarkMode: boolean;
    borderColor: string;
    textColor: string;
    bgColor: string;
    formatItemName: (id: string) => string;
    baseHP: number; // needed for HP base marker
    baseSP: number; // needed for SP base marker
    isCompanion?: boolean;
    description?: string;
    onTransfer?: (itemId: string) => void; // Deprecated but kept for API compat if needed, though unused by InventoryList now
    transferLabel?: string;
    getItemActions?: (item: { id?: string; name: string; count: number }) => ItemAction[];
};

export function SideMenu({
    title,
    coins,
    stats,
    gender,
    equipment,
    inventory,
    isMobile,
    isDarkMode,
    borderColor,
    textColor,
    bgColor,
    formatItemName,
    baseHP,
    baseSP,
    isCompanion = false,
    description,
    getItemActions
}: SideMenuProps) {

    const desktopStyle: React.CSSProperties = {
        width: 260,
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
        padding: 16,
        position: "sticky",
        top: 20,
        background: isDarkMode ? "transparent" : "rgba(255,255,255,0.5)",
        animation: "fadeIn 0.3s ease",
        boxSizing: "border-box" // Added for consistency
    };

    const mobileStyle: React.CSSProperties = {
        width: "100%",
        maxWidth: "100%",
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
        padding: 16,
        background: isDarkMode ? "transparent" : "rgba(255,255,255,0.5)",
        animation: "fadeIn 0.3s ease",
        overflow: "hidden",
        boxSizing: "border-box"
    };

    return (
        <aside style={isMobile ? mobileStyle : desktopStyle}>
            <div style={{ fontWeight: 800, marginBottom: 8, fontSize: 14, opacity: 0.6 }}>{title}</div>

            {description && (
                <div style={{ fontSize: 12, fontStyle: "italic", opacity: 0.8, marginBottom: 12, lineHeight: 1.4 }}>
                    {description}
                </div>
            )}

            <div style={{ marginBottom: 16 }}>
                <div style={{ opacity: 0.75, fontSize: 13, marginBottom: 2 }}>Coins</div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{coins}</div>
            </div>

            {!isCompanion && (
                <ResourceBar
                    label="HP"
                    current={stats.HP.cur}
                    max={stats.HP.max}
                    bonus={stats.HP.bonus}
                    base={baseHP}
                    gradient="linear-gradient(90deg, #ff9d4d, #9d4dff)"
                />
            )}

            {isCompanion && stats.REP && (
                <ResourceBar
                    label="REP"
                    current={stats.REP.total} // REP usually doesn't have cur/max logic like HP, just total? Or base+bonus?
                    max={20} // Arbitrary max for bar visualization? Or should we use base+20?
                    // Let's assume max is dynamic or fixed high. User said starts at 5/10.
                    // Let's set max to be max(20, total)
                    base={stats.REP.base}
                    bonus={stats.REP.total - stats.REP.base}
                    gradient="linear-gradient(90deg, #ffd700, #8b4513)" // Yellow -> Brown
                />
            )}

            <ResourceBar
                label="SP"
                current={stats.SP.cur}
                max={stats.SP.max}
                bonus={stats.SP.bonus}
                base={baseSP}
                gradient="linear-gradient(90deg, #ff4dff, #4dff4d)"
            />

            <div style={{ marginBottom: 20 }}>
                <div style={{ opacity: 0.75, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Attributes</div>
                {(["STR", "CHA", "WIT"] as const).map((stat) => (
                    <AttributeBar
                        key={stat}
                        label={stat === "WIT" ? "INT" : stat}
                        base={stats[stat].base}
                        total={stats[stat].total}
                    />
                ))}
            </div>

            <PaperDoll
                gender={gender}
                equipment={equipment}
                isDarkMode={isDarkMode}
                formatItemName={formatItemName}
                textColor={textColor}
                bgColor={bgColor}
                isMobile={isMobile}
            />

            <InventoryList
                items={inventory}
                getItemActions={getItemActions}
            />
        </aside>
    );
}
