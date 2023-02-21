import React, {useEffect, useState} from 'react';
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";
import {deleteEvent, getCurrentEvents, getUserEntries} from "../helpers/event";
import {addPost, deletePost, getPosts} from "../helpers/post";
import {isLoggedIn} from "../helpers/auth";
import {getClubData} from "../helpers/club";
import {getUserData} from "../helpers/user";
import DraftLoader from "../components/Loader";
import SinglePost from "../components/SinglePost";
import trashIcon from '../static/img/trash-black.svg';
import InfiniteScroll from "react-infinite-scroll-component";
import settings from "../settings";
import profilePictureExample from "../static/img/profile.png";
import {addTrailingZero, convertStringToURL} from "../helpers/others";

const AdminFeed = () => {
    const [deleteResult, setDeleteResult] = useState(0);
    const [clubEvents, setClubEvents] = useState([]);
    const [feedItems, setFeedItems] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [currentFeed, setCurrentFeed] = useState(0);

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
    },[]);

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

    const deletePostById = (id) => {
        if(window.confirm("Czy na pewno chcesz usunąć ten post?")) {
            deletePost(id)
                .then((res) => {
                    if(res?.data?.result === 1) {
                        alert("Post został usunięty");
                        window.location.reload();
                    }
                });
        }
    }

    const deleteEventById = (id) => {
        if(window.confirm("Czy na pewno chcesz usunąć to wydarzenie?")) {
            deleteEvent(id)
                .then((res) => {
                    if(res?.data?.result === 1) {
                        alert("Wydarzenie zostało usunięte");
                        window.location.reload();
                    }
                });
        }
    }

    const convertDateToString = (date) => {
        if(date instanceof Date) {
            return `${addTrailingZero(date.getDate())}.${addTrailingZero(date.getMonth()+1)}.${date.getFullYear()}`;
        }
        const newDate = new Date(date);
        if(newDate instanceof Date) {
            return `${addTrailingZero(newDate.getDate())}.${addTrailingZero(newDate.getMonth()+1)}.${newDate.getFullYear()}`;
        }
        return '';
    }

    return <div className="container container--dark container--admin">
        <AdminTop />
        <main className="admin">
            <PanelMenu menuOpen={2} />
            <main className="admin__main">
                <header className="admin__flex">
                    <h1 className="admin__main__header">
                        Feed
                    </h1>
                    {deleteResult ? <span className="admin__status">
                        {deleteResult === 1 ? <span className="admin__status__inner admin__status--success">
                            Post został usunięty
                        </span> : <span className="admin__status__inner admin__status--error">
                            Coś poszło nie tak... Skontaktuj się z administratorem systemu
                        </span>}
                    </span> : ""}
                </header>

                <div className="adminFeed__options">
                    <button className={currentFeed === 0 ? "btn btn--adminFeed btn--adminFeed--selected" : "btn btn--adminFeed" }
                            onClick={() => { setCurrentFeed(0); }}>
                        Posty
                    </button>
                    <button className={currentFeed === 1 ? "btn btn--adminFeed btn--adminFeed--selected" : "btn btn--adminFeed" }
                            onClick={() => { setCurrentFeed(1); }}>
                        Wydarzenia klubów
                    </button>
                </div>

                <main className="admin__flex">
                    <div className="adminFeed">
                        {currentFeed === 0 ? <InfiniteScroll
                            dataLength={feedItems?.length ? feedItems.length : 2}
                            next={fetchFeedItems}
                            hasMore={hasMore}
                            loader={<div className="center">
                                <DraftLoader />
                            </div>}
                            endMessage={<span></span>}
                        >

                            {feedItems.map((item, index) => {
                                return <div className="adminFeed__item">
                                    <button className="trashBtn" onClick={() => { deletePostById(item.id); }}>
                                        <img className="img" src={trashIcon} alt="usuń" />
                                    </button>

                                    <SinglePost key={index}
                                                admin={true}
                                                loggedIn={false}
                                                post={item} />
                                </div>
                            })}

                        </InfiniteScroll> : <div>
                            {clubEvents.map((item, index) => {
                                return <div className="feed__event feed__event--admin"
                                            key={index}>
                                    <button className="trashBtn" onClick={() => { deleteEventById(item.id); }}>
                                        <img className="img" src={trashIcon} alt="usuń" />
                                    </button>

                                    <figure className="feed__event__image">
                                        <img className="img" src={item.club_logo ? `${settings.IMAGE_URL}/image?url=/media/clubs/${item.club_logo}` : profilePictureExample} alt="logo" />
                                    </figure>
                                    <p className="feed__event__description">
                                        <b>Opis:</b> {item.description}
                                    </p>
                                    <p className="feed__event__description">
                                        <b>Zapisy do:</b> {convertDateToString(item.expire_date)}
                                    </p>
                                    <p className="feed__event__description">
                                        <b>Data: </b> {convertDateToString(item.event_date)}
                                    </p>
                                </div>
                            })}
                        </div>}
                    </div>
                </main>
            </main>
        </main>
    </div>
};

export default AdminFeed;
