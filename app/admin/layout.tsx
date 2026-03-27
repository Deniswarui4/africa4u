import Link from "next/link";
import { Users, FileText, Settings, PlaneTakeoff, ShieldAlert, LogOut, Route, BarChart3 } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/src/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?redirect=/admin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-muted/10">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-accent font-bold text-lg">
            <ShieldAlert className="h-5 w-5" /> Admin Panel
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-white/10 text-white font-medium text-sm">
            <FileText className="h-4 w-4" /> Inquiries
          </Link>
          <Link href="/admin/itineraries" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-300 hover:bg-white/5 hover:text-white font-medium text-sm transition-colors">
            <Route className="h-4 w-4" /> Itineraries
          </Link>
          <Link href="/admin/analytics" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-300 hover:bg-white/5 hover:text-white font-medium text-sm transition-colors">
            <BarChart3 className="h-4 w-4" /> Analytics
          </Link>
          <Link href="/admin/trips" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-300 hover:bg-white/5 hover:text-white font-medium text-sm transition-colors">
            <PlaneTakeoff className="h-4 w-4" /> Active Trips
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-300 hover:bg-white/5 hover:text-white font-medium text-sm transition-colors">
            <Users className="h-4 w-4" /> Users
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-300 hover:bg-white/5 hover:text-white font-medium text-sm transition-colors">
            <Settings className="h-4 w-4" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-red-400 hover:bg-red-400/10 font-medium text-sm transition-colors">
            <LogOut className="h-4 w-4" /> Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
