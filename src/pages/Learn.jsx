// src/pages/Learn.jsx
import { useState } from "react";
import { tipsData } from "../utils/tips";
import { generateChecklistPDF } from "../utils/pdf";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Learn() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black font-semibold rounded-xl hover:scale-105 transition z-20"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Subtle animated background grid (same as Quiz) */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] animate-[pulse_6s_ease-in-out_infinite] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-300 drop-shadow-lg">
            🔒 Cyber Safety Learn Hub
          </h1>
          <p className="mt-3 text-gray-400 text-lg">
            Tailored safety tips for everyone
          </p>
        </div>

        {!selected ? (
          // STEP 1: User category selection
          <div>
            <h2 className="text-center text-2xl font-bold mb-10 text-emerald-300">
              Choose your category
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
                  className="relative p-10 rounded-2xl bg-slate-800/70 border border-cyan-500/40 backdrop-blur-sm shadow-xl hover:shadow-cyan-400/30 hover:-translate-y-2 transition-all"
                >
                  {/* Glow behind icon */}
                  <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                    <div className="w-24 h-24 rounded-full bg-cyan-500/10 blur-2xl"></div>
                  </div>

                  <div className="flex flex-col items-center relative z-10">
                    <span className="text-7xl drop-shadow-md">{item.emoji}</span>
                    <h3 className="text-2xl font-bold text-cyan-300 mt-4">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2">
                      Explore safety tips
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // STEP 2: Show tips + checklist
          <div className="space-y-10">
            {/* Back button to categories */}
            <button
              onClick={() => setSelected(null)}
              className="px-5 py-2 border border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-600/20 transition"
            >
              ← Back to categories
            </button>

            {/* Tips */}
            <div>
              <h2 className="text-3xl font-bold mb-6 capitalize text-emerald-300 drop-shadow-md">
                {selected} Safety Tips
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {tipsData[selected].map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-800/70 border border-cyan-500/40 shadow-lg backdrop-blur-sm hover:shadow-cyan-400/30 transition"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{tip.icon}</span>
                      <div>
                        <h3 className="font-semibold text-lg text-cyan-300">
                          {tip.title}
                        </h3>
                        <p className="text-sm text-gray-300">{tip.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div className="p-6 rounded-2xl bg-slate-800/70 border border-cyan-500/40 shadow-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-emerald-300 drop-shadow-md">
                Cyber Safety Checklist ✅
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm">
                <li>Never share OTPs or PINs</li>
                <li>Always check website URL (https://)</li>
                <li>Don’t click unknown links</li>
                <li>Enable 2FA for important accounts</li>
                <li>Update your passwords regularly</li>
              </ul>
              <button
                onClick={() => generateChecklistPDF(selected)}
                className="mt-6 bg-gradient-to-r from-cyan-400 to-emerald-400 text-gray-900 px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:from-cyan-500 hover:to-emerald-500 transition-transform duration-300 font-semibold"
              >
                Download {selected.charAt(0).toUpperCase() + selected.slice(1)} PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
