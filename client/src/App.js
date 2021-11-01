import React from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
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
import VideoUploadPage from "./pages/VideoUploadPage";
import PaymentPage from "./pages/PaymentPage";
import UserWrapper from "./wrappers/UserWrapper";
import PaymentReturnPage from "./pages/PaymentReturnPage";
import ClubWrapper from "./wrappers/ClubWrapper";
import ComparatorPage from "./pages/ComparatorPage";
import PlayerPage from "./pages/PlayerPage";
import Favorites from "./pages/Favorites";

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
          <UserWrapper page={1} />
      </Route>
      <Route path="/edycja-profilu">
          <UserWrapper page={2} />
      </Route>
      <Route path="/faq">
          <UserWrapper page={3} />
      </Route>
      <Route path="/dodaj-video">
          <UserWrapper page={4} />
      </Route>
      <Route path="/zaplac">
          <UserWrapper page={5} />
      </Route>
      <Route path="/subskrypcja-przedluzona">
          <UserWrapper page={6} />
      </Route>

      {/* Club routes */}
      <Route path="/konto-klubu">
          <ClubWrapper page={1} />
      </Route>
      <Route path="/szukaj">
          <ClubWrapper page={2} />
      </Route>
      <Route path="/porownywarka">
          <ClubWrapper page={3} />
      </Route>
      <Route path="/profil-zawodnika">
          <ClubWrapper page={4} />
      </Route>
      <Route path="/ulubieni">
          <ClubWrapper page={5} />
      </Route>
      <Route path="/sklady">
          <DndProvider backend={HTML5Backend}>
              <ClubWrapper page={6} />
          </DndProvider>
      </Route>
      <Route path="/zapisane-druzyny">
          <ClubWrapper page={7} />
      </Route>

  </Router>
}

export default App;
