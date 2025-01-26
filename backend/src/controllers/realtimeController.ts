import { Request, Response } from 'express';
import { Socket } from 'socket.io';

export class RealtimeController {
  static async handleWebRTCOffer(req: Request, res: Response) {
    try {
      const { sdp } = req.body;
      const model =
        (req.query.model as string) || 'gpt-4o-realtime-preview-2024-12-17';

      const response = await fetch('https://api.openai.com/v1/realtime', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/sdp',
        },
        body: sdp,
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const answerSdp = await response.text();
      res.type('application/sdp').send(answerSdp);
    } catch (error) {
      console.error('WebRTC offer handling error:', error);
      res.status(500).json({ error: 'Failed to process WebRTC offer' });
    }
  }

  static handleSocketConnection(socket: Socket) {
    console.log('Client connected:', socket.id);

    socket.on('client_event', (data) => {
      console.log('Received client event:', data);
      // Handle client events here
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  }
}
