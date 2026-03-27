import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curated Itineraries",
  description: "Browse expertly crafted Kenya travel itineraries. Bush & Beach combos, cultural immersions, family safaris, and luxury retreats — all customizable to your preferences.",
};

export default function ItinerariesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
