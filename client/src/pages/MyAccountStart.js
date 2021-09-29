import React, { useEffect } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {isLoggedIn} from "../helpers/auth";
import MyAccountStartHeader from "../components/MyAccountStartHeader";
import BlogSection from "../components/BlogSection";
import ClubActivities from "../components/ClubActivities";
import MyAccountStartBottom from "../components/MyAccountStartBottom";

const MyAccountStart = () => {
    useEffect(() => {
        isLoggedIn()
            .then(res => {
                console.log(res?.data);
            })
    }, []);

    return <div className="container container--user">
        <Header loggedIn={true} player={true} />
        <MyAccountStartHeader />
        <BlogSection />
        <ClubActivities />
        <MyAccountStartBottom />
        <Footer theme="light" border={true} />
    </div>
}

export default MyAccountStart;
