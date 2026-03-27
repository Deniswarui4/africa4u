import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-playfair font-bold text-xl text-primary">KenyanJustForYou</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/destinations"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Destinations
            </Link>
            <Link
              href="/itineraries"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Itineraries
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/plan" className="hidden md:inline-flex text-sm font-medium hover:underline px-4">
            Plan My Trip
          </Link>
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Login
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
