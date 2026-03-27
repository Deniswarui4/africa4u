export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-8 w-1/3 bg-muted rounded-md mb-2" />
        <div className="h-4 w-1/2 bg-muted rounded-md" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-card p-6 rounded-xl border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-2/3 bg-muted rounded" />
                <div className="h-6 w-1/3 bg-muted rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-6 w-1/4 bg-muted rounded-md" />
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 h-48 bg-muted" />
        <div className="p-8 flex-1 space-y-4">
          <div className="h-6 w-1/2 bg-muted rounded" />
          <div className="h-4 w-3/4 bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted rounded" />
          <div className="flex gap-4 mt-4">
            <div className="h-10 w-32 bg-muted rounded-md" />
            <div className="h-10 w-32 bg-muted rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
