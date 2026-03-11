import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteShell } from "@/components/layout/site-shell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Vulnexa",
  description: "Smart vulnerability assessment tool for web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen font-sans`}>
        <SiteShell>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </SiteShell>
      </body>
    </html>
  );
}
