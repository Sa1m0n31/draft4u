import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import example from "../static/img/zzaksa.png";
import Footer from "../components/Footer";
import ComparedPlayer from "../components/ComparedPlayer";
import ComparatorChart from "../components/ComparatorChart";
import {getUserById} from "../helpers/user";
import {getFavoritesByClub, getPlayerHighlight, isPlayerFavorite} from "../helpers/club";

const ComparatorPage = ({club}) => {
    const colors = ["#AE5D0D", "#D4C289", "#A9A9A9"];

    const [favorites, setFavorites] = useState([]);

    const [firstPlayer, setFirstPlayer] = useState(0);
    const [secondPlayer, setSecondPlayer] = useState(0);
    const [thirdPlayer, setThirdPlayer] = useState(0);

    const [firstPlayerVideo, setFirstPlayerVideo] = useState(0);
    const [secondPlayerVideo, setSecondPlayerVideo] = useState(0);
    const [thirdPlayerVideo, setThirdPlayerVideo] = useState(0);

    const [videosArray, setVideosArray] = useState([0, 0, 0]);
    const [playersArray, setPlayersArray] = useState([0, 0, 0]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const firstParam = params.get('first');
        const secondParam = params.get('second');
        const thirdParam = params.get('third');

        if((!firstParam)||(!secondParam)||(!thirdParam)||(firstParam === 'undefined')||(secondParam === 'undefined')||(thirdParam === 'undefined')) {
            window.location = "/";
        }
        else {
            const comparedIds = [parseInt(params.get('first')), parseInt(params.get('second')), parseInt(params.get('third'))];
            comparedIds.forEach((item, index) => {
              getPlayerHighlight(item)
                  .then((res) => {
                      const result = res.data.result;
                      switch(index) {
                          case 0:
                              setFirstPlayerVideo(result);
                              break;
                          case 1:
                              setSecondPlayerVideo(result);
                              break;
                          case 2:
                              setThirdPlayerVideo(result);
                              break;
                          default:
                              break;
                      }
                  })

               getUserById(item)
                   .then((res) => {
                       const result = res.data.result;
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
        setPlayersArray([firstPlayer, secondPlayer, thirdPlayer]);
    }, [firstPlayer, secondPlayer, thirdPlayer, favorites]);

    useEffect(() => {
        setVideosArray([firstPlayerVideo, secondPlayerVideo, thirdPlayerVideo]);
    }, [firstPlayerVideo, secondPlayerVideo, thirdPlayerVideo]);

    return <div className="container container--dark">
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club.file_path} />

        <main className="comparator__main siteWidthSuperNarrow siteWidthSuperNarrow--1400 d-desktop">
            {playersArray.map((item, index) => {
                return <ComparedPlayer player={item} video={videosArray[index]} color={colors[index]} />
            })}
        </main>

        {playersArray[0] && playersArray[1] && playersArray[2] ? <ComparatorChart datasets={playersArray} /> : ""}

        <Footer theme="dark" border={true} />
    </div>
}

export default ComparatorPage;
