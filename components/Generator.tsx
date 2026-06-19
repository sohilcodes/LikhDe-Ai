"use client";

import { useState } from "react";

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

  const generate = async () => {
    if (!topic.trim()) {
      setError("Topic toh likho pehle! 😅");
      return;
    }
    setError("");
    setOutput("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, contentType, tone, platform }),
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
      {/* Content Type Selector */}
      <div className="mb-6">
        <p className="text-sm font-medium text-muted mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B" }}>
          Kya banana hai?
        </p>
        <div className="grid grid-cols-2 gap-2">
          {CONTENT_TYPES.map((ct) => (
            <button
              key={ct.key}
              onClick={() => setContentType(ct.key)}
              className="px-4 py-3 rounded-xl text-sm font-medium border transition-all text-left"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: contentType === ct.key ? "#FF6B00" : "#fff",
                color: contentType === ct.key ? "#fff" : "#0D0D0D",
                borderColor: contentType === ct.key ? "#FF6B00" : "#E2E0DB",
              }}
            >
              {ct.label}
              {!ct.free && (
                <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
                  style={{ background: contentType === ct.key ? "rgba(255,255,255,0.25)" : "#FFF0E6", color: contentType === ct.key ? "#fff" : "#FF6B00" }}>
                  PRO
                </span>
              )}
            </button>
          ))}
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
          style={{
            fontFamily: "'Inter', sans-serif",
            borderColor: "#E2E0DB",
            background: "#fff",
          }}
        />
      </div>

      {/* Tone + Platform */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <p className="text-sm font-medium mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B" }}>Tone</p>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
            style={{ fontFamily: "'Inter', sans-serif", borderColor: "#E2E0DB", background: "#fff" }}
          >
            {TONES.map((t) => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-sm font-medium mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B" }}>Platform</p>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
            style={{ fontFamily: "'Inter', sans-serif", borderColor: "#E2E0DB", background: "#fff" }}
          >
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generate}
        disabled={loading}
        className="w-full py-4 rounded-xl font-semibold text-white text-base transition-all"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          background: loading ? "#FFB380" : "#FF6B00",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Likh raha hun... ✍️" : "Likh De! →"}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 px-4 py-3 rounded-xl text-sm" style={{ background: "#FFF0E6", color: "#CC4400", fontFamily: "'Inter', sans-serif" }}>
          {error}
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="mt-6 animate-fade-up">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium" style={{ color: "#6B6B6B", fontFamily: "'Inter', sans-serif" }}>
              Tera content ready hai 🎉
            </p>
            <button
              onClick={copyText}
              className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
              style={{
                background: copied ? "#0D0D0D" : "#FF6B00",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {copied ? "Copied ✓" : "Copy karo"}
            </button>
          </div>
          <div
            className="output-box px-5 py-4 rounded-xl text-sm leading-relaxed"
            style={{
              background: "#fff",
              border: "1px solid #E2E0DB",
              fontFamily: "'Inter', sans-serif",
              color: "#0D0D0D",
              lineHeight: "1.8",
            }}
          >
            {output}
          </div>
        </div>
      )}
    </section>
  );
              }
        
