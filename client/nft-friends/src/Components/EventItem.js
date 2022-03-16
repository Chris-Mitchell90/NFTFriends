"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventItem = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const moment_1 = __importDefault(require("moment"));
require("./EventItem.css");
const EventItem = ({ eventItem, addOrRemoveFromEventList, key }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const eventPageHandler = () => {
        navigate('../eventPage', { state: eventItem });
    };
    return (react_1.default.createElement("div", { className: "eventItemClass" },
        react_1.default.createElement("div", { onClick: () => addOrRemoveFromEventList(eventItem), key: key },
            react_1.default.createElement("span", null,
                react_1.default.createElement("b", null, eventItem.group)),
            react_1.default.createElement("br", null),
            eventItem.title,
            react_1.default.createElement("br", null),
            (0, moment_1.default)(eventItem.date).format(' MMMM Do[,] YYYY'),
            react_1.default.createElement("br", null)),
        react_1.default.createElement("button", { onClick: eventPageHandler }, "See details"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null)));
};
exports.EventItem = EventItem;
