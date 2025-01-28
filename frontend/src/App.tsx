import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Transcript from './components/Transcript';
import Events from './components/Events';
import BottomToolbar from './components/BottomToolbar';
import { SessionStatus } from './types';
import { useTranscript } from './contexts/TranscriptContext';
import { useEvent } from './contexts/EventContext';
import { createRealtimeConnection } from './utils/realtimeConnection';

function App() {
  const [sessionStatus, setSessionStatus] =
    useState<SessionStatus>('DISCONNECTED');
  const [userText, setUserText] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const { addTranscriptMessage, updateTranscriptMessage } = useTranscript();
  const { logClientEvent, logServerEvent } = useEvent();

  const handleConnect = async () => {
    try {
      setSessionStatus('CONNECTING');
      const { pc, dc } = await createRealtimeConnection(audioRef);

      dc.onmessage = (event) => {
        const data = JSON.parse(event.data);
        logServerEvent(data);
        // Handle different event types here
      };

      dc.onopen = () => {
        setSessionStatus('CONNECTED');
      };

      dc.onclose = () => {
        setSessionStatus('DISCONNECTED');
      };
    } catch (error) {
      console.error('Connection error:', error);
      setSessionStatus('DISCONNECTED');
    }
  };

  const handleSendMessage = () => {
    if (!userText.trim()) return;

    const messageId = uuidv4();
    addTranscriptMessage(messageId, 'user', userText);

    // Send message logic here

    setUserText('');
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <Transcript
          userText={userText}
          setUserText={setUserText}
          onSendMessage={handleSendMessage}
          canSend={sessionStatus === 'CONNECTED'}
        />
        <Events isExpanded={true} />
      </main>
      <BottomToolbar sessionStatus={sessionStatus} onConnect={handleConnect} />
      <audio ref={audioRef} autoPlay />
    </div>
  );
}

export default App;
