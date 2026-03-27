import Link from "next/link";
import { LayoutDashboard, Plane, CreditCard, MessageSquare, User, LogOut } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/src/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?redirect=/dashboard");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-muted/30">
      {/* Dashboard Sidebar */}
      <aside className="w-64 border-r bg-card hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="font-bold text-lg">My Account</h2>
          <p className="text-xs text-muted-foreground mt-1">Welcome back, Traveler</p>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-muted text-foreground font-medium text-sm">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          <Link href="/dashboard/trips" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground font-medium text-sm transition-colors">
            <Plane className="h-4 w-4" /> My Trips
          </Link>
          <Link href="/dashboard/payments" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground font-medium text-sm transition-colors">
            <CreditCard className="h-4 w-4" /> Payments
          </Link>
          <Link href="/dashboard/messages" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground font-medium text-sm transition-colors">
            <MessageSquare className="h-4 w-4" /> Messages
          </Link>
          <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground font-medium text-sm transition-colors">
            <User className="h-4 w-4" /> Profile
          </Link>
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-destructive hover:bg-destructive/10 font-medium text-sm transition-colors">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-5xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
