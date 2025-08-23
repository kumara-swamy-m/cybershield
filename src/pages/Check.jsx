import { useState } from "react";
import { motion } from "framer-motion";

export default function Check() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = () => {
    if (!input.trim()) {
      setResult({
        risk: "⚠️ Please enter text or a link",
        level: "none",
        reasons: [],
        advice: "Paste a suspicious message or link and I’ll scan it for you.",
      });
      return;
    }

    const reasons = [];
    let risk = "✅ Looks Safe!";
    let level = "safe";
    let advice = "This doesn’t look harmful, but always double-check the sender.";

    if (input.includes("http://")) {
      reasons.push("Uses insecure protocol (http instead of https).");
      risk = "🚨 High Risk!";
      level = "high";
      advice = "Avoid clicking this link. Visit the official website directly.";
    }

    const keywords = ["otp", "urgent", "lottery", "prize", "password"];
    if (keywords.some((kw) => input.toLowerCase().includes(kw))) {
      reasons.push("Contains suspicious keyword(s).");
      if (level !== "high") {
        risk = "⚠️ Medium Risk!";
        level = "medium";
      }
      advice =
        "Be cautious — scammers often use urgency or free prizes to trick people.";
    }

    if (input.length > 80 && input.startsWith("http")) {
      reasons.push("Unusually long link (possible phishing).");
      if (level !== "high") {
        risk = "⚠️ Medium Risk!";
        level = "medium";
      }
      advice =
        "Long or messy links are often phishing attempts. Open sites only from trusted bookmarks.";
    }

    setResult({ risk, level, reasons, advice });
  };

  const getCardStyle = (level) => {
    switch (level) {
      case "high":
        return "bg-red-600/80 text-white border-l-4 border-red-800 shadow-2xl p-6 rounded-3xl";
      case "medium":
        return "bg-yellow-500/80 text-black border-l-4 border-yellow-700 shadow-2xl p-6 rounded-3xl";
      case "safe":
        return "bg-green-600/80 text-white border-l-4 border-green-800 shadow-2xl p-6 rounded-3xl";
      default:
        return "bg-white/10 text-white border-l-4 border-white/30 shadow-2xl p-6 rounded-3xl";
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 relative flex items-center justify-center px-4 py-16">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl w-full bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 z-10"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-white">
          🔎 Scam Checker
        </h2>
        <p className="mb-8 text-indigo-200">
          Paste any suspicious message, link, or phone number. Cyber Guardian AI
          will analyze it and guide you.
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste link or message here..."
          className="w-full bg-slate-800/60 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-4 rounded-xl mb-6 h-32 placeholder-slate-400 transition"
        />

        <button
          onClick={handleCheck}
          className="w-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition"
        >
          🚀 Check Now
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mt-8 ${getCardStyle(result.level)}`}
          >
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
              {result.risk}
            </h3>
            {result.reasons.length > 0 && (
              <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                {result.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            )}
            <p className="mt-4 font-semibold text-sm md:text-base">💡 Tip:</p>
            <p className="text-sm md:text-base">{result.advice}</p>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
