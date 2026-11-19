import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { BotanicalSprig } from "@/components/BotanicalElements";
import Link from "next/link";

export const metadata: Metadata = {
  title: "365 Days With Jesus | Daily Devotional & Christian Planner",
  description:
    "A peaceful and practical digital sanctuary designed for women seeking to build an unhurried daily relationship with God through Scripture, prayer, gratitude, and intentional living.",
  keywords: [
    "Christian Devotional",
    "Daily Devotional for Women",
    "Prayer Journal",
    "Gratitude Journal",
    "Scripture Reading Plan",
    "Christian Planner",
    "Printable Devotional",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-sanctuary-ivory text-sanctuary-cocoa antialiased selection:bg-sanctuary-blush selection:text-sanctuary-cocoa">
        <Navigation />

        {/* Main Content Area */}
        <main className="flex-1 pb-20 lg:pb-12 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {children}
        </main>

        {/* Peaceful Footer */}
        <footer className="w-full bg-sanctuary-ivoryLight border-t border-sanctuary-taupeLight/50 py-8 px-4 text-center print:hidden">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
            <BotanicalSprig className="w-6 h-6 text-sanctuary-rose opacity-80" />
            <p className="font-serif text-lg text-sanctuary-cocoa italic max-w-md">
              &ldquo;His compassions don&apos;t fail. They are new every morning. Great is Your faithfulness.&rdquo;
            </p>
            <p className="text-xs text-sanctuary-taupe">
              Scripture quotations are taken from the World English Bible (WEB), dedicated to the public domain.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-sanctuary-cocoaLight mt-2">
              <Link href="/devotional/1" className="hover:text-sanctuary-rose">Today&apos;s Devotional</Link>
              <span>•</span>
              <Link href="/calendar" className="hover:text-sanctuary-rose">365-Day Plan</Link>
              <span>•</span>
              <Link href="/prayer" className="hover:text-sanctuary-rose">Prayer Wall</Link>
              <span>•</span>
              <Link href="/gratitude" className="hover:text-sanctuary-rose">Gratitude</Link>
              <span>•</span>
              <Link href="/journal" className="hover:text-sanctuary-rose">Journal</Link>
              <span>•</span>
              <Link href="/printables/1" className="hover:text-sanctuary-rose">Printable Planner</Link>
            </div>
            <p className="text-[11px] text-sanctuary-taupe mt-1">
              &copy; {new Date().getFullYear()} 365 Days With Jesus. Start your day with faith. Live with gratitude. Walk with purpose.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
