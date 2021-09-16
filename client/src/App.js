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

    {/* User routes */}
    <Route path="/rozpocznij">
        <MyAccountStart />
    </Route>

  </Router>
}

export default App;
