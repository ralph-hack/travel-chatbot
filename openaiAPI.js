import openai from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

export async function generateResponse(userInput, travelData) {
  const prompt = `User asked: ${userInput}\nTravel Search Results:\n${JSON.stringify(
    travelData,
    null,
    2
  )}`;
  try {
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150,
      api_key: apiKey, // Adjust based on openai package requirements
    });
    return completion.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
}
