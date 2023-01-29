import React, {useContext, useRef} from 'react';
import closeIcon from "../static/img/close-grey.svg";
import {getImageUrl} from "../helpers/others";
import {ContentContext} from "../App";

const ChooseAccountType = ({chooseAccountType}) => {
    const { content } = useContext(ContentContext);

    let registerModal = useRef(null);

    const closeModal = () => {
        document.querySelector(".chooseAccountTypeModal").style.display = "none";
    }

    return <main className="registerModal__inner" ref={registerModal}>
        <h3 className="registerModal__header">
            {content.register_header}
        </h3>

        <div className="registerModal__step0">
            <div className="registerModal__step0__buttons d-flex">
                <button className="registerModal__step0__btn goldman" onClick={() => { chooseAccountType(0); closeModal(); }}>
                    Strefa zawodnika
                </button>
                <button className="registerModal__step0__btn goldman" onClick={() => { chooseAccountType(1); closeModal(); }}>
                    Strefa asystenta
                </button>
                <button className="registerModal__step0__btn goldman" onClick={() => { chooseAccountType(2); closeModal(); }}>
                    Strefa klubu
                </button>
            </div>
        </div>

    </main>
};

export default ChooseAccountType;
