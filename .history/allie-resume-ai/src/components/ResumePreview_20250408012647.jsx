import React, { useEffect, useState, useRef } from "react";
import "./ResumePreview.css";

const ResumePreview = ({ resumeData, onClear }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [savedResumes, setSavedResumes] = useState([]);
  const resumeRef = useRef();

  useEffect(() => {
    if (resumeData) {
      setToast("✅ Resume draft saved");
    }
    const allSaves = JSON.parse(localStorage.getItem("savedResumes")) || [];
    setSavedResumes(allSaves);
  }, [resumeData]);

  const setToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleClearClick = () => {
    if (onClear) {
      onClear();
      setToast("🧹 Resume cleared");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const element = resumeRef.current;
    const html2pdf = (await import("html2pdf.js")).default;
    html2pdf().from(element).save("allie-resume.pdf");
  };

  const handleSaveVersion = () => {
    let allSaves = JSON.parse(localStorage.getItem("savedResumes")) || [];
    const title = prompt("Enter a name for this resume version:");
    if (!title) return;

    const existingIndex = allSaves.findIndex(r => r.title === title);
    const newSave = { title, data: resumeData };

    if (existingIndex !== -1) {
      allSaves[existingIndex] = newSave;
      setToast(`♻️ Overwrote version: ${title}`);
    } else if (allSaves.length >= 3) {
      allSaves.shift();
      allSaves.push(newSave);
      setToast(`♻️ Replaced oldest version with: ${title}`);
    } else {
      allSaves.push(newSave);
      setToast(`💾 Saved version: ${title}`);
    }

    localStorage.setItem("savedResumes", JSON.stringify(allSaves));
    setSavedResumes(allSaves);
  };

  const handleLoadVersion = (version) => {
    localStorage.setItem("resumeData", JSON.stringify(version.data));
    window.location.reload();
  };

  const handleDeleteVersion = (title) => {
    const updated = savedResumes.filter((r) => r.title !== title);
    localStorage.setItem("savedResumes", JSON.stringify(updated));
    setSavedResumes(updated);
    setToast(`🗑 Deleted version: ${title}`);
  };

  const handleDeleteAllVersions = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all saved resume versions?");
    if (!confirmDelete) return;

    localStorage.removeItem("savedResumes");
    setSavedResumes([]);
    setToast("🧼 All saved versions deleted");
  };

  if (!resumeData) return <p>No data to preview.</p>;

  const { name, phone, email, jobTitle, sections } = resumeData;

  const hasErrors = !name || !jobTitle || (sections || []).some(
    (section) => !section.title || !section.content
  );

  return (
    <div className="resume-preview-wrapper">
      {toastMessage && <div className="toast">{toastMessage}</div>}

      <div ref={resumeRef} className="resume-preview">
        <h1>{name || "[Name Missing]"}</h1>
        <h2>{jobTitle || "[Job Title Missing]"}</h2>
        <p>{email} | {phone}</p>

        {hasErrors && (
          <div className="validation-warning">
            ⚠️ Some sections may be missing titles or content.
          </div>
        )}

        {sections && sections.length > 0 && (
          <div className="section-list">
            {sections.map((section, index) => (
              <div key={index} className="preview-section">
                <h3>{section.title || "[Untitled Section]"}</h3>
                <p>{section.content || "[No content provided]"}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleClearClick}>Clear Resume</button>
        <button onClick={handlePrint} style={{ marginLeft: "10px" }}>Print / Export</button>
        <button onClick={handleDownloadPDF} style={{ marginLeft: "10px" }}>Download PDF</button>
        <button onClick={handleSaveVersion} style={{ marginLeft: "10px" }}>Save Version</button>
      </div>

      {savedResumes.length > 0 && (
        <div className="saved-resumes">
          <h4>📂 Saved Versions (Dashboard Preview):</h4>
          <div className="dashboard-grid">
            {savedResumes.map((r) => (
              <div key={r.title} className="dashboard-card">
                <h5>{r.title}</h5>
                <p><strong>{r.data.name}</strong> – {r.data.jobTitle}</p>
                <ul>
                  {r.data.sections?.slice(0, 2).map((sec, idx) => (
                    <li key={idx}><em>{sec.title}</em>: {sec.content.slice(0, 50)}...</li>
                  ))}
                </ul>
                <button onClick={() => handleLoadVersion(r)}>Load</button>
                <button onClick={() => handleDeleteVersion(r.title)}>Delete</button>
              </div>
            ))}
          </div>
          <button onClick={handleDeleteAllVersions} style={{ marginTop: "10px" }}>
            🗑 Delete All
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
