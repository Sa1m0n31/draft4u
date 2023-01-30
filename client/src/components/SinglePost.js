import React, {useEffect, useState} from 'react';
import profilePictureExample from "../static/img/profile.png";
import {getPostDate} from "../helpers/others";
import settings from "../settings";
import {addComment, updateCommentsList} from "../helpers/post";
import exampleProfileImage from '../static/img/profile-picture.png';

const SinglePost = ({post, user, club, loggedIn}) => {
    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([]);
    const [allCommentsVisible, setAllCommentsVisible] = useState(false);

    useEffect(() => {
        if(post?.comments) {
            setCommentsList(post.comments);
        }
    }, [post]);

    const addNewComment = () => {
        addComment(post.id, user?.id, club?.club_id, comment)
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

    return <div className={commentsList.length ? "feed__item" : "feed__item feed__item--noComments"}>
        <div className="feed__item__header">
            {post?.club_id ? <figure className="feed__item__header__image">
                <img className="img"
                     src={post.club_logo ? `${settings.IMAGE_URL}/image?url=/media/clubs/${post.club_logo}` : exampleProfileImage}
                     alt="zdjecie-profilowe" />
            </figure> : <a className="feed__item__header__image" href={club ? `/profil-zawodnika?id=${post.user_id}` : `/informacje-o-zawodniku?id=${post.user_id}`}>
                <img className="img"
                     src={post.user_profile_image ? `${settings.IMAGE_URL}/image?url=/media/users/${post.user_profile_image}` : exampleProfileImage}
                     alt="zdjecie-profilowe" />
            </a>}
            <div className="feed__item__header__content">
                {post?.club_id ? <h4 className="feed__item__header__content__name goldman">
                    {post.club_name}
                </h4> : <a className="feed__item__header__content__name goldman"
                           href={club ? `/profil-zawodnika?id=${post.user_id}` : `/informacje-o-zawodniku?id=${post.user_id}`}>
                    {`${post.first_name} ${post.last_name}`}
                </a>}
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
                      onKeyDown={(e) => { if(e.key === 'Enter') {
                          e.preventDefault();
                          e.stopPropagation();
                          addNewComment();
                      } }}
                      placeholder="Napisz komentarz...">

                        </textarea>
        </div> : ''}

        {commentsList?.length ? <div className="feed__comments">
            <button className="feed__comments__btn" onClick={() => { setAllCommentsVisible(p => !p); }}>
                {commentsList.length} komentarzy
            </button>

            {commentsList.map((item, index) => {
                if(allCommentsVisible || index < 3) {
                    return <div className="feed__comments__item"
                                key={index}>
                        <figure className="feed__addComment__image">
                            <img className="img"
                                 src={item.club_id ? (item.club_logo ? `${settings.IMAGE_URL}/image?url=/media/clubs/${item.club_logo}` : exampleProfileImage) :
                                     (item.user_profile_image ? `${settings.IMAGE_URL}/image?url=/media/users/${item.user_profile_image}` : exampleProfileImage)}
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
                }
            })}
        </div> : ''}
    </div>
};

export default SinglePost;
