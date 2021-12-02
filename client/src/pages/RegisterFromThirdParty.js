import React, {useEffect, useRef, useState} from 'react'
import triangleDown from "../static/img/triangle-down.svg";
import closeIcon from "../static/img/close-grey.svg";
import registerBtnIcon from "../static/img/zarejestruj-btn.png";
import {isMail, isPasswordStrength} from "../helpers/validation";
import {isEmailAvailable} from "../helpers/user";
import {registerUser} from "../helpers/auth";
import Header from "../components/Header";
import LandingPage from "../components/LandingPage";
import Footer from "../components/Footer";
import playerImg from "../static/img/siatkarz.png";
import RegisterModal from "../components/RegisterModal";

const RegisterFromThirdParty = () => {
    const [mobile, setMobile] = useState(false);

    window.addEventListener("resize", (event) => {
        if(window.innerWidth < 768) {
            setMobile(true);
        }
    })

    return <div className="container container--light container--registerFromThirdParty">
        <Header menu="dark" registerFromThirdParty={!mobile} />
        {mobile ? <LandingPage /> : <div className="registerPage">
            <RegisterModal mobile={true} registerFromThirdParty={true} />
        </div> }
        <Footer theme="light" />
    </div>
}

export default RegisterFromThirdParty;
