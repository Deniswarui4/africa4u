import { Plane, CreditCard, MapPin, Clock, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TripsPage() {
  const trips = [
    { id: "1", name: "Bush & Beach Retreat", status: "confirmed", startDate: "Aug 15, 2026", endDate: "Aug 25, 2026", destination: "Maasai Mara → Diani Beach", price: "$3,100" },
    { id: "2", name: "Cultural Immersion Tour", status: "pending", startDate: "Oct 5, 2026", endDate: "Oct 12, 2026", destination: "Nairobi → Lamu Island", price: "$2,200" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold font-playfair mb-2">My Trips</h1>
      <p className="text-muted-foreground mb-8">Track all your active and past Kenyan adventures.</p>

      {trips.length === 0 ? (
        <div className="text-center py-20 bg-card border rounded-xl">
          <Plane className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-2">No trips yet</h3>
          <p className="text-muted-foreground mb-6">Start planning your dream Kenyan adventure.</p>
          <Link href="/plan" className="inline-flex h-10 px-6 items-center rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
            Plan a Trip <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {trips.map(trip => (
            <div key={trip.id} className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold">{trip.name}</h3>
                    {trip.status === "confirmed" && (
                      <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Confirmed</span>
                    )}
                    {trip.status === "pending" && (
                      <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">Pending</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {trip.destination}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {trip.startDate} — {trip.endDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Total Cost</p>
                    <p className="text-lg font-bold">{trip.price}</p>
                  </div>
                  <Link href={`/itineraries/${trip.id}`} className="h-10 px-4 rounded-md border text-sm font-medium hover:bg-muted transition-colors flex items-center">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
