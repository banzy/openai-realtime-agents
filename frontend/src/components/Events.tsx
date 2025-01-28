import React from 'react';
import { useEvent } from '../contexts/EventContext';
import { LoggedEvent } from '../types';

export interface EventsProps {
  isExpanded: boolean;
}

const Events: React.FC<EventsProps> = ({ isExpanded }) => {
  const { loggedEvents, toggleExpand } = useEvent();

  const renderEvent = (event: LoggedEvent) => (
    <div
      key={event.id}
      className={`event-item ${event.direction}`}
      onClick={() => toggleExpand(event.id)}
    >
      <div className="event-header">
        <span className="timestamp">{event.timestamp}</span>
        <span className="direction">{event.direction}</span>
        <span className="name">{event.eventName}</span>
      </div>
      {event.expanded && (
        <pre className="event-data">
          {JSON.stringify(event.eventData, null, 2)}
        </pre>
      )}
    </div>
  );

  if (!isExpanded) return null;

  return (
    <div className="events-container">
      <div className="events-header">
        <h3>Events Log</h3>
      </div>
      <div className="events-list">{loggedEvents.map(renderEvent)}</div>
    </div>
  );
};

export default Events;
