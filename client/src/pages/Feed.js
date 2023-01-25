import React, {useContext, useState, useEffect, useRef} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {ContentContext} from "../App";
import {isLoggedIn} from "../helpers/auth";
import {getClubData} from "../helpers/club";
import {getUserData} from "../helpers/user";
import profilePictureExample from '../static/img/profile.png'
import SinglePost from "../components/SinglePost";
import {addPost} from "../helpers/post";
import EventEditionModal from "../components/EventEditionModal";
import DraftLoader from "../components/Loader";

const Feed = () => {
    const { content } = useContext(ContentContext);

    let postContentTextarea = useRef(null);

    const [loaded, setLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true); // TODO
    const [isClub, setIsClub] = useState(true);
    const [isPlayer, setIsPlayer] = useState(false);
    const [user, setUser] = useState(null); // TODO
    const [club, setClub] = useState(5); // TODO
    const [eventEditionModalVisible, setEventEditionModalVisible] = useState(false);
    const [feedItems, setFeedItems] = useState([1, 2, 3]);
    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [postImageUrl, setPostImageUrl] = useState('');
    const [status, setStatus] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        isLoggedIn()
            .then(res => {
                if(res?.data?.result) {
                    setLoggedIn(true);
                    getClubData()
                        .then((res) => {
                            if(res?.data?.result) {
                                /* Logged as club */
                                setIsClub(true);
                                setClub(res?.data?.result);
                            }
                            else {
                                /* Logged as player */
                                setIsPlayer(true);
                                getUserData()
                                    .then((res) => {
                                        setUser(res?.data?.result);
                                    });
                            }
                        });
                }
                setLoaded(true);
            })
    },[]);

    function textAreaAdjust() {
        postContentTextarea.current.style.height = "1px";
        postContentTextarea.current.style.height = (10+postContentTextarea.current.scrollHeight)+"px";
    }

    useEffect(() => {
        if(postImage) {
            setPostImageUrl(URL.createObjectURL(postImage));
        }
    }, [postImage]);

    const addNewPost = () => {
        if(postContent) {
            setLoading(true);
            addPost(user, 'b2fea7ae-a9cf-419f-b473-1709c1d2a930', postContent, postImage)
                .then((res) => {
                    if(res?.data?.result) {
                        setPostContent('');
                        setPostImage(null);
                        setPostImageUrl('');
                        setStatus(1);
                    }
                    else {
                        setStatus(-1);
                    }
                })
                .catch((e) => {
                    setStatus(-1);
                });
        }
    }

    useEffect(() => {
        if(status !== 0) {
            setLoading(false);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            setTimeout(() => {
                setStatus(0);
            }, 3000);
        }
    }, [status]);

    return <div className="container container--light">
        <Header loggedIn={loggedIn} player={isPlayer} club={isClub}
                menu="dark"
                mobileBackground="black"
                profileImage={club ? club.file_path : (user ? user.file_path : null)} />

        {eventEditionModalVisible ? <EventEditionModal closeModal={() => { setEventEditionModalVisible(false); }} /> : ''}

        <main className="feed">
            <div className="feed__left">
                <h1 className="feed__header">
                    Witaj
                </h1>
                <p className="feed__left__text goldman">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                </p>

                <a href="/rejestracja" className="btn btn--gradient goldman btn--signUpOnFeed">
                    {content.register}
                </a>
            </div>

            <div className="feed__main w">
                {!loggedIn ? <div className="feed__main__top">
                    <h2 className="feed__main__top__header goldman">
                        Chcesz pisać posty i komentować?
                    </h2>
                    <a href="/rejestracja" className="btn btn--gradient goldman btn--signUpOnFeed">
                        {content.register}
                    </a>
                </div> : <div className="feed__main__top feed__main__top--add">
                    <figure className="feed__addComment__image feed__addComment__image--main">
                        <img className="img" src={profilePictureExample} alt="zdjecie-profilowe" />
                    </figure>
                    <textarea className="feed__addComment__input noscroll"
                              value={postContent}
                              ref={postContentTextarea}
                              onChange={(e) => { setPostContent(e.target.value); }}
                              onKeyUp={(e) => { textAreaAdjust(); }}
                              placeholder="Co u Ciebie?">

                        </textarea>

                    {postImageUrl ? <figure className="feed__main__top__image">
                        <button className="btn btn--remove" onClick={() => { setPostImageUrl(''); setPostImage(null); }}>
                            &times;
                        </button>
                        <img className="img" src={postImageUrl} alt="zdjecie-postu" />
                    </figure> : <div className="feed__main__top__options">
                        <div className="imageInputWrapper">
                            <label htmlFor="postImage" className="btn--feedTopOption">Zdjęcie</label>
                            <input id="postImage"
                                   onChange={(e) => { setPostImage(e.target.files[0]); }}
                                   placeholder="Zdjęcie"
                                   type="file" />
                        </div>

                        {isClub ? <>
                            <span className="divider">

                            </span>
                            <button className="btn--feedTopOption"
                                    onClick={() => { setEventEditionModalVisible(true); }}>
                                Wydarzenie
                            </button>
                        </>: ''}
                    </div>}

                    {loading ? <div className="center">
                        <DraftLoader />
                    </div> : (!status ? <button className="btn btn--addPost btn--gradient goldman"
                                                onClick={() => { addNewPost(); }}>
                        Dodaj post
                    </button> : (status === 1 ? <span className="addPostInfo goldman addPostInfo--positive">
                        Twój post został dodany!
                    </span> :  <span className="addPostInfo goldman addPostInfo--negative">
                        Coś poszło nie tak... Prosimy spróbować później
                    </span>))}
                </div>}

                {/* ACTUAL FEED */}
                {feedItems.map((item, index) => {
                    return <SinglePost key={index}
                                       user={user}
                                       club={club}
                                       loggedIn={loggedIn}
                                       post={item} />
                })}
            </div>

            <div className="feed__right">
                <h3 className="feed__header">
                    Wydarzenia klubowe
                </h3>

                {[1, 2, 3].map((item, index) => {
                    return <div className="feed__event" key={index}>
                        <figure className="feed__event__image">
                            <img className="img" src={profilePictureExample} alt="logo" />
                        </figure>
                        <p className="feed__event__description">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labo
                        </p>
                        <button className="btn btn--joinEvent btn--gradient goldman">
                            Dołącz
                        </button>
                    </div>
                })}
            </div>
        </main>

        <Footer />
    </div>
};

export default Feed;
