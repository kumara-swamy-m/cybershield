// src/auth/SignIn.jsx
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (error) setError(error.message);
    else {
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-950 to-black text-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-cyan-400 shadow-lg"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-3 px-4 py-3 rounded-xl bg-white/10 border border-cyan-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-white/10 border border-cyan-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full py-3 mb-4 rounded-xl bg-cyan-400 text-black font-bold hover:scale-105 transition"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-cyan-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
