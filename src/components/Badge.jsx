import React from "react";

export default function Badge({ name }) {
  return (
    <div className="inline-block bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-400 text-gray-900 px-6 py-2 rounded-full font-semibold shadow-[0_4px_15px_rgba(0,0,0,0.2)] text-lg mt-4 drop-shadow-md tracking-wide">
      ✨ {name}
    </div>
  );
}
