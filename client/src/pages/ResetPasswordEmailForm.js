import React, { useState, useEffect } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClubSlider from "../components/ClubSlider";
import nextBtn from '../static/img/dalej-btn.png'
import {setPasswordRemindToken} from "../helpers/user";
import DraftLoader from "../components/Loader";
import {isMail} from "../helpers/validation";

const ResetPasswordEmailForm = () => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isMail(email)) {
            setLoading(true);
            setPasswordRemindToken(email)
                .then(res => {
                    setLoading(false);
                    if(res?.data?.result === 1) {
                        setSuccess(1);
                    }
                    else if(res?.data?.result === -1) {
                        setSuccess(-2);
                    }
                    else {
                        setSuccess(0);
                    }
                })
                .catch(() => {
                    //setLoading(false);
                    setSuccess(0);
                });
        }
        else {
            setEmail("");
            setError(true);
        }
    }

    return <div className="container container--light page">
        <Header menu="dark" />
        <main className="pageContent">
            <section className="resetPassword">
                {success === -1 ? <>
                    <h2 className="resetPassword__header">
                        Zapomniałeś hasła?
                    </h2>
                    <h2 className="resetPassword__header">
                        Nie przejmuj się, spróbujemy Ci pomoc.
                    </h2>
                    <h2 className="resetPassword__header">
                        Zacznijmy od Twojego adresu e-mail.
                    </h2>

                    {!loading ? <label className="relative label--remindPassword">
                        {error ? <span className="loginBox__error">
                        Podaj poprawny adres email
                </span> : ""}
                        <input className="input input--remindPassword"
                               onClick={() => { setError(false); }}
                               value={email}
                               onChange={(e) => { setEmail(e.target.value); }}
                               placeholder={error ? "" : "E-mail"} />
                    </label> : <div className="loaderWrapper--remindPassword">
                        <DraftLoader />
                    </div> }

                    <button className="button button--resetPassword button--hover" onClick={(e) => { handleSubmit(e); }}>
                        <img className="btn__img" src={nextBtn} alt="dalej" />
                    </button>
                </> : (success === 1 ? <>
                    <h2 className="resetPassword__header">
                        Sprawdź skrzynkę!
                    </h2>
                    <h2 className="resetPassword__header">
                        Na Twój adres email wysłaliśmy link do odzyskania hasła.
                    </h2>
                </> : (success === -2 ? <>
                    <h2 className="resetPassword__header">
                        Konto o podanym adresie e-mail nie istnieje.
                    </h2>
                </> : <>
                    <h2 className="resetPassword__header">
                        Coś poszło nie tak.
                    </h2>
                    <h2 className="resetPassword__header">
                        Prosimy spróbować później
                    </h2>
                </>))}
            </section>
        </main>
        <ClubSlider />
        <Footer theme="dark" />
    </div>
}

export default ResetPasswordEmailForm;
