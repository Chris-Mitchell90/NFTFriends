"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = __importDefault(require("react"));
const Login_1 = require("./Components/Login");
const Dashboard_1 = require("./Components/Dashboard");
const EventPage_1 = require("./Components/EventPage");
const Form_1 = require("./Components/Form");
const react_router_dom_1 = require("react-router-dom");
require("./App.css");
const App = () => {
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Login_1.Login, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/dashboard", element: react_1.default.createElement(Dashboard_1.Dashboard, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/form", element: react_1.default.createElement(Form_1.Form, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/eventPage", element: react_1.default.createElement(EventPage_1.EventPage, null) }))));
};
exports.App = App;
