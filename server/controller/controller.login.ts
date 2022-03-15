import { User} from '../model/models';
import { UserType, NFTs } from '../types';
import { Response, Request } from 'express';
import 'dotenv/config';

// Starts moralis

import Moralis from 'moralis/node';
const serverUrl: string = process.env.MORALIS_SERVER || 'servernotfound';
const appId:string = process.env.MORALIS_APPID || 'appidnotfound';
Moralis.start({ serverUrl, appId });


// if user exists, finds the user and sets the sessionID

export const findExistingUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const eth_address: string = req.params.eth_address;
    const user: UserType | null = await User.findOne({ eth_address: eth_address });
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
};


//if eth_adress not in DB yet, add to DB

export const postNewUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const eth_address: string = req.params.eth_address;
    const newUser: UserType = await User.create({ eth_address: eth_address });
    req.sessionID = newUser.eth_address;
    res.send(JSON.stringify(newUser));
    res.status(201);
  }
  catch (err) {
    console.log(err, "error with postNewUSer");
    console.log(500);
    res.end();
  }
};


//Retrieves the NFT holdings from Moralis, finds the user in the database and updates to the NFT holdings

export const updateNFTCollection = async (req: Request, res: Response): Promise<void> => {
  try {
    const nft_groups: string[] = [];
    const eth_address: string = req.params.eth_address;
    const filter1 = { address: eth_address }
    const nfts: NFTs = await Moralis.Web3API.account.getNFTs(filter1);
    if (nfts.result) {
      for (let nft of nfts.result) {
        if (!nft_groups.includes(nft.name)) {
          nft_groups.push(nft.name);
        }
      }
    }
    const filter2 = { eth_address: eth_address.toLowerCase() };
    const update = { nft_groups };
    const user: UserType | null = await User.findOneAndUpdate(filter2, update, { new: true });
    res.send(user);
    res.status(201);
  }
  catch (err) {
    console.log(err, "error with updateNFTCollection");
  }
};


// Creates mock users with event data

export const postFakeUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const eth_address: string = req.body.eth_address;
    const nft_groups: string[] = req.body.nft_groups;
    const newUser: UserType | null = await User.create({ eth_address: eth_address, nft_groups: nft_groups });
    req.sessionID = newUser.eth_address;
    res.send(newUser);
    res.status(201);
  }
  catch (err) {
    console.log(err, "error with postFakeUSer");
    console.log(500);
    res.end();
  }
};


