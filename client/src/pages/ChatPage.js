import React, {useContext, useEffect, useRef, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import example from '../static/img/profile-picture.png'
import {getTrackBackground, Range} from "react-range";
import { Direction } from 'react-range';
import pictureIcon from '../static/img/picture.svg'
import sendIcon from '../static/img/send.svg'
import pictureIconForUser from '../static/img/picture-dark.svg'
import sendIconForUser from '../static/img/send-gold.svg';
import {
    addImageToMessage,
    addMessage,
    getChatContent,
    getClubMessages, getUserMessages,
    isMessageRead,
    markAsRead
} from "../helpers/chat";
import settings from "../settings";
import {getClubById, getClubData} from "../helpers/club";
import { io } from "socket.io-client";
import leftArrowWhite from '../static/img/left-arrow-white.svg'
import {editProfileImage, getUserById, getUserData} from "../helpers/user";
import {getMessagePreview, getUniqueListBy} from "../helpers/others";
import Dropzone from "react-dropzone-uploader";
import closeIcon from '../static/img/close-grey.svg'
import {ContentContext} from "../App";

const ChatPage = ({club, user, isLocal}) => {
    const { content } = useContext(ContentContext);

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
    const [loaded, setLoaded] = useState(true);
    const [receiverId, setReceiverId] = useState(0);
    const [chatRead, setChatRead] = useState(null);
    const [currentLargeImage, setCurrentLargeImage] = useState(null);
    const [currentChatId, setCurrentChatId] = useState('');
    const [userIdentity, setUserIdentity] = useState("");
    const [idInLink, setIdInLink] = useState("");
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");

    const largeImageModal = useRef(null);

    const MESSAGE_READ_KEY = '9e01e9b0-2656-440d-999b-7f237cc8ba43';

    const getReceiverName = () => {
        const receiverIndex = messages.findIndex((item) => {
            return item.chat_id === currentChatId;
        });
        if(receiverIndex !== -1) {
            if(club) return messages[receiverIndex].first_name + " " + messages[receiverIndex].last_name;
            else return messages[receiverIndex].name;
        }
        else return null;
    }

    const getReceiverImage = () => {
        const receiverIndex = messages.findIndex((item) => {
            return item.chat_id === currentChatId;
        });
        if(receiverIndex !== -1) {
            return messages[receiverIndex].file_path;
        }
        else return null;
    }

    const getReceiverId = () => {
        const receiverIndex = messages.findIndex((item) => {
            return item.chat_id === currentChatId;
        });
        if(receiverIndex !== -1) {
            return messages[receiverIndex].id;
        }
        else return null;
    }

    /* 1 - GET URL PARAM, CLUB/USER DATA AND THEIR MESSAGES */
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let idParam = '';
        idParam = params.get('new');

        if(club) {
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

                        if(!idParam) {
                            setCurrentChatId(result[0].chat_id);
                        }
                        else {
                            if(idParam) setIdInLink(idParam);
                        }
                    }
                    else {
                        if(idParam) {
                            setIdInLink(idParam);
                            setLoaded(true);
                        }
                        else {
                            setNoMessages(true);
                            setLoaded(true);
                        }
                    }
                });
        }
        else {
            getUserData()
                .then((res) => {
                    const result = res?.data?.result;
                    if(result) {
                        setUserIdentity(result.identity);
                        setUserId(result.id);
                        setUsername(result.first_name + " " + result.last_name);
                    }
                });

            getUserMessages()
                .then((res) => {
                    const result = res?.data?.result;
                    if(result?.length) {
                        setMessages(getUniqueListBy(result, 'chat_id'));

                        if(!idParam) {
                            setCurrentChatId(result[0].chat_id);
                        }
                        else {
                            if(idParam) setIdInLink(idParam);
                        }
                    }
                    else {
                        setNoMessages(true);
                        setLoaded(true);
                    }
                });
        }
    }, []);

    /* 2 - CHECK URL PARAMS */
    useEffect(() => {
        /* STYLE PART */
        updateStyle();

        Date.prototype.addHours = function(h) {
            this.setTime(this.getTime() + (h*60*60*1000));
            return this;
        }

        /* Socket part */
        if(club) {
            if(socket) {
                if(socket.io.opts.query.split("&") !== `room=${currentChatId.split(';')[1]}`) {
                    socket.disconnect();
                    setSocket(io(`${settings.API_URL}?room=${currentChatId.split(";")[1]}&sender=${currentChatId[0]}`));
                }
            }
            else if(currentChatId) {
                setSocket(io(`${settings.API_URL}?room=${currentChatId.split(";")[1]}&sender=${currentChatId.split(";")[0]}`));
            }
        }
        else {
            if(socket) {
                if(socket.io.opts.query.split("&") !== `room=${currentChatId.split(";")[0]}`) {
                    socket.disconnect();
                    setSocket(io(`${settings.API_URL}?room=${currentChatId.split(";")[0]}&sender=${currentChatId.split(";")[1]}`));
                }
            }
            else if(currentChatId) {
                setSocket(io(`${settings.API_URL}?room=${currentChatId.split(";")[0]}&sender=${currentChatId.split(";")[1]}`));
            }
        }
    }, [currentChatId, idInLink, clubId, userId]);

    useEffect(() => {
        if(clubId && idInLink) {
            setCurrentChatId(`${clubId};${idInLink}`);
            setMobileCurrentChat(`${clubId};${idInLink}`);
            markAsRead(`${clubId};${idInLink}`, 'true')
                .then((res) => {
                    getClubMessages()
                        .then((res) => {
                            setMessages(getUniqueListBy(res?.data?.result, 'chat_id'));
                        });
                });
        }
        else if(userIdentity && idInLink) {
            setCurrentChatId(`${idInLink};${userIdentity}`);
            setMobileCurrentChat(`${idInLink};${userIdentity}`);
            markAsRead(`${idInLink};${userIdentity}`, 'false')
                .then((res) => {
                    getUserMessages()
                        .then((res) => {
                            setMessages(getUniqueListBy(res?.data?.result, 'chat_id'));
                        });
                });
        }
    }, [idInLink, clubId, userIdentity]);

    useEffect(() => {
        if(socket) {
            if(club) {
                socket.emit('message', `[message_read ${MESSAGE_READ_KEY} club ${clubId};${idInLink}]`, (data) => {

                });
            }
            else {
                socket.emit('message', `[message_read ${MESSAGE_READ_KEY} 'user' ${idInLink};${userIdentity}]`, (data) => {

                });
            }
        }
    }, [socket, idInLink]);

    /* Socket effects */
    useEffect(() => {
        if(listenSocket) {
            listenSocket.on("message", (data) => {
                if(((data.data === `[message_read ${MESSAGE_READ_KEY} club ${currentChatId}]`) && !club)||((data.data === `[message_read ${MESSAGE_READ_KEY} user ${currentChatId}]`) && club)) {
                    /* Info that message is read */
                    setChatRead(new Date());
                }
                else {
                    /* Got new message */
                    updateChatList(data);

                }
            });
        }
    }, [listenSocket, currentChatId]);

    useEffect(() => {
        updateStyle();
    }, [currentChat]);

    useEffect(() => {
        if(chatRead) {
            updateStyle(true);
        }
        else {
            updateStyle(false);
        }
    }, [chatRead]);

    useEffect(() => {
        if(socket) {
            socket.on('connect', () => {

            });

            socket.on("message", (data) => {

            });
        }
    }, [socket]);

    const getChat = (chatId) => {
        setCurrentChatId(chatId);
        setMobileCurrentChat(chatId);

       if(socket) {
           socket.emit('message', `[message_read ${MESSAGE_READ_KEY} ${club ? 'club' : 'user'} ${chatId}]`, (data) => {

           });
       }

       if(club) {
           markAsRead(chatId, 'true')
               .then((res) => {
                   getClubMessages()
                       .then((res) => {
                           setMessages(getUniqueListBy(res?.data?.result, 'chat_id'));
                       });
               });
       }
       else {
           markAsRead(chatId,'false')
               .then((res) => {
                   getUserMessages()
                       .then((res) => {
                           setMessages(getUniqueListBy(res?.data?.result, 'chat_id'));
                       });
               });
       }
    }

    useEffect(() => {
        if(messages.length) {
            if(!listenSocket) {
                setListenSocket(io(`${settings.API_URL}?room=${messages[0].chat_id.split(";")[club ? 0 : 1]}&receiver=true`));
            }
        }

        setChatRead(null);

        if(club) {
            getChatContent(currentChatId)
                .then((res) => {
                    if(res?.data?.result) {
                        const resultCurrentChat = res.data.result;
                        if(resultCurrentChat.length) {
                            setCurrentChat(resultCurrentChat);
                            setCurrentReceiver(getReceiverName());
                            setReceiverId(getReceiverId());
                            setCurrentReceiverImg(getReceiverImage());
                            setLoaded(true);

                            isMessageRead(currentChatId, true)
                                .then((res) => {
                                    const result = res?.data?.result;
                                    if(result) {
                                        result.forEach((item) => {
                                            if((new Date(item.read_at) > new Date(item.created_at)) && (resultCurrentChat[resultCurrentChat.length-1].type)) {
                                                setChatRead(new Date(item.read_at));
                                            }
                                        });
                                    }
                                });
                        }
                        else {
                            /* Chat with new player */
                            getUserById(currentChatId.split(';')[1])
                                .then((res) => {
                                    const result = res.data.result;
                                    if(result.first_name) setCurrentReceiver(result.first_name + " " + result.last_name);
                                    setCurrentReceiverImg(result.file_path);
                                    setReceiverId(result.id);
                                    setLoaded(true);
                                });
                        }
                    }
                });
        }
        else {
            getChatContent(currentChatId)
                .then((res) => {
                    if(res?.data?.result) {
                        const resultCurrentChat = res.data.result;
                        setCurrentChat(resultCurrentChat);
                        setCurrentReceiver(getReceiverName());
                        setReceiverId(getReceiverId());
                        setCurrentReceiverImg(getReceiverImage());
                        setLoaded(true);

                        isMessageRead(currentChatId, false)
                            .then((res) => {
                                const result = res?.data?.result;
                                if(result) {
                                    result.forEach((item) => {
                                        if((new Date(item.read_at) > new Date(item.created_at)) && (!resultCurrentChat[resultCurrentChat.length-1].type)) {
                                            setChatRead(new Date(item.read_at));
                                        }
                                    });
                                }
                            });
                    }
                });
        }
    }, [currentChatId, messages]);

    const markAsReadCurrentMessage = () => {
        if(socket) {
            socket.emit('message', `[message_read ${MESSAGE_READ_KEY} ${club ? 'club' : 'user'} ${currentChatId}]`, (data) => {

            });
        }

        if(club) {
            markAsRead(currentChatId, 'true')
                .then((res) => {
                    getClubMessages()
                        .then((res) => {
                            setMessages(getUniqueListBy(res?.data?.result, 'chat_id'));
                        });
                });
        }
        else {
            markAsRead(currentChatId,'false')
                .then((res) => {
                    getUserMessages()
                        .then((res) => {
                            setMessages(getUniqueListBy(res?.data?.result, 'chat_id'));
                        });
                });
        }
    }

    const updateChatList = (newMessage) => {
        if(club) {
            getClubMessages()
                .then((res) => {
                    const result = res?.data?.result;
                    if(result?.length) {
                        setMessages(getUniqueListBy(result, 'chat_id'));
                        if(newMessage) setNewMsg(newMessage);
                    }
                });
        }
        else {
            getUserMessages()
                .then((res) => {
                    const result = res?.data?.result;
                    if(result?.length) {
                        setMessages(getUniqueListBy(result, 'chat_id'));
                        if(newMessage) setNewMsg(newMessage);
                    }
                });
        }
    }

    const sendMessage = () => {
        const regex = /\S/g;

        if(previewUrl) {
            addImageToMessage(currentChatId, image, club ? 'true' : 'false')
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
            addMessage(currentChatId, message, club ? 'true' : 'false')
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
            if(club) sendMessage();
            else sendMessage();
        }
    }

    const getUploadParams = (files) => {
        setImage(files.file);
        setPreviewUrl(files.meta.previewUrl);
        document.querySelector(".chat__main__inputWrapper").style.height = window.innerWidth > 996 ? "230px" : "130px";
        document.querySelector(".chat").style.paddingBottom = window.innerWidth > 996 ? "150px" : "50px";
    }

    useEffect(() => {
        if(!previewUrl) {
            const chatMainInputWrapper = document.querySelector(".chat__main__inputWrapper");
            const chat = document.querySelector(".chat");

            if(chatMainInputWrapper) {
                chatMainInputWrapper.style.height = "48px";
            }
            if(chat) {
                chat.style.paddingBottom = "0";
            }
        }
    }, [previewUrl]);

    const enlargeImage = (path) => {
        setCurrentLargeImage(path);

        largeImageModal.current.style.opacity = '1';
        largeImageModal.current.style.zIndex = '100';
    }

    const getChatMessage = (content) => {
        if(content.split(' ')[0] === '[image') {
            const filePath = content.split(`'`).length ? content.split(`'`)[1] : null;
            if(filePath) {
                return <img onLoad={() => { updateStyle(); }}
                            onClick={() => { enlargeImage(filePath); }}
                            className="btn__img messageImg"
                            src={`${settings.IMAGE_URL}/image?url=/media/chat/${filePath}`}
                            alt="zdjecie-wyslane" />
            }
            else {
                return content;
            }
        }
        else return content;
    }

    const updateStyle = (read = false) => {
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

        if(read) setMaxChat(Math.max(1, allMessagesHeight - (window.innerWidth > 768 ? window.innerHeight * 0.74 : window.innerHeight * 0.60) + 50));
        else setMaxChat(Math.max(1, allMessagesHeight - (window.innerWidth > 768 ? window.innerHeight * 0.74 : window.innerHeight * 0.60)));
    }

    const closeLargeImageModal = () => {
        largeImageModal.current.style.opacity = '0';
        setTimeout(() => {
            largeImageModal.current.style.zIndex = '-1';
            setCurrentLargeImage(null);
        }, 400);
    }

    return <div className={club ? "container container--dark" : "container container--light"}>
        <Header loggedIn={true}
                club={club}
                player={user}
                menu={club ? "light" : "dark"}
                theme={club ? "dark" : "light"}
                profileImage={club ? club?.file_path : user?.file_path}
                messageRead={messages}
                isLocal={isLocal} />

        <div className="modal modal--largeImage" ref={largeImageModal} onClick={() => { closeLargeImageModal(); }}>
            <button className="modal--close" onClick={() => { closeLargeImageModal(); }}>
                <img className="btn__img" src={closeIcon} alt="zamknij" />
            </button>
            <img className="modal--largeImage__img" onClick={(e) => { e.stopPropagation(); }}
                 src={currentLargeImage ? `${settings.IMAGE_URL}/image?url=/media/chat/${currentLargeImage}` : ''} alt="powiekszone-zdjecie" />
        </div>

        {loaded ? <header className="chat__header siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <h1 className="chat__header__h">
                {content.messages}
            </h1>

            <header className="chat__header__user d-desktop">
                {club ? <a className="chat__main__header__section" href={`/profil-zawodnika?id=${receiverId}`}>
                    {currentReceiver ? <figure className="chat__list__item__imgWrapper">
                        <img className="chat__list__item__img" src={currentReceiverImg ? `${settings.IMAGE_URL}/image?url=/media/users/${currentReceiverImg}` : example} alt={currentReceiver} />
                    </figure> : ""}
                    <h3 className="chat__main__header__fullName">
                        {currentReceiver ? currentReceiver : ""}
                    </h3>
                </a> : <section className="chat__main__header__section">
                    {currentReceiver ? <figure className="chat__list__item__imgWrapper">
                        <img className="chat__list__item__img" src={currentReceiverImg ? `${settings.IMAGE_URL}/image?url=/media/clubs/${currentReceiverImg}` : example} alt={currentReceiver} />
                    </figure> : ""}
                    <h3 className="chat__main__header__fullName">
                        {currentReceiver ? currentReceiver : ""}
                    </h3>
                </section>}
            </header>
        </header> : ""}
        {window.innerWidth < 768 && mobileCurrentChat !== -1 && loaded ? <header className="chat__mobileHeader d-mobile">
            <button className="chat__mobileHeader__btn" onClick={() => { setMobileCurrentChat(-1); }}>
                <img className="btn__img" src={leftArrowWhite} alt="wroc" />
            </button>
            <a className="chat__main__header__section" href={`/profil-zawodnika?id=${receiverId}`}>
                <figure className="chat__list__item__imgWrapper">
                    <img className="chat__list__item__img" src={currentReceiverImg ? `${settings.IMAGE_URL}/image?url=/media/${club ? 'users' : 'clubs'}/${currentReceiverImg}` : example} alt={currentReceiver} />
                </figure>
                <h3 className="chat__main__header__fullName">
                    {currentReceiver ? currentReceiver : ""}
                </h3>
            </a>
        </header> : ""}
        <main className="chat siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <section className={mobileCurrentChat === -1 ? "chat__list" : "chat__list d-desktop"}>
                <main className="chat__list__main" onScroll={(e) => { chatListScroll(e); }}>
                    {messages?.length ? messages.map((item, index) => {
                        return <button className={(new Date(item.created_at) > new Date(item.read_at)) && ((!item.type && club) || (item.type && !club)) ? "chat__list__item chat__list__item--new" : "chat__list__item"} onClick={() => { getChat(item.chat_id); }}>
                            <figure className="chat__list__item__imgWrapper" key={index}>
                                <img className="chat__list__item__img"
                                     src={item.file_path ? `${settings.IMAGE_URL}/image?url=/media/${club ? 'users' : 'clubs'}/${item.file_path}` : example}
                                     alt={club ? item.last_name : item.name} />
                            </figure>
                            <section className="chat__list__item__content">
                                {club ? <h4 className="chat__list__item__name">
                                    {item.first_name} {item.last_name}
                                </h4> : <h4 className="chat__list__item__name">
                                    {item.name}
                                </h4>}
                                <p className="chat__list__item__text">
                                    {getMessagePreview(item.content)}
                                </p>
                            </section>
                        </button>
                    }) : <h3 className="noMessages">
                        {content.no_messages}
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
                                        colors: [club ? '#474747' : '#ECECEC'],
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
                                <div className={(item.type && club)||(!item.type && !club) ? "chat__message chat__message--right" : "chat__message chat__message--left"}>
                                    <header className="chat__message__header">
                                        {club ? <h4 className="chat__message__header__name">
                                            {item.type ? (clubName ? clubName : "") : (currentReceiver ? currentReceiver : "")}
                                        </h4> : <h4 className="chat__message__header__name">
                                            {item.type ? (currentReceiver ? currentReceiver : "") : (username ? username : "")}
                                        </h4>}
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
                        }) : (club ? (currentReceiver ? <section className="chat__main__noMessages">
                            <h3 className="chat__main__noMessages__header">
                                {content.messages_header1}
                            </h3>
                            <p className="chat__main__noMessages__text">
                                {content.messages_header2}
                            </p>
                        </section> : <section className="chat__main__noMessages">
                            <h3 className="chat__main__noMessages__header">
                                {content.messages_header3}
                            </h3>
                            <p className="chat__main__noMessages__text">
                                {content.messages_header4}
                            </p>
                        </section>) : (currentReceiver ? <section className="chat__main__noMessages">
                            <h3 className="chat__main__noMessages__header">
                                {content.messages_header5}
                            </h3>
                            <p className="chat__main__noMessages__text">
                                {content.messages_header6}
                            </p>
                        </section> : <section className="chat__main__noMessages">
                            <h3 className="chat__main__noMessages__header">
                                {content.messages_header7}
                            </h3>
                            <p className="chat__main__noMessages__text">
                                {content.messages_header8}
                            </p>
                        </section>))}
                        {chatRead ? <span className="messageReadInfo">
                            {content.messages_read}: {chatRead.getDate() + '.' + (parseInt(chatRead.getMonth())+1) + '.' + chatRead.getFullYear()}
                            {' ' + (parseInt(chatRead.getHours()) < 10 ? '0' + chatRead.getHours() : chatRead.getHours()) + ':' + (parseInt(chatRead.getMinutes()) < 10 ? '0' + chatRead.getMinutes() : chatRead.getMinutes()) + '.' + (parseInt(chatRead.getSeconds()) < 10 ? '0' + chatRead.getSeconds() : chatRead.getSeconds())}
                            <figure className="chat__list__item__imgWrapper">
                                <img className="chat__list__item__img" src={currentReceiverImg ? `${settings.IMAGE_URL}/image?url=/media/${club ? 'users' : 'clubs'}/${currentReceiverImg}` : example} alt={currentReceiver} />
                            </figure>
                        </span> : ""}
                    </main>

                    {currentReceiver ? <section className="chat__main__inputWrapper">
                        {previewUrl ? <div className="chat__main__imgPreview">
                            <button className="modal--close" onClick={() => { setPreviewUrl(null); setImage(null); }}>
                                <img className="btn__img" src={closeIcon} alt="usun" />
                            </button>
                            <img className="btn__img" src={previewUrl} />
                        </div> : null}
                        <textarea className="chat__main__input"
                                  disabled={previewUrl}
                                  value={message}
                                  onClick={() => { markAsReadCurrentMessage(); }}
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
                                <img className="btn__img" src={club ? pictureIcon : pictureIconForUser} alt="wyslij-zdjecie" />
                            </label>
                            <button className="chat__btn" onClick={() => { sendMessage(); }}>
                                <img className="btn__img" src={club ? sendIcon : sendIconForUser} alt="wyslij-wiadomosc" />
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
                                            colors: [club ? '#474747' : '#ECECEC'],
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

export default ChatPage;
