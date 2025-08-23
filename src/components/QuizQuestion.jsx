import React from "react";

export default function QuizQuestion({ questionData, handleAnswer }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-6 transition transform hover:scale-[1.01]">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
        {questionData.question}
      </h3>
      <div className="flex flex-col gap-3">
        {questionData.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx === questionData.correctIndex)}
            className="text-left border border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-100 transition duration-200 font-medium"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
