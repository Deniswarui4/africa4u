import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Filter, Search } from "lucide-react";

const imageMap: Record<string, string> = {
  "Maasai Mara": "/images/maasai-mara.png",
  "Diani Beach": "/images/diani-beach.png",
  "Amboseli": "/images/maasai-mara.png",
  "Lamu Island": "/images/diani-beach.png",
  "Samburu": "/images/naivasha.png",
  "Lake Nakuru": "/images/naivasha.png",
};

export default function DestinationsPage() {
  const destinations = [
    { id: 1, name: "Maasai Mara", desc: "The quintessential African safari experience, famous for the Great Migration.", type: "Safari" },
    { id: 2, name: "Diani Beach", desc: "White sands and turquoise waters of the pristine Kenyan coast.", type: "Beach" },
    { id: 3, name: "Amboseli", desc: "Large elephant herds with Mount Kilimanjaro in the backdrop.", type: "Safari" },
    { id: 4, name: "Lamu Island", desc: "A serene, car-free island with rich Swahili culture and history.", type: "Culture" },
    { id: 5, name: "Samburu", desc: "Unique wildlife species in a rugged, less-crowded northern landscape.", type: "Safari" },
    { id: 6, name: "Lake Nakuru", desc: "Spectacular flamingos and a sanctuary for endangered rhinos.", type: "Safari" },
  ];

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">Explore Destinations</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">From sweeping savannas to pristine coastal shores, discover the locations that make Kenya unforgettable.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search..." className="h-10 pl-9 pr-4 rounded-md border border-input text-sm w-[200px]" />
          </div>
          <button className="h-10 px-4 flex items-center gap-2 border border-input rounded-md text-sm font-medium hover:bg-muted">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <div key={dest.id} className="group rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-60 relative overflow-hidden">
               <Image
                 src={imageMap[dest.name] || "/images/maasai-mara.png"}
                 alt={dest.name}
                 fill
                 className="object-cover transition-transform duration-500 group-hover:scale-105"
                 sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
               />
               <span className="absolute top-4 left-4 z-10 bg-primary/90 text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">{dest.type}</span>
            </div>
            <div className="p-6">
              <h3 className="font-playfair text-xl font-bold mb-2">{dest.name}</h3>
              <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{dest.desc}</p>
              <Link href={`/destinations/${dest.id}`} className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                Explore <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

