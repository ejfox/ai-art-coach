#!/usr/bin/env node
import {createRequire} from 'module';
import { loadState, generateConvoRespondPromptText, generatePromptText} from './hourly_coach_run.mjs'
const meow = createRequire(import.meta.url)('meow');

// check if the cli has a message argument
// if it does, we are responding to a user message
// if it doesn't, we are generating a message to send to the user
const cli = meow(`
  Usage
    $ coach --message "Hello, Artie!"

  Options
    --message, -m  The message from the artist

  Examples
    $ coach --message "Hello, Artie!"

`, {
  flags: {
    message: {
      type: 'string',
      alias: 'm',
    },
  },
});

// Load the state
const state = loadState();

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
  // generate the prompt text
  const prompt = generatePromptText(state);

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
  console.log(completion.data.choices[0].text);nod
}



