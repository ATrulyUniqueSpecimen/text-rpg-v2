import React from "react";

type Item = { name: string; count: number };

type InventoryListProps = {
    items: Item[];
};

export function InventoryList({ items }: InventoryListProps) {
    return (
        <div>
            <div style={{ opacity: 0.5, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Inventory</div>
            {items.length === 0 ? (
                <div style={{ opacity: 0.4, fontSize: 13, fontStyle: "italic" }}>No items</div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {items.map((item) => (
                        <div key={item.name} style={{ fontSize: 13, background: "rgba(128,128,128,0.1)", padding: "4px 8px", borderRadius: 4 }}>
                            {item.name}
                            {item.count > 1 && ` (${item.count})`}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
