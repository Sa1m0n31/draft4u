import React, {useContext, useRef} from 'react';
import {ContentContext} from "../App";

const ChooseAccountType = ({chooseAccountType, thirdParty}) => {
    const { content, language } = useContext(ContentContext);

    let registerModal = useRef(null);

    const closeModal = () => {
        document.querySelector(".chooseAccountTypeModal").style.display = "none";
    }

    return <main className={thirdParty ? "registerModal__inner registerModal__inner--narrow" : "registerModal__inner"} ref={registerModal}>
        <button className="btn btn--remove btn--modalClose"
                onClick={() => { window.location.href = '/'; }}>
            &times;
        </button>

        <h3 className="registerModal__header">
            {content.register_header}
        </h3>

        <div className="registerModal__step0">
            <div className="registerModal__step0__buttons d-flex">
                <button className="registerModal__step0__btn goldman" onClick={() => { chooseAccountType(0); closeModal(); }}>
                    {language === 'pl' ? 'Strefa zawodnika' : 'Player zone'}
                </button>
                <button className="registerModal__step0__btn goldman" onClick={() => { chooseAccountType(1); closeModal(); }}>
                    {language === 'pl' ? 'Strefa asystenta' : 'Staff zone'}
                </button>
                {!thirdParty ? <button className="registerModal__step0__btn goldman" onClick={() => { chooseAccountType(2); closeModal(); }}>
                    {language === 'pl' ? 'Strefa klubu' : 'Club zone'}
                </button> : ''}
            </div>
        </div>

    </main>
};

export default ChooseAccountType;
