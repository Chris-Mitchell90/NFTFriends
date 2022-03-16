"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventList = void 0;
const react_1 = __importDefault(require("react"));
const EventItem_1 = require("./EventItem");
require("./EventList.css");
const EventList = ({ events, addOrRemoveFromEventList }) => {
    return (react_1.default.createElement("div", { className: "eventListClass" }, events.map(eventItem => react_1.default.createElement(EventItem_1.EventItem, { eventItem: eventItem, addOrRemoveFromEventList: addOrRemoveFromEventList, key: eventItem._id }))));
};
exports.EventList = EventList;
