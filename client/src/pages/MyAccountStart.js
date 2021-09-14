import React, { useEffect } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {isLoggedIn} from "../helpers/auth";

const MyAccountStart = () => {
    useEffect(() => {
        console.log(isLoggedIn());
    }, []);

    return <div className="container container--user">
        <Header loggedIn={true} />
        <Footer theme="light" />
    </div>
}

export default MyAccountStart;
