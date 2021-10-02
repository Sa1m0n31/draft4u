import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {isLoggedIn} from "../helpers/auth";
import MyAccountStartHeader from "../components/MyAccountStartHeader";
import BlogSection from "../components/BlogSection";
import ClubActivities from "../components/ClubActivities";
import MyAccountStartBottom from "../components/MyAccountStartBottom";
import {getUserData} from "../helpers/user";

const MyAccountStart = () => {
    const [loaded, setLoaded] = useState(false);
    const [fullName, setFullName] = useState("");

    useEffect(() => {
        isLoggedIn()
            .then(res => {
                if(!res?.data?.result) window.location = "/";
                else {
                    setLoaded(true);
                    getUserData()
                        .then(res => {
                            const result = res?.data?.result;
                            if(result) {
                                setFullName(result.first_name + " " + result.last_name);
                            }
                        })
                }
            })
    }, []);

    return <div className="container container--user">
        <Header loggedIn={true} player={true} />

        {loaded ? <>
            <MyAccountStartHeader fullName={fullName} />
            <BlogSection />
            <ClubActivities />
            <MyAccountStartBottom />
        </> : ""}

        <Footer theme="light" border={true} />
    </div>
}

export default MyAccountStart;
