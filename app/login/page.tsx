"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { signIn } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await signIn.email({
      email,
      password,
      callbackURL: "/dashboard"
    }, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (ctx) => {
        setError(ctx.error.message || "Failed to sign in. Please check your credentials.");
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
            <h2 className="text-2xl font-bold mb-2 text-center text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground text-center mb-6">Sign in to access your itinerary and trip details.</p>
            
            {error && (
              <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
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
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium" htmlFor="password">Password</label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
                </div>
                <input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-11 px-3 rounded-md border bg-transparent focus-visible:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-11 mt-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
          
          <div className="bg-muted/50 p-6 text-center border-t">
            <p className="text-sm text-muted-foreground">
              Don't have an account? <Link href="/register" className="font-medium text-primary hover:underline">Sign up</Link>
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
