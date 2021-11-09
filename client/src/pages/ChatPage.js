import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import example from '../static/img/profile-picture.png'
import {getTrackBackground, Range} from "react-range";
import { Direction } from 'react-range';
import pictureIcon from '../static/img/picture.svg'
import sendIcon from '../static/img/send.svg'
import {addMessage, getChatContent, getClubMessages, markAsRead} from "../helpers/chat";
import settings from "../settings";
import {getClubData} from "../helpers/club";
import { io } from "socket.io-client";
import leftArrowWhite from '../static/img/left-arrow-white.svg'

const ChatPage = ({club}) => {
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
    const [clubName, setClubName] = useState("");
    const [noMessages, setNoMessages] = useState(false);
    const [socket, setSocket] = useState(null);
    const [listenSocket, setListenSocket] = useState(null);
    const [scrollbarChatThumb, setScrollbarChatThumb] = useState(100);
    const [newMsg, setNewMsg] = useState(null);
    const [mobileCurrentChat, setMobileCurrentChat] = useState(-1);

    const updateChat = (newMessage) => {
        getClubMessages()
            .then((res) => {
                const result = res?.data?.result;
                if(result?.length) {
                    setMessages(result);
                    if(newMessage) setNewMsg(newMessage);
                }
            });
    }

    useEffect(() => {
        console.log(messages);
    }, [messages]);

    useEffect(() => {
        if(messages.length) {
            if(!listenSocket) {
                setListenSocket(io(`http://localhost:3001?room=${messages[0].chat_id.split(";")[0]}&receiver=true`))
            }
        }

        if(currentChat.length) {
            getChatContent(currentChat[0].chat_id)
                .then((res) => {
                    if(res?.data?.result) setCurrentChat(res.data.result);
                });
        }
    }, [messages]);

    useEffect(() => {
        if(listenSocket) {
            listenSocket.on("message", (data) => {
                /* GET NEW MESSAGE */
                updateChat(data);
            });
        }
    }, [listenSocket]);

    useEffect(() => {
        if(socket) {
            socket.on('connect', () => {
                //console.log("connect");
            });

            socket.on("message", (data) => {
                alert(data);
            });
        }
    }, [socket]);

    useEffect(() => {
       if(currentChat.length) {
           if(socket) {
               if(socket.io.opts.query.split("&") !== `room=${currentChat[0].chat_id.split(";")[1]}`) {
                   socket.disconnect();
                   setSocket(io(`http://localhost:3001?room=${currentChat[0].chat_id.split(";")[1]}&sender=${currentChat[0].chat_id.split(";")[0]}`));
               }
           }
           else {
               setSocket(io(`http://localhost:3001?room=${currentChat[0].chat_id.split(";")[1]}&sender=${currentChat[0].chat_id.split(";")[0]}`));
           }
       }
    }, [currentChat]);

    const sendMessage = (chatId) => {
        if(message) {
            addMessage(chatId, message, 'true')
                .then((res) => {
                    setMessage("");
                    updateChat(false);
                    socket.emit("message", message, (data) => {

                    });
                });
        }
    }

    useEffect(() => {
        setScrollbarChat([maxChat]);
    }, [maxChat]);

    useEffect(() => {
        getClubData()
            .then((res) => {
               setClubName(res?.data?.result?.name);
            });

        getClubMessages()
            .then((res) => {
                const result = res?.data?.result;
                if(result?.length) {
                    setMessages(result);
                    setCurrentReceiver(result[0].first_name + " " + result[0].last_name);
                    setCurrentReceiverImg(result[0].file_path);

                    getChatContent(result[0].chat_id)
                        .then((res) => {
                           if(res?.data?.result) setCurrentChat(res.data.result);
                        });
                }
                else {
                    setNoMessages(true);
                }
            });
    }, []);

    const chatListScroll = (e) => {
        setScrollbarList([e.target.scrollTop]);
    }

    const chatMainScroll = (e) => {
        setScrollbarChat([e.target.scrollTop]);
    }

    useEffect(() => {
        document.querySelector(".chat__list__main").scrollTop = `${scrollbarList[0]}px`;
    }, [scrollbarList]);

    useEffect(() => {
        document.querySelector(".chat__main__content").scrollTop = scrollbarChat[0];
    }, [scrollbarChat]);

    useEffect(() => {
        const objDiv = document.querySelector(".chat__main__content");
        objDiv.scrollTop = objDiv.scrollHeight;

        const listHeight = window.getComputedStyle(document.querySelector(".chat__list__main")).getPropertyValue('height');

        const allMessages = document.querySelectorAll(".chat__main__content__section");
        const allMessagesHeight = Array.from(allMessages).reduce((prev, item) => {
           return prev + parseInt(window.getComputedStyle(item).getPropertyValue('height').split("p")[0]) + 20;
        }, 0);


        setMax(parseInt(listHeight.substring(0, listHeight.length-2)));
        setMaxChat(allMessagesHeight - window.innerHeight * 0.74);
    }, [currentChat]);

    const getMessagePreview = (content) => {
        return content.length < 30 ? content : content.substring(0, 30) + "...";
    }

    const getChat = (chatId, fullName, img) => {
        setCurrentReceiver(fullName);
        setCurrentReceiverImg(img);

        markAsRead(chatId, 'true')
            .then((res) => {
                getClubMessages()
                    .then((res) => {
                        setMessages(res?.data?.result);
                    });
            });

        getChatContent(chatId)
            .then((res) => {
                setMobileCurrentChat(res?.data?.result);
                setCurrentChat(res?.data?.result);
            });
    }

    const changeMessage = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault();
            sendMessage(currentChat[0].chat_id);
        }
    }

    useEffect(() => {
        // console.log(currentChat);
    }, [currentChat]);

    return <div className="container container--dark">
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club?.file_path} />

        <header className="chat__header siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <h1 className="chat__header__h">
                Wiadomości
            </h1>

            <header className="chat__header__user d-desktop">
                <section className="chat__main__header__section">
                    <figure className="chat__list__item__imgWrapper">
                        <img className="chat__list__item__img" src={currentReceiverImg ? `${settings.API_URL}/image?url=/media/users/${currentReceiverImg}` : example} alt={currentReceiver} />
                    </figure>
                    <h3 className="chat__main__header__fullName">
                        {currentReceiver}
                    </h3>
                </section>
            </header>
        </header>
        {mobileCurrentChat !== -1 ? <header className="chat__mobileHeader d-mobile">
            <button className="chat__mobileHeader__btn" onClick={() => { setMobileCurrentChat(-1); }}>
                <img className="btn__img" src={leftArrowWhite} alt="wroc" />
            </button>
            <section className="chat__main__header__section">
                <figure className="chat__list__item__imgWrapper">
                    <img className="chat__list__item__img" src={currentReceiverImg ? `${settings.API_URL}/image?url=/media/users/${currentReceiverImg}` : example} alt={currentReceiver} />
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
                        return <button className={new Date(item.created_at) > new Date(item.read_at) && !item.type ? "chat__list__item chat__list__item--new" : "chat__list__item"} onClick={() => { getChat(item.chat_id, item.first_name + " " + item.last_name, item.file_path); }}>
                            <figure className="chat__list__item__imgWrapper" key={index}>
                                <img className="chat__list__item__img" src={item.file_path ? `${settings.API_URL}/image?url=/media/users/${item.file_path}` : example} alt={item.last_name} />
                            </figure>
                            <section className="chat__list__item__content">
                                <h4 className="chat__list__item__name">
                                    {item.first_name} {item.last_name}
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
                                height: `calc(80vh - 100px)`,
                                width: "10px",
                                borderRadius: '10px',
                                display: 'flex',
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: `calc(80vh - 100px)`,
                                    width: '10px',
                                    borderRadius: !mobile ? '10px' : '10px',
                                    border: '1px solid #707070',
                                    background: getTrackBackground({
                                        values: scrollbarList[0] ? scrollbarList : [1000, 3000],
                                        colors: ['#474747', '#474747', '#474747'],
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
                <main className="chat__main__main">
                    <main className="chat__main__content" onScroll={(e) => { chatMainScroll(e); }}>
                        {currentChat.map((item, index) => {
                            return <section className="chat__main__content__section" key={index}>
                                <div className={item.type ? "chat__message chat__message--right" : "chat__message chat__message--left"}>
                                    <header className="chat__message__header">
                                        <h4 className="chat__message__header__name">
                                            {item.type ? clubName : currentReceiver}
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
                        })}
                    </main>

                    <section className="chat__main__inputWrapper">
                        <textarea className="chat__main__input"
                                  value={message}
                                  onKeyUp={(e) => { changeMessage(e); }}
                                  onChange={(e) => { setMessage(e.target.value); }}
                                  placeholder="Aa" />
                        <section className="chat__main__buttons">
                            <button className="chat__btn">
                                <img className="btn__img" src={pictureIcon} alt="wyslij-zdjecie" />
                            </button>
                            <button className="chat__btn" onClick={() => { sendMessage(currentChat[0].chat_id); }}>
                                <img className="btn__img" src={sendIcon} alt="wyslij-wiadomosc" />
                            </button>
                        </section>
                    </section>
                </main>
                <div className="chat__list__scrollbar">
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
                                    height: `calc(80vh - 100px)`,
                                    width: "10px",
                                    borderRadius: '10px',
                                    display: 'flex',
                                }}
                            >
                                <div
                                    ref={props.ref}
                                    style={{
                                        height: `calc(80vh - 100px)`,
                                        width: '10px',
                                        borderRadius: !mobile ? '10px' : '10px',
                                        border: '1px solid #707070',
                                        background: getTrackBackground({
                                            values: scrollbarChat[0] ? scrollbarChat : [1000, 3000],
                                            colors: ['#474747', '#474747', '#474747'],
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
                </div>
            </main>
        </main>


        <Footer theme="dark" border={true} />
    </div>
}

export default ChatPage;
