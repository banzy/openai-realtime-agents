import express from 'express';
import OpenAI from 'openai';

const router = express.Router();
const openai = new OpenAI();

router.post('/completions', async (req, res) => {
  try {
    const { model, messages } = req.body;

    const completion = await openai.chat.completions.create({
      model,
      messages,
    });

    res.json(completion);
  } catch (error: any) {
    console.error('Error in /chat/completions:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;