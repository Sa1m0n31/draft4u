import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import LandingPage from "../components/LandingPage";
import Footer from "../components/Footer";
import {isLoggedIn} from "../helpers/auth";
import LoadingPage from "./LoadingPage";
import CookieConsent from "react-cookie-consent";

const Homepage = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        isLoggedIn()
            .then(res => {
                if(res?.data?.result) window.location = "/rozpocznij";
                else setLoaded(true);
            })
    },[]);

    return <>
        {loaded ? <div className="container container--homepage">
            <Header />
            <CookieConsent
                buttonText="OK"
            >
                Niniejsza strona korzysta z plików cookies, zgodnie z <a href="/polityka-plikow-cookies">Polityką Plików Cookies</a>. Możesz określić warunki
                przechowywania lub dostępu do plików cookies w Twojej przeglądarce. Dalsze korzystanie z niniejszej witryny
                oznacza zgodę na przechowywanie i uzyskiwanie dostępu do plików cookies przez administratora strony draft4u.com.pl, zgodnie z ustawieniami przeglądarki.
            </CookieConsent>
            <LandingPage />
            <Footer theme="dark" />
        </div> : <LoadingPage />}
    </>
}

export default Homepage;
