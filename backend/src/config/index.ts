import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Define the schema for environment variables
const envSchema = z.object({
  PORT: z.string().transform(Number).pipe(z.number().positive()),
  OPENAI_API_KEY: z.string().min(1, 'OpenAI API key is required'),
});

// Validate environment variables
const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error('❌ Invalid environment variables:', envParse.error.format());
  throw new Error('Invalid environment variables');
}

// Create validated config object
export const config = {
  port: envParse.data.PORT,
  openai: {
    apiKey: envParse.data.OPENAI_API_KEY,
  },
} as const;

// Export type for the config object
export type Config = typeof config;