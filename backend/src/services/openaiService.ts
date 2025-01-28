import OpenAI from 'openai';

class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI();
  }

  async createSession(): Promise<any> {
    try {
      const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-realtime-preview-2024-12-17',
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create session: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating session: ${error.message}`);
      }
      throw new Error('Unknown error occurred while creating session');
    }
  }

  async createChatCompletion(model: string, messages: any[]): Promise<OpenAI.Chat.Completions.ChatCompletion> {
    try {
      const completion = await this.openai.chat.completions.create({
        model,
        messages,
      });

      return completion;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating chat completion: ${error.message}`);
      }
      throw new Error('Unknown error occurred while creating chat completion');
    }
  }
}

export const openAIService = new OpenAIService();