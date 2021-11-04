import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import example from '../static/img/profile-picture.png'
import {getTrackBackground, Range} from "react-range";
import { Direction } from 'react-range';
import pictureIcon from '../static/img/picture.svg'
import sendIcon from '../static/img/send.svg'

const ChatPage = ({club}) => {
    const messages = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const [scrollbarList, setScrollbarList] = useState([1]);
    const [scrollbarChat, setScrollbarChat] = useState([1]);
    const [mobile, setMobile] = useState(false);
    const [max, setMax] = useState(100);
    const [maxChat, setMaxChat] = useState(100);

    const [currentChat, setCurrentChat] = useState(0);

    useEffect(() => {
        const listHeight = window.getComputedStyle(document.querySelector(".chat__list__main")).getPropertyValue('height');
        const chatHeight = window.getComputedStyle(document.querySelector(".chat__main__main")).getPropertyValue('height');

        setMax(parseInt(listHeight.substring(0, listHeight.length-2)));
        setMaxChat(parseInt(chatHeight.substring(0, chatHeight?.length-2)));
    }, []);

    const chatListScroll = (e) => {
        setScrollbarList([e.target.scrollTop]);
    }

    useEffect(() => {
        document.querySelector(".chat__list__main").scrollTop = scrollbarList[0];
    }, [scrollbarList]);

    return <div className="container container--dark">
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club?.file_path} />

        <header className="chat__header siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <h1 className="chat__header__h">
                Wiadomości
            </h1>

            <header className="chat__header__user">
                <section className="chat__main__header__section">
                    <figure className="chat__list__item__imgWrapper">
                        <img className="chat__list__item__img" src={example} alt="test" />
                    </figure>
                    <h3 className="chat__main__header__fullName">
                        Jan Kowalski
                    </h3>
                </section>
            </header>
        </header>
        <main className="chat siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <section className="chat__list">
                <main className="chat__list__main" onScroll={(e) => { chatListScroll(e); }}>
                    {messages.map((item, index) => {
                        return <button className="chat__list__item">
                            <figure className="chat__list__item__imgWrapper" key={index}>
                                <img className="chat__list__item__img" src={example} alt="test" />
                            </figure>
                            <section className="chat__list__item__content">
                                <h4 className="chat__list__item__name">
                                    Jan Kowalski
                                </h4>
                                <p className="chat__list__item__text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in neque nec odio...
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
                                        colors: ['#474747', '#474747', '#474747'],
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
                    <section className="chat__main__inputWrapper">
                        <textarea className="chat__main__input" placeholder="Aa" />
                        <section className="chat__main__buttons">
                            <button className="chat__btn">
                                <img className="btn__img" src={pictureIcon} alt="wyslij-zdjecie" />
                            </button>
                            <button className="chat__btn">
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
                                            colors: ['#474747', '#474747', '#474747'],
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

export default ChatPage;
