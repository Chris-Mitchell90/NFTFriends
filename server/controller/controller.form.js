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
exports.postEvent = void 0;
const models_1 = require("../model/models");
// Creates a new event
const postEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { group, host, description, date, title, venue, street, postcode, city, online, link, attendees } = req.body;
        const event = yield models_1.NFTEvent.create({ group: group, description: description, host: host, date: date, title: title, venue: venue, street: street, postcode: postcode, city: city, online: online, link: link, attendees: attendees });
        res.status(201);
        res.send(event);
    }
    catch (err) {
        console.log(err, "error with postEvent");
        res.status(400);
        res.end();
    }
});
exports.postEvent = postEvent;
