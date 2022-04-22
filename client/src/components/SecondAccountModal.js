import React, {useContext} from 'react';
import closeIcon from "../static/img/close-grey.svg";
import successIcon from "../static/img/success.svg";
import {getImageUrl} from "../helpers/others";
import {ContentContext, StuffContext} from "../App";

const SecondAccountModal = ({mobile}) => {
    const { content } = useContext(ContentContext);
    const { isStuff } = useContext(StuffContext);

    return <div className="registerModal registerModal--accountType">
        <main className="registerModal__inner">
            <button className={mobile ? "d-none" : "registerModal__closeBtn"} onClick={() => { window.location = '/rozpocznij'; }}>
                <img className="registerModal__closeBtn__img" src={closeIcon} alt="zamknij" />
            </button>
            <section className="registerResult">
                <img className="registerResult__img" src={successIcon} alt="sukces" />
                <h4 className="registerResult__header">
                    {isStuff ? content.after_add_account_type_staff : content.after_add_account_type_user}
                </h4>

                <button className="registerForm--nextBtn registerForm--nextBtn--login" onClick={() => { window.location = '/rozpocznij'; }}>
                    <img className="registerForm--nextBtn__img" src={getImageUrl(content.img12)} alt="dalej" />
                </button>
            </section>
        </main>
    </div>
};

export default SecondAccountModal;
