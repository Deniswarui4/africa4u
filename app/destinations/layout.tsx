import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Destinations",
  description: "Discover Kenya's most iconic safari parks, pristine beaches, and hidden cultural gems. From the Maasai Mara to Diani Beach — find your perfect destination.",
};

export default function DestinationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
