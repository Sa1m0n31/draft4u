import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClubSlider from "../components/ClubSlider";
import nextBtn from "../static/img/dalej-btn.png";
import backBtn from '../static/img/powrot-btn.png'
import successImg from '../static/img/success.svg'
import {isPasswordStrength} from "../helpers/validation";
import {changeUserPassword, checkIfRemindPasswordTokenOk} from "../helpers/user";
import DraftLoader from "../components/Loader";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(-1);
    const [loading, setLoading] = useState(true);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = Object.fromEntries(urlSearchParams.entries()).token;
    const email = Object.fromEntries(urlSearchParams.entries()).email;

    useEffect(() => {
        checkIfRemindPasswordTokenOk(token)
            .then(res => {
                if(res?.data?.result) {
                    setLoading(false);
                }
                else {
                    window.location = "/";
                }
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!isPasswordStrength(password)) {
            setError("Hasło musi zawierać co najmniej 8 znaków, jedną cyfrę i jedną wielką literę");
            setPassword("");
            setRepeatPassword("");
        }
        else if(password !== repeatPassword) {
            setError("Podane hasła nie są identyczne");
            setPassword("");
            setRepeatPassword("");
        }
        else {
            setLoading(true);
            changeUserPassword(email, password)
                .then(res => {
                    setLoading(false);
                    if(res?.data?.result) {
                        setSuccess(1);
                    }
                    else {
                        setSuccess(0);
                    }
                })
                .catch(() => {
                    setLoading(false);
                    setSuccess(0);
                })
        }
    }

    return <div className="container container--light page">
        <Header menu="dark" />
        <main className="pageContent">
            <section className="resetPassword resetPassword--newPassword">
                {loading ? <DraftLoader /> : (success === -1) ? <>
                    <h2 className="resetPassword__header">
                        Wprowadź nowe hasło i potwierdź je ponownie
                    </h2>
                    <label className="relative">
                        <input className="input"
                               type="password"
                               name="password"
                               onClick={() => { setError(""); }}
                               value={password}
                               onChange={(e) => { setPassword(e.target.value); }}
                               placeholder={error ? "" : "Nowe hasło"} />
                    </label>
                    <label className="relative">
                        {error !== "" ? <span className="loginBox__error">
                        {error}
                </span> : ""}
                        <input className="input"
                               type="password"
                               name="repeatPassword"
                               onClick={() => { setError(""); }}
                               value={repeatPassword}
                               onChange={(e) => { setRepeatPassword(e.target.value); }}
                               placeholder={error ? "" : "Powtórz hasło"} />
                    </label>

                    <button className="button button--resetPassword button--hover" onClick={(e) => { handleSubmit(e); }}>
                        <img className="btn__img" src={nextBtn} alt="dalej" />
                    </button>
                </> : (success === 1 ? <>
                    <section className="resetPassword__flex">
                        <img className="successImg" src={successImg} alt="sukces" />
                        <div>
                            <h2 className="resetPassword__header">
                                Udało się!
                            </h2>
                            <h2 className="resetPassword__header">
                                Hasło zostało zmienione.
                            </h2>
                        </div>
                        <a className="button button--back button--hover" href="/">
                            <img className="btn__img" src={backBtn} alt="powrot" />
                        </a>
                    </section>
                </> : <>
                    <section className="resetPassword__flex">
                        <img className="successImg" src={successImg} alt="sukces" />
                        <div>
                            <h2 className="resetPassword__header">
                                Coś poszło nie tak
                            </h2>
                            <h2 className="resetPassword__header">
                                Prosimy spróbować później
                            </h2>
                        </div>
                        <a className="button button--back button--hover" href="/">
                            <img className="btn__img" src={backBtn} alt="powrot" />
                        </a>
                    </section>
                </>)}
            </section>
        </main>
        <ClubSlider />
        <Footer theme="light" />
    </div>
}

export default ResetPassword;
