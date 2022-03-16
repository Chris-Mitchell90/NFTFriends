import React, { useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { UserType } from '../types.js';
import { getNFTSC, FindExistingUser, postUser } from '../ApiClient.js'
import './Login.css'

export const Login: React.FC = () => {
    const [ethAddress, setEthAddress] = useState<string>('No address found')
    const [nftCollection, setNftCollection] = useState<string[] | undefined>([` You don't have any NFTs!`])
    const navigate: NavigateFunction = useNavigate();

    const asyncCheckIfDB = async (eth: string): Promise<UserType> => {
        let user: UserType | null = await FindExistingUser(eth);
        if (user) return user;
        else {
            let user = await postUser(eth);
            return user;
        }
    }

    const loginHandler = async ():Promise<void> => {
        try {
            if (window.ethereum) {
                let result: string[] = [];
                result = await window.ethereum.request({ method: 'eth_requestAccounts' })
                setEthAddress(result[0]);
                let user: UserType = await asyncCheckIfDB(result[0])
                console.log(user, 'user')
                let userWithNfts: UserType = await getNFTSC(user.eth_address)
                console.log(userWithNfts, 'user2')
                setNftCollection(userWithNfts.nft_groups);
                navigate('./dashboard', { state: userWithNfts.nft_groups })
            } else { throw new Error("You must install Metamask.") }
        } catch (e) { console.error(e, "Error occured during login.") }
    };

    return (
        <div className="grad">
            <div className="loginMainContent">
                <h1> Connect with Your NFT Community </h1>
                <h3>Wallet connected: {ethAddress}</h3>
                <h3> NFTS: 
                    {
                        nftCollection 
                            ?
                                nftCollection 
                            :
                                null
                    }
                </h3>
                <button className="loginButton" id="loginDash" onClick={loginHandler}> LOGIN </button>
            </div>
        </div>
    )
}