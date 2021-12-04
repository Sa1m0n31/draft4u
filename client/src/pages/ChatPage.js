import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import example from '../static/img/profile-picture.png'
import {getTrackBackground, Range} from "react-range";
import { Direction } from 'react-range';
import pictureIcon from '../static/img/picture.svg'
import sendIcon from '../static/img/send.svg'
import {
    addImageToMessage,
    addMessage,
    getChatContent,
    getClubMessages,
    isMessageRead,
    markAsRead
} from "../helpers/chat";
import settings from "../settings";
import {getClubData} from "../helpers/club";
import { io } from "socket.io-client";
import leftArrowWhite from '../static/img/left-arrow-white.svg'
import {editProfileImage, getUserById, getUserData} from "../helpers/user";
import {getMessagePreview, getUniqueListBy} from "../helpers/others";
import Dropzone from "react-dropzone-uploader";

const ChatPage = ({club}) => {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
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
    const [clubId, setClubId] = useState("");
    const [chatInLink, setChatInLink] = useState(false);
    const [userIdParam, setUserIdParam] = useState("");
    const [loaded, setLoaded] = useState(true);
    const [receiverId, setReceiverId] = useState(0);
    const [chatRead, setChatRead] = useState(null);

    /* --- 1 --- */
    useEffect(() => {
        getClubData()
            .then((res) => {
                setClubId(res?.data?.result?.id);
                setClubName(res?.data?.result?.name);
            });

        getClubMessages()
            .then((res) => {
                const result = res?.data?.result;
                if(result?.length) {
                    setMessages(getUniqueListBy(result, 'chat_id'));
                    setCurrentReceiver(result[0].first_name + " " + result[0].last_name);
                    setCurrentReceiverImg(result[0].file_path);
                    setReceiverId(result[0].id);

                    if(!chatInLink) {
                        getChatContent(result[0].chat_id)
                            .then((res) => {
                                if(res?.data?.result) {
                                    setCurrentChat(res.data.result);
                                    setLoaded(true);
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            })
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

        const lastMsg = document.querySelectorAll(".chat__message")[document.querySelectorAll(".chat__message").length-1];
        if(lastMsg?.classList?.length) {
            if(document.querySelector(".messageReadInfo")) {
                if(lastMsg.classList[1] === 'chat__message--right') {
                    document.querySelector(".messageReadInfo").style.display = "flex";
                }
                else {
                    document.querySelector(".messageReadInfo").style.display = "none";
                }
            }
        }

        /* LOGIC PART */
        let newPlayerToChat;
        if(clubId) {
            const params = new URLSearchParams(window.location.search);
            newPlayerToChat = params.get('new');
            setUserIdParam(newPlayerToChat);

            if(newPlayerToChat && !chatInLink) {
                getChatContent(`${clubId};${newPlayerToChat}`)
                    .then((res) => {
                        setChatInLink(true);

                        if(res?.data?.result) {
                            setCurrentChat(res.data.result);
                            setMobileCurrentChat(res.data.result);
                        }

                        getUserById(newPlayerToChat)
                            .then((res) => {
                                const result = res?.data?.result;
                                if(result) {
                                    setReceiverId(newPlayerToChat);
                                    setCurrentReceiver(result.first_name + " " + result.last_name);
                                    setCurrentReceiverImg(result.file_path);
                                }
                            })
                    });
            }
        }

        Date.prototype.addHours = function(h) {
            this.setTime(this.getTime() + (h*60*60*1000));
            return this;
        }

        isMessageRead(currentChat[0] ? currentChat[0].chat_id : `${clubId};${userIdParam}`)
            .then((res) => {
                const result = res?.data?.result;
                console.log(result);
                if(result) {
                    const indexOfRead = result.findIndex((item) => {
                        return (!item.type) && (new Date(item.read_at) > new Date(item.created_at));
                    });
                    if(indexOfRead !== -1) {
                        setChatRead(result[indexOfRead].read_at);
                    }
                    else {
                        setChatRead(null);
                    }


                }
            });

        /* Socket part */
        if(currentChat.length || (newPlayerToChat && clubId)) {
            if(socket) {
                if(socket.io.opts.query.split("&") !== `room=${currentChat?.length ? currentChat[0].chat_id.split(";")[1] : newPlayerToChat}`) {
                    socket.disconnect();
                    setSocket(io(`${settings.API_URL}?room=${currentChat?.length ? currentChat[0].chat_id.split(";")[1] : newPlayerToChat}&sender=${clubId ? clubId : currentChat[0].chat_id.split(";")[0]}`));
                }
            }
            else {
                setSocket(io(`${settings.API_URL}?room=${clubId ? clubId : currentChat[0].chat_id.split(";")[1]}&sender=${currentChat?.length ? currentChat[0].chat_id.split(";")[0] : newPlayerToChat}`));
            }
        }
    }, [currentChat, clubId]);

    /* --- 3 --- */
    useEffect(() => {
        if(messages.length) {
            if(!listenSocket) {
                setListenSocket(io(`${settings.API_URL}?room=${messages[0].chat_id.split(";")[0]}&receiver=true`));
            }
        }

        if(currentChat.length || userIdParam) {
            getChatContent(currentChat[0] ? currentChat[0].chat_id : `${clubId};${userIdParam}`)
                .then((res) => {
                    if(res?.data?.result) {
                        setCurrentChat(res.data.result);

                        isMessageRead(currentChat[0] ? currentChat[0].chat_id : `${clubId};${userIdParam}`)
                            .then((res) => {
                                const result = res?.data?.result;
                                if(result) {
                                    result.forEach((item) => {
                                        if(!item.type && new Date(item.read_at) > new Date(item.created_at)) {
                                            setChatRead(true);
                                        }
                                    });
                                }
                            });
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

            });
        }
    }, [socket]);

    const getChat = (chatId, fullName, img, userId, isNew) => {
        setReceiverId(userId);
        setCurrentReceiver(fullName);
        setCurrentReceiverImg(img);

        setChatInLink(true);

        if(isNew) {
            socket.emit('message', 'read', (data) => {

            });
            markAsRead(chatId, 'true')
                .then((res) => {
                    getClubMessages()
                        .then((res) => {
                            setMessages(getUniqueListBy(res?.data?.result, 'chat_id'));
                        });
                });
        }

        getChatContent(chatId)
            .then((res) => {
                setMobileCurrentChat(res?.data?.result);
                setCurrentChat(res?.data?.result);
            });
    }

    const updateChatList = (newMessage) => {
        getClubMessages()
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
        if(previewUrl) {
            addImageToMessage(chatId, image, 'true')
                .then((res) => {
                    setImage(null);
                    setPreviewUrl(null);
                    document.querySelector(".chat__main__inputWrapper").style.height = "48px";
                    document.querySelector(".chat").style.paddingBottom = "0";
                    updateChatList(false);
                    socket.emit('message', message, (data) => {

                    });
                });
        }
        else if(message && message.match(regex)) {
            addMessage(chatId, message, 'true')
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
            sendMessage(currentChat[0] ? currentChat[0].chat_id : `${clubId};${userIdParam}`);
        }
    }

    const getUploadParams = (files) => {
        setImage(files.file);
        setPreviewUrl(files.meta.previewUrl);
        document.querySelector(".chat__main__inputWrapper").style.height = window.innerWidth > 996 ? "230px" : "130px";
        document.querySelector(".chat").style.paddingBottom = window.innerWidth > 996 ? "150px" : "50px";
    }

    const getChatMessage = (content) => {
        if(content.split(' ')[0] === '[image') {
            const filePath = content.split(`'`).length ? content.split(`'`)[1] : null;
            if(filePath) {
                return <img onLoad={() => { updateStyle(); }} className="btn__img" src={`${settings.API_URL}/image?url=/media/chat/${filePath}`} alt="example" />
            }
            else {
                return content;
            }
        }
        else return content;
    }

    const updateStyle = () => {
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

    }

    return <div className="container container--dark">
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club?.file_path} messageRead={messages} />

        {loaded ? <header className="chat__header siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <h1 className="chat__header__h">
                Wiadomości
            </h1>

            <header className="chat__header__user d-desktop">
                <a className="chat__main__header__section" href={`/profil-zawodnika?id=${receiverId}`}>
                    {currentReceiver ? <figure className="chat__list__item__imgWrapper">
                        <img className="chat__list__item__img" src={currentReceiverImg ? `${settings.API_URL}/image?url=/media/users/${currentReceiverImg}` : example} alt={currentReceiver} />
                    </figure> : ""}
                    <h3 className="chat__main__header__fullName">
                        {currentReceiver}
                    </h3>
                </a>
            </header>
        </header> : ""}
        {mobileCurrentChat !== -1 && loaded ? <header className="chat__mobileHeader d-mobile">
            <button className="chat__mobileHeader__btn" onClick={() => { setMobileCurrentChat(-1); }}>
                <img className="btn__img" src={leftArrowWhite} alt="wroc" />
            </button>
            <a className="chat__main__header__section" href={`/profil-zawodnika?id=${receiverId}`}>
                <figure className="chat__list__item__imgWrapper">
                    <img className="chat__list__item__img" src={currentReceiverImg ? `${settings.API_URL}/image?url=/media/users/${currentReceiverImg}` : example} alt={currentReceiver} />
                </figure>
                <h3 className="chat__main__header__fullName">
                    {currentReceiver}
                </h3>
            </a>
        </header> : ""}
        <main className="chat siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <section className={mobileCurrentChat === -1 ? "chat__list" : "chat__list d-desktop"}>
                <main className="chat__list__main" onScroll={(e) => { chatListScroll(e); }}>
                    {messages?.length ? messages.map((item, index) => {
                        return <button className={new Date(item.created_at) > new Date(item.read_at) && !item.type ? "chat__list__item chat__list__item--new" : "chat__list__item"} onClick={() => { getChat(item.chat_id, item.first_name + " " + item.last_name, item.file_path, item.id, ((new Date(item.created_at) > new Date(item.read_at)) && !item.type)); }}>
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
                <main className={loaded ? "chat__main__main" : "chat__main__main opacity-0"}>
                    <main className="chat__main__content" onScroll={(e) => { chatMainScroll(e); }}>
                        {currentChat.length ? currentChat.map((item, index, array) => {
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
                                        {getChatMessage(item.content)}
                                    </span>
                                </div>
                            </section>
                        }) : (currentReceiver ? <section className="chat__main__noMessages">
                            <h3 className="chat__main__noMessages__header">
                                Rozpocznij konwersacje
                            </h3>
                            <p className="chat__main__noMessages__text">
                                Nie masz jeszcze wiadomości z tym zawodnikiem. Odezwij się jako pierwszy!
                            </p>
                        </section> : <section className="chat__main__noMessages">
                            <h3 className="chat__main__noMessages__header">
                                Nie posiadasz póki co żadnych wiadomości
                            </h3>
                            <p className="chat__main__noMessages__text">
                                Wyszukaj odpowiadających Ci zawodników i skontaktuj się z nimi!
                            </p>
                        </section>)}
                        {chatRead ? <span className="messageReadInfo">
                            Odczytano: {chatRead?.toString()?.substring(0, 10)} {chatRead.toString()?.split('T')[1]?.substring(0, 8)}
                            <figure className="chat__list__item__imgWrapper">
                                <img className="chat__list__item__img" src={currentReceiverImg ? `${settings.API_URL}/image?url=/media/users/${currentReceiverImg}` : example} alt={currentReceiver} />
                            </figure>
                        </span> : ""}
                    </main>

                    {currentReceiver ? <section className="chat__main__inputWrapper">
                        {previewUrl ? <div className="chat__main__imgPreview">
                            <img className="btn__img" src={previewUrl} />
                        </div> : null}
                        <textarea className="chat__main__input"
                                  disabled={previewUrl}
                                  value={message}
                                  onKeyUp={(e) => { changeMessage(e); }}
                                  onChange={(e) => { setMessage(e.target.value); }}
                                  placeholder={previewUrl ? "" : "Aa"} />
                        <section className="chat__main__buttons">
                            <label className="chat__btn">
                                <Dropzone
                                    getUploadParams={getUploadParams}
                                    accept="image/*"
                                    multiple={false}
                                />
                                <img className="btn__img" src={pictureIcon} alt="wyslij-zdjecie" />
                            </label>
                            <button className="chat__btn" onClick={() => { sendMessage(currentChat[0] ? currentChat[0].chat_id : `${clubId};${userIdParam}`); }}>
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
                </div> : ""}
            </main>
        </main>


        <Footer theme="dark" border={true} />
    </div>
}

export default ChatPage;
