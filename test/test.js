import chai from "chai";
import { expect } from "chai";
import nock from "nock";
import dotenv from "dotenv";

dotenv.config();

import { getTravelData } from "../travelAPI.js";
import { generateResponse } from "../openaiAPI.js";

const TRAVEL_API_ENDPOINT = process.env.TRAVEL_API_ENDPOINT;

// Mock data
const travelQuery = "flights from New York to London";
const travelApiResponse = {
  flights: [
    {
      airline: "Airline A",
      price: 500,
      departure: "2024-06-20",
      arrival: "2024-06-21",
    },
    {
      airline: "Airline B",
      price: 550,
      departure: "2024-06-20",
      arrival: "2024-06-21",
    },
  ],
};
const openaiApiResponse = {
  choices: [
    {
      text: "Here are some flight options for you from New York to London: Airline A for $500, Airline B for $550.",
    },
  ],
};

describe("Travel API Integration", () => {
  before(() => {
    // Mock the Travel API response
    nock(TRAVEL_API_ENDPOINT)
      .get("/")
      .query({ query: travelQuery, apiKey: process.env.TRAVEL_API_KEY })
      .reply(200, travelApiResponse);
  });

  it("should fetch travel data", async () => {
    const data = await getTravelData(travelQuery);
    expect(data).to.deep.equal(travelApiResponse);
  });
});

describe("OpenAI API Integration", () => {
  before(() => {
    // Mock the OpenAI API response
    nock("https://api.openai.com")
      .post("/v1/completions")
      .reply(200, openaiApiResponse);
  });

  it("should generate a response from travel data", async () => {
    const userInput = "Find me flights from New York to London";
    const response = await generateResponse(userInput, travelApiResponse);
    expect(response).to.equal(openaiApiResponse.choices[0].text.trim());
  });
});
