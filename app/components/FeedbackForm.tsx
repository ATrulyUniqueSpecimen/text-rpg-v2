import React, { useState } from 'react';

type FeedbackFormProps = {
    textColor: string;
    bgColor: string;
    borderColor: string;
};

export function FeedbackForm({ textColor, bgColor, borderColor }: FeedbackFormProps) {
    const [text, setText] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async () => {
        if (!text.trim()) return;
        setIsSending(true);

        try {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            if (res.ok) {
                setSent(true);
                setText("");
                setTimeout(() => setSent(false), 3000);
            } else {
                console.error("Failed to send feedback");
            }
        } catch (e) {
            console.error("Error sending feedback", e);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div style={{ marginTop: 0, borderTop: `1px solid ${borderColor}40`, paddingTop: 16, width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <h3 style={{ fontSize: "0.9rem", opacity: 0.7, margin: 0, textAlign: "left" }}>
                    Suggest new features or report bugs here.
                </h3>
                <button
                    onClick={handleSubmit}
                    disabled={!text.trim() || isSending}
                    style={{
                        padding: "4px 12px",
                        background: (!text.trim() || isSending) ? "#ccc" : "#9d4dff",
                        color: (!text.trim() || isSending) ? "#666" : "#fff",
                        border: "none",
                        borderRadius: 4,
                        cursor: (!text.trim() || isSending) ? "not-allowed" : "pointer",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        transition: "background 0.2s"
                    }}
                >
                    {isSending ? "..." : sent ? "Sent!" : "Send"}
                </button>
            </div>

            <div style={{ position: "relative", width: "100%" }}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Send me a message..."
                    disabled={isSending}
                    style={{
                        width: "100%",
                        minHeight: 60,
                        height: 60,
                        boxSizing: "border-box",
                        background: bgColor,
                        color: textColor,
                        border: `1px solid ${borderColor}`,
                        borderRadius: 8,
                        padding: 12,
                        fontFamily: "inherit",
                        fontSize: "0.9rem",
                        resize: "vertical",
                        outline: "none",
                        transition: "border-color 0.2s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#9d4dff"}
                    onBlur={(e) => e.target.style.borderColor = borderColor}
                />
            </div>
        </div>
    );
}
