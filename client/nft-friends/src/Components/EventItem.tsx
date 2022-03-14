import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import './EventItem.css'


function EventItem({ event, addfunc, key }) {
    const navigate = useNavigate();
    const location = useLocation();

    const eventPageHandler = () => {
        navigate('../eventPage', { state: event })
    }

    return (
        <div className="eventItemClass">
            <div onClick={() => addfunc(event)} key={key}>
                <span><b> {event.group}</b> </span>  <br />
                {event.title}<br />
                {moment(event.date).format(' MMMM Do[,] YYYY')}<br />

            </div>
            <button onClick={eventPageHandler} >See details</button>
            <br />
            <br />


        </div>
    )
}

export default EventItem