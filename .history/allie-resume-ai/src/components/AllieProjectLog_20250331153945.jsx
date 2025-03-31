import React from "react";

const AllieProjectLog = () => {
  const timeline = [
    {
      step: "💡 Planning",
      description: "Goal was to build a frontend app that helps users generate resumes using AI."
    },
    {
      step: "🛠️ Tech Stack",
      description: "Built with Vite + React on the frontend. Initially used OpenAI API directly in frontend."
    },
    {
      step: "🚧 Problem",
      description: "GitHub blocked pushes due to detected secrets (OpenAI API key), even with .env and .gitignore."
    },
    {
      step: "🔒 Solution",
      description: "Created a secure backend using Express + Node. Deployed to Render with environment variables."
    },
    {
      step: "🌍 Deployment",
      description: "Frontend deployed to GitHub Pages via gh-pages. Backend deployed to Render. API key now secured server-side."
    },
    {
      step: "✅ Final Result",
      description: "Fully live resume builder that securely connects to OpenAI. Fast, clean, and scalable."
    }
  ];

  return (
    <div className="project-log">
      <h2>📁 Allie Resume Builder – Deployment Journey</h2>
      <ul>
        {timeline.map((item, index) => (
          <li key={index}>
            <strong>{item.step}</strong>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>

      <div className="project-links">
        <h3>🔗 Project Links</h3>
        <ul>
          <li><a href="https://ervinclay13.github.io/Allie-AI-Resume/" target="_blank" rel="noreferrer">🌐 Live Site</a></li>
          <li><a href="https://allie-resume-backend.onrender.com/" target="_blank" rel="noreferrer">🧠 Backend (Render)</a></li>
          <li><a href="https://github.com/ErvinClay13/Allie-AI-Resume" target="_blank" rel="noreferrer">📂 GitHub Repo</a></li>
        </ul>
      </div>
    </div>
  );
};

export default AllieProjectLog;