import React from "react";
import { ResourceBar, AttributeBar } from "./StatBar";
import { PaperDoll } from "./PaperDoll";
import { InventoryList } from "./InventoryList";

type Stats = {
    STR: { base: number; total: number };
    CHA: { base: number; total: number };
    WIT: { base: number; total: number };
    HP: { cur: number; max: number; bonus?: number };
    SP: { cur: number; max: number; bonus?: number };
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
    inventory: { name: string; count: number }[];
    isMobile: boolean;
    isDarkMode: boolean;
    borderColor: string;
    textColor: string;
    bgColor: string;
    formatItemName: (id: string) => string;
    baseHP: number; // needed for HP base marker
    baseSP: number; // needed for SP base marker
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
    baseSP
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
            <div style={{ fontWeight: 800, marginBottom: 12, fontSize: 14, opacity: 0.6 }}>{title}</div>

            <div style={{ marginBottom: 16 }}>
                <div style={{ opacity: 0.75, fontSize: 13, marginBottom: 2 }}>Coins</div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{coins}</div>
            </div>

            <ResourceBar
                label="HP"
                current={stats.HP.cur}
                max={stats.HP.max}
                bonus={stats.HP.bonus}
                base={baseHP}
                gradient="linear-gradient(90deg, #ff9d4d, #9d4dff)"
            />

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
            />

            <InventoryList items={inventory} />
        </aside>
    );
}
