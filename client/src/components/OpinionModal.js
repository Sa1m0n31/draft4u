import React, {useContext, useState} from 'react';
import StarRatings from "react-star-ratings";
import {sendOpinion} from "../helpers/admin";
import DraftLoader from "./Loader";
import {ContentContext} from "../App";

const OpinionModal = ({player, club, closeModal}) => {
    const { language } = useContext(ContentContext);

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
                    {language === 'pl' ? 'Jak podoba Ci się strona Draft4U?' : 'How do you like Draft4U?'}
                </h3>
                <StarRatings rating={rating}
                             changeRating={(val) => { setRating(val); }}
                             starDimension="40px"
                             starEmptyColor="#fff"
                             starRatedColor="#E2B76D"
                             starHoverColor="#F3C55F"
                             starSpacing="15px" />

                {rating !== 5 && rating !== -1 ? <textarea className="textarea textarea--opinion"
                                          placeholder={language === 'pl' ? "Co moglibyśmy poprawić?" : 'What could we do better?'}
                                          value={content}
                                          onChange={(e) => { setContent(e.target.value); }} /> : ''}

                {!loading ? <button className="btn btn--gradient goldman btn--opinion"
                                    disabled={rating === -1}
                                   onClick={() => { handleSubmit(); }}>
                    {language === 'pl' ? 'Wyślij opinię' : 'Send opinion'}
                </button> : <div className="center">
                    <DraftLoader />
                </div>}
            </> : <>
                <h3 className="modal__inner__header">
                    {language === 'pl' ? 'Dziękujemy za Twoją opinię!' : 'Thanks for your opinion!'}
                </h3>
                <button className="btn btn--gradient goldman btn--opinion"
                        onClick={closeModal}>
                    {language === 'pl' ? 'Wróć na stronę' : 'Back to homepage'}
                </button>
            </>}
        </div>
    </div>
};

export default OpinionModal;
