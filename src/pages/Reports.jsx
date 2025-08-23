import { useState, useMemo } from "react";
import { Shield, Globe2, Trash2 } from "lucide-react";
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

export default function Reports() {
  const [reports, setReports] = useState([
    {
      name: "Rahul Mehta",
      email: "rahul@example.com",
      title: "Fake UPI SMS",
      city: "Bangalore",
      description: "Got a fake Paytm message asking to click on a link.",
      type: "UPI Fraud",
    },
    {
      name: "Aditi Sharma",
      email: "aditi@example.com",
      title: "Lottery Email",
      city: "Delhi",
      description: "Email said I won ₹5 lakh lottery. Clearly a scam.",
      type: "Phishing",
    },
    {
      name: "Rohit Singh",
      email: "rohit@example.com",
      title: "Fake Call from Bank",
      city: "Mumbai",
      description: "Caller pretending to be from SBI asked OTP.",
      type: "Fake Call",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    city: "",
    description: "",
    type: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.title ||
      !form.city ||
      !form.description ||
      !form.type
    )
      return;

    setReports([{ ...form }, ...reports]);
    setForm({
      name: "",
      email: "",
      title: "",
      city: "",
      description: "",
      type: "",
    });
  };

  const handleDelete = (index) => {
    setReports(reports.filter((_, i) => i !== index));
  };

  // --- Analytics Data ---
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
    return Object.entries(counts).map(([city, reports]) => ({
      city,
      reports,
    }));
  }, [reports]);

  const COLORS = ["#60a5fa", "#fbbf24", "#f87171", "#34d399", "#c084fc"];

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-800 text-white py-16 px-6 rounded-b-3xl shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="mx-auto mb-5" size={56} />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Community Scam Reports
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed">
            Stay ahead of fraudsters. Explore scam trends & submit your
            experience to protect others.
          </p>
        </div>
      </div>

      {/* Dashboard */}
      <div className="relative max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Scam Types Pie */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-3xl shadow-2xl">
          <h3 className="text-xl font-semibold text-indigo-100 mb-4">
            Scam Types Distribution
          </h3>
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
                  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  padding: "10px 14px",
                }}
                itemStyle={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#e2e8f0",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* City Bar Chart */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-3xl shadow-2xl">
          <h3 className="text-xl font-semibold text-indigo-100 mb-4">
            Top Cities Affected
          </h3>
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
        </div>
      </div>

      {/* Report Form */}
      <div className="relative max-w-4xl mx-auto px-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl mb-12 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-indigo-100">
            <Globe2 className="text-blue-400" /> Submit a Scam Report
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-slate-800/60 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-3 rounded-xl placeholder-slate-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-slate-800/60 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-3 rounded-xl placeholder-slate-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Title (e.g. Fake SMS)"
                value={form.title}
                onChange={handleChange}
                className="w-full bg-slate-800/60 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-3 rounded-xl placeholder-slate-400"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full bg-slate-800/60 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-3 rounded-xl placeholder-slate-400"
              />
            </div>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full bg-slate-800/60 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-3 rounded-xl"
            >
              <option value="">Select Scam Type</option>
              <option value="Phishing">🎣 Phishing</option>
              <option value="UPI Fraud">💰 UPI Fraud</option>
              <option value="Fake Call">📞 Fake Call</option>
              <option value="Lottery">🎟️ Lottery Scam</option>
            </select>

            <textarea
              name="description"
              placeholder="Describe the scam..."
              value={form.description}
              onChange={handleChange}
              className="w-full bg-slate-800/60 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-3 rounded-xl placeholder-slate-400"
              rows={4}
            />

            <button
              type="submit"
              className="w-full md:w-auto bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
            >
              🚀 Submit Report
            </button>
          </form>
        </div>
      </div>

      {/* Reports Feed */}
      <div className="relative max-w-4xl mx-auto px-6 pb-16">
        <h3 className="text-2xl font-bold mb-6 text-indigo-100">
          📌 Latest Reports
        </h3>
        <div className="space-y-6">
          {reports.map((r, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl shadow-md border border-white/20 bg-white/10 hover:bg-white/20 transition relative"
            >
              {/* Delete bin button */}
              <button
                onClick={() => handleDelete(idx)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition"
                title="Delete Report"
              >
                <Trash2 size={20} />
              </button>

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
              <p className="text-slate-200 leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
