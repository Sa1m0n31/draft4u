import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {isLoggedIn} from "../helpers/auth";
import MyAccountStartHeader from "../components/MyAccountStartHeader";
import BlogSection from "../components/BlogSection";
import ClubActivities from "../components/ClubActivities";
import MyAccountStartBottom from "../components/MyAccountStartBottom";

const MyAccountStart = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        isLoggedIn()
            .then(res => {
                if(!res?.data?.result) window.location = "/";
                else setLoaded(true);
            })
    }, []);

    return <div className="container container--user">
        <Header loggedIn={true} player={true} />

        {loaded ? <>
            <MyAccountStartHeader />
            <BlogSection />
            <ClubActivities />
            <MyAccountStartBottom />
        </> : ""}

        <Footer theme="light" border={true} />
    </div>
}

export default MyAccountStart;
