import React, {useState, useEffect, useContext} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClubSlider from "../components/ClubSlider";
import nextBtn from '../static/img/dalej-btn.png'
import {setPasswordRemindToken} from "../helpers/user";
import DraftLoader from "../components/Loader";
import {isMail} from "../helpers/validation";
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const ResetPasswordEmailForm = () => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { content } = useContext(ContentContext);

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
                        {content.reset_password1}
                    </h2>
                    <h2 className="resetPassword__header">
                        {content.reset_password2}
                    </h2>
                    <h2 className="resetPassword__header">
                        {content.reset_password3}
                    </h2>

                    {!loading ? <label className="relative label--remindPassword">
                        {error ? <span className="loginBox__error">
                         {content.reset_password4}
                </span> : ""}
                        <input className="input input--remindPassword"
                               onClick={() => { setError(false); }}
                               value={email}
                               onKeyDown={(e) => { if(e.keyCode === 13) handleSubmit(e); }}
                               onChange={(e) => { setEmail(e.target.value); }}
                               placeholder={error ? "" : content.register_input1} />
                    </label> : <div className="loaderWrapper--remindPassword">
                        <DraftLoader />
                    </div> }

                    <button className="button button--resetPassword button--hover btn--gradient center goldman" onClick={(e) => { handleSubmit(e); }}>
                        Dalej
                    </button>
                </> : (success === 1 ? <>
                    <h2 className="resetPassword__header">
                        {content.reset_password5}
                    </h2>
                    <h2 className="resetPassword__header">
                        {content.reset_password6}
                    </h2>
                </> : (success === -2 ? <>
                    <h2 className="resetPassword__header">
                        {content.reset_password7}
                    </h2>
                </> : <>
                    <h2 className="resetPassword__header">
                        {content.error}
                    </h2>
                </>))}
            </section>
        </main>
        <ClubSlider />
        <Footer theme="dark" />
    </div>
}

export default ResetPasswordEmailForm;
