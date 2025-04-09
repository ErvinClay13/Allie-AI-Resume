import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import AllieImg from "../assets/Allie_Hello.png";
import "./ResumeForm.css";

const ResumeForm = ({ onGenerate }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    jobTitle: "",
  });

  const [sections, setSections] = useState([]);
  const [typedText, setTypedText] = useState({});
  const [isTyping, setIsTyping] = useState({});
  const [typingCompleted, setTypingCompleted] = useState({});

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSectionChange = (index, key, value) => {
    const updated = [...sections];
    updated[index][key] = value;
    setSections(updated);
  };

  const handleAddSection = () => {
    setSections([...sections, { title: "", content: "" }]);
  };

  const handleRemoveSection = (index) => {
    const updated = sections.filter((_, i) => i !== index);
    setSections(updated);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...sections];
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setSections(items);
  };

  const handleAutoFill = async (index) => {
    const title = sections[index].title;
    if (!title) return alert("Please enter a section title first.");

    const prompt = `Write a strong resume section titled "${title}" for a candidate applying as a ${formData.jobTitle}.`;

    try {
      const response = await axios.post("/openai", {
        model: "text-davinci-003",
        prompt,
        max_tokens: 150,
      });

      const text = response.data.choices[0].text.trim();
      startTyping(index, text);
    } catch (err) {
      console.error("AI Autofill Error:", err);
    }
  };

  const startTyping = (index, text, i = 0) => {
    const key = `section-${index}`;
    if (i === 0) {
      setTypedText((prev) => ({ ...prev, [key]: "" }));
      setIsTyping((prev) => ({ ...prev, [key]: true }));
      setTypingCompleted((prev) => ({ ...prev, [key]: false }));
    }

    if (i < text.length) {
      setTypedText((prev) => ({
        ...prev,
        [key]: prev[key] + text.charAt(i),
      }));
      setTimeout(() => startTyping(index, text, i + 1), 40);
    } else {
      setIsTyping((prev) => ({ ...prev, [key]: false }));
      setTypingCompleted((prev) => ({ ...prev, [key]: true }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ ...formData, sections });
    navigate("/resume-preview");
  };

  return (
    <div className="form_editBoxContainer">
      <div className="resume-form-container">
        <h1>Allie Resume Form</h1>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleFormChange} required />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleFormChange} required />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleFormChange} required />
          <input name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleFormChange} required />

          <button type="button" onClick={handleAddSection}>+ Add Section</button>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {sections.map((section, index) => (
                    <Draggable
                      key={`section-${index}`}
                      draggableId={`section-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="customSection"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <input
                            type="text"
                            placeholder="Section Title"
                            value={section.title}
                            onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                          />
                          <textarea
                            placeholder={`Content for ${section.title || "this section"}`}
                            value={section.content}
                            onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                          />
                          <button type="button" onClick={() => handleAutoFill(index)}>
                            Auto-Fill
                          </button>
                          <button type="button" onClick={() => handleRemoveSection(index)}>
                            Remove
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <button type="submit">Generate Resume</button>
        </form>
      </div>

      <div className="editBox">
        <img className="imgAllie" src={AllieImg} alt="Allie" />
        {sections.map((section, index) => {
          const key = `section-${index}`;
          return (
            <div key={index} className="editBoxSection">
              <h3>{section.title}</h3>
              <p>{typedText[key] || section.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumeForm;
