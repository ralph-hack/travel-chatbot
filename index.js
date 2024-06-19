import readline from "readline";
import { getTravelData } from "./travelAPI.js";
import { generateResponse } from "./openaiAPI.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "How can I help you with your travel plans today? ",
  async (userInput) => {
    console.log(`You asked: ${userInput}`);

    const travelData = await getTravelData(userInput);
    if (!travelData) {
      console.log("Sorry, I could not retrieve travel data at this time.");
      rl.close();
      return;
    }

    const chatbotResponse = await generateResponse(userInput, travelData);
    console.log(`ChatGPT: ${chatbotResponse}`);

    rl.close();
  }
);
