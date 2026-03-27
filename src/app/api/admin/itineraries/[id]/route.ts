import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { itineraries } from "@/src/db/schema";
import { eq } from "drizzle-orm";

// GET single itinerary
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const result = await db.select().from(itineraries).where(eq(itineraries.id, params.id));
    if (!result.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ itinerary: result[0] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// PATCH update itinerary
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const updated = await db.update(itineraries).set(data).where(eq(itineraries.id, params.id)).returning();
    if (!updated.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, itinerary: updated[0] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE itinerary
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await db.delete(itineraries).where(eq(itineraries.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
