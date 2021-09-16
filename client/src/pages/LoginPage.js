import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginMobile from "../components/LoginMobile";

const LoginPage = () => {
    return <div className="container container--light">
        <Header menu="dark" />
        <LoginMobile />
        <Footer theme="light" />
    </div>
}

export default LoginPage;
