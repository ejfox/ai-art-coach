#!/usr/bin/env node
import meow from 'meow';
import { loadState, generateConvoRespondPromptText, generatePromptText, updateState } from './hourly_coach_run.mjs';
import openRouterClient from './openrouter.mjs';

// CLI configuration
const cli = meow(`
  Usage
    $ coach                    Generate a check-in message
    $ coach --message <text>   Respond to a message from the artist

  Options
    --message, -m  The message from the artist

  Examples
    $ coach
    $ coach --message "I finished my watercolor study today!"
    $ coach -m "I'm feeling stuck on my blog post"

`, {
  importMeta: import.meta,
  flags: {
    message: {
      type: 'string',
      shortFlag: 'm',
    },
  },
});

async function main() {
  try {
    console.log('🎨 Coach Artie - AI Art Coach\n');
    
    // Load the state
    const state = loadState();

    let message;
    let responseMessage;

    if (cli.flags.message) {
      console.log(`💬 ${state.artist}: ${cli.flags.message}\n`);
      
      // Add the user message to the message history
      state.messageHistory.push(`${state.artist}: ${cli.flags.message}`);

      // Generate the prompt text for responding to the conversation
      const { systemPrompt, userPrompt } = generateConvoRespondPromptText(state);

      // Generate the response
      responseMessage = await openRouterClient.generateChatCompletion(
        systemPrompt,
        userPrompt
      );

      message = responseMessage.trim();
      
      console.log('🤖 Coach Artie responds:');
      console.log('─'.repeat(50));
      console.log(message);
      console.log('─'.repeat(50) + '\n');
    } else {
      // Generate a proactive check-in message
      const { systemPrompt, userPrompt } = generatePromptText(state);

      responseMessage = await openRouterClient.generateChatCompletion(
        systemPrompt,
        userPrompt
      );

      message = responseMessage.trim();
      
      console.log('📨 Coach Artie says:');
      console.log('─'.repeat(50));
      console.log(message);
      console.log('─'.repeat(50) + '\n');
    }

    // Update the state with the new message
    updateState(state, message);

    console.log('✅ Done!\n');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();



