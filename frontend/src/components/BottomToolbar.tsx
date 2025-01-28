import React from 'react';
import { SessionStatus } from '../types';

interface BottomToolbarProps {
  sessionStatus: SessionStatus;
  onConnect: () => void;
}

const BottomToolbar: React.FC<BottomToolbarProps> = ({
  sessionStatus,
  onConnect,
}) => {
  return (
    <div className="bottom-toolbar">
      <div className="status-indicator">
        Status: {sessionStatus.toLowerCase()}
      </div>
      <div className="toolbar-actions">
        <button
          onClick={onConnect}
          disabled={sessionStatus === 'CONNECTING'}
          className={`connect-button ${sessionStatus.toLowerCase()}`}
        >
          {sessionStatus === 'DISCONNECTED' && 'Connect'}
          {sessionStatus === 'CONNECTING' && 'Connecting...'}
          {sessionStatus === 'CONNECTED' && 'Connected'}
        </button>
      </div>
    </div>
  );
};

export default BottomToolbar;
