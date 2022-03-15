"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = require("./router");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
require("dotenv/config");
const SQLLiteStore = require('connect-sqlite3')(express_session_1.default);
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    store: new SQLLiteStore,
    name: 'sessionId',
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET || "thisisntsecretenough",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: true,
        httpOnly: false,
        secure: false,
    },
}));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('short'));
app.use(router_1.router);
app.listen(PORT, () => console.log(`listening port ${PORT}`));
