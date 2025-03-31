import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SplashScreen from "./components/SplashScreen";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import ResumePreviewAlt from "./components/ResumePreviewAlt";
import { generateContent } from "./utils/API.jsx";




function App() {
  const [resumeData, setResumeData] = useState(null);
  const [selectedPreview, setSelectedPreview] = useState("original");
 

  
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/resume-form" element={<ResumeForm onGenerate={setResumeData} />} />

      {/* Resume Preview Route */}
      <Route
        path="/resume-preview"
        element={
          resumeData ? (
            <div className="resume-preview-container">
              <h1 className="previewHeader">Your Resume</h1>

              {/* AI Resume Summary */}
              <button onClick={() => generateResumeSummary(resumeData.experience)}>
                Generate AI Summary
              </button>
              <p>{aiGeneratedSummary}</p>

              <div className="preview-selector">
                <label>Choose Resume Style: </label>
                <select
                  onChange={(e) => setSelectedPreview(e.target.value)}
                  value={selectedPreview}
                >
                  <option value="original">Classic Resume</option>
                  <option value="alt">Modern Resume</option>
                </select>
              </div>

              {selectedPreview === "original" && <ResumePreview data={resumeData} />}
              {selectedPreview === "alt" && <ResumePreviewAlt data={resumeData} />}
            </div>
          ) : (
            <h2>No resume data found. Please fill out the form first.</h2>
          )
        }
      />
    </Routes>
  );
}

export default App;
