import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import { WikiShell } from "@/components/layout/WikiShell";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Idle Hunter Wiki",
    template: "%s — Idle Hunter Wiki",
  },
  description: "The community wiki for Idle Hunter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} site-bg h-full`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <WikiShell>{children}</WikiShell>
      </body>
    </html>
  );
}
