#!/usr/bin/env node
import openRouterClient from './openrouter.mjs';
import config from './config.mjs';
import * as fs from "fs";

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
  
  // System prompt defining Coach Artie's personality
  const systemPrompt = `You are Coach Artie, an advanced AI coach for artists. You help artists complete their projects and accomplish their goals through wisdom, persistence, and patience. You have the tone of an encouraging teacher combined with Sherlock Holmes. You are insightful, supportive, and gently persistent.`;

  // User prompt with context and request
  const userPrompt = `Your current Artist is named ${state.artist}. ${state.artist} has 3 goals for this week:

Goal 1: ${state.goals[0]}
Goal 2: ${state.goals[1]}
Goal 3: ${state.goals[2]}

${state.artist}'s motivation: ${state.artistMotivation}

${state.artist} has requested 1-4 check-in messages a day.

${state.messageHistory.length > 0 ? `Here are the last few messages you exchanged with ${state.artist}:\n\n${state.messageHistory.slice(-5).join("\n")}\n\n` : ''}It is currently ${currentDate.toLocaleString()}. Write a brief, encouraging text message to ${state.artist} checking in and lightly encouraging them to follow their creative pursuits. Remind them of their goals in a natural, conversational way. Keep it under 200 words.`;

  return { systemPrompt, userPrompt };
}

export function generateConvoRespondPromptText(state) {
  // System prompt defining Coach Artie's personality
  const systemPrompt = `You are Coach Artie, an advanced AI coach for artists. You help artists complete their projects and accomplish their goals through wisdom, persistence, and patience. You have the tone of an encouraging teacher combined with Sherlock Holmes. You have infinite wisdom and patience. You are thoughtful, supportive, and genuinely care about your artist's growth.`;

  // User prompt with conversation context
  const lastMessage = state.messageHistory[state.messageHistory.length - 1] || '';
  
  const userPrompt = `Your current Artist is named ${state.artist}. ${state.artist} has 3 goals for this week:

Goal 1: ${state.goals[0]}
Goal 2: ${state.goals[1]}
Goal 3: ${state.goals[2]}

${state.artist}'s motivation: ${state.artistMotivation}

${state.artist} has requested 1-4 check-in messages a day.

${state.messageHistory.length > 0 ? `Here are the recent messages you've exchanged with ${state.artist}:\n\n${state.messageHistory.slice(-5).join("\n")}\n\n` : ''}${state.artist} has just sent you this message: "${lastMessage}"

Please respond to ${state.artist}'s message in a supportive, encouraging way. Address what they've shared, and if appropriate, gently guide them back to their goals. Keep it conversational and under 200 words.`;

  return { systemPrompt, userPrompt };
}

export async function generateMessage(state) {
  // Generate the prompt text
  const { systemPrompt, userPrompt } = generatePromptText(state);

  // Generate the temperature based on time of day
  // Temperature is lower in the morning (more focused) and higher at night (more creative)
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const temperature = 0.5 + (currentHour / 24) * 0.49;

  try {
    // Use OpenRouter to generate the message
    const message = await openRouterClient.generateChatCompletion(
      systemPrompt,
      userPrompt,
      { temperature }
    );

    return message.trim();
  } catch (error) {
    console.error('❌ Failed to generate message:', error.message);
    throw error;
  }
}

export function updateState(state, message) {
  // Update the state
  // Add the message to the message history
  state.messageHistory.push(`Coach Artie: ${message}`);

  // Keep only the last 10 messages to prevent the history from growing too large
  if (state.messageHistory.length > 10) {
    state.messageHistory = state.messageHistory.slice(-10);
  }

  // Update the last run time
  state.lastRun = new Date().toISOString();

  // Save the state
  try {
    fs.writeFileSync("state/state.json", JSON.stringify(state, null, 2));
    console.log("💾 Saved state");
  } catch (error) {
    console.error('❌ Failed to save state:', error.message);
    throw error;
  }
}

export async function run() {
  try {
    console.log('🎨 Starting AI Art Coach...\n');
    
    // Load the state
    const state = loadState();

    // Generate a message
    const message = await generateMessage(state);

    // Print the message
    console.log('\n📨 Coach Artie says:');
    console.log('─'.repeat(50));
    console.log(message);
    console.log('─'.repeat(50) + '\n');

    // Update the state
    updateState(state, message);

    console.log('✅ Run completed successfully\n');
  } catch (error) {
    console.error('\n❌ Run failed:', error.message);
    process.exit(1);
  }
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  run();
}
