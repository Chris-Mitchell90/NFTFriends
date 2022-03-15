import React, { useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { UserType } from '../types.js';
import { getNFTSC, FindExistingUser, postUser } from '../ApiClient.js'
import './Login.css'

export const Login: React.FC = () => {
    const [ethAddress, setEthAddress] = useState<{text: string}>({text: 'No address found'})
    const [nftCollection, setNftCollection] = useState<{text: string}>({text:'No NFTs found'})
    const navigate: NavigateFunction = useNavigate();

    const asyncCheckIfDB = async (eth: string): Promise<UserType> => {
        let user: UserType = await FindExistingUser(eth);
        if (user) return user;
        else {
            let user = await postUser(eth);
            return user;
        }
    }

    const loginHandler = (): void => {
        try {
            if (window["ethereum"]) {
                window["ethereum"].request({ method: 'eth_requestAccounts' })
                    .then(result => {
                        setEthAddress(result[0]);
                        return result[0]
                    })
                    .then( eth => { return asyncCheckIfDB(eth) })
                    .then( user => { return getNFTSC(user.eth_address) })
                    .then( NFTObject => {
                        setNftCollection(NFTObject.nft_groups);
                        navigate('./dashboard', { state: NFTObject.nft_groups })
                    })
            } else { throw new Error("You must install Metamask.") }
        } catch (e) { console.error(e, "Error occured during login.") }
    };

    return (
        <div className="grad">
            <div className="loginMainContent">
                <h1> Connect with Your NFT Community </h1>
                <h3>Wallet connected: {ethAddress}</h3>
                <h3>NFTS: {nftCollection ?
                    nftCollection :
                    null}</h3>
                <button className="loginButton" id="loginDash" onClick={loginHandler} >LOGIN </button>
            </div>
        </div>
    )
}

export default Login;