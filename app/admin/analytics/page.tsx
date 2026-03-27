import { TrendingUp, Users, DollarSign, CalendarCheck, ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react";

export default function AdminAnalyticsPage() {
  // Mock analytics data
  const stats = [
    { label: "Total Inquiries", value: "142", change: "+12%", up: true, icon: Users, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
    { label: "Conversions", value: "38", change: "+8%", up: true, icon: CalendarCheck, color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
    { label: "Revenue", value: "$87,400", change: "+23%", up: true, icon: DollarSign, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
    { label: "Conversion Rate", value: "26.8%", change: "-2%", up: false, icon: TrendingUp, color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
  ];

  const monthlyData = [
    { month: "Jan", inquiries: 8, bookings: 2, revenue: 6200 },
    { month: "Feb", inquiries: 12, bookings: 4, revenue: 12400 },
    { month: "Mar", inquiries: 18, bookings: 5, revenue: 15500 },
    { month: "Apr", inquiries: 15, bookings: 4, revenue: 12800 },
    { month: "May", inquiries: 22, bookings: 6, revenue: 18600 },
    { month: "Jun", inquiries: 28, bookings: 8, revenue: 24800 },
    { month: "Jul", inquiries: 19, bookings: 5, revenue: 15500 },
    { month: "Aug", inquiries: 20, bookings: 4, revenue: 11800 },
  ];

  const maxInquiries = Math.max(...monthlyData.map(d => d.inquiries));
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  const topDestinations = [
    { name: "Maasai Mara", inquiries: 48, percentage: 34 },
    { name: "Diani Beach", inquiries: 32, percentage: 23 },
    { name: "Amboseli", inquiries: 24, percentage: 17 },
    { name: "Lamu Island", inquiries: 18, percentage: 13 },
    { name: "Lake Nakuru", inquiries: 12, percentage: 8 },
    { name: "Samburu", inquiries: 8, percentage: 5 },
  ];

  const recentConversions = [
    { name: "Emily Richardson", trip: "Bush & Beach Retreat", amount: "$3,100", date: "Mar 22" },
    { name: "James Okafor", trip: "Great Migration Safari", amount: "$2,800", date: "Mar 20" },
    { name: "Sophie Laurent", trip: "Cultural Immersion Tour", amount: "$2,200", date: "Mar 18" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track inquiries, conversions, and revenue at a glance.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-card border rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.up ? "text-green-600" : "text-red-500"}`}>
                  {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Inquiries Bar Chart */}
        <div className="lg:col-span-2 bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg">Monthly Inquiries</h3>
              <p className="text-xs text-muted-foreground">Inquiry volume over the past 8 months</p>
            </div>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex items-end gap-3 h-48">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-muted-foreground">{d.inquiries}</span>
                <div
                  className="w-full rounded-t-md bg-primary/80 hover:bg-primary transition-colors"
                  style={{ height: `${(d.inquiries / maxInquiries) * 100}%`, minHeight: "8px" }}
                />
                <span className="text-xs text-muted-foreground mt-1">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-1">Top Destinations</h3>
          <p className="text-xs text-muted-foreground mb-5">Most requested destinations</p>
          <div className="space-y-4">
            {topDestinations.map((dest, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{dest.name}</span>
                  <span className="text-muted-foreground">{dest.inquiries} ({dest.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${dest.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-1">Revenue Trend</h3>
          <p className="text-xs text-muted-foreground mb-5">Monthly revenue (USD)</p>
          <div className="flex items-end gap-3 h-40">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium text-muted-foreground">${(d.revenue / 1000).toFixed(1)}k</span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-accent/60 to-accent hover:from-accent/80 hover:to-accent transition-colors"
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%`, minHeight: "8px" }}
                />
                <span className="text-xs text-muted-foreground mt-1">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Conversions */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-1">Recent Conversions</h3>
          <p className="text-xs text-muted-foreground mb-5">Latest confirmed bookings</p>
          <div className="space-y-4">
            {recentConversions.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                <div>
                  <p className="font-semibold text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.trip}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-green-600 dark:text-green-400">{c.amount}</p>
                  <p className="text-xs text-muted-foreground">{c.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
