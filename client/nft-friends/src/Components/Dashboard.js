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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ApiClient_1 = require("../ApiClient");
const EventList_1 = require("./EventList");
require("./Dashboard.css");
const Dashboard = () => {
    const [isLoading, setIsLoading] = react_1.default.useState(true);
    const [events, setEvents] = react_1.default.useState([]);
    const [myEvents, setMyEvents] = react_1.default.useState([]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const state = location.state;
    const updateUsersCommunityEvents = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const communityEventsList = yield (0, ApiClient_1.communityEvents)(state);
            return communityEventsList;
        }
        catch (e) {
            console.error(e, 'updateCommunityEvents is failing');
            throw new Error("Community Events List is undefined");
        }
    });
    const isLoadingStateToggle = (array) => {
        if (array && array.length > 0) {
            setIsLoading(false);
        }
    };
    react_1.default.useEffect(() => {
        updateUsersCommunityEvents()
            .then(response => {
            setEvents(response);
            isLoadingStateToggle(response);
        })
            .catch(error => {
            console.log(error, 'error occurred setting community events');
        });
    }, []);
    const addOrRemoveFromEventList = (event) => __awaiter(void 0, void 0, void 0, function* () {
        if (myEvents.includes(event)) {
            yield (0, ApiClient_1.removeFromMyEvents)(event);
            const newMyEvents = myEvents.filter(eventInstance => eventInstance !== event);
            setMyEvents(newMyEvents);
        }
        else {
            yield (0, ApiClient_1.addToMyEvents)(event);
            const newMyEvents = myEvents.concat(event);
            setMyEvents(newMyEvents);
        }
    });
    const navigateToForm = () => {
        navigate('../form', { state: state });
    };
    return (react_1.default.createElement("div", { className: "grad" },
        react_1.default.createElement("div", { className: "topLevel " },
            react_1.default.createElement("h1", null, "Welcome to Your Dashboard"),
            react_1.default.createElement("div", { className: "buttonCreateEvent" },
                react_1.default.createElement("button", { onClick: navigateToForm }, " Create event"))),
        react_1.default.createElement("div", { className: "overallDashboard" },
            react_1.default.createElement("div", { className: "eventPartOfDashboard" },
                myEvents.length > 0
                    ?
                        react_1.default.createElement("div", { className: "eventsDashboard" },
                            react_1.default.createElement("h2", null, "Events you are attending:"),
                            react_1.default.createElement(EventList_1.EventList, { events: myEvents, addOrRemoveFromEventList: addOrRemoveFromEventList }))
                    :
                        react_1.default.createElement("p", null, "No events attending yet"),
                isLoading
                    ?
                        react_1.default.createElement("h1", null, "Loading..")
                    :
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("h2", null, "Browse events in your community:"),
                            react_1.default.createElement(EventList_1.EventList, { events: events, addOrRemoveFromEventList: addOrRemoveFromEventList }))))));
};
exports.Dashboard = Dashboard;
