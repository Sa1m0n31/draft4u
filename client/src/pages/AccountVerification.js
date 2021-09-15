import React, { useState, useEffect } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClubSlider from "../components/ClubSlider";
import {verifyUser} from "../helpers/auth";
import VerificationResult from "../components/VerificationResult";

const AccountVerification = () => {
    const [loaded, setLoaded] = useState(-1);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const token = Object.fromEntries(urlSearchParams.entries()).token;

        if(token) {
            verifyUser(token)
                .then(res => {
                    if(res?.data?.result) {
                        setLoaded(1);
                    }
                    else {
                        setLoaded(0);
                        window.location = "/";
                    }
                })
        }
        else {
            setLoaded(0);
            window.location = "/";
        }
    }, []);

    return <div className="container container--light">
        {loaded === 1 ? <>
            <Header />
            <VerificationResult />
            <ClubSlider />
            <Footer theme="dark" />
        </> : ""}
    </div>
}

export default AccountVerification;
