import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { payments, trips } from "@/src/db/schema";
import { eq } from "drizzle-orm";
// Need better-auth fetch to get user if necessary, but keep it simple for now

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "sk_test_fake123";

export async function POST(req: Request) {
  try {
    const { email, amount, tripId, userId } = await req.json();

    if (!email || !amount || !tripId || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Multiply by 100 because Paystack amounts are in kobo/cents
    const amountInSubunits = Math.round(parseFloat(amount) * 100);

    // Call Paystack API
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountInSubunits,
        metadata: {
          tripId,
          userId,
        },
        // In local development, replace with your localhost
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/payments/verify`,
      }),
    });

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message || "Failed to initialize Paystack");
    }

    // Optionally: Store the payment in "pending" status in our DB
    
    // The data contains authorization_url and access_code
    return NextResponse.json({ 
      authorization_url: data.data.authorization_url,
      reference: data.data.reference 
    }, { status: 200 });
    
  } catch (error: any) {
    console.error("Paystack Init Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
