import React, { useEffect, useState } from 'react';
import { getNFTSC, checkIfInDBC, postUserC } from '../ApiClient.js'
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link
} from "react-router-dom";
import './Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [ethAddress, setEthAddress] = useState('No address yet')
    const [nftCollection, setNftCollection] = useState('No NFTs yet')
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const asyncCheckIfDB = async (eth) => {
        let user = await checkIfInDBC(eth);
        console.log(user);
        if (user) {
            console.log((user, 'in db'))
            return user;
            // getNFTSC(user);
        }
        else {
            console.log('eth address not in DB')
            user = await postUserC(eth);
            user = user.json();
            return user;
        }
    }

    // useEffect(() => {
    //     if (ethAddress !== 'No address yet') {
    //         asyncCheckIfDB();
    //     }
    // }, [ethAddress])



    //login with metamask
    const loginHandler = () => {
        try {
            if (window.ethereum) {
                //metamask is here
                window.ethereum.request({ method: 'eth_requestAccounts' })
                    .then(result => {
                        setEthAddress(result[0]);
                        return result[0]
                    })
                    .then((eth) => {
                        return asyncCheckIfDB(eth);
                    })
                    .then((user) => {
                        return getNFTSC(user.eth_address);
                    }
                    )
                    .then((NFTObject) => {
                        //console.log(NFTObject.nft_groups, "nftList from .then")
                        console.log(NFTObject.nft_groups);
                        setNftCollection(NFTObject.nft_groups);
                        navigate('./dashboard', { state: NFTObject.nft_groups })


                    })

            }
            else {
                console.log("install metamask")
            }
        }
        catch (err) {
            console.log(err, "error")
        }
    }


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
// if (window.ethereum) {
//     //metamask is here
//     window.ethereum.request({ method: 'eth_requestAccounts' })
//         .then(result => {
//             setEthAddress(result[0]);
//             return result[0]
//         })
//         .then((eth_address) => {
//             console.log(eth_address);
//             return getNFTS(eth_address);
//         })
//         .then((nftList) => {
//             console.log(nftList);
//             setNftCollection(nftList);
//         })
// }