import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import './EventItem.css'
import { EventType } from '../types';

interface Props {
    eventItem: EventType;
    addOrRemoveFromEventList: (event: EventType) => Promise<void>;
    key: string;
}

export const EventItem: React.FC<Props> = ({ eventItem, addOrRemoveFromEventList, key }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const eventPageHandler = () => {
        navigate('../eventPage', { state: eventItem })
    }

    return (
        <div className="eventItemClass">
            <div onClick={() => addOrRemoveFromEventList(eventItem)} key={key}>
                <span><b>{eventItem.group}</b></span><br />
                {eventItem.title}<br />
                {moment(eventItem.date).format(' MMMM Do[,] YYYY')}<br />
            </div>
            <button onClick={eventPageHandler}>See details</button>
            <br />
            <br />
        </div>
    )
}