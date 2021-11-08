import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import example from '../static/img/profile-picture.png'
import {getTrackBackground, Range} from "react-range";
import { Direction } from 'react-range';
import pictureIcon from '../static/img/picture-dark.svg'
import sendIcon from '../static/img/send-gold.svg'
import {addMessage, getChatContent, getClubMessages, getUserMessages} from "../helpers/chat";
import settings from "../settings";
import {getClubData} from "../helpers/club";
import { io } from "socket.io-client";
import {getUserData} from "../helpers/user";

const ChatPageForUser = ({user}) => {
    const [scrollbarList, setScrollbarList] = useState([1]);
    const [scrollbarChat, setScrollbarChat] = useState([1]);
    const [mobile, setMobile] = useState(false);
    const [max, setMax] = useState(100);
    const [maxChat, setMaxChat] = useState(100);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [currentChat, setCurrentChat] = useState([]);
    const [currentReceiver, setCurrentReceiver] = useState("");
    const [currentReceiverImg, setCurrentReceiverImg] = useState("");

    useEffect(() => {
        const socket = io("http://localhost:3001");
        socket.on('connect', () => {
            console.log("connect");
        });
    }, []);

    useEffect(() => {
        const listHeight = window.getComputedStyle(document.querySelector(".chat__list__main")).getPropertyValue('height');
        const chatHeight = window.getComputedStyle(document.querySelector(".chat__main__main")).getPropertyValue('height');

        setMax(parseInt(listHeight.substring(0, listHeight.length-2)));
        setMaxChat(parseInt(chatHeight.substring(0, chatHeight?.length-2)));

        getUserMessages()
            .then((res) => {
                const result = res?.data?.result;
                console.log(result);
                if(result) {
                    setMessages(result);
                    setCurrentReceiver(result[0].name);
                    setCurrentReceiverImg(result[0].file_path);
                }
            });
    }, []);

    const chatListScroll = (e) => {
        setScrollbarList([e.target.scrollTop]);
    }

    useEffect(() => {
        document.querySelector(".chat__list__main").scrollTop = scrollbarList[0];
    }, [scrollbarList]);

    useEffect(() => {
        const objDiv = document.querySelector(".chat__main__content");
        objDiv.scrollTop = objDiv.scrollHeight;
    }, [currentChat]);

    const getMessagePreview = (content) => {
        return content.length < 30 ? content : content.substring(0, 30) + "...";
    }

    const getChat = (chatId, fullName, img) => {
        setCurrentReceiver(fullName);
        setCurrentReceiverImg(img);

        getChatContent(chatId)
            .then((res) => {
                console.log(res?.data?.result);
                setCurrentChat(res?.data?.result);
            });
    }

    const changeMessage = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault();
            sendMessage(currentChat[0].chat_id);
        }
    }

    const sendMessage = (chatId) => {
        addMessage(chatId, message, 'false')
            .then((res) => {
                setMessage("");
            });
    }

    return <div className="container container--light">
        <Header loggedIn={true} player={true} menu="dark" theme="light" profileImage={user?.file_path} />

        <header className="chat__header siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <h1 className="chat__header__h">
                Wiadomości
            </h1>

            <header className="chat__header__user">
                <section className="chat__main__header__section">
                    <figure className="chat__list__item__imgWrapper">
                        <img className="chat__list__item__img" src={currentReceiverImg ? `${settings.API_URL}/image?url=/media/clubs/${currentReceiverImg}` : example} alt={currentReceiver} />
                    </figure>
                    <h3 className="chat__main__header__fullName">
                        {currentReceiver}
                    </h3>
                </section>
            </header>
        </header>
        <main className="chat siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <section className="chat__list">
                <main className="chat__list__main" onScroll={(e) => { chatListScroll(e); }}>
                    {messages.map((item, index) => {
                        return <button className="chat__list__item" onClick={() => { getChat(item.chat_id, item.name, item.file_path); }}>
                            <figure className="chat__list__item__imgWrapper" key={index}>
                                <img className="chat__list__item__img" src={item.file_path ? `${settings.API_URL}/image?url=/media/clubs/${item.file_path}` : example} alt={item.last_name} />
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
                    })}
                </main>
                <Range
                    step={1}
                    min={1}
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
                                height: !mobile ? '80vh' : '80vh',
                                width: "10px",
                                borderRadius: '10px',
                                display: 'flex',
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: !mobile ? '80vh' : '80vh',
                                    width: '10px',
                                    borderRadius: !mobile ? '10px' : '10px',
                                    border: '1px solid #707070',
                                    background: getTrackBackground({
                                        values: scrollbarList[0] ? scrollbarList : [1000, 3000],
                                        colors: ['#ECECEC'],
                                        min: 1,
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
            <main className="chat__main">
                <main className="chat__main__main">
                    <main className="chat__main__content">
                        {currentChat.map((item, index) => {
                            return <section className="chat__main__content__section" key={index}>
                                <div className={!item.type ? "chat__message chat__message--right" : "chat__message chat__message--left"}>
                                    <header className="chat__message__header">
                                        <h4 className="chat__message__header__name">
                                            {!item.type ? user.first_name + " " + user.last_name : currentReceiver}
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
                        min={1}
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
                                    height: !mobile ? '80vh' : '80vh',
                                    width: "10px",
                                    borderRadius: '10px',
                                    display: 'flex',
                                }}
                            >
                                <div
                                    ref={props.ref}
                                    style={{
                                        height: !mobile ? '80vh' : '80vh',
                                        width: '10px',
                                        borderRadius: !mobile ? '10px' : '10px',
                                        border: '1px solid #707070',
                                        background: getTrackBackground({
                                            values: scrollbarChat[0] ? scrollbarChat : [1000, 3000],
                                            colors: ['#ECECEC'],
                                            min: 1,
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
                </div>
            </main>
        </main>


        <Footer theme="dark" border={true} />
    </div>
}

export default ChatPageForUser;
