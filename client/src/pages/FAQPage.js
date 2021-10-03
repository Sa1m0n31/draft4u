import React, { useState, useEffect } from 'react'
import PlayerFAQ from "../components/PlayerFAQ";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {isLoggedIn} from "../helpers/auth";
import {getUserData} from "../helpers/user";
import LoadingPage from "./LoadingPage";

const FAQPage = () => {
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

    return <div className="container container--light">
        {loaded ? <>
            <Header player={true} loggedIn={true} menu="dark" />
            <main className="siteWidthSuperNarrow faqPage">
                <PlayerFAQ />
            </main>
            <Footer theme="dark" />
        </> : <LoadingPage />}
    </div>
}

export default FAQPage;
