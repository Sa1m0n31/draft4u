import React from 'react';
import editIcon from '../static/img/pen.svg'
import trashIcon from '../static/img/trash-black.svg'
import {getDate} from "../helpers/others";

const SingleCv = ({id, title, type, from, to, description, openCvModal, deleteCvModal}) => {
    return <div className="cv">
        <div className="cv__row">
            <h4 className="cv__title">
                {title}
            </h4>
            <menu className="cv__menu">
                <button className="cv__btn" onClick={() => { openCvModal(id, type, title, from, to, description); }}>
                    <img className="btn__img" src={editIcon} alt="edytuj" />
                </button>
                <button className="cv__btn"  onClick={() => { deleteCvModal(id); }}>
                    <img className="btn__img" src={trashIcon} alt="usun" />
                </button>
            </menu>
        </div>
        <div className="cv__row">
            <h5 className="cv__date">
                {getDate(from)} - {getDate(to)}
            </h5>
        </div>
        <p className="cv__desc">
            {description}
        </p>
    </div>
};

export default SingleCv;
