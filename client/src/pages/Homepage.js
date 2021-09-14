import React from 'react'
import Header from "../components/Header";
import LandingPage from "../components/LandingPage";
import Footer from "../components/Footer";

const Homepage = () => {
    return <div className="container container--homepage">
        <Header />
        <LandingPage />
        <Footer theme="dark" />
    </div>
}

export default Homepage;
