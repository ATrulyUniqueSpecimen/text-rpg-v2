
import React from "react";

type ConfirmationModalProps = {
    isOpen: boolean;
    title: string;
    message: React.ReactNode;
    subtext?: string;
    confirmLabel?: string;
    confirmColor?: string; // Default to blue or specified
    onConfirm: () => void;
    onCancel: () => void;
    isDarkMode: boolean;
    overlayZIndex?: number;
};

export function ConfirmationModal({
    isOpen,
    title,
    message,
    subtext,
    confirmLabel = "Confirm",
    confirmColor = "#4d4dff",
    onConfirm,
    onCancel,
    isDarkMode,
    overlayZIndex = 5000
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    const bgColor = isDarkMode ? "#121212" : "#f5f5f5";
    const textColor = isDarkMode ? "#ffffff" : "#121212";
    const borderColor = isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(0,0,0,0.7)", zIndex: overlayZIndex, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
            <div style={{
                background: bgColor, color: textColor, padding: 24, borderRadius: 12,
                maxWidth: 320, width: "100%", boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                border: `1px solid ${borderColor}`
            }}>
                <h3 style={{ marginTop: 0 }}>{title}</h3>
                <div style={{ marginBottom: 16 }}>{message}</div>
                {subtext && <p style={{ fontSize: 13, opacity: 0.7, fontStyle: "italic", marginTop: -8, marginBottom: 20 }}>{subtext}</p>}

                <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
                    <button
                        onClick={onCancel}
                        style={{ background: "transparent", border: `1px solid ${borderColor}`, color: textColor, padding: "8px 16px", borderRadius: 6, cursor: "pointer" }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{ background: confirmColor, border: "none", color: "#fff", padding: "8px 16px", borderRadius: 6, cursor: "pointer" }}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
