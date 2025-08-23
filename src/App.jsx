import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Search,
  BookOpen,
  BarChart,
  Users,
  Brain,
  Lock,
} from "lucide-react";
import { supabase } from "./supabaseClient";
import { useState, useEffect } from "react";

// Navbar
function Navbar() {
  const [session, setSession] = useState(null);
  const [profileUrl, setProfileUrl] = useState("/default-profile.png"); // default image

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetch profile image (optional if you still want avatar in profile page)
  useEffect(() => {
    if (session?.user?.id) {
      supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", session.user.id)
        .single()
        .then(({ data, error }) => {
          if (!error && data?.avatar_url) setProfileUrl(data.avatar_url);
        });
    }
  }, [session]);

  const navItems = [
    { label: "Scan", path: "/check", icon: Search, color: "from-cyan-400 to-blue-400" },
    { label: "Quiz", path: "/quiz", color: "from-purple-400 to-pink-400" },
    { label: "Reports", path: "/reports", color: "from-green-400 to-emerald-400" },
    { label: "Learn", path: "/learn", color: "from-yellow-400 to-orange-400" },
    ...(session
      ? [{ label: "Profile", path: "/profile", color: "from-pink-400 to-red-400" }]
      : []),
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_0_20px_rgba(0,255,255,0.3)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.7)] animate-pulse" />
          <h1 className="font-extrabold text-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Cyber Guardian
          </h1>
        </Link>

        {/* Menu Items */}
        <div className="flex gap-4 items-center">
          {navItems.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={item.path}
                className={`relative px-5 py-2 rounded-xl font-semibold text-white border border-white/20 bg-gradient-to-r ${item.color} bg-clip-padding flex items-center gap-2 overflow-hidden group`}
              >
                {item.icon && <item.icon className="w-5 h-5 text-white drop-shadow-md" />}
                <span className="relative z-10">{item.label}</span>
                <span
                  className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20 blur-md group-hover:opacity-50 transition`}
                />
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-white/50 to-cyan-400 transition-all group-hover:w-full" />
              </Link>
            </motion.div>
          ))}

          {/* Show Sign In if not logged in */}
          {!session && (
            <Link
              to="/signin"
              className="px-4 py-2 bg-cyan-400 text-black font-semibold rounded-xl hover:scale-105 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

// Footer
function Footer() {
  const navLinks = [
    { label: "Scan", path: "/check", icon: Search },
    { label: "Quiz", path: "/quiz" },
    { label: "Reports", path: "/reports" },
    { label: "Learn", path: "/learn" },
  ];

  return (
    <footer className="relative z-10 bg-black/50 backdrop-blur-xl border-t border-cyan-500/20 shadow-[0_0_20px_rgba(0,255,255,0.3)] mt-24">
      <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-8 text-gray-300">
        {/* Logo & Tagline */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.7)] animate-pulse" />
            <h1 className="font-extrabold text-xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
              Cyber Guardian
            </h1>
          </div>
          <p className="text-sm max-w-xs text-gray-300">
            Your AI-powered shield against online scams and phishing. Stay protected and informed.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          {navLinks.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white border border-cyan-400 bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition"
            >
              {item.icon && <item.icon className="w-4 h-4" />}
              {item.label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <p className="text-gray-300">
            Email:{" "}
            <a
              href="mailto:support@cyberguardian.com"
              className="text-cyan-400 hover:underline"
            >
              kumaramswamy7147@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-cyan-500/10 text-gray-400 text-sm text-center py-4">
        &copy; {new Date().getFullYear()} Cyber Guardian. All rights reserved.
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen text-white bg-gradient-to-br from-black via-blue-950 to-black overflow-hidden">
        {/* Animated cyber grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />

        {/* Hero Section */}
        <section className="flex items-center min-h-screen relative z-10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 px-8 py-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <h2 className="text-6xl font-extrabold leading-tight">
                Defend Against{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Cyber Threats
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-md">
                Your AI-powered shield against scams, phishing, and digital
                frauds. Stay protected. Stay aware. Stay ahead.
              </p>

              {/* Hero Buttons */}
              <div className="flex gap-4">
                <Link
                  to="/check"
                  className="relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden border border-cyan-400 group flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  <span className="relative z-10">🚀 Scan</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 blur-md group-hover:opacity-40 transition" />
                </Link>
                <Link
                  to="/quiz"
                  className="relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden border border-cyan-400 group flex items-center gap-2"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 blur-md group-hover:opacity-40 transition" />
                  <span className="relative z-10">🎮 Take Quiz</span>
                </Link>
              </div>

              <div className="flex gap-8 pt-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  ✅ Trusted by 10k+ users
                </span>
                <span className="flex items-center gap-2">🔒 Secure AI Engine</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="w-full h-80 bg-gradient-to-br from-cyan-600 via-blue-700 to-purple-700 rounded-3xl shadow-[0_0_40px_rgba(0,255,255,0.3)] flex items-center justify-center">
                <Shield className="w-32 h-32 text-cyan-300 drop-shadow-[0_0_15px_rgba(0,255,255,0.7)]" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who We Protect Section */}
        <section className="py-24 px-8 max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold text-center mb-16"
          >
            Who We <span className="text-cyan-400">Protect</span>
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
                className="bg-white/5 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8 shadow-lg hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:scale-105 transition"
              >
                <item.icon className="w-12 h-12 mb-4 text-cyan-400" />
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-8 bg-gradient-to-br from-blue-950 via-black to-blue-950 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-5xl font-extrabold text-center mb-16"
            >
              Why <span className="text-cyan-400">Choose Us</span>
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: "Instant Scam Detection", desc: "AI-powered checker that identifies threats in real time.", icon: Search },
                { title: "Interactive Learning", desc: "Quizzes & guides to sharpen your cyber awareness.", icon: Brain },
                { title: "Community Reports", desc: "Stay updated with verified real fraud cases.", icon: BarChart },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 shadow-lg hover:shadow-[0_0_30px_rgba(138,43,226,0.5)] hover:scale-105 transition"
                >
                  <item.icon className="w-12 h-12 mb-4 text-purple-400" />
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="py-24 px-8 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold mb-6"
          >
            Ready to <span className="text-cyan-400">Stay Safe?</span>
          </motion.h2>
          <p className="text-lg text-gray-300 mb-10">
            Scan suspicious links or test your awareness with our interactive quiz.
          </p>
          <div className="flex justify-center gap-6">
            <Link
              to="/check"
              className="relative px-8 py-4 rounded-xl font-semibold text-white border border-cyan-400 group flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span className="relative z-10">🚀 Scan</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 blur-md group-hover:opacity-40 transition" />
            </Link>
            <Link
              to="/quiz"
              className="relative px-8 py-4 rounded-xl font-semibold text-white border border-cyan-400 group flex items-center gap-2"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 blur-md group-hover:opacity-40 transition" />
              <span className="relative z-10">🎮 Take Quiz</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
