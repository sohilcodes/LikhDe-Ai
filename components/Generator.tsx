"use client";

import { useState, useEffect } from "react";

const BACKEND = "https://likhde-ai-backend-akw0.onrender.com";

const CONTENT_TYPES = [
  { key: "caption", label: "📸 Caption", free: true },
  { key: "hook", label: "🎣 Video Hook", free: true },
  { key: "script", label: "🎬 Script", free: false },
  { key: "hashtags", label: "#️⃣ Hashtags", free: false },
];

const TONES = ["funny", "motivational", "informative", "emotional", "viral", "casual", "bold"];
const PLATFORMS = ["Instagram", "YouTube", "Telegram", "Twitter/X"];

export default function Generator() {
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("caption");
  const [tone, setTone] = useState("casual");
  const [platform, setPlatform] = useState("Instagram");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Plan system
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("free");
  const [planChecked, setPlanChecked] = useState(false);
  const [planLoading, setPlanLoading] = useState(false);

  const checkPlan = async () => {
    if (!email || !email.includes("@")) {
      setError("Sahi email daalo!");
      return;
    }
    setPlanLoading(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND}/api/auth/plan?userId=${encodeURIComponent(email)}`);
      const data = await res.json();
      setPlan(data.plan || "free");
      setPlanChecked(true);
      localStorage.setItem("likhde_email", email);
      localStorage.setItem("likhde_plan", data.plan || "free");
    } catch {
      setError("Plan check nahi ho pa raha, dobara try karo!");
    } finally {
      setPlanLoading(false);
    }
  };

  // Load saved email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("likhde_email");
    const savedPlan = localStorage.getItem("likhde_plan");
    if (savedEmail && savedPlan) {
      setEmail(savedEmail);
      setPlan(savedPlan);
      setPlanChecked(true);
    }
  }, []);

  const generate = async () => {
    if (!topic.trim()) {
      setError("Topic toh likho pehle! 😅");
      return;
    }

    // Check if paid feature but free user
    const selected = CONTENT_TYPES.find(c => c.key === contentType);
    if (!selected?.free && plan !== "paid") {
      setError("Yeh feature Pro users ke liye hai! Upgrade karo 🔒");
      return;
    }

    setError("");
    setOutput("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, contentType, tone, platform, plan }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Kuch gadbad ho gayi, dobara try karo!");
        return;
      }

      setOutput(data.output);
    } catch (err) {
      setError("Server se connect nahi ho pa raha. Thoda wait karo!");
    } finally {
      setLoading(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="generator" className="max-w-2xl mx-auto px-4 py-8">

      {/* Plan Check Box */}
      {!planChecked ? (
        <div className="mb-6 p-4 rounded-2xl" style={{ background: "#fff", border: "1px solid #E2E0DB" }}>
          <p className="text-sm font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0D0D0D" }}>
            Apna email daalo
          </p>
          <p className="text-xs mb-3" style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B" }}>
            Pro plan check karne ke liye — free users bhi use kar sakte hain
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkPlan()}
              placeholder="tumhari@email.com"
              className="flex-1 px-3 py-2.5 rounded-xl border text-sm outline-none"
              style={{ fontFamily: "'Inter', sans-serif", borderColor: "#E2E0DB", background: "#F7F5F0" }}
            />
            <button
              onClick={checkPlan}
              disabled={planLoading}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: planLoading ? "#FFB380" : "#FF6B00", border: "none", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", whiteSpace: "nowrap" }}
            >
              {planLoading ? "..." : "Enter →"}
            </button>
          </div>
        </div>
      ) : (
        /* Plan Badge */
        <div className="mb-6 flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: plan === "paid" ? "#F0FFF8" : "#F7F5F0", border: `1px solid ${plan === "paid" ? "#00D37F" : "#E2E0DB"}` }}>
          <div>
            <p className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B" }}>{email}</p>
            <p className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: plan === "paid" ? "#00A862" : "#0D0D0D" }}>
              {plan === "paid" ? "✓ Pro Plan Active 🎉" : "Free Plan"}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            {plan !== "paid" && (
              <a href="/pricing" className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: "#FF6B00", color: "#fff", fontFamily: "'Inter', sans-serif", textDecoration: "none" }}>
                Upgrade
              </a>
            )}
            <button onClick={() => { setPlanChecked(false); setPlan("free"); localStorage.clear(); }} className="text-xs" style={{ color: "#6B6B6B", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
              Change
            </button>
          </div>
        </div>
      )}

      {/* Content Type Selector */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B" }}>
          Kya banana hai?
        </p>
        <div className="grid grid-cols-2 gap-2">
          {CONTENT_TYPES.map((ct) => {
            const locked = !ct.free && plan !== "paid";
            return (
              <button
                key={ct.key}
                onClick={() => !locked && setContentType(ct.key)}
                className="px-4 py-3 rounded-xl text-sm font-medium border transition-all text-left"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: locked ? "#F7F5F0" : contentType === ct.key ? "#FF6B00" : "#fff",
                  color: locked ? "#aaa" : contentType === ct.key ? "#fff" : "#0D0D0D",
                  borderColor: locked ? "#E2E0DB" : contentType === ct.key ? "#FF6B00" : "#E2E0DB",
                  cursor: locked ? "not-allowed" : "pointer",
                }}
              >
                {ct.label}
                {!ct.free && (
                  <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
                    style={{ background: plan === "paid" ? "#E6F9F0" : "#FFF0E6", color: plan === "paid" ? "#00A862" : "#FF6B00" }}>
                    {plan === "paid" ? "✓" : "PRO"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Topic Input */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B" }}>
          Topic kya hai?
        </p>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder="e.g. trading se paisa kaise kamayein, cricket World Cup..."
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
          style={{ fontFamily: "'Inter', sans-serif", borderColor: "#E2E0DB", background: "#fff" }}
        />
      </div>

      {/* Tone + Platform */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <p className="text-sm font-medium mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B" }}>Tone</p>
          <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none" style={{ fontFamily: "'Inter', sans-serif", borderColor: "#E2E0DB", background: "#fff" }}>
            {TONES.map((t) => (<option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>))}
          </select>
        </div>
        <div>
          <p className="text-sm font-medium mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B" }}>Platform</p>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none" style={{ fontFamily: "'Inter', sans-serif", borderColor: "#E2E0DB", background: "#fff" }}>
            {PLATFORMS.map((p) => (<option key={p} value={p}>{p}</option>))}
          </select>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generate}
        disabled={loading}
        className="w-full py-4 rounded-xl font-semibold text-white text-base transition-all"
        style={{ fontFamily: "'Space Grotesk', sans-serif", background: loading ? "#FFB380" : "#FF6B00", cursor: loading ? "not-allowed" : "pointer" }}
      >
        {loading ? "Likh raha hun... ✍️" : "Likh De! →"}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 px-4 py-3 rounded-xl text-sm" style={{ background: "#FFF0E6", color: "#CC4400", fontFamily: "'Inter', sans-serif" }}>
          {error}
          {error.includes("Pro") && (
            <a href="/pricing" className="ml-2 underline font-semibold" style={{ color: "#FF6B00" }}>Upgrade karo →</a>
          )}
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium" style={{ color: "#6B6B6B", fontFamily: "'Inter', sans-serif" }}>Tera content ready hai 🎉</p>
            <button onClick={copyText} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: copied ? "#0D0D0D" : "#FF6B00", color: "#fff", fontFamily: "'Inter', sans-serif", border: "none", cursor: "pointer" }}>
              {copied ? "Copied ✓" : "Copy karo"}
            </button>
          </div>
          <div className="output-box px-5 py-4 rounded-xl text-sm" style={{ background: "#fff", border: "1px solid #E2E0DB", fontFamily: "'Inter', sans-serif", color: "#0D0D0D", lineHeight: "1.8", whiteSpace: "pre-wrap" }}>
            {output}
          </div>
        </div>
      )}
    </section>
  );
    }
