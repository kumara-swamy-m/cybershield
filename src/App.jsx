import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Search, BookOpen, BarChart, Users, Brain, Lock } from "lucide-react";

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

      <main className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 min-h-screen text-white">
        
        {/* Hero Section */}
        <section className="flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 px-8 py-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <h2 className="text-6xl font-extrabold leading-tight drop-shadow-lg">
                Stay <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-orange-400 bg-clip-text text-transparent">One Step Ahead</span><br />
                of Cyber Threats
              </h2>
              <p className="text-lg text-gray-200 max-w-md">
                Cyber Guardian is your AI-powered shield against scams, phishing, and online fraud. 
                Protect yourself, your family, and your community today.
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
              <div className="flex gap-8 pt-6 text-sm text-gray-300">
                <span className="flex items-center gap-2">✅ Trusted by 10k+ users</span>
                <span className="flex items-center gap-2">🔒 Secure AI Engine</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="w-full h-80 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-3xl shadow-2xl flex items-center justify-center">
                <Shield className="w-32 h-32 text-white drop-shadow-2xl" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who We Protect */}
        <section className="py-24 px-8 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold text-center mb-16"
          >
            Who We <span className="text-teal-400">Protect</span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Senior Citizens", desc: "Helping elders stay safe from phone and online scams.", icon: Users },
              { title: "Students", desc: "Guiding young minds to detect fraud and phishing.", icon: BookOpen },
              { title: "Homemakers", desc: "Protecting families from digital financial frauds.", icon: Lock },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl hover:scale-105 transition transform"
              >
                <item.icon className="w-12 h-12 mb-4 text-teal-400" />
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-24 px-8 bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-5xl font-extrabold text-center mb-16"
            >
              Why <span className="text-yellow-400">Choose Us</span>
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: "Instant Scam Detection", desc: "AI-powered scam checker to identify threats in real time.", icon: Search },
                { title: "Interactive Learning", desc: "Quizzes and guides to boost your cyber awareness.", icon: Brain },
                { title: "Community Reports", desc: "Stay updated with real fraud cases from verified users.", icon: BarChart },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl hover:scale-105 transition transform"
                >
                  <item.icon className="w-12 h-12 mb-4 text-yellow-400" />
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold mb-6"
          >
            Ready to <span className="text-teal-400">Stay Safe?</span>
          </motion.h2>
          <p className="text-lg text-gray-200 mb-10">
            Start scanning suspicious links or test your awareness with our interactive quiz.
          </p>
          <div className="flex justify-center gap-6">
            <Link
              to="/check"
              className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
            >
              🚀 Start Scam Check
            </Link>
            <Link
              to="/quiz"
              className="bg-white/20 border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition"
            >
              🎮 Take Quiz
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
