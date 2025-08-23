import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Check from "./pages/Check.jsx";
import Quiz from "./pages/Quiz.jsx";
import Reports from "./pages/Reports.jsx";
import Learn from "./pages/Learn.jsx";
import Profile from "./pages/profile.jsx";





ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/check" element={<Check />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
