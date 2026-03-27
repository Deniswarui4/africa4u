import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Users, Star, Quote } from "lucide-react";

const destinations = [
  { name: "Maasai Mara", image: "/images/maasai-mara.png" },
  { name: "Diani Beach", image: "/images/diani-beach.png" },
  { name: "Amboseli", image: "/images/maasai-mara.png" },
  { name: "Lake Naivasha", image: "/images/naivasha.png" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-slate-900 flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/maasai-mara.png"
            alt="Maasai Mara savanna at sunset"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10" />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Experience Kenya like a local — without the stress of planning
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-10 font-medium drop-shadow">
            Personalized journeys designed just for you.
          </p>
          <Link
            href="/plan"
            className="inline-flex h-14 items-center justify-center rounded-lg bg-accent px-8 text-lg font-medium text-accent-foreground shadow hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-all group"
          >
            Plan My Trip
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Simplified Search/Filter Bar */}
      <section className="relative z-30 -mt-10 max-w-5xl mx-auto w-full px-4">
        <div className="bg-card rounded-xl shadow-xl border p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> Destination
            </label>
            <input type="text" placeholder="Where to?" className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" /> Dates
            </label>
            <input type="text" placeholder="Add dates" className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" /> Travelers
            </label>
            <input type="text" placeholder="2 Adults" className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div>
            <button className="w-full h-10 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Destinations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Discover the most iconic landscapes and hidden gems Kenya has to offer.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Link href="/destinations" key={dest.name} className="group relative h-80 rounded-xl overflow-hidden block">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity group-hover:opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <h3 className="font-playfair text-xl font-bold text-white mb-2">{dest.name}</h3>
                  <span className="text-sm text-white/80 font-medium flex items-center group-hover:text-accent transition-colors">
                    Explore <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Your dream Kenyan vacation in three simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Tell Us Your Dream", desc: "Fill out our short questionnaire about your travel style, budget, and must-sees." },
              { title: "Review Your Plan", desc: "Our local experts craft a personalized itinerary just for you to review and tweak." },
              { title: "Book & Go", desc: "Pay a secure deposit and let us handle all the logistics while you pack your bags." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-card rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl mb-6 font-playfair">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Travelers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Real stories from people who trusted us with their dream trips.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Emily R.", location: "United States", text: "An absolutely unforgettable experience. The team planned every single detail and it was pure magic from start to finish.", rating: 5 },
              { name: "James O.", location: "United Kingdom", text: "We've done safaris before, but nothing compared to Kenya with a local expert guiding every step. The Mara was extraordinary.", rating: 5 },
              { name: "Sophie L.", location: "Australia", text: "From the bush to the beach — it was the honeymoon of our dreams. Could not recommend this service more highly.", rating: 5 },
            ].map((testimonial, i) => (
              <div key={i} className="bg-card border rounded-2xl p-8 shadow-sm relative">
                <Quote className="h-8 w-8 text-primary/20 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
            <div>
              <p className="text-3xl font-bold font-playfair text-primary">500+</p>
              <p className="text-sm text-muted-foreground mt-1">Trips Planned</p>
            </div>
            <div>
              <p className="text-3xl font-bold font-playfair text-primary">98%</p>
              <p className="text-sm text-muted-foreground mt-1">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold font-playfair text-primary">4.9★</p>
              <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold font-playfair text-primary">24/7</p>
              <p className="text-sm text-muted-foreground mt-1">On-Trip Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

