import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Trophy,
  BookOpen,
  Users,
  Edit2,
  Camera,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate(); // For navigation

  const [user, setUser] = useState({
    name: "Rahul Kumar",
    email: "rahul@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    badges: [
      { name: "Cyber Beginner", color: "bg-purple-400" },
      { name: "Cyber Pro", color: "bg-cyan-400" },
      { name: "Community Helper", color: "bg-green-400" },
    ],
    stats: { scans: 127, quizzes: 34, reports: 12 },
    recentScans: [
      { type: "Link", result: "Safe", date: "2025-08-20" },
      { type: "Message", result: "High Risk", date: "2025-08-21" },
    ],
    reports: [
      {
        title: "Fake UPI SMS",
        type: "UPI Fraud",
        city: "Bangalore",
        date: "2025-08-15",
        description: "Got a fake Paytm message asking to click on a link.",
      },
      {
        title: "Lottery Email",
        type: "Phishing",
        city: "Delhi",
        date: "2025-08-17",
        description: "Email said I won ₹5 lakh lottery. Clearly a scam.",
      },
      {
        title: "Fake Call from Bank",
        type: "Fake Call",
        city: "Mumbai",
        date: "2025-08-18",
        description: "Caller pretending to be from SBI asked OTP.",
      },
    ],
  });

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email });

  // Handle saving profile info
  const handleSave = () => {
    setUser({ ...user, name: form.name, email: form.email });
    setEditMode(false);
  };

  // Delete a report
  const handleDeleteReport = (index) => {
    const updatedReports = user.reports.filter((_, i) => i !== index);
    setUser({ ...user, reports: updatedReports });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black text-white p-8">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black font-semibold rounded-xl hover:scale-105 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
      </div>

      {/* Header & Profile Info */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-center mb-12">
        <div className="flex-shrink-0 flex flex-col items-center">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-lg"
          />
          <label className="flex items-center gap-2 mt-3 cursor-pointer hover:text-cyan-400 transition">
            <Camera className="w-5 h-5" />
            <span>Change Profile Picture</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setUser({ ...user, avatar: url });
                }
              }}
              className="hidden"
            />
          </label>
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
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-white/10 border border-cyan-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
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

          {/* Badges */}
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

      {/* Stats */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl flex flex-col items-center shadow-lg"
        >
          <Shield className="w-10 h-10 text-cyan-400 mb-2" />
          <h2 className="text-3xl font-bold">{user.stats.scans}</h2>
          <p className="text-gray-300 mt-1">Scans Completed</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl flex flex-col items-center shadow-lg"
        >
          <BookOpen className="w-10 h-10 text-purple-400 mb-2" />
          <h2 className="text-3xl font-bold">{user.stats.quizzes}</h2>
          <p className="text-gray-300 mt-1">Quizzes Taken</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl flex flex-col items-center shadow-lg"
        >
          <Users className="w-10 h-10 text-green-400 mb-2" />
          <h2 className="text-3xl font-bold">{user.stats.reports}</h2>
          <p className="text-gray-300 mt-1">Reports Submitted</p>
        </motion.div>
      </div>

      {/* Recent Scans */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold mb-6">Recent Scans</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left rounded-2xl overflow-hidden shadow-lg">
            <thead className="bg-cyan-400/20">
              <tr className="text-gray-300">
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Result</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {user.recentScans.map((scan, i) => (
                <tr
                  key={i}
                  className={`border-b border-gray-700 ${
                    scan.result === "High Risk"
                      ? "bg-red-600/20"
                      : "bg-green-600/10"
                  }`}
                >
                  <td className="px-6 py-4">{scan.type}</td>
                  <td className="px-6 py-4 font-semibold">{scan.result}</td>
                  <td className="px-6 py-4">{scan.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* My Reports Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold mb-6">My Reports</h2>
        <div className="space-y-6">
          {user.reports.length === 0 ? (
            <p className="text-gray-400">You haven’t submitted any reports yet.</p>
          ) : (
            user.reports.map((report, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl shadow-md border border-white/20 bg-white/10 hover:bg-white/20 transition relative"
              >
                <button
                  onClick={() => handleDeleteReport(i)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition"
                  title="Delete Report"
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
