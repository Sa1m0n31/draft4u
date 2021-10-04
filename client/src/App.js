import React from 'react'

import './static/style/style.css'
import './static/style/mobile.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MyAccountStart from "./pages/MyAccountStart";
import AccountVerification from "./pages/AccountVerification";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordEmailForm from "./pages/ResetPasswordEmailForm";
import ResetPassword from "./pages/ResetPassword";
import AboutUs from "./pages/AboutUs";
import Player from "./pages/Player";
import Club from "./pages/Club";
import Map from "./pages/Map";
import PlayerProfileEdition from "./pages/PlayerProfileEdition";
import PlayerFAQ from "./components/PlayerFAQ";
import Header from "./components/Header";
import FAQPage from "./pages/FAQPage";

function App() {
  return <Router>
    {/* Public routes */}
    <Route exact path="/">
        <Homepage />
    </Route>
    <Route path="/weryfikacja">
        <AccountVerification />
    </Route>
    <Route path="/logowanie">
        <LoginPage />
    </Route>
    <Route path="/zaloz-konto">
        <RegisterPage />
    </Route>
    <Route path="/odzyskiwanie-hasla">
        <ResetPasswordEmailForm />
    </Route>
    <Route path="/resetowanie-hasla">
        <ResetPassword />
    </Route>
    <Route path="/o-nas">
        <AboutUs />
    </Route>
    <Route path="/zawodnik">
        <Player />
    </Route>
    <Route path="/klub">
        <Club />
    </Route>
    {/*<Route path="/mapa">*/}
    {/*    <Map />*/}
    {/*</Route>*/}

    {/* User routes */}
    <Route path="/rozpocznij">
        <MyAccountStart />
    </Route>
    <Route path="/edycja-profilu">
        <PlayerProfileEdition />
    </Route>
    <Route path="/faq">
      <FAQPage />
    </Route>

  </Router>
}

export default App;
