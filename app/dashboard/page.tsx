import { Calendar, MapPin, PlaneTakeoff, Clock } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-playfair mb-2">Welcome Back, Traveler!</h1>
      <p className="text-muted-foreground mb-8">Here is the latest status of your upcoming journeys.</p>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><PlaneTakeoff /></div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Upcoming Trips</p>
              <h3 className="text-2xl font-bold">1</h3>
            </div>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent"><MapPin /></div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Destinations</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary"><Calendar /></div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Days Until Departure</p>
              <h3 className="text-2xl font-bold">45</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Active Trip Card */}
      <h2 className="text-xl font-bold mb-4 font-playfair">Your Next Adventure</h2>
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-muted h-48 md:h-auto">
          {/* Cover Image Placeholder */}
        </div>
        <div className="p-6 md:p-8 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold mb-2">Confirmed</span>
              <h3 className="text-2xl font-bold font-playfair">The Great Migration Trail</h3>
            </div>
            <div className="text-right">
              <span className="text-sm text-muted-foreground block">Aug 12 - Aug 19, 2026</span>
              <span className="text-sm text-muted-foreground block flex items-center gap-1 justify-end mt-1"><Clock className="h-3 w-3"/> 8 Days</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-6 max-w-lg">
            Your personalized itinerary covering the Maasai Mara, Lake Nakuru, and a breathtaking Hot Air Balloon safari at dawn.
          </p>
          <div className="flex gap-4">
            <button className="h-10 px-4 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors">
              View Itinerary
            </button>
            <button className="h-10 px-4 border border-input text-foreground text-sm font-medium rounded-md hover:bg-muted transition-colors">
              Payment Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
