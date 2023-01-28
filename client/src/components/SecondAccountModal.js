import React, {useContext} from 'react';
import closeIcon from "../static/img/close-grey.svg";
import successIcon from "../static/img/success.svg";
import {getImageUrl} from "../helpers/others";
import {ContentContext, StuffContext} from "../App";
import {getSecondAccountData} from "../helpers/user";
import {autoLogin} from "../helpers/auth";

const SecondAccountModal = ({mobile}) => {
    const { content } = useContext(ContentContext);
    const { isStuff } = useContext(StuffContext);

    const switchAccounts = () => {
        getSecondAccountData()
            .then((res) => {
                const result = res?.data?.result;
                if(result) {
                    const { id, user_id } = result;
                    autoLogin(user_id, id)
                        .then((res) => {
                            window.location = '/rozpocznij';
                        });
                }
            });
    }

    return <div className="registerModal registerModal--accountType">
        <main className="registerModal__inner">
            <button className={mobile ? "d-none" : "registerModal__closeBtn"} onClick={() => { switchAccounts(); }}>
                <img className="registerModal__closeBtn__img" src={closeIcon} alt="zamknij" />
            </button>
            <section className="registerResult">
                <img className="registerResult__img" src={successIcon} alt="sukces" />
                <h4 className="registerResult__header">
                    {isStuff ? content.after_add_account_type_staff : content.after_add_account_type_user}
                </h4>

                <button className="registerForm--nextBtn btn--black button--back btn--gradient goldman center registerForm--nextBtn--login" onClick={() => { switchAccounts(); }}>
                    Dalej
                </button>
            </section>
        </main>
    </div>
};

export default SecondAccountModal;
