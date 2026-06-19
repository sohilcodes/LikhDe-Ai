import Navbar from "@/components/Navbar";
import Generator from "@/components/Generator";

export default function Home() {
  return (
    <main style={{ background: "#F7F5F0", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section className="max-w-2xl mx-auto px-4 pt-28 pb-10 text-center">
        <div
          className="inline-block text-xs font-medium px-3 py-1.5 rounded-full mb-6"
          style={{
            background: "#FFF0E6",
            color: "#FF6B00",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          🇮🇳 Indian Creators ke liye
        </div>

        <h1
          className="text-4xl font-bold leading-tight mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0D0D0D" }}
        >
          Content likhna ab{" "}
          <span style={{ color: "#FF6B00" }}>2 second</span>{" "}
          ka kaam hai
        </h1>

        <p
          className="text-base mb-2"
          style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B", lineHeight: "1.7" }}
        >
          Hinglish captions, viral hooks, video scripts aur hashtags —
          sirf topic daalo, baaki AI kar lega.
        </p>

        <p className="text-sm" style={{ color: "#FF6B00", fontFamily: "'Inter', sans-serif" }}>
          Free mein 5 content roz — no signup needed ✨
        </p>
      </section>

      {/* Generator */}
      <Generator />

      {/* Footer */}
      <footer className="text-center py-8 text-xs" style={{ color: "#6B6B6B", fontFamily: "'Inter', sans-serif" }}>
        Made with ❤️ for Indian creators · LikhDe AI
      </footer>
    </main>
  );
}
