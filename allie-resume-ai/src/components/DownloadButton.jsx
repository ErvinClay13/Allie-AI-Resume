import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DownloadButton = () => {
  const handleDownload = () => {
    const input = document.getElementById("resume-preview");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("resume.pdf");
    });
  };

  return <button onClick={handleDownload}>Download PDF</button>;
};

export default DownloadButton;
