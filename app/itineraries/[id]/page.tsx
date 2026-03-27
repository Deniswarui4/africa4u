import Image from "next/image";
import Link from "next/link";
import { Check, CalendarDays, Users, Shield, ArrowRight } from "lucide-react";
import { CheckoutButton } from "@/components/payments/CheckoutButton";

export default function ItineraryDetails() {
  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      {/* Hero Header */}
      <div className="w-full h-[50vh] bg-slate-900 relative">
        <div className="absolute inset-0 z-0 bg-primary/40" />
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10 text-white">
          <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-bold w-max mb-4">SAFARI & BEACH</span>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">Bush & Beach Retreat</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow">The ultimate 10-day combination of thrilling wildlife encounters in the Mara and absolute relaxation on Diani Beach.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Content */}
        <div className="w-full lg:w-2/3 bg-card rounded-2xl shadow-sm border p-6 md:p-10">
          <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Trip Overview</h2>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            Experience the breathtaking contrast of Kenya's diverse landscapes. Begin your journey exploring the world-famous Maasai Mara, home to the Big Five and sweeping savannas. After days of thrilling game drives, fly directly to the pristine white sands of Diani Beach for complete relaxation by the warm Indian Ocean.
          </p>

          <h3 className="text-xl font-bold mb-4">Highlights</h3>
          <ul className="grid sm:grid-cols-2 gap-3 mb-10">
            {['Morning and evening game drives in the Maasai Mara', 'Luxury tented camp experience', 'Direct flight from Savannah to Coast', 'Sunset dhow cruise on the Indian Ocean', 'Snorkeling at Kisite-Mpunguti Marine Park', 'Exclusive beach resort stay'].map((h, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Day-by-Day Itinerary</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {/* Day 1-3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group md:even:text-right is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-primary text-primary-foreground font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">1-3</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-muted/50 p-6 rounded-xl border">
                <h4 className="font-playfair text-xl font-bold mb-2">Arrival & Maasai Mara</h4>
                <p className="text-muted-foreground text-sm">Arrive in Nairobi, transfer to Wilson Airport for your flight to the Mara. Settle into your luxury luxury camp followed by an afternoon game drive.</p>
              </div>
            </div>
            
            {/* Day 4-6 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group md:even:text-right">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-secondary text-secondary-foreground font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">4-6</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-muted/50 p-6 rounded-xl border">
                <h4 className="font-playfair text-xl font-bold mb-2">Deep Safari Exploration</h4>
                <p className="text-muted-foreground text-sm">Full days tracking predators and witnessing incredible wildlife interactions. Optional hot air balloon ride at dawn.</p>
              </div>
            </div>

            {/* Day 7-10 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group md:even:text-right">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-accent text-accent-foreground font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">7-10</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-muted/50 p-6 rounded-xl border">
                <h4 className="font-playfair text-xl font-bold mb-2">Diani Beach Relaxation</h4>
                <p className="text-muted-foreground text-sm">Fly direct from Mara to Ukunda. Enjoy world-class white sand beaches, spa treatments, and water sports at your leisure before departure.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Sidebar */}
        <div className="w-full lg:w-1/3 sticky top-24">
          <div className="bg-card rounded-2xl shadow-lg border overflow-hidden">
            <div className="p-6 bg-primary/5 border-b">
              <span className="text-sm font-semibold text-muted-foreground">Price Estimate</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold text-foreground">$3,100</span>
                <span className="text-muted-foreground">/ person</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">*Based on double occupancy in mid-season</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"><CalendarDays className="h-5 w-5 text-primary" /></div>
                <div>
                  <p className="text-sm font-semibold">10 Days / 9 Nights</p>
                  <p className="text-xs text-muted-foreground">Flexible start dates</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"><Shield className="h-5 w-5 text-primary" /></div>
                <div>
                  <p className="text-sm font-semibold">Financial Protection</p>
                  <p className="text-xs text-muted-foreground">Secure booking guarantee</p>
                </div>
              </div>
              
              <Link href="/plan" className="w-full h-12 rounded-lg bg-accent text-accent-foreground font-medium text-base flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors mt-6 shadow-sm">
                Customize This Trip <ArrowRight className="h-5 w-5" />
              </Link>

              <div className="pt-2">
                 <CheckoutButton 
                    email="guest@kenyanjustforyou.com" 
                    amount={3100} 
                    tripId="trip_123" 
                    userId="user_123" 
                 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
