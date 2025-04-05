import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ResumeForm.css";
import { handleExperienceFill } from "../utils/ExperienceFill";
import { handleEducationFill } from "../utils/EducationFill";
import { handleSkillsFill } from "../utils/SkillsFill";
import { handleCareerObjFill } from "../utils/CareerObjFill";
import AllieImg from "../assets/Allie_Hello.png";

const ResumeForm = ({ onGenerate }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    phone: "",
    email: "",
    education: "",
    careerObj: "",
    experience: "",
    skills: "",
  });

  const [typedText, setTypedText] = useState({
    education: "",
    careerObj: "",
    experience: "",
    skills: "",
  });

  const [isTyping, setIsTyping] = useState({
    education: false,
    careerObj: false,
    experience: false,
    skills: false,
  });

  const [typingCompleted, setTypingCompleted] = useState({
    education: false,
    careerObj: false,
    experience: false,
    skills: false,
  });

  // Function to simulate typing effect
  const typeText = (text, field, index = 0) => {
    if (index < text.length) {
      setTypedText((prevText) => ({
        ...prevText,
        [field]: prevText[field] + text.charAt(index),
      }));
      setTimeout(() => typeText(text, field, index + 1), 50);
    } else {
      setIsTyping((prevState) => ({
        ...prevState,
        [field]: false,
      }));
      setTypingCompleted((prevState) => ({
        ...prevState,
        [field]: true,
      })); // Mark typing as complete for this field
    }
  };

  useEffect(() => {
    // Trigger typing effect for education if it hasn't been typed yet
    if (formData.education && !isTyping.education && !typingCompleted.education) {
      setTypedText((prevText) => ({ ...prevText, education: "" }));
      setIsTyping((prevState) => ({ ...prevState, education: true }));
      typeText(formData.education, "education");
    }

    // Trigger typing effect for careerObj if it hasn't been typed yet
    if (formData.careerObj && !isTyping.careerObj && !typingCompleted.careerObj) {
      setTypedText((prevText) => ({ ...prevText, careerObj: "" }));
      setIsTyping((prevState) => ({ ...prevState, careerObj: true }));
      typeText(formData.careerObj, "careerObj");
    }

    // Trigger typing effect for experience if it hasn't been typed yet
    if (formData.experience && !isTyping.experience && !typingCompleted.experience) {
      setTypedText((prevText) => ({ ...prevText, experience: "" }));
      setIsTyping((prevState) => ({ ...prevState, experience: true }));
      typeText(formData.experience, "experience");
    }

    // Trigger typing effect for skills if it hasn't been typed yet
    if (formData.skills && !isTyping.skills && !typingCompleted.skills) {
      setTypedText((prevText) => ({ ...prevText, skills: "" }));
      setIsTyping((prevState) => ({ ...prevState, skills: true }));
      typeText(formData.skills, "skills");
    }
  }, [
    formData.education,
    formData.careerObj,
    formData.experience,
    formData.skills,
    isTyping,
    typingCompleted,
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
    navigate("/resume-preview");
  };

  return (
    <>
      <div className="formHeading">
        <h1>Allie Form Page</h1>
      </div>
      <div className="form_editBoxContainer">
        <div className="resume-form-container">
          <h2>Fill in Your Details</h2>
          <form onSubmit={handleSubmit} className="resume-form">
            <div className="infoContainer">
              <div className="userInfo">
                <div className="nameField">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="phoneField">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="emailField">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="jobField">
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Job Title"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="education1">
                  <input
                    type="text"
                    name="education1"
                    placeholder="Educa"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Auto-Fill Sections */}
            <div className="educationField">
              <textarea
                name="education"
                placeholder="Education"
                value={formData.education}
                onChange={handleChange}
                required
              />
              <button
                className="eduBtn"
                type="button"
                onClick={() => handleEducationFill(formData, setFormData)}
              >
                Auto-Fill Education
              </button>
            </div>

            <div className="careerObjectiveField">
              <textarea
                name="careerObj"
                placeholder="Career Objective"
                value={formData.careerObj}
                onChange={handleChange}
                required
              />
              <button
                className="careerObjBtn"
                type="button"
                onClick={() => handleCareerObjFill(formData, setFormData)}
              >
                Auto-Fill Career Objective
              </button>
            </div>

            <div className="experienceField">
              <textarea
                name="experience"
                placeholder="Experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
              <button
                className="expBtn"
                type="button"
                onClick={() => handleExperienceFill(formData, setFormData)}
              >
                Auto-Fill Experience
              </button>
            </div>

            <div className="skillsField">
              <textarea
                name="skills"
                placeholder="Skills"
                value={formData.skills}
                onChange={handleChange}
                required
              />
              <button
                className="sklBtn"
                type="button"
                onClick={() => handleSkillsFill(formData, setFormData)}
              >
                Auto-Fill Skills
              </button>
            </div>

            <button className="submBtn" type="submit">
              Generate Resume
            </button>
          </form>
        </div>

        {/* Edit Box Preview - Shows AI Generated Education with Typewriter Effect */}
        <div className="editBox">
          <img className="imgAllie" src={AllieImg} alt="Allie Illustration" />

          <div className="editEducation">
            <h3 className="eduCol">Education</h3>
            <p className="prevEducation2">
              {typedText.education} {/* Display the typed text for education */}
            </p>
          </div>

          <div className="editCareerObj">
            <h3 className="carObjCol">Career Objective</h3>
            <p className="prevCareerObj2">
              {typedText.careerObj} {/* Display the typed text for careerObj */}
            </p>
          </div>

          <div className="editExperience">
            <h3 className="expCol">Experience</h3>
            <p className="prevExperience2">
              {typedText.experience} {/* Display the typed text for experience */}
            </p>
          </div>

          <div className="editSkills">
            <h3 className="sklCol">Skills</h3>
            <p className="prevSkills2">
              {typedText.skills} {/* Display the typed text for skills */}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeForm;
