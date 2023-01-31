import React, {useContext, useEffect, useState} from 'react'
import Header from "../components/Header";
import example from "../static/img/zzaksa.png";
import Footer from "../components/Footer";
import ComparedPlayer from "../components/ComparedPlayer";
import ComparatorChart from "../components/ComparatorChart";
import {getUserById} from "../helpers/user";
import {getFavoritesByClub, getPlayerHighlight, isPlayerFavorite} from "../helpers/club";
import ComparedPlayerTop from "../components/ComparedPlayerTop";
import {ContentContext} from "../App";
import {calculateAge} from "../helpers/others";

const ComparatorPage = ({club}) => {
    const colors = ["#AE5D0D", "#D4C289", "#A9A9A9"];

    const { content } = useContext(ContentContext);

    const [favorites, setFavorites] = useState([]);

    const [firstPlayer, setFirstPlayer] = useState(0);
    const [secondPlayer, setSecondPlayer] = useState(0);
    const [thirdPlayer, setThirdPlayer] = useState(0);

    const [firstPlayerVideo, setFirstPlayerVideo] = useState(0);
    const [secondPlayerVideo, setSecondPlayerVideo] = useState(0);
    const [thirdPlayerVideo, setThirdPlayerVideo] = useState(0);

    const [videosArray, setVideosArray] = useState([0, 0, 0]);
    const [playersArray, setPlayersArray] = useState([0, 0, 0]);

    const [nameMinHeight, setNameMinHeight] = useState(0);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const comparedIds = [parseInt(params.get('first')), parseInt(params.get('second')), parseInt(params.get('third'))].filter((item) => {
            return (item) && (!isNaN(item));
        });

        if(comparedIds.length < 2) {
            window.location = "/";
        }
        else {
            localStorage.removeItem('draft4u-comparator');

            comparedIds.forEach((item, index) => {
              getPlayerHighlight(item)
                  .then((res) => {
                      const result = res?.data?.result;
                      switch(index) {
                          case 0:
                              setFirstPlayerVideo(result[0]);
                              break;
                          case 1:
                              setSecondPlayerVideo(result[0]);
                              break;
                          case 2:
                              setThirdPlayerVideo(result[0]);
                              break;
                          default:
                              break;
                      }
                  })

               getUserById(item)
                   .then((res) => {
                       const result = res?.data?.result;
                       switch(index) {
                           case 0:
                               setFirstPlayer(result);
                               break;
                           case 1:
                               setSecondPlayer(result);
                               break;
                           case 2:
                               setThirdPlayer(result);
                               break;
                           default:
                               break;
                       }
                   });
            });
        }
    }, []);

    useEffect(() => {
        console.log(content);
    }, [content]);

    useEffect(() => {
        setPlayersArray([firstPlayer, secondPlayer, thirdPlayer]);
    }, [firstPlayer, secondPlayer, thirdPlayer, favorites]);

    useEffect(() => {
        setVideosArray([firstPlayerVideo, secondPlayerVideo, thirdPlayerVideo]);
    }, [firstPlayerVideo, secondPlayerVideo, thirdPlayerVideo]);

    useEffect(() => {
        /* Make columns equal */
        if(playersArray[0] && playersArray[1] && playersArray[2]) {
            const nameHeaders = document.querySelectorAll(".comparedPlayer__fullName");
            let maxHeight = 0;

            Array.from(nameHeaders).forEach((item, index, array) => {
                const newHeight = parseInt(window.getComputedStyle(item).getPropertyValue('height').split("p")[0]);
                if(newHeight > maxHeight) maxHeight = newHeight;

                if(index === array.length-1) {
                    setNameMinHeight(maxHeight);
                }
            });
        }
    }, [playersArray]);

    return <div className="container container--dark">
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club.file_path} />

        <main className="comparator__main siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            {playersArray.map((item, index) => {
                if(item) {
                    return <ComparedPlayerTop player={item}
                                           color={colors[index]}
                                           nameMinHeight={nameMinHeight} />
                }
            })}
        </main>

        <section className="comparatorValues">
            <section className="comparatorValues__keySection">
                <span>
                    {calculateAge(firstPlayer?.birthday)}
                </span>
                <span>
                    {content.age}
                </span>
                <span>
                    {calculateAge(secondPlayer?.birthday)}
                </span>
            </section>
            <section className="comparatorValues__valuesSection">
                <div className="comparatorValues__valuesSection__bar">
                    <div className="bar bar--age" style={
                        {
                            width: `${calculateAge(firstPlayer?.birthday) + 30}%`
                        }
                    }>

                    </div>
                </div>
                <div className="comparatorValues__valuesSection__bar">
                    <div className="bar bar--age" style={
                        {
                            width: `${calculateAge(secondPlayer?.birthday) + 30}%`
                        }
                    }>

                    </div>
                </div>
            </section>

            <section className="comparatorValues__keySection comparatorValues__keySection--salary">
                <span>
                    {firstPlayer.salary_from ? firstPlayer.salary_from + " - " + firstPlayer.salary_to : "-"}
                </span>
                <span>
                    {content.player_parameter_7}
                </span>
                <span>
                    {secondPlayer.salary_from ? secondPlayer.salary_from + " - " + secondPlayer.salary_to : "-"}
                </span>
            </section>
            <section className="comparatorValues__valuesSection">
                <div className="comparatorValues__valuesSection__bar">
                    <div className="bar bar--age" style={
                        {
                            width: `${(firstPlayer.salary_from ? firstPlayer.salary_from : 0) / 30000 * 100}%`
                        }
                    }>

                    </div>
                </div>
                <div className="comparatorValues__valuesSection__bar">
                    <div className="bar bar--age" style={
                        {
                            width: `${(secondPlayer.salary_from ? secondPlayer.salary_from : 0) / 30000 * 100}%`
                        }
                    }>

                    </div>
                </div>
            </section>
        </section>

        <section className="comparatorValues">
            <section className="comparatorValues__keySection">
                <span>
                    {firstPlayer.attack_range ? firstPlayer.attack_range : '-'}
                </span>
                <span>
                    {content.player_parameter_8}
                </span>
                <span>
                    {secondPlayer.attack_range ? secondPlayer.attack_range : '-'}
                </span>
            </section>
            <section className="comparatorValues__valuesSection">
                <div className="comparatorValues__valuesSection__bar">
                    <div className="bar bar--age" style={
                        {
                            width: `${firstPlayer.attack_range - 270}%`
                        }
                    }>

                    </div>
                </div>
                <div className="comparatorValues__valuesSection__bar">
                    <div className="bar bar--age" style={
                        {
                            width: `${secondPlayer.attack_range - 270}%`
                        }
                    }>

                    </div>
                </div>
            </section>

            <section className="comparatorValues__keySection">
                <span>
                    {firstPlayer.vertical_range ? firstPlayer.vertical_range : '-'}
                </span>
                <span>
                      {content.player_parameter_9}
                </span>
                <span>
                    {secondPlayer.vertical_range ? secondPlayer.vertical_range : '-'}
                </span>
            </section>
            <section className="comparatorValues__valuesSection">
                <div className="comparatorValues__valuesSection__bar">
                    <div className="bar bar--age" style={
                        {
                            width: `${firstPlayer.vertical_range - 250}%`
                        }
                    }>

                    </div>
                </div>
                <div className="comparatorValues__valuesSection__bar">
                    <div className="bar bar--age" style={
                        {
                            width: `${secondPlayer.vertical_range - 250}%`
                        }
                    }>

                    </div>
                </div>
            </section>

            <section className="comparatorValues__keySection">
                <span>
                    {firstPlayer.block_range ? firstPlayer.block_range : '-'}
                </span>
                <span>
                      {content.player_parameter_10}
                </span>
                <span>
                    {secondPlayer.block_range ? secondPlayer.block_range : '-'}
                </span>
            </section>
            <section className="comparatorValues__valuesSection">
                <div className="comparatorValues__valuesSection__bar">
                    <div className="bar bar--age" style={
                        {
                            width: `${firstPlayer.block_range - 250}%`
                        }
                    }>

                    </div>
                </div>
                <div className="comparatorValues__valuesSection__bar">
                    <div className="bar bar--age" style={
                        {
                            width: `${secondPlayer.block_range - 250}%`
                        }
                    }>

                    </div>
                </div>
            </section>

            <section className="comparatorValues__keySection">
                <span>
                    {firstPlayer.weight ? firstPlayer.weight : '-'}
                </span>
                <span>
                      {content.player_parameter_12}
                </span>
                <span>
                    {secondPlayer.weight ? secondPlayer.weight : '-'}
                </span>
            </section>
            <section className="comparatorValues__valuesSection">
                <div className="comparatorValues__valuesSection__bar">
                    <div className="bar bar--age" style={
                        {
                            width: `${firstPlayer.weight - 30}%`
                        }
                    }>

                    </div>
                </div>
                <div className="comparatorValues__valuesSection__bar">
                    <div className="bar bar--age" style={
                        {
                            width: `${secondPlayer.weight - 30}%`
                        }
                    }>

                    </div>
                </div>
            </section>
        </section>

        <section className="comparator__main siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            {playersArray.map((item, index) => {
                if(item) {
                    return <ComparedPlayer player={item}
                                           video={videosArray[index]}
                                           color={colors[index]}
                                           nameMinHeight={nameMinHeight} />
                }
            })}
        </section>

        {/*{playersArray?.filter((item) => { return item; }).length > 1 ? <ComparatorChart datasets={playersArray?.filter((item) => { return item; })} /> : ""}*/}

        <Footer theme="dark" border={true} />
    </div>
}

export default ComparatorPage;
