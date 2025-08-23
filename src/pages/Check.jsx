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
      advice = "Be cautious — scammers often use urgency or free prizes to trick people.";
    }

    if (input.length > 80 && input.startsWith("http")) {
      reasons.push("Unusually long link (possible phishing).");
      if (level !== "high") {
        risk = "⚠️ Medium Risk!";
        level = "medium";
      }
      advice = "Long or messy links are often phishing attempts. Open sites only from trusted bookmarks.";
    }

    setResult({ risk, level, reasons, advice });
  };

  const getCardStyle = (level) => {
  switch (level) {
    case "high":
      return "bg-red-600 text-white border-l-8 border-red-800 shadow-2xl p-6 rounded-xl";
    case "medium":
      return "bg-yellow-400 text-black border-l-8 border-yellow-600 shadow-2xl p-6 rounded-xl";
    case "safe":
      return "bg-green-600 text-white border-l-8 border-green-800 shadow-2xl p-6 rounded-xl";
    default:
      return "bg-gray-300 text-black border-l-8 border-gray-500 shadow-2xl p-6 rounded-xl";
  }
};


  return (
    <main className="bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 min-h-screen flex items-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 w-full"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-white">
          🔎 Scam Checker
        </h2>
        <p className="mb-8 text-gray-200">
          Paste any suspicious message, link, or phone number. Cyber Guardian AI
          will analyze it and guide you.
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste link or message here..."
          className="w-full bg-white/20 border border-white/30 text-white rounded-xl p-4 mb-6 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300 transition"
        />

        <button
          onClick={handleCheck}
          className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-teal-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition"
        >
          🚀 Check Now
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mt-8 border rounded-xl p-6 ${getCardStyle(result.level)}`}
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
            <p className="mt-4 font-semibold text-sm md:text-base">
              💡 Tip:
            </p>
            <p className="text-sm md:text-base">{result.advice}</p>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
