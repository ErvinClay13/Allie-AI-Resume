// import axios from "axios";

// const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
// console.log("API Key:", API_KEY);

// export const generateContent = async (prompt) => {
//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are a helpful assistant. Provide only the requested information without any introductions, explanations, or labels like 'Generated Job Skills:'. Respond concisely with only the raw list.",
//           },
//           { role: "user", content: `Provide a list without any title or introduction: ${prompt}` },
//         ],
//         max_tokens: 40,
//       },
//       {
//         headers: { Authorization: `Bearer ${API_KEY}` },
//       }
//     );

//     // Extract the response text
//     let result = response.data.choices[0].message.content.trim();

//     // Remove the header "Generated Job Skills:" and any trailing hyphen/whitespace
//     result = result.replace(/^Generated Job Skills:\s*-?\s*/i, "");

//     return result;
//   } catch (error) {
//     console.error("Error generating content:", error);
//     return "Error generating content";
//   }
// };

// import axios from "axios";

// const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
// console.log(" Loaded API Key in Production:", import.meta.env.VITE_OPENAI_API_KEY);

// export const generateContent = async (prompt) => {
//   //  Check if the API Key is missing
//   if (!API_KEY) {
//     console.error(" API Key is missing! Check environment variables.");
//     return "Error: API Key is missing";
//   }

//   try {
//     console.log(" Sending API request to OpenAI...");

//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: [
//           {
//             role: "system",
//             content: "You are a helpful assistant. Provide concise responses only.",
//           },
//           { role: "user", content: prompt },
//         ],
//         max_tokens: 40,
//       },
//       {
//         headers: { Authorization: `Bearer ${API_KEY}` },
//       }
//     );

//     console.log(" OpenAI API Response:", response.data); //  Log the API response

//     let result = response.data.choices[0].message.content.trim();
//     return result;
//   } catch (error) {
//     console.error(" Error generating content:", error.response ? error.response.data : error);
//     return "Error generating content";
//   }
// };

// import axios from "axios";

// export const generateContent = async (prompt) => {
//   // API key is only injected at build time via GitHub Actions
//   const API_KEY = process.env.VITE_OPENAI_API_KEY;

//   if (!API_KEY) {
//     console.error("API Key is missing! Check environment variables.");
//     return "Error: API Key is missing";
//   }

//   try {
//     console.log("Sending API request to OpenAI...");

//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: "You are a helpful assistant. Provide concise responses only." },
//           { role: "user", content: prompt },
//         ],
//         max_tokens: 40,
//       },
//       {
//         headers: { Authorization: `Bearer ${API_KEY}` },
//       }
//     );

//     console.log("OpenAI API Response:", response.data);

//     let result = response.data.choices[0].message.content.trim();
//     return result;
//   } catch (error) {
//     console.error("Error generating content:", error.response ? error.response.data : error);
//     return "Error generating content";
//   }
// };

// import axios from "axios";

// export const generateContent = async (prompt) => {
//   // Use import.meta.env to access the API key at build time
//   const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

//   if (!API_KEY) {
//     console.error("API Key is missing! Check environment variables.");
//     return "Error: API Key is missing";
//   }

//   try {
//     console.log("Sending API request to OpenAI...");

//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: "You are a helpful assistant. Provide concise responses only." },
//           { role: "user", content: prompt },
//         ],
//         max_tokens: 40,
//       },
//       {
//         headers: { Authorization: `Bearer ${API_KEY}` },
//       }
//     );

//     console.log("OpenAI API Response:", response.data);

//     return response.data.choices[0].message.content.trim();
//   } catch (error) {
//     console.error("Error generating content:", error.response ? error.response.data : error);
//     return "Error generating content";
//   }
// };

// import axios from "axios";

// export const generateContent = async (prompt) => {
//   // Correct way to access env vars in Vite
//   const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

//   if (!API_KEY) {
//     console.error("API Key is missing! Check environment variables.");
//     return "Error: API Key is missing";
//   }

//   try {
//     console.log("Sending API request to OpenAI...");

//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: "You are a helpful assistant. Provide concise responses only." },
//           { role: "user", content: prompt },
//         ],
//         max_tokens: 40,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           "Content-Type": "application/json"
//         },
//       }
//     );

//     console.log("OpenAI API Response:", response.data);

//     let result = response.data.choices[0].message.content.trim();
//     return result;
//   } catch (error) {
//     console.error("Error generating content:", error.response?.data || error.message || error);
//     return "Error generating content";
//   }

// };

// import axios from "axios";

// export const generateContent = async (prompt) => {
//   // Access the OpenAI API key from environment variables
//   const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

//   if (!API_KEY) {
//     console.error("API Key is missing! Check environment variables.");
//     return "Error: API Key is missing";
//   }

//   try {
//     console.log("Sending API request to OpenAI...");

//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: [
//           {
//             role: "system",
//             content: "You are a helpful assistant. Provide concise responses only.",
//           },
//           { role: "user", content: prompt },
//         ],
//         max_tokens: 40,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("OpenAI API Response:", response.data);

//     const result = response.data.choices[0].message.content.trim();
//     return result;
//   } catch (error) {
//     console.error("Error generating content:", error?.response?.data || error?.message || error);
//     return "Error generating content";
//   }
// };













import axios from "axios";

export const generateContent = async (prompt) => {
  try {
    console.log("Sending prompt to backend:", prompt);

    const response = await axios.post(
      "https://allie-resume-backend.onrender.com/generate", // ✅ Using your live backend URL
      { prompt }
    );

    console.log("Response from backend:", response.data.result);

    return response.data.result;
  } catch (error) {
    console.error("Error calling backend:", error.response?.data || error.message || error);
    return "Error generating content";
  }
};
