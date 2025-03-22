import { generateContent } from "./API";

export const handleEducationFill = async (formData, setFormData) => {
    const jobEducation = await generateContent(
    //    `Generate a professional job education input for a ${formData.education} position.`
    `Generate a professional job education input for ${formData.jobTitle}.` 
    );

    console.log( jobEducation );

    setFormData({ ...formData, education: jobEducation });
};

