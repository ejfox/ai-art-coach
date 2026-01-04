# AI Art Coach 🎨

An AI-powered coaching system that helps artists achieve their creative goals through regular check-ins and supportive guidance. Built with modern best practices and powered by OpenRouter for access to multiple AI models.

## Features

- 🤖 **Multi-Model Support**: Use Claude, GPT-4, Llama, and other models via OpenRouter
- 💬 **Interactive Coaching**: Get proactive check-ins or respond to your progress updates
- 🎯 **Goal Tracking**: Set and track up to 3 weekly creative goals
- 📊 **State Persistence**: Your conversation history and goals are saved locally
- ⏰ **Flexible Scheduling**: Run manually or set up automated hourly check-ins
- 🌡️ **Dynamic Temperature**: AI creativity adapts based on time of day

## Setup

### 1. Install Dependencies

```bash
# Using yarn (recommended)
yarn install

# Or using npm
npm install

# Or using pnpm
pnpm install --shamefully-hoist
```

### 2. Configure Environment

Copy the example environment file and add your OpenRouter API key:

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```env
OPENROUTER_API_KEY=your_api_key_here
```

Get your API key from [OpenRouter](https://openrouter.ai/keys).

### 3. Set Your Goals

Edit `state/state.json` to personalize your coaching experience:

```json
{
  "artist": "Your Name",
  "goals": [
    "Your first weekly goal",
    "Your second weekly goal",
    "Your third weekly goal"
  ],
  "artistMotivation": "What drives you and what you need help with"
}
```

## Usage

### Web Interface (Development)

Start the Nuxt development server:

```bash
npm run dev
```

Visit http://localhost:3000

### Command Line Interface

**Get a proactive check-in message:**

```bash
npm run coach
```

**Respond to Coach Artie:**

```bash
npm run coach -- --message "I finished my watercolor study today!"
```

**Run the hourly scheduled check-in:**

```bash
npm run coach:run
```

### Set Up Automated Check-ins

For regular automated check-ins, set up a cron job or scheduled task:

```bash
# Edit your crontab
crontab -e

# Add an hourly check-in (runs at the top of every hour)
0 * * * * cd /path/to/ai-art-coach && npm run coach:run

# Or for 4 times a day (9am, 1pm, 5pm, 9pm)
0 9,13,17,21 * * * cd /path/to/ai-art-coach && npm run coach:run
```

## Configuration

### Available Models

The default model is `anthropic/claude-3.5-sonnet`, but you can change this in `.env`:

- `anthropic/claude-3.5-sonnet` - Excellent for coaching, empathetic and insightful
- `openai/gpt-4-turbo` - Strong reasoning and consistency
- `openai/gpt-3.5-turbo` - Fast and cost-effective
- `meta-llama/llama-3.1-70b-instruct` - Open source alternative
- See [OpenRouter models](https://openrouter.ai/models) for more options

### Temperature Settings

Temperature controls creativity (0.0 = focused, 2.0 = very creative):

- Morning messages use lower temperature (0.5) for focused encouragement
- Evening messages use higher temperature (0.99) for creative inspiration
- You can override the default in `.env` with `DEFAULT_TEMPERATURE`

## Production

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
.
├── scripts/
│   ├── coach.mjs              # CLI interface
│   ├── hourly_coach_run.mjs   # Scheduled check-in script
│   ├── openrouter.mjs         # OpenRouter API client
│   └── config.mjs             # Environment configuration
├── state/
│   └── state.json             # Persistent state and conversation history
├── pages/
│   └── index.vue              # Web interface (Nuxt)
├── .env.example               # Environment variables template
└── package.json
```

## Technology Stack

- **Nuxt 3** - Modern Vue.js framework
- **OpenRouter** - Unified API for multiple AI models
- **OpenAI SDK v4** - Latest SDK with streaming support
- **Zod** - Runtime type validation
- **TypeScript** - Type-safe development

## Best Practices Implemented

✅ Modern OpenAI SDK v4 with chat completions
✅ OpenRouter integration for multi-model support
✅ Environment variable validation with Zod
✅ Proper error handling and user-friendly messages
✅ TypeScript support
✅ State persistence with JSON
✅ Conversation history management
✅ Time-based temperature adjustment
✅ Clean separation of concerns

## Troubleshooting

**"OPENROUTER_API_KEY is required" error:**
- Make sure you've created a `.env` file with your API key
- Check that the key starts with `sk-or-`

**Rate limit errors:**
- OpenRouter has rate limits per model
- Consider using a different model or waiting before retrying

**State not saving:**
- Ensure the `state` directory exists
- Check file permissions for `state/state.json`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Learn More

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [OpenRouter Documentation](https://openrouter.ai/docs)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)

