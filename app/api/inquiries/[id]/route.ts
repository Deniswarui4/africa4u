import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { inquiries } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();
    const updated = await db.update(inquiries).set(data).where(eq(inquiries.id, id)).returning();
    if (!updated.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, inquiry: updated[0] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}
