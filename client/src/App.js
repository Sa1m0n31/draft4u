import React from 'react'

import './static/style/style.css'
import './static/style/mobile.css'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";

function App() {
  return <Router>
    <Route exact path="/">
        <Homepage />
    </Route>
  </Router>
}

export default App;
