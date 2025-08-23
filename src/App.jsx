import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Search, BookOpen, BarChart } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white/70 backdrop-blur border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
        <h1 className="font-extrabold text-xl flex items-center gap-2 text-blue-700">
          <Shield className="w-6 h-6" /> Cyber Guardian
        </h1>
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/check" className="hover:text-blue-600">Check</Link>
          <Link to="/quiz" className="hover:text-blue-600">Quiz</Link>
          <Link to="/reports" className="hover:text-blue-600">Reports</Link>
          <Link to="/learn" className="hover:text-blue-600">Learn</Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-br from-blue-700 via-purple-600 to-teal-600 min-h-screen text-white flex items-center">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 px-8 py-24 items-center">
          
          {/* Hero Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <h2 className="text-6xl font-extrabold leading-tight drop-shadow-md">
              Protect Yourself <br />
              from <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-orange-400 bg-clip-text text-transparent">Scams & Cyber Threats</span>
            </h2>
            <p className="text-lg text-gray-100 max-w-md">
              Cyber Guardian is your AI-powered shield against fraud. 
              Scan suspicious links, learn digital safety, and join a 
              trusted community of cyber-aware users.
            </p>
            <div className="flex gap-4">
              <Link
                to="/check"
                className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
              >
                🚀 Start Scan
              </Link>
              <Link
                to="/quiz"
                className="bg-white/20 border border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition"
              >
                🎮 Take Quiz
              </Link>
            </div>
            <div className="flex gap-8 pt-6 text-sm">
              <span className="flex items-center gap-2">✅ Trusted by 1k+ users</span>
              <span className="flex items-center gap-2">🔒 Secure AI Engine</span>
            </div>
          </motion.div>

          {/* Hero Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid gap-6"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold mb-3 flex items-center gap-2"><Search /> Instant Scam Check</h3>
              <p className="text-gray-200 text-sm">Paste any link or message, and AI scans it for fraud patterns.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold mb-3 flex items-center gap-2"><BookOpen /> Learn & Stay Safe</h3>
              <p className="text-gray-200 text-sm">Interactive guides & gamified quizzes to boost awareness.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold mb-3 flex items-center gap-2"><BarChart /> Scam Reports</h3>
              <p className="text-gray-200 text-sm">See real-time fraud alerts shared by the community.</p>
            </div>
          </motion.div>

        </div>
      </main>
    </>
  );
}
