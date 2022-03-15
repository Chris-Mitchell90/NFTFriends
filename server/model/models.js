"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTEvent = exports.User = void 0;
const db_1 = require("./db");
const userSchema = new db_1.db.Schema({
    eth_address: { type: String, required: true },
    nft_groups: [String],
    userName: String,
    attending_events: [String],
});
const eventSchema = new db_1.db.Schema({
    group: { type: String, required: true },
    host: String,
    date: { type: Date, required: true },
    description: String,
    title: String,
    venue: String,
    street: String,
    postcode: String,
    city: String,
    online: Boolean,
    link: String,
    attendees: [String]
});
exports.User = db_1.db.model('User', userSchema);
exports.NFTEvent = db_1.db.model('Event', eventSchema);
