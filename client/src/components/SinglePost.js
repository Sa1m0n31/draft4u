import React, {useState} from 'react';
import profilePictureExample from "../static/img/profile.png";
import exImage from "../static/img/polska-siatkowka.png";

const SinglePost = ({post, user, club, loggedIn}) => {
    const [comment, setComment] = useState('');

    const addComment = () => {

    }

    return <div className="feed__item">
        <div className="feed__item__header">
            <figure className="feed__item__header__image">
                <img className="img" src={profilePictureExample} alt="zdjecie-profilowe" />
            </figure>
            <div className="feed__item__header__content">
                <h4 className="feed__item__header__content__name goldman">
                    Jan Kowalski
                </h4>
                <h5 className="feed__item__header__content__date goldman">
                    2 dni
                </h5>
            </div>
        </div>

        <div className="feed__item__content">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </div>

        <div className="feed__item__image">
            <img className="img" src={exImage} alt="zdjecie-postu" />
        </div>

        {!loggedIn ? <div className="feed__addComment">
            <figure className="feed__addComment__image">
                <img className="img" src={profilePictureExample} alt="zdjecie-profilowe" />
            </figure>
            <textarea className="feed__addComment__input"
                      value={comment}
                      onChange={(e) => { setComment(e.target.value); }}
                      onKeyDown={(e) => { if(e.key === 'Enter') addComment(); }}
                      placeholder="Napisz komentarz...">

                        </textarea>
        </div> : ''}

        <div className="feed__comments">
            {[1, 2, 3].map((item, index) => {
                return <div className="feed__comments__item" key={index}>
                    <figure className="feed__addComment__image">
                        <img className="img" src={profilePictureExample} alt="zdjecie-profilowe" />
                    </figure>
                    <div className="feed__comments__item__content">
                        <h5 className="feed__comments__item__content__name goldman">
                            Jan Kowalski
                        </h5>
                        <p className="feed__comments__item__content__text">
                            Lorem ipsum dolor sit amet
                        </p>
                    </div>
                </div>
            })}
        </div>
    </div>
};

export default SinglePost;
