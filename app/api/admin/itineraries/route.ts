import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { itineraries } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(itineraries).orderBy(itineraries.createdAt);
    return NextResponse.json({ itineraries: all }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch itineraries" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newItinerary = await db.insert(itineraries).values({
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description || null,
      duration: data.duration || null,
      priceEstimate: data.priceEstimate || null,
      content: data.content || null,
    }).returning();

    return NextResponse.json({ success: true, itinerary: newItinerary[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating itinerary:", error);
    return NextResponse.json({ error: "Failed to create itinerary" }, { status: 500 });
  }
}
