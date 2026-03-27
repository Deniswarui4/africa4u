import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Your Dream Trip",
  description: "Tell us about your ideal Kenyan adventure and our local experts will craft a personalized day-by-day itinerary tailored to your budget and travel style.",
};

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
