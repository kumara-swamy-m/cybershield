// src/utils/pdf.js
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { tipsData } from "./tips";

// Generate demographic-specific PDF
export function generateChecklistPDF(type = "student") {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Cyber Safety Checklist ✅", 14, 20);

  // General Checklist
  const generalChecklist = [
    ["Never share OTPs or PINs"],
    ["Always check website URL (https://)"],
    ["Don’t click unknown links"],
    ["Enable 2FA for important accounts"],
    ["Update your passwords regularly"],
  ];

  autoTable(doc, {
    startY: 30,
    head: [["Checklist"]],
    body: generalChecklist,
  });

  // Demographic-specific tips
  if (tipsData[type]) {
    doc.setFontSize(14);
    doc.text(
      `${type.charAt(0).toUpperCase() + type.slice(1)} Safety Tips:`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    const tips = tipsData[type].map((tip) => [tip.title + " - " + tip.desc]);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15,
      head: [["Tips"]],
      body: tips,
    });
  }

  // Save file
  doc.save(`cyber-safety-${type}-checklist.pdf`);
}
