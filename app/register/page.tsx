"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { signUp } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await signUp.email({
      email,
      password,
      name,
      callbackURL: "/dashboard" // Redirect after sign up
    }, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (ctx) => {
        setError(ctx.error.message || "Failed to create account. Please try again.");
        setLoading(false);
      }
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/" className="font-playfair font-bold text-3xl text-primary inline-flex items-center gap-2">
            KenyanJustForYou
          </Link>
        </div>
        
        <div className="bg-card rounded-2xl shadow-xl border overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-2 text-center text-foreground">Create Account</h2>
            <p className="text-muted-foreground text-center mb-6">Join us to plan and track your perfect Kenyan adventure.</p>
            
            {error && (
              <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="name">Full Name</label>
                <input 
                  id="name" 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe" 
                  required
                  className="w-full h-11 px-3 rounded-md border bg-transparent focus-visible:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" 
                  required
                  className="w-full h-11 px-3 rounded-md border bg-transparent focus-visible:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  minLength={8}
                  className="w-full h-11 px-3 rounded-md border bg-transparent focus-visible:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-11 mt-6 rounded-md bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors shadow disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>
          
          <div className="bg-muted/50 p-6 text-center border-t">
            <p className="text-sm text-muted-foreground">
              Already have an account? <Link href="/login" className="font-medium text-primary hover:underline">Sign in</Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground inline-flex items-center transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
