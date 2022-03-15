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
exports.postFakeUser = exports.updateNFTCollection = exports.postNewUser = exports.findExistingUser = void 0;
const models_1 = require("../model/models");
require("dotenv/config");
// Starts moralis
const node_1 = __importDefault(require("moralis/node"));
const serverUrl = process.env.MORALIS_SERVER || 'servernotfound';
const appId = process.env.MORALIS_APPID || 'appidnotfound';
node_1.default.start({ serverUrl, appId });
// if user exists, finds the user and sets the sessionID
const findExistingUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eth_address = req.params.eth_address;
        const user = yield models_1.User.findOne({ eth_address: eth_address });
        if (user) {
            req.sessionID = user.eth_address;
        }
        res.status(200);
        res.send(JSON.stringify(user));
    }
    catch (err) {
        console.log("error with findExistingUSer", err);
        res.status(500);
        res.end();
    }
});
exports.findExistingUser = findExistingUser;
//if eth_adress not in DB yet, add to DB
const postNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eth_address = req.params.eth_address;
        const newUser = yield models_1.User.create({ eth_address: eth_address });
        req.sessionID = newUser.eth_address;
        res.send(JSON.stringify(newUser));
        res.status(201);
    }
    catch (err) {
        console.log(err, "error with postNewUSer");
        console.log(500);
        res.end();
    }
});
exports.postNewUser = postNewUser;
//Retrieves the NFT holdings from Moralis, finds the user in the database and updates to the NFT holdings
const updateNFTCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nft_groups = [];
        const eth_address = req.params.eth_address;
        const filter1 = { address: eth_address };
        const nfts = yield node_1.default.Web3API.account.getNFTs(filter1);
        if (nfts.result) {
            for (let nft of nfts.result) {
                if (!nft_groups.includes(nft.name)) {
                    nft_groups.push(nft.name);
                }
            }
        }
        const filter2 = { eth_address: eth_address.toLowerCase() };
        const update = { nft_groups };
        const user = yield models_1.User.findOneAndUpdate(filter2, update, { new: true });
        res.send(user);
        res.status(201);
    }
    catch (err) {
        console.log(err, "error with updateNFTCollection");
    }
});
exports.updateNFTCollection = updateNFTCollection;
// Creates mock users with event data
const postFakeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eth_address = req.body.eth_address;
        const nft_groups = req.body.nft_groups;
        const newUser = yield models_1.User.create({ eth_address: eth_address, nft_groups: nft_groups });
        req.sessionID = newUser.eth_address;
        res.send(newUser);
        res.status(201);
    }
    catch (err) {
        console.log(err, "error with postFakeUSer");
        console.log(500);
        res.end();
    }
});
exports.postFakeUser = postFakeUser;
