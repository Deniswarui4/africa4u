import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { inquiries } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    
    // Only allow updating status for now
    if (!body.status) {
      return NextResponse.json({ error: "Missing status field" }, { status: 400 });
    }

    const updatedInquiry = await db.update(inquiries)
      .set({ status: body.status })
      .where(eq(inquiries.id, id))
      .returning();

    if (!updatedInquiry.length) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updatedInquiry[0] }, { status: 200 });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json({ success: false, error: 'Failed to update inquiry' }, { status: 500 });
  }
}
