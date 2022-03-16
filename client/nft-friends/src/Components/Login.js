"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Login = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ApiClient_js_1 = require("../ApiClient.js");
require("./Login.css");
const Login = () => {
    const [ethAddress, setEthAddress] = (0, react_1.useState)('No address found');
    const [nftCollection, setNftCollection] = (0, react_1.useState)([` You don't have any NFTs!`]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const asyncCheckIfDB = (eth) => __awaiter(void 0, void 0, void 0, function* () {
        let user = yield (0, ApiClient_js_1.FindExistingUser)(eth);
        if (user)
            return user;
        else {
            let user = yield (0, ApiClient_js_1.postUser)(eth);
            return user;
        }
    });
    const loginHandler = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (window.ethereum) {
                let result = [];
                result = yield window.ethereum.request({ method: 'eth_requestAccounts' });
                setEthAddress(result[0]);
                let user = yield asyncCheckIfDB(result[0]);
                console.log(user, 'user');
                let userWithNfts = yield (0, ApiClient_js_1.getNFTSC)(user.eth_address);
                console.log(userWithNfts, 'user2');
                setNftCollection(userWithNfts.nft_groups);
                navigate('./dashboard', { state: userWithNfts.nft_groups });
            }
            else {
                throw new Error("You must install Metamask.");
            }
        }
        catch (e) {
            console.error(e, "Error occured during login.");
        }
    });
    return (react_1.default.createElement("div", { className: "grad" },
        react_1.default.createElement("div", { className: "loginMainContent" },
            react_1.default.createElement("h1", null, " Connect with Your NFT Community "),
            react_1.default.createElement("h3", null,
                "Wallet connected: ",
                ethAddress),
            react_1.default.createElement("h3", null,
                " NFTS:",
                nftCollection
                    ?
                        nftCollection
                    :
                        null),
            react_1.default.createElement("button", { className: "loginButton", id: "loginDash", onClick: loginHandler }, " LOGIN "))));
};
exports.Login = Login;
