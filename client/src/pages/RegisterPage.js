import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterModal from "../components/RegisterModal";

const RegisterPage = () => {
    return <div className="container container--light">
        <Header menu="dark" />
        <div className="registerPage">
            <RegisterModal mobile={true} />
        </div>
        <Footer theme="light" />
    </div>
}

export default RegisterPage;
