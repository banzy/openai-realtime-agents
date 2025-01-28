import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranscript } from '../contexts/TranscriptContext';
import { TranscriptItem } from '../types';

export interface TranscriptProps {
  userText: string;
  setUserText: (val: string) => void;
  onSendMessage: () => void;
  canSend: boolean;
}

const Transcript: React.FC<TranscriptProps> = ({
  userText,
  setUserText,
  onSendMessage,
  canSend,
}) => {
  const { transcriptItems } = useTranscript();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcriptItems]);

  const renderTranscriptItem = (item: TranscriptItem) => {
    if (item.type === 'BREADCRUMB') {
      return (
        <div className="breadcrumb-item" key={item.itemId}>
          <span className="timestamp">{item.timestamp}</span>
          <span className="title">{item.title}</span>
          {item.expanded && item.data && (
            <pre className="data">{JSON.stringify(item.data, null, 2)}</pre>
          )}
        </div>
      );
    }

    return (
      <div
        className={`message-item ${item.role} ${item.isHidden ? 'hidden' : ''}`}
        key={item.itemId}
      >
        <div className="message-header">
          <span className="timestamp">{item.timestamp}</span>
          <span className="role">{item.role}</span>
        </div>
        <div className="message-content">
          <ReactMarkdown>{item.title || ''}</ReactMarkdown>
        </div>
      </div>
    );
  };

  return (
    <div className="transcript-container">
      <div className="transcript-messages">
        {transcriptItems.map(renderTranscriptItem)}
        <div ref={bottomRef} />
      </div>
      <div className="input-container">
        <textarea
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && canSend) {
              e.preventDefault();
              onSendMessage();
            }
          }}
          placeholder="Type your message..."
          disabled={!canSend}
        />
        <button onClick={onSendMessage} disabled={!canSend || !userText.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Transcript;
