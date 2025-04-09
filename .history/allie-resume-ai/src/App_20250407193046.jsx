import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";

function App() {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      const useDraft = window.confirm("Load saved resume draft?");
      if (useDraft) {
        setResumeData(JSON.parse(saved));
      } else {
        localStorage.removeItem("resumeData");
      }
    }
  }, []);

  useEffect(() => {
    if (resumeData) {
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
    }
  }, [resumeData]);

  const handleClearResume = () => {
    localStorage.removeItem("resumeData");
    setResumeData(null);
    window.location.href = "/";
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/form" element={<ResumeForm onGenerate={setResumeData} />} />
        <Route
          path="/resume-preview"
          element={<ResumePreview resumeData={resumeData} onClear={handleClearResume} />}
        />
      </Routes>
    </Router>
  );
}

export default App;


export default App;
