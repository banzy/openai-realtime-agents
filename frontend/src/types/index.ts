export type SessionStatus = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED';

export interface TranscriptItem {
  itemId: string;
  type: 'MESSAGE' | 'BREADCRUMB';
  role?: 'user' | 'assistant';
  title?: string;
  data?: Record<string, any>;
  expanded: boolean;
  timestamp: string;
  createdAtMs: number;
  status: 'IN_PROGRESS' | 'DONE';
  isHidden: boolean;
}

export interface LoggedEvent {
  id: string | number;
  direction: 'client' | 'server';
  eventName: string;
  eventData: Record<string, any>;
  timestamp: string;
  expanded: boolean;
}
