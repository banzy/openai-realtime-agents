import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import realtimeRoutes from './routes/realtimeRoutes';
import { RealtimeController } from './controllers/realtimeController';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/realtime', realtimeRoutes);

// WebSocket connection handling
io.on('connection', (socket) => {
  RealtimeController.handleSocketConnection(socket);
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
