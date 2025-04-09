import React, { useState } from "react";
import "./ResumePreviewAlt.css";
import DownloadButton from "./DownloadButton";

const ResumePreviewAlt = ({ data }) => {
  const colors = [
    "beige",
    "#ADD8E6",  // Light Blue
    "#FFB6C1",  // Light Pink
    "#FFD700",  // Gold
    "#7D7D7D",  // Gray
    "white",     // White
  ];
  const [colorIndex, setColorIndex] = useState(0);

Prof

  // Function to change color based on the selected color
  const changeColor = (index) => {
    setColorIndex(index);
    document.documentElement.style.setProperty("--root-color", colors[index]);
  };

  // Parse skills from the data prop
  const skillsArray = data.skills
    ? data.skills.split("\n").filter((skill) => skill.trim() !== "")
    : [];

  return (
    <>
      <div id="resume-preview" className="resume-alt-container">
        <div className="nameBorder">
          <h2 className="nameAlt">{data.name}</h2>
        </div>
        <h3 className="jobTitle">{data.jobTitle}</h3>

        <div className="contentContainer">
          <div className="leftContainer">
            <div className="contact-section">
              <p>
                <strong>Phone:</strong> {data.phone}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
            </div>

            <div className="education-section">
              <h3>Education</h3>
              <p className="eduData">{data.education}</p>
            </div>

            <div className="skills-section">
              <h3>Skills</h3>
              <ul className="prevSkills">
                {skillsArray.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rightContainer">
            <div className="careerObjective-section">
              <h3>Career Objective</h3>
              <p className="CareerObjective">{data.careerObj}</p>
            </div>

            <div className="experience-section">
              <h3>Experience</h3>
              <p className="ExpObj">{data.experience}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Color Selection Bar */}
      <div className="colorBar">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`colorOption ${colorIndex === index ? "active" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => changeColor(index)}
          ></div>
        ))}
      </div>

      {/* Download Button */}
      <div className="buttonContainer">
        <DownloadButton />
      </div>
    </>
  );
};

export default ResumePreviewAlt;
