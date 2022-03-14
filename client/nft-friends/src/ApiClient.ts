import {UserType, EventType, UserAttendingEventUpdate} from './types';

const BASE_URL = 'http://localhost:3000';

export const FindExistingUser = async(eth_address: string): Promise<UserType> | null => {
    return await fetch(`${BASE_URL}/login/${eth_address}`)
    .then(res => res.json())
    .catch(err => console.error(err, "FindExistingUser is not working"))
};

export const postUser = async (eth_address: string): Promise<UserType> => {
    return await fetch(`${BASE_URL}/login/${eth_address}`, {
        method: 'POST'
    })
    .then(res => res.json())
    .catch(err => console.error(err, "postUserC is not working"))
};

export const getNFTSC = async (eth_address: string): Promise<UserType> => {
    return await fetch(`${BASE_URL}/login/${eth_address}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .catch(err => console.error(err, "getNFTSC is not working"))
};

export const communityEvents = async (nft_groups: string[]): Promise<string[]> => {
    return await fetch(`${BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nft_groups: nft_groups })
    })
    .then(res => res.json())
    .catch(err => console.error(err, "communityEvents is not working"))
};

export const postEventToServer = async (event: EventType): Promise<EventType> => {
    return await fetch(`${BASE_URL}/form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    })
    .then(res => res.json())
    .catch(err => console.error(err, "postEventToServer is not working"))
};

export const addToMyEvents = async (event: UserAttendingEventUpdate): Promise<EventType> => {
    return await fetch(`${BASE_URL}/events/add`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    })
    .then(res => res.json())
    .catch(err => console.error(err, "addToMyEvents is not working"))
}

export const removeFromMyEvents = async (event: UserAttendingEventUpdate): Promise<EventType> => {
    return await fetch(`${BASE_URL}/event/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    })
    .then(res => res.json())
    .catch(err => console.error(err, "removeFromMyEvents is not working"))
}