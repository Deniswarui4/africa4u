"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

interface CheckoutButtonProps {
  email: string;
  amount: number; // The amount in primary currency (e.g. 500 dollars/kes)
  tripId: string;
  userId: string;
}

export function CheckoutButton({ email, amount, tripId, userId }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/payments/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, amount, tripId, userId })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to initialize payment.");
      }

      if (data.authorization_url) {
        // Redirect user to the Paystack checkout page
        window.location.href = data.authorization_url;
      } else {
        throw new Error("Invalid response from payment server.");
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {error && <p className="text-sm text-destructive mb-2 font-medium">{error}</p>}
      <button 
        onClick={handleCheckout} 
        disabled={loading}
        className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-medium text-base flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-70"
      >
        {loading ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</>
        ) : (
          <><CreditCard className="h-5 w-5" /> Pay Deposit (${amount})</>
        )}
      </button>
      <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
        Secure payments via <span className="font-bold text-slate-800 dark:text-slate-300">Paystack</span>
      </p>
    </div>
  );
}
