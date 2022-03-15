import React from 'react'
import { useLocation, Location } from 'react-router-dom'
import './Form.css'
import { postEventToServer } from '../ApiClient';
import { CreatedEvent } from '../types';

function Form() {
    const location: Location = useLocation();
    const state: string[] = location.state;

    const submitHandlerForm = (event): void => {
        event.preventDefault();
        const newEvent: CreatedEvent = {
            group: event.target.group.value,
            host: event.target.host.value,
            date: event.target.newEventDate.value,
            description: event.target.newDescription.value,
            title: event.target.title.value,
            venue: event.target.venue.value,
            street: event.target.street.value,
            postcode: event.target.postcode.value,
            city: event.target.city.value,
            online: event.target.online.value,
        }
        postEventToServer(newEvent);
    }

    return (
        <div >
            <h1>CREATE YOUR EVENT</h1>
            <form className="eventForm" onSubmit={submitHandlerForm}>
                <div className="firstThird">
                    <label>Select Your NFT Community</label><br />
                    <select name="group">
                        {state.map((stateI) => { return (<option value={stateI} >{stateI}</option>) })}
                    </select>
                    <br />
                    <label>Host:</label><br />
                    <input type="text" name="host" placeholder="Insert your name..."></input>
                    <br />
                    <label>Title:</label><br />
                    <input type="text" name="title" placeholder="Insert a title..."></input>
                    <br />
                    <label>Description: </label>
                    <br />
                    <textarea name="newDescription" rows={10} cols={30} placeholder="Insert a description..."></textarea>
                </div>
                <div className="secondThird">
                    <label>In-Person</label>
                    <input type="radio" id="offline" name="online" value="false" checked ></input>
                    <label>Online</label>
                    <input type="radio" id="online" name="online" value="true" ></input>
                    <div className="address">
                        <label htmlFor="venue">Venue: </label>
                        <br />
                        <input type="text" id="venue" name="venue" />
                        <br />
                        <label htmlFor="street">Street: </label>
                        <br />
                        <input type="text" id="street" name="street" />
                        <br />
                        <label htmlFor="postcode">Postcode: </label><br />
                        <input type="text" id="postcode" name="postcode" />
                        <br />
                        <label htmlFor="city">City: </label>
                        <br />
                        <input type="text" id="city" name="city" />
                    </div>
                </div>
                <div className="thirdThird">
                    <h5>Date and Time:</h5>
                    <input type="datetime-local" name="newEventDate"></input>
                    <br />
                    <br />
                    <button className="button" type="submit" >Create Event</button>
                </div>
            </form>
        </div >
    )
}

export default Form;