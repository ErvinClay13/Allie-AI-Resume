
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ResumePreview.css";

const ResumePreview = ({ resumeData }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [savedResumes, setSavedResumes] = useState([]);
  const resumeRef = useRef();
  const navigate = useNavigate();

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
    localStorage.removeItem("resumeData");
    setToast("🧹 Resume cleared");
    navigate("/form", { state: { reset: true } });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = resumeRef.current;

    // Enforce fixed size for export
    element.style.width = "816px";
    element.style.height = "1056px";

    const opt = {
      margin: 0,
      filename: 'allie-resume.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    window.html2pdf().set(opt).from(element).save();
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

  return (
    <div className="resume-preview-wrapper">
      {toastMessage && <div className="toast">{toastMessage}</div>}

      <div className="pdf-export-wrapper" ref={resumeRef}>
        <div className="resume-preview-template">
          <aside className="left-column">
            <div className="identity">
              <h1>{name}</h1>
              <h2>{jobTitle}</h2>
              <p>{email}</p>
              <p>{phone}</p>
            </div>
          </aside>

          <main className="right-column">
            {sections && sections.length > 0 && (
              <div className="section-list">
                {sections.map((section, index) => (
                  <div key={index} className="resume-section">
                    <h3>{section.title || "Untitled"}</h3>
                    <p>{section.content || "[No content provided]"}</p>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <div className="resume-controls">
        <button onClick={handleClearClick}>Clear Resume</button>
        <button onClick={handlePrint}>Print</button>
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={handleSaveVersion}>Save Version</button>
      </div>

      {savedResumes.length > 0 && (
        <div className="saved-resumes">
          <h4>📂 Saved Versions</h4>
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
          <button onClick={handleDeleteAllVersions} className="delete-all">🗑 Delete All</button>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;