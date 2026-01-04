import { z } from 'zod';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Environment variable schema
const envSchema = z.object({
  OPENROUTER_API_KEY: z.string().min(1, 'OPENROUTER_API_KEY is required'),
  OPENROUTER_APP_NAME: z.string().default('ai-art-coach'),
  OPENROUTER_APP_URL: z.string().default('https://github.com/ejfox/ai-art-coach'),
  DEFAULT_MODEL: z.string().default('anthropic/claude-3.5-sonnet'),
  DEFAULT_TEMPERATURE: z.string().transform(Number).pipe(z.number().min(0).max(2)).default('0.7'),
  MAX_TOKENS: z.string().transform(Number).pipe(z.number().positive()).default('500'),
});

// Validate and export configuration
let config;
try {
  config = envSchema.parse(process.env);
} catch (error) {
  console.error('❌ Environment variable validation failed:');
  if (error instanceof z.ZodError) {
    error.errors.forEach((err) => {
      console.error(`  - ${err.path.join('.')}: ${err.message}`);
    });
  }
  console.error('\n💡 Please check your .env file and ensure all required variables are set.');
  console.error('   See .env.example for reference.\n');
  process.exit(1);
}

export default config;
