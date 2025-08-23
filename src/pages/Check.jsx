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
      advice = "Avoid clicking this link. If it claims to be your bank, visit the official website directly.";
    }

    const keywords = ["otp", "urgent", "lottery", "prize", "password"];
    if (keywords.some((kw) => input.toLowerCase().includes(kw))) {
      reasons.push("Contains suspicious keyword(s).");
      risk = "⚠️ Medium Risk!";
      level = "medium";
      advice = "Be cautious — scammers often use urgency or free prizes to trick people.";
    }

    if (input.length > 80 && input.startsWith("http")) {
      reasons.push("Unusually long link (possible phishing).");
      risk = "⚠️ Medium Risk!";
      level = "medium";
      advice = "Long or messy links are often phishing attempts. Open sites only from trusted bookmarks.";
    }

    if (input.includes("free-money") || input.includes("clicknow")) {
      reasons.push("Domain looks suspicious.");
      risk = "🚨 High Risk!";
      level = "high";
      advice = "This looks dangerous. Don’t click, and warn your friends/family.";
    }

    setResult({ risk, level, reasons, advice });
  };

  const getCardStyle = (level) => {
    switch (level) {
      case "high":
        return "bg-red-500/10 border-red-400 text-red-700";
      case "medium":
        return "bg-yellow-400/10 border-yellow-400 text-yellow-700";
      case "safe":
        return "bg-green-500/10 border-green-400 text-green-700";
      default:
        return "bg-gray-500/10 border-gray-400 text-gray-700";
    }
  };

  return (
    <main className="bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 min-h-screen flex items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 w-full"
      >
        <h2 className="text-4xl font-extrabold mb-3 text-white">🔎 Scam Checker</h2>
        <p className="mb-8 text-gray-200">
          Paste any suspicious message, link, or phone number. 
          <span className="font-semibold text-yellow-300"> Cyber Guardian AI </span> 
          will analyze it and guide you.
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste link or message here..."
          className="w-full bg-white/20 border border-white/30 text-white rounded-xl p-4 mb-6 h-32 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
        />

        <button
          onClick={handleCheck}
          className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
        >
          🚀 Check Now
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mt-6 border rounded-xl p-5 shadow-lg ${getCardStyle(
              result.level
            )}`}
          >
            <h3 className="text-xl font-bold mb-2">{result.risk}</h3>
            {result.reasons.length > 0 && (
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {result.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            )}
            <p className="mt-3 font-semibold">💡 Tip:</p>
            <p className="text-sm">{result.advice}</p>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
