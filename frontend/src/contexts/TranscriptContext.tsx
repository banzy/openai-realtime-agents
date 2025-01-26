import React, {
  createContext,
  useContext,
  useState,
  FC,
  PropsWithChildren,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TranscriptItem } from '../types';

type TranscriptContextValue = {
  transcriptItems: TranscriptItem[];
  addTranscriptMessage: (
    itemId: string,
    role: 'user' | 'assistant',
    text: string,
    hidden?: boolean
  ) => void;
  updateTranscriptMessage: (
    itemId: string,
    text: string,
    isDelta: boolean
  ) => void;
  addTranscriptBreadcrumb: (title: string, data?: Record<string, any>) => void;
  toggleTranscriptItemExpand: (itemId: string) => void;
  updateTranscriptItemStatus: (
    itemId: string,
    newStatus: 'IN_PROGRESS' | 'DONE'
  ) => void;
};

const TranscriptContext = createContext<TranscriptContextValue | undefined>(
  undefined
);

export const TranscriptProvider: FC<PropsWithChildren> = ({ children }) => {
  const [transcriptItems, setTranscriptItems] = useState<TranscriptItem[]>([]);

  const addTranscriptMessage = (
    itemId: string,
    role: 'user' | 'assistant',
    text: string,
    hidden = false
  ) => {
    setTranscriptItems((prev) => [
      ...prev,
      {
        itemId,
        type: 'MESSAGE',
        role,
        title: text,
        expanded: false,
        timestamp: new Date().toLocaleTimeString(),
        createdAtMs: Date.now(),
        status: 'IN_PROGRESS',
        isHidden: hidden,
      },
    ]);
  };

  const updateTranscriptMessage = (
    itemId: string,
    text: string,
    isDelta: boolean
  ) => {
    setTranscriptItems((prev) =>
      prev.map((item) => {
        if (item.itemId === itemId) {
          return {
            ...item,
            title: isDelta ? (item.title || '') + text : text,
          };
        }
        return item;
      })
    );
  };

  const addTranscriptBreadcrumb = (
    title: string,
    data?: Record<string, any>
  ) => {
    setTranscriptItems((prev) => [
      ...prev,
      {
        itemId: uuidv4(),
        type: 'BREADCRUMB',
        title,
        data,
        expanded: false,
        timestamp: new Date().toLocaleTimeString(),
        createdAtMs: Date.now(),
        status: 'DONE',
        isHidden: false,
      },
    ]);
  };

  const toggleTranscriptItemExpand = (itemId: string) => {
    setTranscriptItems((prev) =>
      prev.map((item) => {
        if (item.itemId === itemId) {
          return { ...item, expanded: !item.expanded };
        }
        return item;
      })
    );
  };

  const updateTranscriptItemStatus = (
    itemId: string,
    newStatus: 'IN_PROGRESS' | 'DONE'
  ) => {
    setTranscriptItems((prev) =>
      prev.map((item) => {
        if (item.itemId === itemId) {
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  };

  return (
    <TranscriptContext.Provider
      value={{
        transcriptItems,
        addTranscriptMessage,
        updateTranscriptMessage,
        addTranscriptBreadcrumb,
        toggleTranscriptItemExpand,
        updateTranscriptItemStatus,
      }}
    >
      {children}
    </TranscriptContext.Provider>
  );
};

export const useTranscript = () => {
  const context = useContext(TranscriptContext);
  if (context === undefined) {
    throw new Error('useTranscript must be used within a TranscriptProvider');
  }
  return context;
};
