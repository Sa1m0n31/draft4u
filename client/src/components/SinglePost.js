import React, {useEffect, useState} from 'react';
import profilePictureExample from "../static/img/profile.png";
import exImage from "../static/img/polska-siatkowka.png";
import {getPostDate} from "../helpers/others";
import settings from "../settings";
import {addComment, updateCommentsList} from "../helpers/post";

const SinglePost = ({post, user, club, loggedIn}) => {
    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([]);

    useEffect(() => {
        if(post?.comments) {
            setCommentsList(post.comments);
        }
    }, [post]);

    const addNewComment = () => {
        addComment(post.id, user, club, comment)
            .then((res) => {
                setComment('');

                updateCommentsList(post.id)
                    .then((res) => {
                        if(res?.data?.result) {
                            setCommentsList(res.data.result);
                        }
                    });
            });
    }

    return <div className="feed__item">
        <div className="feed__item__header">
            <figure className="feed__item__header__image">
                <img className="img"
                     src={post.club_id ? `${settings.API_URL}/image?url=/media/clubs/${post.club_logo}` : `${settings.API_URL}/image?url=/media/users/${post.user_profile_image}`}
                     alt="zdjecie-profilowe" />
            </figure>
            <div className="feed__item__header__content">
                <h4 className="feed__item__header__content__name goldman">
                    {post.club_id ? post.club_name : `${post.first_name} ${post.last_name}`}
                </h4>
                <h5 className="feed__item__header__content__date goldman">
                    {getPostDate(post.date)}
                </h5>
            </div>
        </div>

        <div className="feed__item__content">
            {post.content}
        </div>

        {post.image ? <div className="feed__item__image">
            <img className="img" src={`${settings.API_URL}/image?url=/media/posts/${post.file_path}`} alt="zdjecie-postu" />
        </div> : ''}

        {loggedIn ? <div className="feed__addComment">
            <figure className="feed__addComment__image">
                <img className="img" src={profilePictureExample} alt="zdjecie-profilowe" />
            </figure>
            <textarea className="feed__addComment__input"
                      value={comment}
                      onChange={(e) => { setComment(e.target.value); }}
                      onKeyDown={(e) => { console.log(e.key); if(e.key === 'Enter') {
                          e.preventDefault();
                          e.stopPropagation();
                          addNewComment();
                      } }}
                      placeholder="Napisz komentarz...">

                        </textarea>
        </div> : ''}

        <div className="feed__comments">
            {commentsList.map((item, index) => {
                return <div className="feed__comments__item"
                            key={index}>
                    <figure className="feed__addComment__image">
                        <img className="img"
                             src={item.club_id ? `${settings.API_URL}/image?url=/media/clubs/${item.club_logo}` : `${settings.API_URL}/image?url=/media/users/${item.user_profile_image}`}
                             alt="zdjecie-profilowe" />
                    </figure>
                    <div className="feed__comments__item__content">
                        <h5 className="feed__comments__item__content__name goldman">
                            {item.club_id ? item.club_name : `${item.first_name} ${item.last_name}`}
                        </h5>
                        <p className="feed__comments__item__content__text">
                            {item.content}
                        </p>
                    </div>
                </div>
            })}
        </div>
    </div>
};

export default SinglePost;
