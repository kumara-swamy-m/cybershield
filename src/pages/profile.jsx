// src/pages/Profile.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, BookOpen, Users, Edit2, ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Profile() {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    avatar: "",
    badges: [
      { name: "Cyber Beginner", color: "bg-purple-400" },
      { name: "Cyber Pro", color: "bg-cyan-400" },
      { name: "Community Helper", color: "bg-green-400" },
    ],
    stats: { scans: 0, quizzes: 0, reports: 0 },
    reports: [],
  });

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [avatarMenu, setAvatarMenu] = useState(false);

  const fetchUser = async () => {
    const {
      data: { user: currentUser },
      error,
    } = await supabase.auth.getUser();
    if (error) return;
    if (currentUser) {
      const avatarUrl =
        currentUser.user_metadata?.avatar_url ||
        `https://i.pravatar.cc/150?u=${currentUser.id}`;
      const { data: userReports } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });
      setUser((prev) => ({
        ...prev,
        id: currentUser.id,
        name: currentUser.user_metadata?.full_name || "",
        email: currentUser.email,
        avatar: avatarUrl,
        stats: {
          scans: currentUser.user_metadata?.scans_count || 0,
          quizzes: currentUser.user_metadata?.quizzes_count || 0,
          reports: currentUser.user_metadata?.reports_count || 0,
        },
        reports: userReports || [],
      }));
      setForm({
        name: currentUser.user_metadata?.full_name || "",
        email: currentUser.email,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setAvatarMenu(false);
      }
    };
    if (avatarMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [avatarMenu]);

  const handleSave = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { full_name: form.name },
    });
    if (!error) {
      setUser({ ...user, name: form.name, email: form.email });
      setEditMode(false);
    }
  };

  const handleDeleteReport = async (id) => {
    const { error } = await supabase.from("reports").delete().eq("id", id);
    if (!error) {
      setUser((prev) => ({
        ...prev,
        reports: prev.reports.filter((r) => r.id !== id),
        stats: { ...prev.stats, reports: prev.stats.reports - 1 },
      }));
      await supabase.auth.updateUser({
        data: { reports_count: user.stats.reports - 1 },
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  const handleRandomAvatar = async () => {
    const humanAvatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.id}-${Date.now()}`;
    setUser((prev) => ({ ...prev, avatar: humanAvatar }));
    await supabase.auth.updateUser({ data: { avatar_url: humanAvatar } });
    setAvatarMenu(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black text-white p-8">
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black font-semibold rounded-xl hover:scale-105 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:scale-105 transition"
        >
          Sign Out
        </button>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-center mb-12 relative">
        <div className="flex-shrink-0 flex flex-col items-center relative" ref={menuRef}>
          <img
            src={user.avatar}
            alt="avatar"
            onClick={() => setAvatarMenu(!avatarMenu)}
            className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-lg object-cover cursor-pointer hover:opacity-80"
          />
          {avatarMenu && (
            <div className="absolute top-36 z-50 bg-gray-800 border border-cyan-400 rounded-xl shadow-lg p-2 w-44">
              <button
                className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded-lg"
                onClick={handleRandomAvatar}
              >
                Use Random Human Avatar
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3">
          {editMode ? (
            <div className="space-y-2">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-white/10 border border-cyan-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="email"
                value={form.email}
                disabled
                className="w-full px-4 py-2 rounded-xl bg-white/10 border border-gray-600 text-gray-400"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-cyan-400 text-black rounded-xl font-bold hover:scale-105 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-700 rounded-xl hover:scale-105 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-4xl font-extrabold">{user.name}</h1>
                <Edit2
                  className="w-5 h-5 text-cyan-400 cursor-pointer hover:scale-110 transition"
                  onClick={() => setEditMode(true)}
                />
              </div>
              <p className="text-gray-300">{user.email}</p>
            </div>
          )}
          <div className="flex gap-2 mt-2 flex-wrap">
            {user.badges.map((badge, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-full font-semibold text-black ${badge.color}`}
              >
                {badge.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <Shield className="w-10 h-10 text-cyan-400 mb-2" />
          <h2 className="text-3xl font-bold">{user.stats.scans}</h2>
          <p className="text-gray-300 mt-1">Scans Completed</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <BookOpen className="w-10 h-10 text-purple-400 mb-2" />
          <h2 className="text-3xl font-bold">{user.stats.quizzes}</h2>
          <p className="text-gray-300 mt-1">Quizzes Taken</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <Users className="w-10 h-10 text-green-400 mb-2" />
          <h2 className="text-3xl font-bold">{user.stats.reports}</h2>
          <p className="text-gray-300 mt-1">Reports Submitted</p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold mb-6">My Reports</h2>
        <div className="space-y-6">
          {user.reports.length === 0 ? (
            <p className="text-gray-400">You haven’t submitted any reports yet.</p>
          ) : (
            user.reports.map((report) => (
              <div
                key={report.id}
                className="p-6 rounded-2xl shadow-md border border-white/20 bg-white/10 hover:bg-white/20 transition relative"
              >
                <button
                  onClick={() => handleDeleteReport(report.id)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition"
                >
                  <Trash2 size={20} />
                </button>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xl text-white">{report.title}</h3>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      report.type === "Phishing"
                        ? "bg-red-500/20 text-red-300"
                        : report.type === "UPI Fraud"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : report.type === "Fake Call"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {report.type}
                  </span>
                </div>
                <p className="text-sm text-indigo-200 mb-2">
                  📍 {report.city} | 📅 {report.date}
                </p>
                <p className="text-slate-200 leading-relaxed">{report.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
