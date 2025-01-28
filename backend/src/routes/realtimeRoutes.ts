import { Router } from 'express';
import { RealtimeController } from '../controllers/realtimeController';

const router = Router();

router.post('/webrtc-offer', RealtimeController.handleWebRTCOffer);

export default router;
