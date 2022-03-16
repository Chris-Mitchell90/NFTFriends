"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPage = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const moment_1 = __importDefault(require("moment"));
require("./EventPage.css");
const EventPage = () => {
    const location = (0, react_router_dom_1.useLocation)();
    const state = location.state;
    return (react_1.default.createElement("div", { className: "eventPageLayout" },
        react_1.default.createElement("div", { className: "firstEventPage" },
            react_1.default.createElement("h3", null, (0, moment_1.default)(state.date).format('hh:mm a   [-] MMMM Do[,] YYYY')),
            react_1.default.createElement("div", null,
                react_1.default.createElement("h1", null, state.title)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("h3", null,
                    react_1.default.createElement("b", null, "Host:"),
                    " ",
                    state.host)),
            react_1.default.createElement("br", null),
            react_1.default.createElement("div", { className: "descriptionBox" },
                "Description:",
                state.description)),
        react_1.default.createElement("div", { className: "secondEventPage" },
            react_1.default.createElement("div", { className: "secondEventPageItem" },
                react_1.default.createElement("div", null, (0, moment_1.default)(state.date).format('hh:mm a   [-] MMMM Do[,] YYYY')),
                react_1.default.createElement("div", null, state.venue),
                react_1.default.createElement("div", null, state.street),
                react_1.default.createElement("div", null, state.city))),
        react_1.default.createElement("div", { className: "thirdEventPage" },
            react_1.default.createElement("div", null,
                react_1.default.createElement("span", null,
                    react_1.default.createElement("b", null, "NFT Group:")),
                react_1.default.createElement("span", null, state.group)))));
};
exports.EventPage = EventPage;
