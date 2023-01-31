import React, {useContext, useState, useEffect, useRef} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {ContentContext} from "../App";
import {isLoggedIn} from "../helpers/auth";
import {getClubData} from "../helpers/club";
import {getUserData} from "../helpers/user";
import profilePictureExample from '../static/img/profile.png'
import SinglePost from "../components/SinglePost";
import {addPost, getPosts} from "../helpers/post";
import EventEditionModal from "../components/EventEditionModal";
import DraftLoader from "../components/Loader";
import InfiniteScroll from 'react-infinite-scroll-component';
import {getCurrentEvents, getUserEntries} from "../helpers/event";
import settings from "../settings";
import EventInfoModal from "../components/EventInfoModal";

const Feed = () => {
    const { content } = useContext(ContentContext);

    let postContentTextarea = useRef(null);

    const [loaded, setLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isClub, setIsClub] = useState(false);
    const [isPlayer, setIsPlayer] = useState(false);
    const [user, setUser] = useState(null);
    const [club, setClub] = useState(null);
    const [eventEditionModalVisible, setEventEditionModalVisible] = useState(false);
    const [eventInfoModalId, setEventInfoModalId] = useState(0);
    const [feedItems, setFeedItems] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [postImageUrl, setPostImageUrl] = useState('');
    const [status, setStatus] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [clubEvents, setClubEvents] = useState([]);
    const [userEntries, setUserEntries] = useState([]);

    useEffect(() => {
        getCurrentEvents()
            .then((res) => {
                if(res?.data?.result) {
                    setClubEvents(res.data.result);
                }
            });

        getPosts(0)
            .then((res) => {
                if(res?.data?.result) {
                    setFeedItems(res.data.result);
                    setPage(1);
                }
            });

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

    useEffect(() => {
        if(user) {
            getUserEntries(user.id)
                .then((res) => {
                    if(res?.data?.result) {
                        setUserEntries(res.data.result.map((item) => (item.event_id)));
                    }
                });
        }
    }, [user]);

    function textAreaAdjust() {
        postContentTextarea.current.style.height = "1px";
        postContentTextarea.current.style.height = (10+postContentTextarea.current.scrollHeight)+"px";
    }

    useEffect(() => {
        if(postImage) {
            setPostImageUrl(URL.createObjectURL(postImage));
        }
    }, [postImage]);

    useEffect(() => {
        if(status === 1 && page === 0) {
            getPosts(0)
                .then((res) => {
                    if(res?.data?.result) {
                        setFeedItems(res.data.result);
                        setPage(1);
                    }
                });
        }
    }, [status, page]);

    const addNewPost = () => {
        if(postContent) {
            setLoading(true);
            addPost(user?.id, club?.club_id, postContent, postImage)
                .then((res) => {
                    if(res?.data?.result) {
                        setPostContent('');
                        setPostImage(null);
                        setPostImageUrl('');
                        setStatus(1);
                        setPage(0);
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

    const fetchFeedItems = async () => {
        if(feedItems.length) {
            const newPostsResponse = await getPosts(page);
            const newPosts = newPostsResponse.data.result;

            if(newPosts.length) {
                await setFeedItems(prevState => ([...prevState, ...newPosts]));
            }
            else {
                await setHasMore(false);
            }
            await setPage(prevState => (prevState+1));
        }
    }

    const getEventById = (id) => {
        return clubEvents.find((item) => (item.id === id));
    }

    return <div className="container container--light">
        <Header loggedIn={loggedIn} player={isPlayer} club={isClub}
                menu="dark"
                mobileBackground="black"
                profileImage={club ? club.file_path : (user ? user.file_path : null)} />

        {eventEditionModalVisible ? <EventEditionModal closeModal={() => { setEventEditionModalVisible(false); }}
                                                       clubId={club} /> : ''}

        {eventInfoModalId ? <EventInfoModal closeModal={() => { setEventInfoModalId(0); }}
                                            userId={user}
                                            entryDisabled={!userEntries.includes(eventInfoModalId)}
                                            event={getEventById(eventInfoModalId)} /> : ''}

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

                {!isClub ? <a href={!loggedIn ? "/zaloz-konto" : "/edycja-profilu"} className="btn btn--gradient goldman btn--signUpOnFeed">
                    {!loggedIn ? content.register : content.dropdown_menu_player?.split(';')[1]}
                </a> : ''}
            </div>

            <div className="feed__main w">
                {!loggedIn ? <div className="feed__main__top">
                    <h2 className="feed__main__top__header goldman">
                        Chcesz pisać posty i komentować?
                    </h2>
                    <a href="/zaloz-konto" className="btn btn--gradient goldman btn--signUpOnFeed">
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
                <InfiniteScroll
                    dataLength={feedItems?.length ? feedItems.length : 2}
                    next={fetchFeedItems}
                    hasMore={hasMore}
                    loader={<div className="center">
                        <DraftLoader />
                    </div>}
                    endMessage={<span></span>}
                >

                    {feedItems.map((item, index) => {
                        return <SinglePost key={index}
                                           user={user}
                                           club={club}
                                           loggedIn={loggedIn}
                                           post={item} />
                    })}

                </InfiniteScroll>
            </div>

            <div className="feed__right">
                <h3 className="feed__header">
                    Wydarzenia klubowe
                </h3>

                {clubEvents.map((item, index) => {
                    return <div className="feed__event"
                                key={index}>
                        <figure className="feed__event__image">
                            <img className="img" src={item.club_logo ? `${settings.IMAGE_URL}/image?url=/media/clubs/${item.club_logo}` : profilePictureExample} alt="logo" />
                        </figure>
                        <p className="feed__event__description">
                            {item.description}
                        </p>
                        {user && !userEntries.includes(item.id) ? <button className="btn btn--joinEvent btn--gradient goldman"
                                                                          onClick={() => { setEventInfoModalId(item.id); }}>
                            Dołącz
                        </button> : (user ? <button className="btn btn--joinEvent btn--gradient goldman"
                                                    onClick={() => { setEventInfoModalId(item.id); }}>
                            Szczegóły
                        </button> : '')}
                    </div>
                })}
            </div>
        </main>

        <Footer />
    </div>
};

export default Feed;
