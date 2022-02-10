import React from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import './static/style/style.css'
import './static/style/mobile.css'
import './static/style/admin.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import AccountVerification from "./pages/AccountVerification";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordEmailForm from "./pages/ResetPasswordEmailForm";
import ResetPassword from "./pages/ResetPassword";
import AboutUs from "./pages/AboutUs";
import Player from "./pages/Player";
import Club from "./pages/Club";
import Map from "./pages/Map";
import CookieConsent from "react-cookie-consent";
import UserWrapper from "./wrappers/UserWrapper";
import PaymentReturnPage from "./pages/PaymentReturnPage";
import ClubWrapper from "./wrappers/ClubWrapper";
import AdminLogin from "./pages/AdminLogin";
import AdminWrapper from "./wrappers/AdminWrapper";
import RegisterFromThirdParty from "./pages/RegisterFromThirdParty";
import axios from "axios";
import AUTH_HEADER from "./static/restrict/credentials";
import ContentPage from "./pages/ContentPage";

axios.defaults.headers.common['Authorization'] = AUTH_HEADER;

const payPalOptions = {
    "client-id": "ATnTmlSayXx-XfGbfNQp53705bF0H511cIphRpyCLiHxFZIvjvOgB8ceLv9WrN_OITn_rD_9Qd5CPz45",
    currency: "PLN"
}

function App() {
  return <><Router>
    {/* Public routes */}
    <Route exact path="/">
        <Homepage />
    </Route>
    <Route path={["/weryfikacja", "/verification"]}>
        <AccountVerification />
    </Route>
    <Route path={["/logowanie", "/log-in"]}>
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
    <Route path="/mapa">
        <Map />
    </Route>
    <Route path="/zarejestruj-przez-facebooka">
        <RegisterFromThirdParty thirdParty="fb" />
    </Route>
    <Route path="/zarejestruj-przez-google">
        <RegisterFromThirdParty thirdParty="gl" />
    </Route>
    <Route path="/regulamin">
        <ContentPage type={1} />
    </Route>
    <Route path="/polityka-prywatnosci">
        <ContentPage type={2} />
    </Route>
    <Route path="/polityka-plikow-cookies">
        <ContentPage type={3} />
    </Route>

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
      <PayPalScriptProvider options={payPalOptions}>
          <Route path="/zaplac">
              <UserWrapper page={5} />
          </Route>
      </PayPalScriptProvider>
      <Route path="/subskrypcja-przedluzona">
          <UserWrapper page={6} />
      </Route>
      <Route path="/czat">
          <UserWrapper page={7} />
      </Route>
      <Route path="/notyfikacje">
          <UserWrapper page={8} />
      </Route>
      <Route path="/wpis">
          <UserWrapper page={9} />
      </Route>
      <Route path="/zmien-haslo-zawodnika">
          <UserWrapper page={10} />
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
      <Route path="/wiadomosci">
          <ClubWrapper page={8} />
      </Route>
      <Route path="/powiadomienia">
          <ClubWrapper page={9} />
      </Route>
      <Route path="/zmien-haslo-klubu">
          <ClubWrapper page={10} />
      </Route>

      {/* Admin panel */}
      <Route path="/admin">
          <AdminLogin />
      </Route>
      <Route path="/panel">
          <AdminWrapper page={1} />
      </Route>
      <Route path="/dodaj-klub">
          <AdminWrapper page={2} />
      </Route>
      <Route path="/lista-klubow">
          <AdminWrapper page={3} />
      </Route>
      <Route path="/lista-zawodnikow">
          <AdminWrapper page={4} />
      </Route>
      <Route path="/dodaj-powiadomienie">
          <AdminWrapper page={5} />
      </Route>
      <Route path="/lista-powiadomien">
          <AdminWrapper page={6} />
      </Route>
      <Route path="/dodaj-artykul">
          <AdminWrapper page={7} />
      </Route>
      <Route path="/lista-artykulow">
          <AdminWrapper page={8} />
      </Route>
      <Route path="/zmien-haslo-administratora">
          <AdminWrapper page={9} />
      </Route>
      <Route path="/dodaj-kod">
          <AdminWrapper page={10} />
      </Route>
      <Route path="/lista-kodow">
          <AdminWrapper page={11} />
      </Route>
      <Route path="/lista-mailingowa">
          <AdminWrapper page={12} />
      </Route>
      <Route path="/edytuj-zawodnika">
          <AdminWrapper page={13} />
      </Route>
      <Route path="/polski">
          <AdminWrapper page={14} />
      </Route>
      <Route path="/angielski">
          <AdminWrapper page={15} />
      </Route>
  </Router>
      </>
}

export default App;
