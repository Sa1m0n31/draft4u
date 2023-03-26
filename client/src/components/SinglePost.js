import React, {useContext, useEffect, useRef, useState} from 'react';
import profilePictureExample from "../static/img/profile.png";
import {getPostDate} from "../helpers/others";
import settings from "../settings";
import {addComment, deletePost, updateCommentsList, updatePost} from "../helpers/post";
import exampleProfileImage from '../static/img/profile-picture.png';
import penIcon from '../static/img/pen-white.png';
import deleteIcon from '../static/img/trash-black.svg';
import {ContentContext} from "../App";

const SinglePost = ({post, user, club, loggedIn}) => {
    const { language } = useContext(ContentContext);

    let postContentTextarea = useRef(null);

    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([]);
    const [allCommentsVisible, setAllCommentsVisible] = useState(false);
    const [isMyPost, setIsMyPost] = useState(false);
    const [postDelete, setPostDelete] = useState(false);

    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [postImageUrl, setPostImageUrl] = useState('');
    const [updateMode, setUpdateMode] = useState(false);
    const [deleteImage, setDeleteImage] = useState(false);
    const [profilePicture, setProfilePicture] = useState(profilePictureExample);

    useEffect(() => {
        if(post) {
            if(club?.identity === post.club_id) {
                setIsMyPost(true);
            }
        }
    }, [club, post]);

    useEffect(() => {
        if(post) {
            if(user?.id === post.user_id) {
                setIsMyPost(true);
            }
        }
    }, [user, post]);

    useEffect(() => {
        if(post?.comments) {
            setCommentsList(post.comments);
        }
    }, [post]);

    useEffect(() => {
        if(updateMode) {
            setPostContent(post.content);
            if(post?.file_path) {
                setPostImageUrl(`${settings.API_URL}/image?url=/media/posts/${post.file_path}`);
            }
        }
    }, [updateMode]);

    useEffect(() => {
        if(postDelete) {
            if(window.confirm(language === 'pl' ? "Czy na pewno chcesz usunąć ten post?" : 'Are you sure you want to delete that post?')) {
                deletePost(post.id)
                    .then(() => {
                        window.location.reload();
                    });
            }
        }
    }, [postDelete]);

    useEffect(() => {
        if(postImage) {
            setDeleteImage(false);
            setPostImageUrl(URL.createObjectURL(postImage));
        }
    }, [postImage]);

    useEffect(() => {
        if(club) {
            if(club.file_path) {
                setProfilePicture(`${settings.IMAGE_URL}/image?url=/media/clubs/${club.file_path}`);
            }
        }

        if(user) {
            if(user.file_path) {
                setProfilePicture(`${settings.IMAGE_URL}/image?url=/media/users/${user.file_path}`);
            }
        }
    }, [club, user]);

    const addNewComment = () => {
        addComment(post.id, user?.id, club?.id, comment)
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

    const addLinks = (input) => {
        const linkMatcher = /http(s)?:\/\/\S+/g;

        return input.replace(linkMatcher, function(match) {
            return '<a href="' + match + '" target="_blank">' + match + '</a>';
        });
    }

    const updatePostById = () => {
        updatePost(postContent, postImage, post.id, deleteImage)
            .then((res) => {
                window.location.reload();
            })
            .catch(() => {
                alert('Coś poszło nie tak... Prosimy spróbować później');
            });
    }

    function textAreaAdjust() {
        postContentTextarea.current.style.height = "1px";
        postContentTextarea.current.style.height = (10+postContentTextarea.current.scrollHeight)+"px";
    }

    return <div className={commentsList.length ? "feed__item" : "feed__item feed__item--noComments"}>
        <div className="feed__item__headerWrapper">
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

            {isMyPost ? <div className="myPostEdition">
                {!updateMode ? <button className="myPostEdition__btn"
                                       onClick={() => { setUpdateMode(true); }}>
                    <img className="img" src={penIcon} alt="edytuj" />
                </button> : <button className="myPostEdition__btn myPostEdition__btn--postEdition"
                                    onClick={() => { updatePostById(); }}>
                    {language === 'pl' ? 'Zapisz' : 'Save'}
                </button>}
                <button className="myPostEdition__btn myPostEdition__btn--delete"
                        onClick={() => { setPostDelete(true); }}>
                    <img className="img" src={deleteIcon} alt="usuń" />
                </button>
            </div> : ''}
        </div>

        {!updateMode ? <div className="feed__item__content" dangerouslySetInnerHTML={{
            __html: addLinks(post.content)
        }}>

        </div> : <textarea className="feed__addComment__input feed__addComment__input--edit noscroll"
                           value={postContent}
                           ref={postContentTextarea}
                           onChange={(e) => { setPostContent(e.target.value); }}
                           onKeyUp={(e) => { textAreaAdjust(); }}
                           placeholder={language === 'pl' ? "Co u Ciebie?" : "How are you?"}>

                        </textarea>}

        {!updateMode && post?.image ? <div className="feed__item__image feed__item__image--edit">
            <img className="img" src={`${settings.API_URL}/image?url=/media/posts/${post.file_path}`} alt="zdjecie-postu" />
        </div> : updateMode ? (postImageUrl ? <figure className="feed__main__top__image feed__item__image--edit">
            <button className="btn btn--remove" onClick={() => { setPostImageUrl('');
            setDeleteImage(true);
            setPostImage(null); }}>
                &times;
            </button>
            <img className="img" src={postImageUrl} alt="zdjecie-postu" />
        </figure> : <div className="feed__main__top__options">
            <div className="imageInputWrapper">
                <label htmlFor="postImageEdit" className="btn--feedTopOption">Zdjęcie</label>
                <input id="postImageEdit"
                       onChange={(e) => { setPostImage(e.target.files[0]); }}
                       placeholder="Zdjęcie"
                       type="file" />
            </div>
        </div>) : ''}

        {loggedIn ? <div className="feed__addComment">
            <figure className="feed__addComment__image">
                <img className="img" src={profilePicture} alt="zdjecie-profilowe" />
            </figure>
            <textarea className="feed__addComment__input"
                      value={comment}
                      onChange={(e) => { setComment(e.target.value); }}
                      onKeyDown={(e) => { if(e.key === 'Enter') {
                          e.preventDefault();
                          e.stopPropagation();
                          addNewComment();
                      } }}
                      placeholder={language === 'pl' ? "Napisz komentarz..." : "Add comment..."}>

                        </textarea>
        </div> : ''}

        {commentsList?.length ? <div className="feed__comments">
            <button className="feed__comments__btn" onClick={() => { setAllCommentsVisible(p => !p); }}>
                {commentsList.length} {language === 'pl' ? 'Komentarzy' : 'Comments'}
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
                            <p className="feed__comments__item__content__text" dangerouslySetInnerHTML={{
                                __html: addLinks(item.content)
                            }}>

                            </p>
                        </div>
                    </div>
                }
            })}
        </div> : ''}
    </div>
};

export default SinglePost;
