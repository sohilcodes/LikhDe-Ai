"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <span
          className="font-display font-700 text-xl tracking-tight text-ink"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
        >
          Likh<span className="text-saffron" style={{ color: "#FF6B00" }}>De</span> AI
        </span>
        <a
          href="#generator"
          className="text-sm font-medium px-4 py-2 rounded-full text-white"
          style={{ background: "#FF6B00", fontFamily: "'Inter', sans-serif" }}
        >
          Try Free →
        </a>
      </div>
    </nav>
  );
}
