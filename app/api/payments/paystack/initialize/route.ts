import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, email, metadata } = await req.json();

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100,
        email,
        currency: "USD",
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments`,
        metadata,
      }),
    });

    const data = await res.json();

    if (!data.status) {
      return NextResponse.json({ error: data.message || "Paystack error" }, { status: 400 });
    }

    return NextResponse.json({ authorization_url: data.data.authorization_url, reference: data.data.reference });
  } catch (error) {
    console.error("Paystack init error:", error);
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}
