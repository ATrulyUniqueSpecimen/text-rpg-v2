import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Text RPG',
    description: 'A choose your own adventure game',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
