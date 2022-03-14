import React from 'react'
import { useLocation } from 'react-router-dom'
import { communityEvents } from '../ApiClient'
import EventList from './EventList.js'
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'

function Dashboard() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [events, setEvents] = React.useState([]);
    const [myEvents, setMyEvents] = React.useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;


    const asyncCommunityEvents = async () => {
        let communityEventsList = await communityEvents(state)
            .then((res) => { return res.json(); }
            )
        console.log(communityEventsList);
        setEvents(communityEventsList);
    }

    React.useEffect(() => {
        // console.log(state);
        asyncCommunityEvents();
    }, [])

    //think other scenario--> no NFT events in their groups --> LT plan
    React.useEffect(() => {
        if (events.length > 0) {
            setIsLoading(false);
        }
    }, [events])

    const asyncAddToMyEventsC = async (event) => {
        let newEvent = await addToMyEventsC(event);
        return newEvent;
    }

    // const asyncRemoveFromMyEventsC = async (event) => {
    //     let newEvent = await removeFromMyEvents(event);
    //     return newEvent;
    // }





    //FUNCTIONS

    const addToList = (eventItem) => {
        if (!myEvents.includes(eventItem)) {
            console.log(eventItem);
            // let newEvent = asyncAddToMyEventsC(eventItem)
            let newEvents = myEvents.concat(eventItem);
            setMyEvents(newEvents);
            // addToMyEvents(eventItem);

        }
        else {

            let newEvents = myEvents.filter(event => event !== eventItem);
            setMyEvents(newEvents);
            console.log(newEvents);
            // removeFromMyEvents(myEvents);
        }

    }

    const formHandler = () => {
        navigate('../form', { state: state })
    }


    return (
        <div className="grad">
            <div className="topLevel ">
                <h1>Welcome to Your Dashboard</h1>
                <div className="buttonCreateEvent">
                    <button onClick={formHandler} > Create event</button>
                </div>
            </div>

            <div className="overallDashboard">
                <div className="eventPartOfDashboard">
                    {myEvents.length > 0
                        ? (<div className="eventsDashboard"><h2>Events you are attending:</h2>
                            <EventList events={myEvents} addfunc={addToList}></EventList>
                        </div>)
                        : console.log('No events attending yet')}
                    {
                        isLoading
                            ? (<h1>Loading..</h1>)
                            : (<div>
                                <div><h2>Browse events in your community:</h2></div>
                                <EventList events={events} addfunc={addToList}></EventList>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Dashboard