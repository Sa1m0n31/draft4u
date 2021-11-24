import React, {useState} from 'react'
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";
import {isPasswordStrength} from "../helpers/validation";
import {changeUserPassword} from "../helpers/user";
import {changeClubPassword} from "../helpers/club";
import nextBtn from "../static/img/dalej-btn.png";
import successImg from "../static/img/success.svg";
import backBtn from "../static/img/powrot-btn.png";
import errorImg from "../static/img/failure.svg";
import {changeAdminPassword} from "../helpers/admin";

const AdminChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");
    const [error3, setError3] = useState("");
    const [success, setSuccess] = useState(-1);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!oldPassword) {
            setError1("Wpisz swoje stare hasło");
            setOldPassword("");
            return 0;
        }
        if(!isPasswordStrength(password)) {
            setError2("Hasło musi zawierać co najmniej 8 znaków, jedną wielką literę i jedną cyfrę");
            setPassword("");
            return 0;
        }
        if(password !== repeatPassword) {
            setError3("Podane hasła nie są identyczne");
            setRepeatPassword("");
            return 0;
        }

        changeAdminPassword(oldPassword, password)
            .then((res) => {
                setSuccess(res?.data?.result);
            });
    }

    return <div className="container container--dark container--admin">
        <AdminTop />

        <main className="admin">
            <PanelMenu menuOpen={5} />
            <main className="admin__main">
                <main className="changePassword">
                    <section className="resetPassword resetPassword--newPassword">
                        {success === -1 ? <>
                            <h2 className="resetPassword__header">
                                Wpisz swoje aktualne hasło oraz wprowadź dwukrotnie nowe
                            </h2>
                            <label className="relative">
                                {error1 !== "" ? <span className="loginBox__error">
                        {error1}
                </span> : ""}
                                <input className="input"
                                       type="password"
                                       name="oldPassword"
                                       onClick={() => { setError1(""); }}
                                       value={oldPassword}
                                       onChange={(e) => { setOldPassword(e.target.value); }}
                                       placeholder={error1 ? "" : "Aktualne hasło"} />
                            </label>
                            <label className="relative">
                                {error2 !== "" ? <span className="loginBox__error">
                        {error2}
                </span> : ""}
                                <input className="input"
                                       type="password"
                                       name="password"
                                       onClick={() => { setError2(""); }}
                                       value={password}
                                       onChange={(e) => { setPassword(e.target.value); }}
                                       placeholder={error2 ? "" : "Nowe hasło"} />
                            </label>
                            <label className="relative">
                                {error3 !== "" ? <span className="loginBox__error">
                        {error3}
                </span> : ""}
                                <input className="input"
                                       type="password"
                                       name="repeatPassword"
                                       onClick={() => { setError3(""); }}
                                       value={repeatPassword}
                                       onChange={(e) => { setRepeatPassword(e.target.value); }}
                                       placeholder={error3 ? "" : "Powtórz hasło"} />
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
                        </> : (success === -2 ? <>
                            <section className="resetPassword__flex">
                                <img className="successImg" src={errorImg} alt="porazka" />
                                <div>
                                    <h2 className="resetPassword__header">
                                        Niepoprawne aktualne hasło
                                    </h2>
                                    <h2 className="resetPassword__header">
                                        Prosimy spróbować później
                                    </h2>
                                </div>
                                <a className="button button--back button--hover" href="/">
                                    <img className="btn__img" src={backBtn} alt="powrot" />
                                </a>
                            </section>
                        </> : <>
                            <section className="resetPassword__flex">
                                <img className="successImg" src={errorImg} alt="sukces" />
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
                        </>))}
                    </section>
                </main>
            </main>
        </main>
    </div>
}

export default AdminChangePassword;
