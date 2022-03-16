import { User, NFTEvent } from '../model/models';
import express, { Request, Response } from "express";
import { EventType, UserType } from '../types';

// Takes an array of the user NFT groups that are passed down through the login and compares with all the NFT groups to find events that they have access to.
export const getCommunityEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const nft_groups: String[] | null = req.body; 
    const communityEvents: EventType[] = [];
    const events: EventType[] | null = await NFTEvent.find();
    if (events && nft_groups && nft_groups.length > 0) {
      for (let group of nft_groups) {
        for (let event of events) {
          if (event.group === group) {
            communityEvents.push(event);
          }
        }
      }
    } else {
      throw "No events were found."
    }
    res.status(200);
    res.send(communityEvents);
  }
  catch (err) {
    res.status(500);
    console.log(err, "getCommunityEvents is failing.");
  }
};

// Adds an event to the user's attending events, saves the user, and then pushes the user into the event's attendees.
export const addToMyEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.sessionID;
    const title: string = req.body.title;
    const _id: string = req.body._id;
    const user: UserType | null  = await User.findOne({ eth_address: userId });
    if (user) {
      user.attending_events.push(title);
      user.save();
    } else {
      throw "User not found";
    }
    const event: EventType | null = await NFTEvent.findOne({ _id: _id });
    if (event) {
      event.attendees.push(userId);
      event.save();
      res.send(event);
    } else {
      throw "Event not found";
    }
  } catch (err) { 
    console.log(err, "addToMyEvents is not working.") 
    res.status(500);
  }
};

// Removes an event from the user's attending events, saves the user, and then removes the user from the event's attendees.
export const removeFromMyEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.sessionID; 
    const title: string = req.body.title;
    const _id: string = req.body._id;
    const user: UserType | null = await User.findOne({ eth_address: userId });
    if (user) {
      const updatedList: string[] = user.attending_events.filter(event => event !== title);
      user.attending_events = updatedList;
      user.save();
    } else {
      throw "User not found";
    }
    const event: EventType | null = await NFTEvent.findOne({ _id: _id });
    if (event) {
      const newAttendees: string[] = event.attendees.filter(attendees => attendees !== userId)
      event.attendees = newAttendees;
      event.save();
      res.send(event);
    } else {
      throw "Event not found";
    }
  }
  catch (err) {
    console.log(err, "removeFromMyEvents is not working.")
    res.status(500);
  }
};
