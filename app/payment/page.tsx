"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

const BACKEND = "https://likhde-ai-backend-akw0.onrender.com";
const UPI_ID = "sohilkhan21@fam"; // APNA UPI ID YAHAN DAALO
const AMOUNT = 99;

export default function PaymentPage() {
  const [email, setEmail] = useState("");
  const [utr, setUtr] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submit = async () => {
    if (!email || !utr) {
      setError("Email aur UTR dono bharni hai!");
      return;
    }
    if (!email.includes("@")) {
      setError("Sahi email daalo!");
      return;
    }
    if (utr.length < 6) {
      setError("UTR number sahi nahi lag raha!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND}/api/payment/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: email, utr }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Kuch gadbad ho gayi!");
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError("Network error! Dobara try karo.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main style={{ background: "#F7F5F0", minHeight: "100vh" }}>
        <Navbar />
        <div className="max-w-md mx-auto px-4 pt-32 text-center">
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>🎉</div>
          <h1
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0D0D0D" }}
          >
            Payment submit ho gaya!
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B", fontSize: "14px", lineHeight: "1.7", marginBottom: "24px" }}>
            24 hours mein tera Pro plan activate ho jaayega.<br />
            Email pe confirm karenge — <strong>{email}</strong>
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-xl font-semibold text-white text-sm"
            style={{ background: "#FF6B00", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Wapas jao →
          </a>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: "#F7F5F0", minHeight: "100vh" }}>
      <Navbar />

      <section className="max-w-md mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0D0D0D" }}
          >
            Pro Plan — ₹99/month
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B", fontSize: "13px" }}>
            UPI se pay karo, UTR submit karo — done! 🚀
          </p>
        </div>

        {/* Step 1 — UPI */}
        <div
          className="rounded-2xl p-5 mb-4"
          style={{ background: "#fff", border: "1px solid #E2E0DB" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "#FF6B00", minWidth: "24px", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              1
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 600, color: "#0D0D0D" }}>
              UPI se ₹99 bhejo
            </p>
          </div>

          {/* UPI ID box */}
          <div
            className="flex items-center justify-between px-4 py-3 rounded-xl mb-3"
            style={{ background: "#F7F5F0", border: "1px solid #E2E0DB" }}
          >
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>
                UPI ID
              </p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 600, color: "#0D0D0D" }}>
                {UPI_ID}
              </p>
            </div>
            <button
              onClick={copyUPI}
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: copied ? "#0D0D0D" : "#FF6B00",
                color: "#fff",
                border: "none",
                cursor: "pointer"
              }}
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B6B6B" }}>
            💡 GPay, PhonePe, Paytm — koi bhi chalega
          </p>
        </div>

        {/* Step 2 — UTR Submit */}
        <div
          className="rounded-2xl p-5 mb-4"
          style={{ background: "#fff", border: "1px solid #E2E0DB" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "#FF6B00", minWidth: "24px", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              2
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 600, color: "#0D0D0D" }}>
              UTR number submit karo
            </p>
          </div>

          <div className="mb-3">
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B6B6B", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Email
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sohilcodes21@gmail.com"
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
              style={{ fontFamily: "'Inter', sans-serif", borderColor: "#E2E0DB", background: "#F7F5F0" }}
            />
          </div>

          <div className="mb-4">
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B6B6B", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              UTR / Transaction ID
            </p>
            <input
              type="text"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              placeholder="e.g. 426112345678"
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
              style={{ fontFamily: "'Inter', sans-serif", borderColor: "#E2E0DB", background: "#F7F5F0" }}
            />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B6B6B", marginTop: "6px" }}>
              💡 Payment app mein transaction details mein milega
            </p>
          </div>

          {error && (
            <div
              className="px-4 py-3 rounded-xl text-sm mb-4"
              style={{ background: "#FFF0E6", color: "#CC4400", fontFamily: "'Inter', sans-serif" }}
            >
              {error}
            </div>
          )}

          <button
            onClick={submit}
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-semibold text-white text-sm"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: loading ? "#FFB380" : "#FF6B00",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Submit ho raha hai..." : "Submit karo →"}
          </button>
        </div>

        <p className="text-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B6B6B" }}>
          ⏱️ 24 hours mein Pro activate ho jaayega · 7-day refund guarantee
        </p>
      </section>
    </main>
  );
                              }
          
