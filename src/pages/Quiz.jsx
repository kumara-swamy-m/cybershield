import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { quizQuestions } from "../data/quizData";
import Badge from "../components/Badge";

export default function Quiz() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (idx) => {
    const correctIndex = quizQuestions[current].correctIndex;
    setSelected(idx);

    if (idx === correctIndex) setScore(score + 1);

    setTimeout(() => {
      if (current + 1 < quizQuestions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setCompleted(true);
      }
    }, 1000);
  };

  const getBadge = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 90) return "Cyber Guardian";
    if (percentage >= 70) return "Cyber Pro";
    if (percentage >= 50) return "Cyber Beginner";
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col items-center py-10 px-4 relative overflow-hidden">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black font-semibold rounded-xl hover:scale-105 transition z-20"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Subtle animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] animate-[pulse_6s_ease-in-out_infinite] pointer-events-none"></div>

      <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-cyan-300 drop-shadow-lg relative z-10">
        🕹 Gamified Cyber Quiz
      </h2>

      {!completed ? (
        <div className="w-full max-w-3xl relative z-10">
          <div className="bg-slate-800/70 p-8 rounded-3xl shadow-2xl border border-cyan-500/40 hover:shadow-cyan-400/40 transition-shadow duration-300 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-emerald-300">
              {quizQuestions[current].question}
            </h3>
            <div className="flex flex-col gap-4">
              {quizQuestions[current].options.map((option, idx) => {
                const correctIndex = quizQuestions[current].correctIndex;
                let baseClass =
                  "px-5 py-3 rounded-xl font-medium text-left transition duration-300 shadow-md";

                if (selected === idx) {
                  baseClass +=
                    idx === correctIndex
                      ? " bg-emerald-400 text-gray-900 shadow-lg shadow-emerald-500/40"
                      : " bg-rose-500 text-white shadow-lg shadow-rose-400/40";
                } else {
                  baseClass +=
                    " bg-slate-700/80 text-gray-100 hover:bg-slate-600/80 hover:shadow-lg cursor-pointer";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selected !== null}
                    className={baseClass}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="text-right text-gray-400 mt-4 font-medium">
              Question {current + 1} / {quizQuestions.length}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl bg-slate-800/70 p-10 rounded-3xl shadow-2xl border border-cyan-500/40 text-center relative z-10 backdrop-blur-sm">
          <h3 className="text-3xl md:text-4xl font-bold mb-5 text-cyan-300 drop-shadow-lg">
            Your Score: {score} / {quizQuestions.length}
          </h3>

          {getBadge() ? (
            <Badge name={getBadge()} />
          ) : (
            <p className="text-gray-400 mb-5">Keep learning and try again!</p>
          )}

          <button
            onClick={() => {
              setCurrent(0);
              setScore(0);
              setCompleted(false);
              setSelected(null);
            }}
            className="mt-6 bg-gradient-to-r from-cyan-400 to-emerald-400 text-gray-900 px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:from-cyan-500 hover:to-emerald-500 transition-transform duration-300 font-semibold"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}
