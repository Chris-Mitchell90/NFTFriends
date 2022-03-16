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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromMyEvents = exports.addToMyEvents = exports.postEventToServer = exports.communityEvents = exports.getNFTSC = exports.postUser = exports.FindExistingUser = void 0;
const BASE_URL = 'http://localhost:3000';
const FindExistingUser = (eth_address) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(`${BASE_URL}/login/${eth_address}`)
        .then(res => res.json())
        .catch(err => console.error(err, "FindExistingUser is not working"));
});
exports.FindExistingUser = FindExistingUser;
const postUser = (eth_address) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(`${BASE_URL}/login/${eth_address}`, {
        method: 'POST'
    })
        .then(res => res.json())
        .catch(err => console.error(err, "postUserC is not working"));
});
exports.postUser = postUser;
const getNFTSC = (eth_address) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(`${BASE_URL}/login/${eth_address}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .catch(err => console.error(err, "getNFTSC is not working"));
});
exports.getNFTSC = getNFTSC;
const communityEvents = (nft_groups) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(`${BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nft_groups: nft_groups })
    })
        .then(res => res.json())
        .catch(err => console.error(err, "communityEvents is not working"));
});
exports.communityEvents = communityEvents;
const postEventToServer = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(`${BASE_URL}/form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    })
        .then(res => res.json())
        .catch(err => console.error(err, "postEventToServer is not working"));
});
exports.postEventToServer = postEventToServer;
const addToMyEvents = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(`${BASE_URL}/events/add`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    })
        .then(res => res.json())
        .catch(err => console.error(err, "addToMyEvents is not working"));
});
exports.addToMyEvents = addToMyEvents;
const removeFromMyEvents = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(`${BASE_URL}/event/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    })
        .then(res => res.json())
        .catch(err => console.error(err, "removeFromMyEvents is not working"));
});
exports.removeFromMyEvents = removeFromMyEvents;
