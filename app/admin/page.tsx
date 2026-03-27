import { db } from "@/src/db";
import { inquiries } from "@/src/db/schema";
import { desc } from "drizzle-orm";
import { AdminInquiriesTable } from "./AdminInquiriesTable";

export default async function AdminDashboardPage() {
  let dbInquiries: any[] = [];
  let dbError = false;

  try {
    dbInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  } catch (e) {
    dbError = true;
    console.error("Failed to fetch inquiries from DB:", e);
  }

  // Fallback to mock data if DB is not connected
  const displayInquiries = dbInquiries.length > 0 ? dbInquiries : [
    { id: "1", name: "Sarah Jenkins", email: "sarah@example.com", status: "pending", createdAt: new Date(), country: "USA", budget: "$2,500-$4,000", interests: ["Safari"], message: "Interested in Maasai Mara" },
    { id: "2", name: "Michael Chang", email: "m.chang@example.com", status: "replied", createdAt: new Date(Date.now() - 18000000), country: "Canada", budget: "$4,000-$7,000", interests: ["Beach", "Culture"], message: "Want to visit Diani" },
    { id: "3", name: "David Okombo", email: "david@example.com", status: "converted", createdAt: new Date(Date.now() - 86400000), country: "UK", budget: "$1,500-$2,500", interests: ["Safari"], message: "Amboseli trip" },
  ];

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Inquiries Management</h1>
          <p className="text-slate-500">
            Review and convert incoming trip requests into active itineraries.
            {dbError && <span className="ml-2 text-orange-600 text-xs">(Using mock data — DB not connected)</span>}
          </p>
        </div>
        <div className="text-sm text-slate-500">
          {displayInquiries.length} total inquiries
        </div>
      </div>

      <AdminInquiriesTable inquiries={displayInquiries} />
    </div>
  );
}
