import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { inquiries } from '@/src/db/schema';
import { sendInquiryNotification, sendInquiryConfirmation } from '@/src/lib/email';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.name || !data.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Insert into DB
    const newInquiry = await db.insert(inquiries).values({
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      country: data.country || null,
      budget: data.budget || null,
      interests: data.interests || null,
      message: data.message || null,
      status: "pending",
    }).returning();

    // Send emails (fire-and-forget, don't block the response)
    const emailData = {
      name: data.name,
      email: data.email,
      country: data.country,
      budget: data.budget,
      interests: data.interests,
      message: data.message,
    };

    // Send admin notification + user confirmation in parallel
    Promise.all([
      sendInquiryNotification(emailData),
      sendInquiryConfirmation(emailData),
    ]).catch(err => console.error("Email sending failed:", err));

    return NextResponse.json({ success: true, inquiry: newInquiry[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json({ success: false, error: 'Failed to submit inquiry' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allInquiries = await db.select().from(inquiries).orderBy(inquiries.createdAt);
    return NextResponse.json({ inquiries: allInquiries }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database fetch failed' }, { status: 500 });
  }
}

