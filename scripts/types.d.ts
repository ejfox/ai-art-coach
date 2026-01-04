/**
 * Type definitions for AI Art Coach
 */

export interface ArtistState {
  lastRun: string;
  artist: string;
  goals: string[];
  goalStatus: boolean[];
  artistMotivation: string;
  messageHistory: string[];
}

export interface PromptPair {
  systemPrompt: string;
  userPrompt: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GenerationOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}
