import React from 'react';
import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { communityEvents, addToMyEvents, removeFromMyEvents } from '../ApiClient';
import { EventList } from './EventList';
import './Dashboard.css';
import { EventType } from '../types';

export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [events, setEvents] = React.useState<EventType[]>([]);
  const [myEvents, setMyEvents] = React.useState<EventType[]>([]);
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const state: string[] = location.state as string[]

  const updateUsersCommunityEvents = async (): Promise<EventType[]> => {
    try {
      const communityEventsList: EventType[] = await communityEvents(state);
      return communityEventsList;
    } catch (e) {
      console.error(e, 'updateCommunityEvents is failing');
      throw new Error("Community Events List is undefined");
    }
  };

  const isLoadingStateToggle = (array: EventType[]) => {
    if (array && array.length > 0) {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    updateUsersCommunityEvents()
      .then(response => {
        setEvents(response);
        isLoadingStateToggle(response);
      })
      .catch(error => {
        console.log(error, 'error occurred setting community events')
      })
  }, []);

  const addOrRemoveFromEventList = async (event: EventType): Promise<void> => {
    if (myEvents.includes(event)) {
      await removeFromMyEvents(event);
      const newMyEvents = myEvents.filter(eventInstance => eventInstance !== event);
      setMyEvents(newMyEvents);
    }
    else {
      await addToMyEvents(event);
      const newMyEvents = myEvents.concat(event);
      setMyEvents(newMyEvents);
    }
  }

  const navigateToForm = (): void => {
    navigate('../form', { state: state })
  }


  return (
    <div className="grad">
      <div className="topLevel ">
        <h1>Welcome to Your Dashboard</h1>
        <div className="buttonCreateEvent">
          <button onClick={navigateToForm}> Create event</button>
        </div>
      </div>
      <div className="overallDashboard">
        <div className="eventPartOfDashboard">
          {
            myEvents.length > 0
              ?
                <div className="eventsDashboard">
                  <h2>Events you are attending:</h2>
                  <EventList events={myEvents} addOrRemoveFromEventList={addOrRemoveFromEventList}></EventList>
                </div>
              :
                <p>No events attending yet</p>
          }
          {
            isLoading
              ?
                <h1>Loading..</h1>
              :
                <div>
                  <h2>Browse events in your community:</h2>
                  <EventList events={events} addOrRemoveFromEventList={addOrRemoveFromEventList}></EventList>
                </div>
          }
        </div>
      </div>
    </div>
  );
}