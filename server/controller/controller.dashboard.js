"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromMyEvents = exports.addToMyEvents = exports.getCommunityEvents = void 0;
const models_1 = require("../model/models");
// Takes an array of the user NFT groups that are passed down through the login and compares with all the NFT groups to find events that they have access to.
const getCommunityEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nft_groups = req.body;
        const communityEvents = [];
        const events = yield models_1.NFTEvent.find();
        if (events) {
            for (let group of nft_groups) {
                for (let event of events) {
                    if (event.group === group) {
                        communityEvents.push(event);
                    }
                }
            }
            res.status(200);
            res.send(communityEvents);
        }
        else {
            throw "No events were found.";
        }
    }
    catch (err) {
        res.status(500);
        console.log(err, "getCommunityEvents is failing.");
    }
});
exports.getCommunityEvents = getCommunityEvents;
// Adds an event to the user's attending events, saves the user, and then pushes the user into the event's attendees.
const addToMyEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.sessionID;
        const title = req.body.title;
        const _id = req.body._id;
        const user = yield models_1.User.findOne({ eth_address: userId });
        if (user) {
            user.attending_events.push(title);
            user.save();
        }
        else {
            throw "User not found";
        }
        const event = yield models_1.NFTEvent.findOne({ _id: _id });
        if (event) {
            event.attendees.push(userId);
            event.save();
            res.send(event);
        }
        else {
            throw "Event not found";
        }
    }
    catch (err) {
        console.log(err, "addToMyEvents is not working.");
        res.status(500);
    }
});
exports.addToMyEvents = addToMyEvents;
// Removes an event from the user's attending events, saves the user, and then removes the user from the event's attendees.
const removeFromMyEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.sessionID;
        const title = req.body.title;
        const _id = req.body._id;
        const user = yield models_1.User.findOne({ eth_address: userId });
        if (user) {
            const updatedList = user.attending_events.filter(event => event !== title);
            user.attending_events = updatedList;
            user.save();
        }
        else {
            throw "User not found";
        }
        const event = yield models_1.NFTEvent.findOne({ _id: _id });
        if (event) {
            const newAttendees = event.attendees.filter(attendees => attendees !== userId);
            event.attendees = newAttendees;
            event.save();
            res.send(event);
        }
        else {
            throw "Event not found";
        }
    }
    catch (err) {
        console.log(err, "removeFromMyEvents is not working.");
        res.status(500);
    }
});
exports.removeFromMyEvents = removeFromMyEvents;
