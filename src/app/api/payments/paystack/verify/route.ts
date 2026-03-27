import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { payments, trips } from "@/src/db/schema";
import { nanoid } from "nanoid";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "sk_test_fake123";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json({ error: "Missing reference" }, { status: 400 });
    }

    // Verify with Paystack
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }

    const { status, amount, metadata, currency } = data.data;

    // Determine actual amount (divide by 100)
    const actualAmount = (amount / 100).toString();

    // If payment is successful
    if (status === "success") {
      // Create payment record
      // In production, ensure payment reference doesn't already exist to prevent duplicate logging
      await db.insert(payments).values({
        id: crypto.randomUUID(),
        userId: metadata.userId,
        tripId: metadata.tripId,
        amount: actualAmount as any,
        status: "completed",
        provider: "paystack",
      });

      return NextResponse.json({ success: true, message: "Payment verified successfully" }, { status: 200 });
    }

    return NextResponse.json({ success: false, status }, { status: 400 });
  } catch (error: any) {
    console.error("Paystack Verify Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
