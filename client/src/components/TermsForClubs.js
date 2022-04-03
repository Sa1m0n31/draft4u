import React, {useContext, useEffect, useState} from 'react'
import {ContentContext} from "../App";
import {stateToHTML} from "draft-js-export-html";
import {convertFromRaw} from "draft-js";
import {activateClub} from "../helpers/club";
import {logoutUser} from "../helpers/auth";
import btn1 from '../static/img/akceptuje.jpg'
import btn2 from '../static/img/nie-akceptuje.jpg'
import btn1English from '../static/img/accept.jpg'
import btn2English from '../static/img/decline.jpg'

const TermsForClubs = ({club}) => {
    const { content } = useContext(ContentContext);

    const [main, setMain] = useState(null);

    useEffect(() => {
        if(content) {
            setMain(stateToHTML((convertFromRaw(JSON.parse(content.terms_of_service)))))
        }
    }, [content]);

    const accept = () => {
        activateClub(club.id)
            .then((res) => {
                if(res) {
                    window.location = '/';
                }
                else {
                    reject();
                }
            })
    }

    const reject = () => {
        logoutUser()
            .then((res) => {
                if(res?.data?.result) {
                    window.location = '/';
                }
            });
    }

    return <div className="termsForClubs">
        <div className="termsForClubs__inner">
            <article className="scroller" dangerouslySetInnerHTML={{__html: main}}>
                {/* TERMS OF SERVICE */}
            </article>
            <div className="termsForClubs__buttons">
                <button className="termsForClubs__btn" onClick={() => { reject(); }}>
                    <img className="btn__img" src={btn2} alt="odrzuc" />
                </button>
                <button className="termsForClubs__btn" onClick={() => { accept(); }}>
                    <img className="btn__img" src={btn1} alt="akceptuj" />
                </button>
            </div>
        </div>
    </div>
}

export default TermsForClubs;
