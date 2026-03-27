"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function PlanMyTrip() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Collect checked interests
    const interests: string[] = [];
    form.querySelectorAll<HTMLInputElement>('input[name="interests"]:checked').forEach(cb => {
      interests.push(cb.value);
    });

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      country: formData.get("country") as string,
      budget: formData.get("budget") as string,
      interests,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit. Please try again.");
      }

      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <CheckCircle className="h-20 w-20 text-green-500 mb-6" />
        <h1 className="font-playfair text-4xl font-bold mb-4">Inquiry Received</h1>
        <p className="text-muted-foreground text-lg max-w-xl mb-8">
          Thank you for trusting us to plan your Kenyan adventure. Our local experts will review your details and get back to you within 24 hours with a personalized proposal.
        </p>
        <button 
          onClick={() => setStatus("idle")}
          className="h-12 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Plan Another Trip
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-6 text-3xl">!</div>
        <h1 className="font-playfair text-4xl font-bold mb-4">Something Went Wrong</h1>
        <p className="text-muted-foreground text-lg max-w-xl mb-8">{errorMsg}</p>
        <button onClick={() => setStatus("idle")} className="h-12 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">Try Again</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 md:py-16 flex flex-col items-center">
      <div className="text-center max-w-3xl mb-12">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Plan Your Dream Journey</h1>
        <p className="text-muted-foreground text-lg">
          Tell us a little bit about what you're looking for, and our team of experts will craft a personalized day-by-day itinerary tailored to your budget and travel style.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-card rounded-2xl shadow-lg border p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name <span className="text-destructive">*</span></label>
                <input required id="name" name="name" type="text" className="w-full h-11 px-3 rounded-md border bg-transparent focus-visible:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address <span className="text-destructive">*</span></label>
                <input required id="email" name="email" type="email" className="w-full h-11 px-3 rounded-md border bg-transparent focus-visible:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="john@example.com" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="country" className="text-sm font-medium">Country of Residence</label>
                <input id="country" name="country" type="text" className="w-full h-11 px-3 rounded-md border bg-transparent focus-visible:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="United States" />
              </div>
            </div>
          </div>

          {/* Trip Preferences */}
          <div>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b">Trip Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="dates" className="text-sm font-medium">Approximate Dates</label>
                <input id="dates" type="text" className="w-full h-11 px-3 rounded-md border bg-transparent focus-visible:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="e.g. August 2026 for 10 days" />
              </div>
              <div className="space-y-2">
                <label htmlFor="budget" className="text-sm font-medium">Budget Target (Per Person)</label>
                <select id="budget" name="budget" className="w-full h-11 px-3 rounded-md border bg-transparent focus-visible:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
                  <option value="">Select a range...</option>
                  <option value="1500-2500">$1,500 - $2,500</option>
                  <option value="2500-4000">$2,500 - $4,000</option>
                  <option value="4000-7000">$4,000 - $7,000</option>
                  <option value="7000+">$7,000+</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Interests</label>
                <div className="flex flex-wrap gap-2">
                  {['Wildlife Safari', 'Beach', 'Culture', 'Hiking/Trekking', 'Luxury Camps', 'Photography', 'Family Friendly'].map(interest => (
                    <label key={interest} className="inline-flex items-center justify-center px-4 py-2 border rounded-full text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                      <input type="checkbox" className="hidden" name="interests" value={interest} />
                      {interest}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">Additional Information</label>
            <textarea id="message" name="message" rows={5} className="w-full px-3 py-2 rounded-md border bg-transparent focus-visible:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="Tell us more about what you envision for your trip... (e.g., celebrating an anniversary, mobility restrictions, preferred pace)"></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status === "submitting"}
            className="w-full h-14 rounded-lg bg-primary text-primary-foreground font-medium text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            {status === "submitting" ? "Sending Request..." : (
              <>Submit Trip Inquiry <Send className="h-5 w-5" /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
