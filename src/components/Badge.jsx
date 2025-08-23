import React from "react";

export default function Badge({ name }) {
  return (
    <div className="inline-block bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-gray-900 px-6 py-2 rounded-full font-bold shadow-lg text-lg mt-4 drop-shadow-md">
      🏅 {name}
    </div>
  );
}
