import { RefObject } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export async function createRealtimeConnection(
  audioElement: RefObject<HTMLAudioElement | null>
): Promise<{ pc: RTCPeerConnection; dc: RTCDataChannel }> {
  const pc = new RTCPeerConnection();

  pc.ontrack = (e) => {
    if (audioElement.current) {
      audioElement.current.srcObject = e.streams[0];
    }
  };

  const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
  pc.addTrack(ms.getTracks()[0]);

  const dc = pc.createDataChannel('events');

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  const response = await fetch(`${API_URL}/api/realtime/webrtc-offer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sdp: offer.sdp }),
  });

  if (!response.ok) {
    throw new Error('Failed to get WebRTC answer');
  }

  const answerSdp = await response.text();
  const answer: RTCSessionDescriptionInit = {
    type: 'answer',
    sdp: answerSdp,
  };

  await pc.setRemoteDescription(answer);

  return { pc, dc };
}
