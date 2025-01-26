import { RTCPeerConnection, RTCSessionDescription } from 'node-webrtc';

export async function createRealtimeConnection(
  EPHEMERAL_KEY: string
): Promise<{ pc: RTCPeerConnection; dc: RTCDataChannel }> {
  const pc = new RTCPeerConnection();

  // Create a data channel for events
  const dc = pc.createDataChannel('oai-events');

  // Create and set local description
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  const baseUrl = 'https://api.openai.com/v1/realtime';
  const model = 'gpt-4o-realtime-preview-2024-12-17';

  // Send SDP offer to OpenAI and get answer
  const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
    method: 'POST',
    body: offer.sdp,
    headers: {
      Authorization: `Bearer ${EPHEMERAL_KEY}`,
      'Content-Type': 'application/sdp',
    },
  });

  const answerSdp = await sdpResponse.text();

  // Set remote description with OpenAI's answer
  const answer = new RTCSessionDescription({
    type: 'answer',
    sdp: answerSdp,
  });

  await pc.setRemoteDescription(answer);

  return { pc, dc };
}