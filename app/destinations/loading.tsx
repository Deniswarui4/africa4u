import { CardSkeleton } from "@/components/ui/Skeleton";

export default function DestinationsLoading() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="mb-10">
        <div className="h-12 w-2/3 bg-muted rounded-md animate-pulse mb-4" />
        <div className="h-6 w-1/2 bg-muted rounded-md animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
