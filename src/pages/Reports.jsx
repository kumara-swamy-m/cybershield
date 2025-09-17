import { useState, useEffect, useMemo } from "react";
import { Shield, Globe2, ArrowLeft, Trash2 } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Reports() {
  const navigate = useNavigate();
  const session = useSession(); // ✅ user session
  const supabaseClient = useSupabaseClient();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    city: "",
    description: "",
    type: "",
  });

  // 🔄 refresh session user after updating metadata
  const refreshUser = async () => {
    const { error } = await supabaseClient.auth.getUser();
    if (!error) {
      window.location.reload(); // force Profile update
    }
  };

  // Fetch ALL reports for global feed + charts
  useEffect(() => {
    const fetchReports = async () => {
      let { data, error } = await supabase
        .from("reports")
        .select("id, name, email, title, city, description, type, user_id")
        .order("id", { ascending: false });

      if (error) console.error("Error fetching reports:", error);
      else setReports(data || []);

      setLoading(false);
    };

    fetchReports();
  }, []);

  // Handle form input
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Submit new report
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert("You must be logged in to submit a report");
      return;
    }

    const user = session.user;

    const newReport = {
      user_id: user.id,
      name: user.user_metadata.full_name || "Anonymous",
      email: user.email,
      title: form.title,
      city: form.city,
      description: form.description,
      type: form.type,
    };

    const { data, error } = await supabase
      .from("reports")
      .insert([newReport])
      .select();

    if (error) {
      console.error("Error inserting report:", error);
    } else {
      alert("✅ Report submitted successfully!");
      setForm({ title: "", city: "", description: "", type: "" });

      if (data && data.length > 0) {
        setReports([data[0], ...reports]);

        // 🔹 increment reports_count in user metadata
        const currentCount = user.user_metadata.reports_count || 0;
        await supabase.auth.updateUser({
          data: { reports_count: currentCount + 1 },
        });

    
      }
    }
  };

  // Delete report (only if current user is owner)
  const handleDelete = async (id, user_id) => {
    if (!session || session.user.id !== user_id) {
      alert("❌ You can only delete your own reports");
      return;
    }

    const { error } = await supabase.from("reports").delete().eq("id", id);
    if (error) {
      console.error("Error deleting report:", error);
    } else {
      setReports(reports.filter((r) => r.id !== id));
    }
  };

  // Chart Data
  const typeData = useMemo(() => {
    const counts = {};
    reports.forEach((r) => {
      counts[r.type] = (counts[r.type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [reports]);

  const cityData = useMemo(() => {
    const counts = {};
    reports.forEach((r) => {
      counts[r.city] = (counts[r.city] || 0) + 1;
    });
    return Object.entries(counts).map(([city, reports]) => ({ city, reports }));
  }, [reports]);

  const COLORS = ["#60a5fa", "#fbbf24", "#f87171", "#34d399", "#c084fc"];

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black font-semibold rounded-xl hover:scale-105 transition z-20"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-800 text-white py-16 px-6 rounded-b-3xl shadow-lg z-10">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="mx-auto mb-5" size={56} />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Community Scam Reports
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed">
            Explore all scam reports submitted by the community.
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="relative max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 z-10">
        {/* Scam Types Pie */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-3xl shadow-2xl">
          <h3 className="text-xl font-semibold text-indigo-100 mb-4">
            Scam Types Distribution
          </h3>
          {typeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={typeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {typeData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                      stroke="white"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background:
                      "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                    borderRadius: "12px",
                    border: "1px solid #334155",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-400 text-center py-20">
              No data available yet
            </p>
          )}
        </div>

        {/* City Bar Chart */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-3xl shadow-2xl">
          <h3 className="text-xl font-semibold text-indigo-100 mb-4">
            Top Cities Affected
          </h3>
          {cityData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={cityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="city" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    borderRadius: "10px",
                    border: "1px solid #334155",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="reports" fill="#60a5fa" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-400 text-center py-20">
              No data available yet
            </p>
          )}
        </div>
      </div>

      {/* Report Form */}
      <div className="relative max-w-4xl mx-auto px-6 z-10">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl mb-12 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-indigo-100">
            <Globe2 className="text-blue-400" /> Submit a Scam Report
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-800 text-white"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-800 text-white"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-800 text-white"
            />
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-800 text-white"
            >
              <option value="">Select Scam Type</option>
              <option value="Phishing">Phishing</option>
              <option value="UPI Fraud">UPI Fraud</option>
              <option value="Fake Call">Fake Call</option>
              <option value="Other">Other</option>
            </select>
            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 rounded-xl font-semibold text-black hover:scale-105 transition"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>

      {/* Global Feed */}
      <div className="relative max-w-4xl mx-auto px-6 pb-16 z-10">
        <h3 className="text-2xl font-bold mb-6 text-indigo-100">
          🌍 Global Reports Feed
        </h3>
        {loading ? (
          <p className="text-slate-400">Loading reports...</p>
        ) : reports.length === 0 ? (
          <p className="text-slate-400">No reports submitted yet</p>
        ) : (
          <div className="space-y-6">
            {reports.map((r) => (
              <div
                key={r.id}
                className="p-6 rounded-3xl shadow-md border border-white/20 bg-white/10 hover:bg-white/20 transition relative"
              >
                {session?.user?.id === r.user_id && (
                  <button
                    onClick={() => handleDelete(r.id, r.user_id)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition"
                    title="Delete Report"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xl text-white">{r.title}</h3>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      r.type === "Phishing"
                        ? "bg-red-500/20 text-red-300"
                        : r.type === "UPI Fraud"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : r.type === "Fake Call"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {r.type}
                  </span>
                </div>
                <p className="text-sm text-indigo-200 mb-2">
                  👤 {r.name} | 📧 {r.email} | 📍 {r.city}
                </p>
                <p className="text-slate-200 leading-relaxed">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
