import { generateContent } from "./API";

export const handleSkillsFill = async (formData, setFormData) => {
    const jobSkills = await generateContent(
    //    `Generate a professional job skills input for a ${formData.skills} position.` 
    // `Generate 6 skills in an unordered list and limit it to 40 tokens for ${formData.skills}`
    `Generate 6 skills in an unordered list and limit it to 40 tokens for ${formData.jobTitle}`
    );

    console.log( jobSkills ) ;

    setFormData({ ...formData, skills: jobSkills });
};
 