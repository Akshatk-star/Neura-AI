import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_REACT_APP_API || 'your_api_key_here',
});

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      maxOutputTokens: 500,
      temperature: 0.1,
    },
  });
  console.log(response.text);
  return response.text;
}
export default main;