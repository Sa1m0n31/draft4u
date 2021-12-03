import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import LandingPage from "../components/LandingPage";
import Footer from "../components/Footer";
import RegisterModal from "../components/RegisterModal";
import {getUserData} from "../helpers/user";
import LoadingPage from "./LoadingPage";

const RegisterFromThirdParty = () => {
    const [loaded, setLoaded] = useState(false);
    const [mobile, setMobile] = useState(window.innerWidth < 768);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        getUserData()
            .then((res) => {
                if(res?.data?.result) {
                    if(res.data.result.active) {
                        window.location = "/rozpocznij";
                    }
                    else {
                        setFirstName(res.data.result.first_name);
                        setLastName(res.data.result.last_name);
                        setLoaded(true);
                    }
                }
                else {
                    window.location = "/";
                }
            });
    }, []);

    return <div className="container container--light container--registerFromThirdParty">
        {loaded ? <>
            <Header menu="dark"
                    registerFromThirdParty={!mobile}
                    firstName={firstName}
                    lastName={lastName}
            />
            {!mobile ? <LandingPage /> : <div className="registerPage">
                <RegisterModal mobile={true}
                               firstName={firstName}
                               lastName={lastName}
                               registerFromThirdParty={true} />
            </div>}
            <Footer theme="light" />
        </> : <LoadingPage />}
    </div>
}

export default RegisterFromThirdParty;
