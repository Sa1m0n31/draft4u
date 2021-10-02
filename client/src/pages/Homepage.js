import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import LandingPage from "../components/LandingPage";
import Footer from "../components/Footer";
import {isLoggedIn} from "../helpers/auth";
import LoadingPage from "./LoadingPage";

const Homepage = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        isLoggedIn()
            .then(res => {
                if(res?.data?.result) window.location = "/rozpocznij";
                else setLoaded(true);
            })
    },[]);

    return <>
        {loaded ? <div className="container container--homepage">
            <Header />
            <LandingPage />
            <Footer theme="dark" />
        </div> : <LoadingPage />}
    </>
}

export default Homepage;
