import React from 'react'
import { EventType } from '../types';
import { EventItem } from './EventItem'
import './EventList.css'

interface Props {
  events: EventType[];
  addOrRemoveFromEventList: (event: EventType) => Promise<void>;
}

export const EventList: React.FC<Props> = ({ events, addOrRemoveFromEventList }) => {
  return (
    <div className="eventListClass">
      {events.map(eventItem => <EventItem eventItem={eventItem} addOrRemoveFromEventList={addOrRemoveFromEventList} key={eventItem._id} />)}
    </div>
  )
}