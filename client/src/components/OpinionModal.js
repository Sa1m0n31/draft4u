import React, {useState} from 'react';
import StarRatings from "react-star-ratings";
import {sendOpinion} from "../helpers/admin";
import DraftLoader from "./Loader";

const OpinionModal = ({player, club, closeModal}) => {
    const [rating, setRating] = useState(-1);
    const [content, setContent] = useState('');
    const [opinionSend, setOpinionSend] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if(rating >= 0) {
            setLoading(true);
            sendOpinion(rating, content, player, club)
                .then((res) => {
                    setOpinionSend(true);
                    setLoading(false);
                })
                .catch(() => {
                    setOpinionSend(true);
                    setLoading(false);
                });
        }
    }

    return <div className="modal modal--opinion">
        <div className="modal__inner">
            <button className="btn btn--remove btn--modalClose"
                    onClick={closeModal}>
                &times;
            </button>

            {!opinionSend ? <>
                <h3 className="modal__inner__header">
                    Jak podoba Ci się strona Draft4U?
                </h3>
                <StarRatings rating={rating}
                             changeRating={(val) => { setRating(val); }}
                             starDimension="40px"
                             starEmptyColor="#fff"
                             starRatedColor="#E2B76D"
                             starHoverColor="#F3C55F"
                             starSpacing="15px" />

                {rating !== 5 && rating !== -1 ? <textarea className="textarea textarea--opinion"
                                          placeholder="Co moglibyśmy poprawić?"
                                          value={content}
                                          onChange={(e) => { setContent(e.target.value); }} /> : ''}

                {!loading ? <button className="btn btn--gradient goldman btn--opinion"
                                    disabled={rating === -1}
                                   onClick={() => { handleSubmit(); }}>
                    Wyślij opinię
                </button> : <div className="center">
                    <DraftLoader />
                </div>}
            </> : <>
                <h3 className="modal__inner__header">
                    Dziękujemy za Twoją opinię!
                </h3>
                <button className="btn btn--gradient goldman btn--opinion"
                        onClick={closeModal}>
                    Wróć na stronę
                </button>
            </>}
        </div>
    </div>
};

export default OpinionModal;
