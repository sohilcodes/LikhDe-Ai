import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LikhDe AI — Hinglish Content Generator",
  description: "Indian creators ke liye AI-powered Hinglish captions, hooks, scripts aur hashtags. Free mein try karo!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
