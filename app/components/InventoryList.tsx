import React from "react";

type Item = { id?: string; name: string; count: number };

export type ItemAction = {
    label: string;
    color: string;
    onClick: () => void;
};

type InventoryListProps = {
    items: Item[];
    getItemActions?: (item: Item) => ItemAction[];
};

export function InventoryList({ items, getItemActions }: InventoryListProps) {
    return (
        <div>
            <div style={{ opacity: 0.5, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Inventory</div>
            {items.length === 0 ? (
                <div style={{ opacity: 0.4, fontSize: 13, fontStyle: "italic" }}>No items</div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {items.map((item) => {
                        const actions = getItemActions ? getItemActions(item) : [];
                        return (
                            <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, background: "rgba(128,128,128,0.1)", padding: "4px 8px", borderRadius: 4 }}>
                                <span>
                                    {item.name}
                                    {item.count > 1 && <span style={{ marginLeft: 8, fontWeight: 700, color: "#aaa" }}>x{item.count}</span>}
                                </span>
                                <div style={{ display: "flex", gap: 4 }}>
                                    {actions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            onClick={action.onClick}
                                            style={{
                                                background: action.color,
                                                border: "none",
                                                borderRadius: 4,
                                                color: action.color === "#ffd700" ? "#000" : "#fff",
                                                fontSize: 10,
                                                fontWeight: action.color === "#ffd700" ? 700 : 400,
                                                padding: "2px 6px",
                                                cursor: "pointer",
                                                opacity: 0.9
                                            }}
                                            title={action.label}
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )
            }
        </div >
    );
}
