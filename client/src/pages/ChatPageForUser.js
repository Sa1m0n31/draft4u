import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import example from '../static/img/profile-picture.png'
import {getTrackBackground, Range} from "react-range";
import { Direction } from 'react-range';
import pictureIcon from '../static/img/picture-dark.svg'
import sendIcon from '../static/img/send-gold.svg'
import {addMessage, getChatContent, getClubMessages, getUserMessages, markAsRead} from "../helpers/chat";
import settings from "../settings";
import {getClubById, getClubData} from "../helpers/club";
import { io } from "socket.io-client";
import leftArrowWhite from '../static/img/left-arrow-white.svg'
import {getUserById, getUserData} from "../helpers/user";
import {getMessagePreview, getUniqueListBy} from "../helpers/others";

const ChatPageForUser = ({user, isLocal}) => {
    const [scrollbarList, setScrollbarList] = useState([1]);
    const [scrollbarChat, setScrollbarChat] = useState([100]);
    const [mobile, setMobile] = useState(false);
    const [max, setMax] = useState(100);
    const [maxChat, setMaxChat] = useState(100);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [currentChat, setCurrentChat] = useState([]);
    const [currentReceiver, setCurrentReceiver] = useState("");
    const [currentReceiverImg, setCurrentReceiverImg] = useState("");
    const [username, setUsername] = useState("");
    const [noMessages, setNoMessages] = useState(false);
    const [socket, setSocket] = useState(null);
    const [listenSocket, setListenSocket] = useState(null);
    const [scrollbarChatThumb, setScrollbarChatThumb] = useState(100);
    const [newMsg, setNewMsg] = useState(null);
    const [mobileCurrentChat, setMobileCurrentChat] = useState(-1);
    const [userId, setUserId] = useState("");
    const [chatInLink, setChatInLink] = useState(false);
    const [clubIdParam, setClubIdParam] = useState("");
    const [loaded, setLoaded] = useState(false);

    /* --- 1 --- */
    useEffect(() => {
        getUserData()
            .then((res) => {
                const result = res?.data?.result;
                if(result) {
                    setUserId(result.id);
                    setUsername(result.first_name + " " + result.last_name);
                }
            });

        getUserMessages()
            .then((res) => {
                const result = res?.data?.result;
                if(result?.length) {
                    setMessages(getUniqueListBy(result, 'chat_id'));
                    setCurrentReceiver(result[0].name);
                    setCurrentReceiverImg(result[0].file_path);

                    if(!chatInLink) {
                        getChatContent(result[0].chat_id)
                            .then((res) => {
                                if(res?.data?.result) {
                                    setCurrentChat(res.data.result);
                                    setLoaded(true);
                                }
                            });
                    }
                    else {
                        setLoaded(true);
                    }
                }
                else {
                    setNoMessages(true);
                    setLoaded(true);
                }
            });
    }, []);

    /* --- 2 --- */
    useEffect(() => {
        /* STYLE PART */
        const objDiv = document.querySelector(".chat__main__content");
        objDiv.scrollTop = objDiv.scrollHeight;

        const listHeight = parseInt(window.getComputedStyle(document.querySelector(".chat__list__main")).getPropertyValue('height').split('p')[0]);
        const allMessagesShorts = document.querySelectorAll(".chat__list__item");

        const allMessages = document.querySelectorAll(".chat__main__content__section");
        const allMessagesHeight = Array.from(allMessages).reduce((prev, item) => {
            return prev + parseInt(window.getComputedStyle(item).getPropertyValue('height').split("p")[0]) + 20;
        }, 0);

        const allMessagesShortsHeight = Array.from(allMessagesShorts).reduce((prev, item) => {
            return prev + parseInt(window.getComputedStyle(item).getPropertyValue('height').split('p')[0]);
        }, 0);

        if(allMessagesShortsHeight) {
            setMax(Math.max(1, allMessagesShortsHeight - listHeight));
        }

        setMaxChat(Math.max(1, allMessagesHeight - (window.innerWidth > 768 ? window.innerHeight * 0.74 : window.innerHeight * 0.60)));

        /* LOGIC PART */
        let newClubToChat;
        if(userId) {
            const params = new URLSearchParams(window.location.search);
            newClubToChat = params.get('new');
            setClubIdParam(newClubToChat);

            if(newClubToChat && !chatInLink && !currentChat) {
                getChatContent(`${newClubToChat};${userId}`)
                    .then((res) => {
                        setChatInLink(true);

                        if(res?.data?.result) {
                            setCurrentChat(res.data.result);
                            setMobileCurrentChat(res.data.result);
                        }

                        getClubById(newClubToChat)
                            .then((res) => {
                                const result = res?.data?.result;
                                if(result) {
                                    setCurrentReceiver(result.name);
                                    setCurrentReceiverImg(result.file_path);
                                }
                            });
                    });
            }
        }

        /* Socket part */
        if(currentChat.length || (newClubToChat && userId)) {
            if(socket) {
                if(socket.io.opts.query.split("&") !== `room=${currentChat?.length ? currentChat[0].chat_id.split(";")[0] : newClubToChat}`) {
                    socket.disconnect();
                    setSocket(io(`${settings.API_URL}?room=${currentChat?.length ? currentChat[0].chat_id.split(";")[0] : newClubToChat}&sender=${userId ? userId : currentChat[0].chat_id.split(";")[1]}`));
                }
            }
            else {
                setSocket(io(`${settings.API_URL}?room=${userId ? userId : currentChat[0].chat_id.split(";")[0]}&sender=${currentChat?.length ? currentChat[0].chat_id.split(";")[1] : newClubToChat}`));
            }
        }
    }, [currentChat, userId]);

    /* --- 3 --- */
    useEffect(() => {
        if(messages.length) {
            if(!listenSocket) {
                setListenSocket(io(`${settings.API_URL}?room=${messages[0].chat_id.split(";")[1]}&receiver=true`));
            }
        }

        if(currentChat.length || clubIdParam) {
            getChatContent(currentChat[0] ? currentChat[0].chat_id : `${clubIdParam};${userId}`)
                .then((res) => {
                    if(res?.data?.result) {
                        setCurrentChat(res.data.result);
                    }
                });
        }
    }, [messages]);

    /* Socket effects */
    useEffect(() => {
        if(listenSocket) {
            listenSocket.on("message", (data) => {
                /* GET NEW MESSAGE */
                updateChatList(data);
            });
        }
    }, [listenSocket]);

    useEffect(() => {
        if(socket) {
            socket.on('connect', () => {

            });

            socket.on("message", (data) => {
                // alert(data);
            });
        }
    }, [socket]);

    const getChat = (chatId, fullName, img) => {
        setCurrentReceiver(fullName);
        setCurrentReceiverImg(img);

        setChatInLink(true);

        markAsRead(chatId, 'false')
            .then((res) => {
                getUserMessages()
                    .then((res) => {
                        setMessages(getUniqueListBy(res?.data?.result, 'chat_id'));
                    });
            });

        getChatContent(chatId)
            .then((res) => {
                setMobileCurrentChat(res?.data?.result);
                setCurrentChat(res?.data?.result);
            });
    }

    const updateChatList = (newMessage) => {
        getUserMessages()
            .then((res) => {
                const result = res?.data?.result;
                if(result?.length) {
                    setMessages(getUniqueListBy(result, 'chat_id'));
                    if(newMessage) setNewMsg(newMessage);
                }
            });
    }

    const sendMessage = (chatId) => {
        const regex = /\S/g;
        if(message && message.match(regex)) {
            addMessage(chatId, message, 'false')
                .then((res) => {
                    setMessage("");
                    updateChatList(false);
                    socket.emit("message", message, (data) => {

                    });
                });
        }
    }

    useEffect(() => {
        setScrollbarChat([maxChat]);
    }, [maxChat]);

    const chatListScroll = (e) => {
        setScrollbarList([e.target.scrollTop]);
    }

    const chatMainScroll = (e) => {
        setScrollbarChat([e.target.scrollTop]);
    }

    useEffect(() => {
        document.querySelector(".chat__list__main").scrollTop = scrollbarList[0];
    }, [scrollbarList]);

    useEffect(() => {
        document.querySelector(".chat__main__content").scrollTop = scrollbarChat[0];
    }, [scrollbarChat]);

    const changeMessage = (e) => {
        if(e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            sendMessage(currentChat[0] ? currentChat[0].chat_id : `${clubIdParam};${userId}`);
        }
    }

    return <div className="container container--light">
        <Header loggedIn={true}
                player={true}
                menu="dark"
                theme="light"
                profileImage={user?.file_path}
                messageRead={messages}
                isLocal={isLocal} />

        {loaded ? <header className="chat__header siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <h1 className="chat__header__h">
                Wiadomości
            </h1>

            <header className="chat__header__user d-desktop">
                <section className="chat__main__header__section">
                    {currentReceiver ? <figure className="chat__list__item__imgWrapper">
                        <img className="chat__list__item__img" src={currentReceiverImg ? `${settings.IMAGE_URL}/image?url=/media/clubs/${currentReceiverImg}` : example} alt={currentReceiver} />
                    </figure> : ""}
                    <h3 className="chat__main__header__fullName">
                        {currentReceiver}
                    </h3>
                </section>
            </header>
        </header> : ""}
        {mobileCurrentChat !== -1 && loaded ? <header className="chat__mobileHeader d-mobile">
            <button className="chat__mobileHeader__btn" onClick={() => { setMobileCurrentChat(-1); }}>
                <img className="btn__img" src={leftArrowWhite} alt="wroc" />
            </button>
            <section className="chat__main__header__section">
                <figure className="chat__list__item__imgWrapper">
                    <img className="chat__list__item__img" src={currentReceiverImg ? `${settings.IMAGE_URL}/image?url=/media/clubs/${currentReceiverImg}` : example} alt={currentReceiver} />
                </figure>
                <h3 className="chat__main__header__fullName">
                    {currentReceiver}
                </h3>
            </section>
        </header> : ""}
        <main className="chat siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <section className={mobileCurrentChat === -1 ? "chat__list" : "chat__list d-desktop"}>
                <main className="chat__list__main" onScroll={(e) => { chatListScroll(e); }}>
                    {messages?.length ? messages.map((item, index) => {
                        return <button className={new Date(item.created_at) > new Date(item.read_at) && item.type ? "chat__list__item chat__list__item--new" : "chat__list__item"} onClick={() => { getChat(item.chat_id, item.name, item.file_path); }}>
                            <figure className="chat__list__item__imgWrapper" key={index}>
                                <img className="chat__list__item__img" src={item.file_path ? `${settings.IMAGE_URL}/image?url=/media/clubs/${item.file_path}` : example} alt={item.last_name} />
                            </figure>
                            <section className="chat__list__item__content">
                                <h4 className="chat__list__item__name">
                                    {item.name}
                                </h4>
                                <p className="chat__list__item__text">
                                    {getMessagePreview(item.content)}
                                </p>
                            </section>
                        </button>
                    }) : <h3 className="noMessages">
                        Brak wiadomości
                    </h3>}
                </main>
                <Range
                    step={1}
                    min={0}
                    max={max}
                    direction={Direction.Down}
                    values={scrollbarList}
                    onChange={(values) => {
                        setScrollbarList(values);

                    }}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: window.innerWidth > 768 ? `calc(80vh - 100px)` : `calc(60vh - 100px)`,
                                width: "10px",
                                borderRadius: '10px',
                                display: 'flex',
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: window.innerWidth > 768 ? `calc(80vh - 100px)` : `calc(60vh - 100px)`,
                                    width: '10px',
                                    borderRadius: !mobile ? '10px' : '10px',
                                    border: '1px solid #707070',
                                    background: getTrackBackground({
                                        values: scrollbarList[0] ? scrollbarList : [1000, 3000],
                                        colors: ['#ECECEC'],
                                        min: 0,
                                        max: max,
                                        rtl: false
                                    }),
                                    alignSelf: 'center'
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: !mobile ? '100px' : '100px',
                                outline: 'none',
                                width: !mobile ? '10px' : '10px',
                                borderRadius: '10px',
                                backgroundColor: '#e2b76d',
                                border: '1px solid #707070'
                            }}
                        />
                    )}
                />
            </section>
            <main className={mobileCurrentChat === -1 ? "chat__main d-desktop" : "chat__main"}>
                <main className={loaded ? "chat__main__main" : "chat__main__main opacity-0"}>
                    <main className="chat__main__content" onScroll={(e) => { chatMainScroll(e); }}>
                        {currentChat.length ? currentChat.map((item, index) => {
                            return <section className="chat__main__content__section" key={index}>
                                <div className={!item.type ? "chat__message chat__message--right" : "chat__message chat__message--left"}>
                                    <header className="chat__message__header">
                                        <h4 className="chat__message__header__name">
                                            {item.type ? currentReceiver : username}
                                        </h4>
                                        <h5 className="chat__message__header__date">
                                            <span>{item.created_at.substring(11, 16)}</span>
                                            <span>{item.created_at.substring(0, 10)}</span>
                                        </h5>
                                    </header>
                                    <span className="chat__message__content">
                                        {item.content}
                                    </span>
                                </div>
                            </section>
                        }) : (currentReceiver ? <section className="chat__main__noMessages">
                            <h3 className="chat__main__noMessages__header">
                                Nie możesz prowadzić konwersacji z tym klubem
                            </h3>
                            <p className="chat__main__noMessages__text">
                                Ten klub nie odezwał się jeszcze do Ciebie.
                            </p>
                        </section> : <section className="chat__main__noMessages">
                            <h3 className="chat__main__noMessages__header">
                                Nie posiadasz póki co żadnych wiadomości
                            </h3>
                            <p className="chat__main__noMessages__text">
                                Tutaj pojawią się Twoje wiadomości od klubów
                            </p>
                        </section>)}
                    </main>

                    {currentReceiver ? <section className="chat__main__inputWrapper">
                        <textarea className="chat__main__input"
                                  value={message}
                                  onKeyUp={(e) => { changeMessage(e); }}
                                  onChange={(e) => { setMessage(e.target.value); }}
                                  placeholder="Aa" />
                        <section className="chat__main__buttons">
                            <button className="chat__btn">
                                <img className="btn__img" src={pictureIcon} alt="wyslij-zdjecie" />
                            </button>
                            <button className="chat__btn" onClick={() => { sendMessage(currentChat[0] ? currentChat[0].chat_id : `${clubIdParam};${userId}`); }}>
                                <img className="btn__img" src={sendIcon} alt="wyslij-wiadomosc" />
                            </button>
                        </section>
                    </section> : ""}
                </main>
                {currentReceiver ? <div className="chat__list__scrollbar">
                    <Range
                        step={1}
                        min={0}
                        max={maxChat}
                        values={scrollbarChat}
                        direction={Direction.Down}
                        onChange={(values) => {
                            setScrollbarChat(values);

                        }}
                        renderTrack={({ props, children }) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                    ...props.style,
                                    height: window.innerWidth > 768 ? `calc(80vh - 100px)` : `calc(60vh - 100px)`,
                                    width: "10px",
                                    borderRadius: '10px',
                                    display: 'flex',
                                }}
                            >
                                <div
                                    ref={props.ref}
                                    style={{
                                        height: window.innerWidth > 768 ? `calc(80vh - 100px)` : `calc(60vh - 100px)`,
                                        width: '10px',
                                        borderRadius: !mobile ? '10px' : '10px',
                                        border: '1px solid #707070',
                                        background: getTrackBackground({
                                            values: scrollbarChat[0] ? scrollbarChat : [1000, 3000],
                                            colors: ['#ECECEC'],
                                            min: 0,
                                            max: maxChat,
                                            rtl: false
                                        }),
                                        alignSelf: 'center'
                                    }}
                                >
                                    {children}
                                </div>
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: `${scrollbarChatThumb}px`,
                                    outline: 'none',
                                    width: !mobile ? '10px' : '10px',
                                    borderRadius: '10px',
                                    backgroundColor: '#e2b76d',
                                    border: '1px solid #707070'
                                }}
                            />
                        )}
                    />
                </div> : ""}
            </main>
        </main>


        <Footer border={true} />
    </div>
}

export default ChatPageForUser;
