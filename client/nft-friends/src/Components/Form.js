"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ApiClient_1 = require("../ApiClient");
require("./Form.css");
const Form = () => {
    const location = (0, react_router_dom_1.useLocation)();
    const state = location.state;
    const submitHandlerForm = (event) => {
        event.preventDefault();
        const newEvent = {
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
        };
        (0, ApiClient_1.postEventToServer)(newEvent);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "CREATE YOUR EVENT"),
        react_1.default.createElement("form", { className: "eventForm", onSubmit: submitHandlerForm },
            react_1.default.createElement("div", { className: "firstThird" },
                react_1.default.createElement("label", null, "Select Your NFT Community"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("select", { name: "group" }, state.map((stateI) => { react_1.default.createElement("option", { value: stateI }, stateI); })),
                react_1.default.createElement("br", null),
                react_1.default.createElement("label", null, "Host:"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("input", { type: "text", name: "host", placeholder: "Insert your name..." }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("label", null, "Title:"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("input", { type: "text", name: "title", placeholder: "Insert a title..." }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("label", null, "Description: "),
                react_1.default.createElement("br", null),
                react_1.default.createElement("textarea", { name: "newDescription", rows: 10, cols: 30, placeholder: "Insert a description..." })),
            react_1.default.createElement("div", { className: "secondThird" },
                react_1.default.createElement("label", null, "In-Person"),
                react_1.default.createElement("input", { type: "radio", id: "offline", name: "online", value: "false", checked: true }),
                react_1.default.createElement("label", null, "Online"),
                react_1.default.createElement("input", { type: "radio", id: "online", name: "online", value: "true" }),
                react_1.default.createElement("div", { className: "address" },
                    react_1.default.createElement("label", { htmlFor: "venue" }, "Venue: "),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("input", { type: "text", id: "venue", name: "venue" }),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("label", { htmlFor: "street" }, "Street: "),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("input", { type: "text", id: "street", name: "street" }),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("label", { htmlFor: "postcode" }, "Postcode: "),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("input", { type: "text", id: "postcode", name: "postcode" }),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("label", { htmlFor: "city" }, "City: "),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("input", { type: "text", id: "city", name: "city" }))),
            react_1.default.createElement("div", { className: "thirdThird" },
                react_1.default.createElement("h5", null, "Date and Time:"),
                react_1.default.createElement("input", { type: "datetime-local", name: "newEventDate" }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("button", { className: "button", type: "submit" }, " Create Event ")))));
};
exports.Form = Form;
exports.default = exports.Form;
