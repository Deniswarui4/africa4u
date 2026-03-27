import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-10 md:py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="font-playfair font-bold text-xl text-primary">
            KenyanJustForYou
          </Link>
          <p className="text-sm text-muted-foreground">
            Experience Kenya like a local — personalized journeys designed just for you.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-foreground">Explore</h3>
          <Link href="/destinations" className="text-sm text-muted-foreground hover:text-foreground">Destinations</Link>
          <Link href="/itineraries" className="text-sm text-muted-foreground hover:text-foreground">Itineraries</Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-foreground">Company</h3>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-foreground">Legal</h3>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} KenyanJustForYou. All rights reserved.
      </div>
    </footer>
  );
}
