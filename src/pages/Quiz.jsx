import React, { useState } from "react";
import { quizQuestions } from "../data/quizData";
import Badge from "../components/Badge";

export default function Quiz() {
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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-green-400 drop-shadow-lg">
        🕹 Gamified Cyber Quiz
      </h2>

      {!completed ? (
        <div className="w-full max-w-3xl">
          <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl border border-green-500 hover:shadow-green-400/50 transition-shadow duration-300">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-green-300">
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
                      ? " bg-green-500 text-white shadow-green-400/70"
                      : " bg-red-500 text-white shadow-red-400/70";
                } else {
                  baseClass +=
                    " bg-gray-700 text-gray-100 hover:bg-gray-600 hover:shadow-lg cursor-pointer";
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
        <div className="w-full max-w-3xl bg-gray-800 p-10 rounded-3xl shadow-2xl border border-green-500 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-5 text-green-300 drop-shadow-lg">
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
            className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 text-gray-900 px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:from-green-500 hover:to-blue-600 transition-transform duration-300 font-semibold"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}
