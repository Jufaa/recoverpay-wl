"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("You're on the list! Check your email.");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to join waitlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] flex flex-col">
      <Toaster position="top-center" theme="dark" />
      
      <header className="border-b border-[#2F2F2F]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E5E5E5] rounded-lg flex items-center justify-center">
              <span className="text-[#0A0A0A] font-bold text-sm">R</span>
            </div>
            <span className="text-[#F5F5F5] font-semibold text-lg">RecoverPay</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-[#CFCFCF] hover:text-[#F5F5F5] text-sm transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-[#CFCFCF] hover:text-[#F5F5F5] text-sm transition-colors">
              How it works
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-4xl w-full mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#303030] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span className="text-[#8A8A8A] text-sm">Early access coming soon</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#F5F5F5] mb-4 leading-tight">
              Never lose a payment<br className="hidden md:block" /> again
            </h1>
            <p className="text-lg md:text-xl text-[#CFCFCF] max-w-2xl mx-auto">
              RecoverPay automatically retries failed Stripe payments using intelligent dunning schedules. Recover up to 60% of lost revenue.
            </p>
          </div>

          <Card className="bg-[#1A1A1A] border-[#2F2F2F] max-w-md mx-auto">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-[#F5F5F5] text-xl">Join the waitlist</CardTitle>
              <p className="text-[#8A8A8A] text-sm">
                Be the first to know when we launch
              </p>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-[#22C55E]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[#F5F5F5] font-medium">You&apos;re in!</p>
                  <p className="text-[#8A8A8A] text-sm mt-1">Check your email for confirmation</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your work email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#323232] border-[#2F2F2F] text-[#F5F5F5] placeholder:text-[#6B6B6B] h-12"
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#E5E5E5] text-[#0A0A0A] hover:bg-[#FFFFFF] font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? "Joining..." : "Join waitlist"}
                  </Button>
                  <p className="text-[#6B6B6B] text-xs text-center">
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>

          <div id="features" className="mt-24">
            <h2 className="text-2xl font-semibold text-[#F5F5F5] text-center mb-12">
              Why RecoverPay?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-[#1A1A1A] border-[#2F2F2F]">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 bg-[#22C55E]/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-[#F5F5F5] font-semibold mb-2">Recover Revenue</h3>
                  <p className="text-[#8A8A8A] text-sm">
                    Recover up to 60% of failed payments automatically without any manual intervention.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#1A1A1A] border-[#2F2F2F]">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-[#F5F5F5] font-semibold mb-2">Smart Scheduling</h3>
                  <p className="text-[#8A8A8A] text-sm">
                    Configurable dunning intervals (1, 3, 7 days) optimized for each business.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#1A1A1A] border-[#2F2F2F]">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 bg-[#F59E0B]/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-[#F5F5F5] font-semibold mb-2">Email Notifications</h3>
                  <p className="text-[#8A8A8A] text-sm">
                    Automated email alerts to customers when payments fail and when they're recovered.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div id="how-it-works" className="mt-24 mb-12">
            <h2 className="text-2xl font-semibold text-[#F5F5F5] text-center mb-12">
              How it works
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#1F1F1F] border border-[#2F2F2F] rounded-full flex items-center justify-center text-[#F5F5F5] font-medium">
                  1
                </div>
                <span className="text-[#CFCFCF]">Connect Stripe</span>
              </div>
              <div className="hidden md:block text-[#3D3D3D]">→</div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#1F1F1F] border border-[#2F2F2F] rounded-full flex items-center justify-center text-[#F5F5F5] font-medium">
                  2
                </div>
                <span className="text-[#CFCFCF]">Configure rules</span>
              </div>
              <div className="hidden md:block text-[#3D3D3D]">→</div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#1F1F1F] border border-[#2F2F2F] rounded-full flex items-center justify-center text-[#F5F5F5] font-medium">
                  3
                </div>
                <span className="text-[#CFCFCF]">We recover payments</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#2F2F2F] py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-[#6B6B6B] text-sm">
            © 2026 RecoverPay. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
