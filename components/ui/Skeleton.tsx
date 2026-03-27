export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-muted ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
      <Skeleton className="h-60 w-full rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function ItineraryCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row bg-card rounded-xl border overflow-hidden shadow-sm">
      <Skeleton className="md:w-[35%] h-64 md:h-auto rounded-none" />
      <div className="p-6 md:p-8 flex-1 space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-7 w-1/2" />
          <Skeleton className="h-7 w-20" />
        </div>
        <Skeleton className="h-4 w-1/3" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
        <Skeleton className="h-10 w-32 mt-4" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[80vh] w-full animate-pulse bg-muted flex items-center justify-center">
      <div className="text-center space-y-6 max-w-4xl px-4">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <Skeleton className="h-14 w-48 mx-auto rounded-lg" />
      </div>
    </div>
  );
}
