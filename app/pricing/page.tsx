"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

const FEATURES_FREE = [
  "5 content roz generate karo",
  "Caption & Video Hook",
  "Instagram platform",
  "2 tones",
];

const FEATURES_PRO = [
  "Unlimited content generate karo",
  "Caption, Hook, Script & Hashtags",
  "Instagram, YouTube, Telegram, Twitter",
  "10+ tones",
  "History save hoti hai",
  "Priority support",
];

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  return (
    <main style={{ background: "#F7F5F0", minHeight: "100vh" }}>
      <Navbar />

      <section className="max-w-2xl mx-auto px-4 pt-28 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-block text-xs font-medium px-3 py-1.5 rounded-full mb-4"
            style={{ background: "#FFF0E6", color: "#FF6B00", fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" }}
          >
            💰 Simple Pricing
          </div>
          <h1
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0D0D0D", letterSpacing: "-0.5px" }}
          >
            Apne budget mein lo
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B", fontSize: "15px" }}>
            Free mein shuru karo, jab ready ho tab upgrade karo
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>

          {/* Free Plan */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "#fff", border: "1px solid #E2E0DB" }}
          >
            <div className="mb-4">
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B6B6B", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                Free
              </p>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "36px", fontWeight: 700, color: "#0D0D0D", letterSpacing: "-1px" }}>
                ₹0
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B6B6B", marginTop: "4px" }}>
                Hamesha free
              </p>
            </div>

            <div className="mb-6">
              {FEATURES_FREE.map((f, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <span style={{ color: "#0D0D0D", fontSize: "14px", marginTop: "1px" }}>✓</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#444" }}>{f}</span>
                </div>
              ))}
            </div>

            <a
              href="/"
              className="block text-center py-3 rounded-xl text-sm font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#F7F5F0", color: "#0D0D0D", border: "1px solid #E2E0DB" }}
            >
              Try karo →
            </a>
          </div>

          {/* Pro Plan */}
          <div
            className="rounded-2xl p-6 relative"
            style={{ background: "#0D0D0D", border: "2px solid #FF6B00" }}
          >
            {/* Popular badge */}
            <div
              className="absolute -top-3 left-1/2"
              style={{ transform: "translateX(-50%)", background: "#FF6B00", color: "#fff", fontSize: "11px", fontFamily: "'Inter', sans-serif", fontWeight: 600, padding: "3px 12px", borderRadius: "20px", whiteSpace: "nowrap" }}
            >
              🔥 Most Popular
            </div>

            <div className="mb-4">
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#FF6B00", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                Pro
              </p>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "36px", fontWeight: 700, color: "#fff", letterSpacing: "-1px" }}>
                ₹99
                <span style={{ fontSize: "16px", fontWeight: 400, color: "#888" }}>/month</span>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#888", marginTop: "4px" }}>
                Ek din ka khana bhi nahi 😄
              </p>
            </div>

            <div className="mb-6">
              {FEATURES_PRO.map((f, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <span style={{ color: "#FF6B00", fontSize: "14px", marginTop: "1px" }}>✓</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#ccc" }}>{f}</span>
                </div>
              ))}
            </div>

            <a
              href="/payment"
              className="block text-center py-3 rounded-xl text-sm font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#FF6B00", color: "#fff" }}
            >
              Pro lo abhi →
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2
            className="text-xl font-bold mb-6 text-center"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0D0D0D" }}
          >
            Common Questions
          </h2>

          {[
            {
              q: "Payment kaise karni hai?",
              a: "UPI se payment karo, UTR number submit karo — 24 hours mein Pro activate ho jaayega!"
            },
            {
              q: "Refund milega?",
              a: "7 din ka money-back guarantee hai. Koi sawaal nahi poochenge!"
            },
            {
              q: "Plan kab expire hoga?",
              a: "Payment ke 30 din baad. Renew karna padega agar continue karna ho."
            },
            {
              q: "Free plan mein kya limit hai?",
              a: "Roz 5 content generate kar sakte ho — caption aur hooks only."
            },
          ].map((item, i) => (
            <div
              key={i}
              className="mb-3 p-4 rounded-xl"
              style={{ background: "#fff", border: "1px solid #E2E0DB" }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 600, color: "#0D0D0D", marginBottom: "6px" }}>
                {item.q}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B6B6B", lineHeight: "1.6" }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
