#!/usr/bin/env node
// const { Configuration, OpenAIApi } = require("openai");
// use import instead
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
// get fs
import * as fs from "fs";

const configuration = new Configuration({
  
});
const openai = new OpenAIApi(configuration);

// Coach Artie is an AI robot coach that helps artists achieve their goals
// It sends AI-generated messages to the artist at regular intervals

// We store the state or memory for the robot in a JSON file
// state/state.json is the file that stores the state
// state/state.json is created if it doesn't exist
// state/state.json is updated every time the robot runs

// the state includes the following properties:
// - lastRun: the last time the robot ran
// - artist: the artist's name
// - goals: the artist's 3 goals
// - goalStatus: the status of the artists' 3 goals
// - artistMotivation: the artist's motivation to complete their goals
// - messageHistory: the last 5 messages sent and received

// We can assume this script runs every hour with external scheduling
// So we won't do any scheduling in javascript

// Load the state/memory
// If the state file doesn't exist, create it
export function loadState() {
  let state = {};
  try {
    state = JSON.parse(fs.readFileSync("state/state.json"));
  } catch (e) {
    state = {
      lastRun: new Date(),
      artist: "EJ",
      goals: [],
      goalStatus: [],
      artistMotivation: 0,
      messageHistory: [],
    };
  }
  return state;
}

export function generatePromptText(state) {
  const currentDate = new Date();
  const prompt = `
You are an advanced AI coach for artists. You help artists complete their projects and accomplish their goals through wisdom, persistence, and patience. Your name is Coach Artie and you have the tone of an encouraging teacher combined with Sherlock Holmes.

Your current Artist is named ${state.artist}. ${
    state.artist
  } has 3 goals for this week. 
Goal 1: ${state.goals[0]}
Goal 2: ${state.goals[1]}
Goal 3: ${state.goals[2]}

${state.artist}'s motivation: ${state.artistMotivation}

${state.artist} has requested 1-4 check-in messages a day.

Here are the last few you exchanged with ${state.artist}:

---

${state.messageHistory.join("")}

---

It is currently ${currentDate}. Write another text to ${
    state.artist
  } checking in and lightly encouraging them to follow their creative pursuits and remind them of their goals.

Coach Artie:`;

  return prompt;
}

export function generateConvoRespondPromptText(state) {
  // Sometimes the user will respond to the robot
  // This function generates the prompt text for the robot to respond to the user

  const prompt = `
You are an advanced AI coach for artists. You help artists complete their projects and accomplish their goals through wisdom, persistence, and patience. Your name is Coach Artie and you have the tone of an encouraging teacher combined with Sherlock Holmes. You have infinite wisdom and patience. You are a robot. 

Your current Artist is named ${state.artist}. ${
    state.artist
  } has 3 goals for this week. 
Goal 1: ${state.goals[0]}
Goal 2: ${state.goals[1]}
Goal 3: ${state.goals[2]}

${state.artist}'s motivation:${state.artistMotivation}

${state.artist} has requested 1-4 check-in messages a day.

Here are the last few you exchanged with ${state.artist}:

---

${state.messageHistory.join("\n")}

---

${state.artist} has responded to your last message...

${state.artist}: ${state.messageHistory[state.messageHistory.length - 1]}
Coach Artie:`;

  return prompt;
}

export async function generateMessage(state) {
  // Generate the prompt text
  const prompt = generatePromptText(state);

  // generate the temperature
  // the temperature changes throughout the day
  // the temperature is lower in the morning and higher at night
  // in the morning it is 0.5 and at midnight it is 0.99
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const temperature = 0.5 + (currentHour / 24) * 0.49;

  // send the prompt to openai.createCompletion
  // to generate a message to send to the artist
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  // return the message
  return completion.data.choices[0].text;
}

export function updateState(state, message) {
  // Update the state
  // Add the message to the message history
  state.messageHistory.push("Coache Artie: " + message);

  // Update the last run time
  state.lastRun = new Date();

  // Save the state
  fs.writeFileSync("state/state.json", JSON.stringify(state, null, 2));

  console.log("💾 Saved state");
}

export async function run() {
  // Load the state
  const state = loadState();

  // check if the cli has a message argument
  // if it does, we are responding to a user message
  // if it doesn't, we are generating a message to send to the user
  if (cli.flags.message) {
    // add the user message to the message history
    state.messageHistory.push(state.artist + ": " + cli.flags.message);

    // generate the prompt text
    const prompt = generateConvoRespondPromptText(state);

    // send the prompt to openai.createCompletion
    // to generate a message to send to the artist
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // print the message
    console.log(completion.data.choices[0].text);
  } else {
    // generate a message to send to the user
    const message = await generateMessage(state);

    // print the message
    console.log(message);
  }

  // update the state
  updateState(state, message);

  // Exit the script
  process.exit();
}

run();
