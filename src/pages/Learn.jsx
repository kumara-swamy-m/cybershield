// src/pages/Learn.jsx
import { useState } from "react";
import { tipsData } from "../utils/tips";
import { generateChecklistPDF } from "../utils/pdf";

export default function Learn() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="relative min-h-screen bg-[#0a0f1c] text-white overflow-hidden">
      {/* Cyber Grid Background - softer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,200,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,200,255,0.08)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>

      {/* Softer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/70 via-black/80 to-[#1e293b]/60"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center py-10 border-b border-cyan-400/30">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Cyber Safety Learn Hub 🔒
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Stay secure with tailored cyber tips
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
          {!selected ? (
            // STEP 1: Show Demographic Selection
            <div>
              <h2 className="text-center text-2xl font-bold mb-10 text-cyan-300">
                Who are you?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { type: "student", title: "Students", emoji: "🎓" },
                  { type: "homemaker", title: "Homemakers", emoji: "🏠" },
                  { type: "senior", title: "Senior Citizens", emoji: "👴" },
                ].map((item) => (
                  <button
                    key={item.type}
                    onClick={() => setSelected(item.type)}
                    className="relative p-10 rounded-2xl border border-cyan-500/30 bg-gray-900/50 backdrop-blur-md shadow-lg hover:border-cyan-400 hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-2"
                  >
                    {/* Soft glow behind emoji */}
                    <div className="absolute inset-0 flex justify-center items-center">
                      <div className="w-20 h-20 rounded-full bg-cyan-500/10 blur-2xl"></div>
                    </div>

                    <div className="flex flex-col items-center space-y-3 relative z-10">
                      <span className="text-7xl">{item.emoji}</span>
                      <h3 className="text-2xl font-bold text-cyan-300">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Click to explore safety tips
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // STEP 2: Show Tips + Checklist
            <div className="space-y-10">
              {/* Back Button */}
              <button
                onClick={() => setSelected(null)}
                className="text-sm px-4 py-2 border border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-600/20 transition"
              >
                ← Back to selection
              </button>

              {/* Tips Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4 capitalize text-cyan-300">
                  {selected} Safety Tips
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {tipsData[selected].map((tip, idx) => (
                    <div
                      key={idx}
                      className="p-6 border border-cyan-500/30 rounded-2xl shadow-md bg-gray-900/70 backdrop-blur-md flex items-start gap-4 hover:border-cyan-400 hover:shadow-cyan-500/20 transition"
                    >
                      <span className="text-3xl">{tip.icon}</span>
                      <div>
                        <h3 className="font-semibold text-lg text-white">
                          {tip.title}
                        </h3>
                        <p className="text-sm text-gray-400">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checklist Section */}
              <div className="p-6 border border-cyan-500/30 rounded-2xl bg-gray-900/70 backdrop-blur-md shadow-md">
                <h3 className="font-bold text-xl mb-3 text-cyan-300">
                  Cyber Safety Checklist ✅
                </h3>
                <ul className="list-disc pl-5 text-sm space-y-1 text-gray-300">
                  <li>Never share OTPs or PINs</li>
                  <li>Always check website URL (https://)</li>
                  <li>Don’t click unknown links</li>
                  <li>Enable 2FA for important accounts</li>
                  <li>Update your passwords regularly</li>
                </ul>
                <button
                  onClick={() => generateChecklistPDF(selected)}
                  className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg shadow-md hover:bg-cyan-700 transition-all"
                >
                  Download {selected.charAt(0).toUpperCase() + selected.slice(1)} PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
