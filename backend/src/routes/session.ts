import express from 'express';
import { Router } from 'express';

const router: Router = express.Router();

router.post('/', async (req, res) => {
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

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error in /session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;