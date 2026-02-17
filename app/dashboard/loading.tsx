export default function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-6 shadow-sm animate-pulse">
        <div className="h-8 w-64 bg-muted rounded mb-2" />
        <div className="h-4 w-96 bg-muted rounded" />
      </div>
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-4 shadow-sm animate-pulse">
            <div className="h-10 w-10 bg-muted rounded-lg mb-3" />
            <div className="h-6 w-24 bg-muted rounded mb-2" />
            <div className="h-4 w-32 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
