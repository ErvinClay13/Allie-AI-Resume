import { generateContent } from "./API.jsx";

export const handleExperienceFill = async (formData, setFormData) => {
  const jobExperience = await generateContent(
    `Generate a professional job experience input for a ${formData.experience} position.`
  );

  console.log(jobExperience);

  setFormData({ ...formData, experience: jobExperience });
};
