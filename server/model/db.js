"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
//import mongoose
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const MongoDB = process.env.MONGODB;
//connect to mongoose
mongoose_1.default.connect(`mongodb://localhost:27017/${MongoDB}`)
    .then(() => console.log('connected to mongoose'));
//save connection as db
exports.db = mongoose_1.default;
