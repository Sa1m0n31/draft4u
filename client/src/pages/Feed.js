import React, {useContext, useState, useEffect} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {ContentContext} from "../App";
import {isLoggedIn} from "../helpers/auth";
import {getClubData} from "../helpers/club";
import {getUserData} from "../helpers/user";
import profilePictureExample from '../static/img/profile.png'
import exImage from '../static/img/polska-siatkowka.png'
import SinglePost from "../components/SinglePost";

const Feed = () => {
    const { content } = useContext(ContentContext);

    const [loaded, setLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isClub, setIsClub] = useState(false);
    const [isPlayer, setIsPlayer] = useState(false);
    const [user, setUser] = useState(null);
    const [club, setClub] = useState(null);

    const [feedItems, setFeedItems] = useState([1, 2, 3]);

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

    const openEventInfoModal = (id) => {

    }

    return <div className="container container--light">
        <Header loggedIn={loggedIn} player={isPlayer} club={isClub}
                menu="dark"
                mobileBackground="black"
                profileImage={club ? club.file_path : (user ? user.file_path : null)} />

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
                </div> : ''}

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
