import type { Metadata, Viewport } from 'next';
// import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

// System font fallbacks to avoid network issues with Google Fonts
const playfair = { variable: '--font-playfair', className: '' };
const inter = { variable: '--font-inter', className: '' };

export const metadata: Metadata = {
    title: 'My story with you',
    description: 'A deeply emotional, cinematic romantic journey.',
    icons: {
        icon: './logo.png',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#0a0e17',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
            <body className={`${inter.className} bg-black`}>
                <div className="film-grain" />
                {children}
            </body>
        </html>
    );
}
