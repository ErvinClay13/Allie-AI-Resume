import { generateContent } from "./API.jsx";

export const handleSkillsFill = async (formData, setFormData) => {
  const jobSkills = await generateContent(
    //    `Generate a professional job skills input for a ${formData.skills} position.`
    // `Generate 6 skills in an unordered list and limit it to 40 tokens for ${formData.skills}`
    `Generate at least the user input skills in an unordered list and limit it to 40 tokens for ${formData.skills}`
  );

  console.log(jobSkills);

  setFormData({ ...formData, skills: jobSkills });
};
