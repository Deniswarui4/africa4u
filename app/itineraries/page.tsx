import Link from "next/link";
import { Clock, Map, Check, ArrowRight } from "lucide-react";

export default function ItinerariesPage() {
  const journeys = [
    { id: 1, title: "Classic Kenya Safari", duration: "7 Days", price: "$2,400", highlights: ["Maasai Mara", "Lake Nakuru", "Nairobi National Park"] },
    { id: 2, title: "Bush & Beach Retreat", duration: "10 Days", price: "$3,100", highlights: ["Tsavo East", "Diani Beach", "Mombasa"] },
    { id: 3, title: "The Great Migration Trail", duration: "8 Days", price: "$2,900", highlights: ["Mara River Crossing", "Serengeti Border", "Hot Air Balloon"] },
    { id: 4, title: "Northern Frontiers", duration: "6 Days", price: "$2,100", highlights: ["Samburu", "Ol Pejeta", "Reteti Elephant Sanctuary"] },
  ];

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">Curated Itineraries</h1>
        <p className="text-muted-foreground text-lg">Browse our expertly crafted journeys. Every itinerary can be fully customized to your exact preferences.</p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {journeys.map((item) => (
          <div key={item.id} className="flex flex-col md:flex-row bg-card rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="md:w-[35%] h-64 md:h-auto bg-muted">
              {/* Image placeholder */}
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-playfair text-2xl font-bold">{item.title}</h3>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground block mb-1">From</span>
                    <span className="font-bold text-xl text-primary">{item.price}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {item.duration}</span>
                  <span className="flex items-center gap-1"><Map className="h-4 w-4" /> {item.highlights.length} Locations</span>
                </div>
                
                <div className="space-y-2 mb-6">
                  {item.highlights.map((hlt, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{hlt}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t mt-4">
                <Link href={`/itineraries/${item.id}`} className="text-sm font-semibold text-primary hover:text-accent transition-colors flex items-center">
                  View full details <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
                <Link href="/plan" className="h-10 px-6 rounded-md bg-foreground text-background font-medium text-sm flex items-center justify-center hover:bg-foreground/90 transition-colors">
                  Customize
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
