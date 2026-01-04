'use client';
import { useState, useEffect } from 'react';

type FeedbackProps = {
    id: number;
    message: string;
    created_at: string;
};

export default function AdminPage() {
    const [msgs, setMsgs] = useState<FeedbackProps[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMsgs = async () => {
        try {
            const res = await fetch('/api/feedback');
            const data = await res.json();
            if (data.feedback) setMsgs(data.feedback);
        } catch (e) {
            console.error("Failed to fetch", e);
        }
        setLoading(false);
    };

    useEffect(() => { fetchMsgs(); }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this message?")) return;
        try {
            await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
            fetchMsgs();
        } catch (e) {
            alert("Delete failed");
        }
    };

    if (loading) return <div style={{ padding: 40 }}>Loading repository...</div>;

    return (
        <div style={{ padding: 40, fontFamily: 'monospace', maxWidth: 1000, margin: '0 auto' }}>
            <h1 style={{ marginBottom: 20 }}>Feedback Repository</h1>
            <div style={{ marginBottom: 20 }}>
                <button onClick={fetchMsgs} style={{ padding: "8px 16px", cursor: "pointer" }}>Refresh</button>
            </div>
            {msgs.length === 0 ? (
                <p>No feedback messages found.</p>
            ) : (
                <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse', textAlign: "left" }}>
                    <thead style={{ background: "#eee", color: "#000" }}>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Message</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {msgs.map(m => (
                            <tr key={m.id}>
                                <td>{m.id}</td>
                                <td style={{ minWidth: 160 }}>{new Date(m.created_at).toLocaleString()}</td>
                                <td>{m.message}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(m.id)}
                                        style={{ background: "#ff4d4d", color: "#fff", border: "none", padding: "4px 8px", borderRadius: 4, cursor: "pointer" }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
