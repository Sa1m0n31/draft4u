import React from 'react'

import './static/style/style.css'
import './static/style/mobile.css'

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MyAccountStart from "./pages/MyAccountStart";
import {isLoggedIn} from "./helpers/auth";

function App() {
  return <Router>
    <Route exact path="/">
        <Homepage />
    </Route>
    <Route path="/rozpocznij">
        <MyAccountStart />
    </Route>
  </Router>
}

export default App;
