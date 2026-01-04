import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 });

        // Attempt insert
        // Note: We perform a safe check IF table exists, but usually we assume it does.
        // If it fails, it might be due to table missing.
        await sql`INSERT INTO feedback (message) VALUES (${message});`;
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        // Simple fetch all
        const { rows } = await sql`SELECT * FROM feedback ORDER BY created_at DESC;`;
        return NextResponse.json({ feedback: rows }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
