import { ItineraryCardSkeleton } from "@/components/ui/Skeleton";

export default function ItinerariesLoading() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="h-12 w-3/4 bg-muted rounded-md animate-pulse mx-auto mb-4" />
        <div className="h-6 w-1/2 bg-muted rounded-md animate-pulse mx-auto" />
      </div>
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <ItineraryCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
