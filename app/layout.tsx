import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "KenyanJustForYou — Personalized Kenya Travel Planning",
    template: "%s | KenyanJustForYou",
  },
  description: "Plan your dream Kenyan safari, beach getaway, or cultural tour. Personalized itineraries crafted by local experts. Premium travel experiences across Maasai Mara, Diani Beach, Amboseli & more.",
  keywords: ["Kenya travel", "Kenya safari", "Maasai Mara", "Diani Beach", "Amboseli", "Kenya tour", "Africa travel planning", "luxury safari Kenya", "personalized itinerary"],
  authors: [{ name: "KenyanJustForYou" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KenyanJustForYou",
    title: "KenyanJustForYou — Personalized Kenya Travel Planning",
    description: "Personalized itineraries crafted by local experts. Premium travel experiences across Kenya.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KenyanJustForYou",
    description: "Experience Kenya like a local — personalized journeys designed just for you.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, playfair.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
