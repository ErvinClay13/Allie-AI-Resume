









import axios from "axios";

export const generateContent = async (prompt) => {
  try {
    console.log("Sending prompt to backend:", prompt);

    const response = await axios.post(
      "https://allie-resume-backend.onrender.com/generate", // Using your live backend URL
      { prompt }
    );

    console.log("Response from backend:", response.data.result);

    return response.data.result;
  } catch (error) {
    console.error(
      "Error calling backend:",
      error.response?.data || error.message || error
    );
    return "Error generating content";
  }
};
