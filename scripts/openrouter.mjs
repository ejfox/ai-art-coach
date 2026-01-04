import OpenAI from 'openai';
import config from './config.mjs';

/**
 * OpenRouter client configured for the AI Art Coach
 * Uses the OpenAI SDK with OpenRouter's base URL
 */
class OpenRouterClient {
  constructor() {
    this.client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: config.OPENROUTER_API_KEY,
      defaultHeaders: {
        'HTTP-Referer': config.OPENROUTER_APP_URL,
        'X-Title': config.OPENROUTER_APP_NAME,
      },
    });
  }

  /**
   * Generate a chat completion using OpenRouter
   * @param {string} systemPrompt - The system prompt defining the AI's role
   * @param {string} userPrompt - The user message or prompt
   * @param {Object} options - Optional parameters
   * @returns {Promise<string>} The generated message
   */
  async generateChatCompletion(systemPrompt, userPrompt, options = {}) {
    const {
      model = config.DEFAULT_MODEL,
      temperature = config.DEFAULT_TEMPERATURE,
      maxTokens = config.MAX_TOKENS,
    } = options;

    try {
      const completion = await this.client.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature,
        max_tokens: maxTokens,
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('❌ Error generating chat completion:', error.message);
      
      if (error.status === 401) {
        console.error('   Authentication failed. Please check your OPENROUTER_API_KEY.');
      } else if (error.status === 429) {
        console.error('   Rate limit exceeded. Please try again later.');
      } else if (error.status >= 500) {
        console.error('   OpenRouter server error. Please try again later.');
      }
      
      throw error;
    }
  }

  /**
   * Generate a chat completion with conversation history
   * @param {string} systemPrompt - The system prompt defining the AI's role
   * @param {Array} messages - Array of message objects with role and content
   * @param {Object} options - Optional parameters
   * @returns {Promise<string>} The generated message
   */
  async generateChatWithHistory(systemPrompt, messages, options = {}) {
    const {
      model = config.DEFAULT_MODEL,
      temperature = config.DEFAULT_TEMPERATURE,
      maxTokens = config.MAX_TOKENS,
    } = options;

    try {
      const formattedMessages = [
        { role: 'system', content: systemPrompt },
        ...messages,
      ];

      const completion = await this.client.chat.completions.create({
        model,
        messages: formattedMessages,
        temperature,
        max_tokens: maxTokens,
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('❌ Error generating chat with history:', error.message);
      throw error;
    }
  }
}

// Export a singleton instance
export default new OpenRouterClient();
