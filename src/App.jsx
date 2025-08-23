import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between">
      <h1 className="font-bold text-lg">🛡 Cyber Guardian</h1>
      <div className="flex gap-4 text-sm">
        <Link to="/check">Check</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/learn">Learn</Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-4xl font-bold mb-4">
          Stay Safe from Online Scams 🚨
        </h2>
        <p className="mb-6 text-gray-600">
          Use Cyber Guardian to check suspicious links, learn cyber safety,
          and report frauds.
        </p>
        <div className="flex gap-4">
          <Link
            to="/check"
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Start Scan
          </Link>
          <Link
            to="/quiz"
            className="border px-4 py-2 rounded-lg"
          >
            Take a Quiz
          </Link>
        </div>
      </main>
    </>
  );
}
