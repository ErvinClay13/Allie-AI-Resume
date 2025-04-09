import React, { useState } from "react";
import "./ResumePreview.css";
import DownloadButton from "./DownloadButton";

const ResumePreview = ({ data }) => {
  const colors = ["#D9A7A0", "#8B7B9E", "#A2B8C5", "#E9DED9", "#AAC4AD", "#7D7D7D", "white" ];
  const [colorIndex, setColorIndex] = useState(0);
  const [image, setImage] = useState(null);

  const changeColor = (index) => {
    setColorIndex(index);
    document.documentElement.style.setProperty("--root-color", colors[index]);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleDownloadClick = () => {
    // Trigger your download logic here (e.g., using html2pdf.js or another method)
  };

  const skillsArray = data.skills ? data.skills.split("\n").filter(skill => skill.trim() !== "") : [];

  return (
    <div>
      <div id="resume-preview" className="ResumeContainer">
        <div className="ContactSkillsLanguage">
          <img className="profileImg" src={image || "https://via.placeholder.com/150"} alt="Profile" />
          
          <div className="Contacts">
            <h3 className="leftHeading">Phone</h3>
            <p className="prevPhone">{data.phone}</p>

            <h3 className="leftHeading">Email</h3>
            <p className="prevEmail">{data.email}</p>

            <h3 className="leftHeading">Skills</h3>
            <ul className="prevSkills">
              {skillsArray.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="nameSummaryEduExp">
          <h2 className="name">{data.name}</h2>

          <h3 className="jobTitle">{data.jobTitle}</h3>

          <h3 className="careerObjTitle">Career Objective</h3>
          <p className="CareerObjective">{data.careerObj}</p>

          <h3 className="eduTitle">Education</h3>
          <p className="prevEducation">{data.education}</p>

          <h3 className="expTitle">Experience</h3>
          <p className="prevExperience">{data.experience}</p>
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

      {/* Upload & Download Buttons */}
      <div className="buttonContainer">
        <label htmlFor="imageUpload" className="customFileUpload">
          Upload Image
        </label>
        <input 
          type="file" 
          id="imageUpload" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="imageUpload" 
          style={{ display: "none" }} 
        />
        
        <DownloadButton onClick={handleDownloadClick} />
      </div>
    </div>
  );
};

export default ResumePreview;

