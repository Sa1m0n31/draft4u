import React, {useEffect, useState} from 'react'
import LoadingPage from "../pages/LoadingPage";
import ClubAccountStart from "../pages/ClubAccountStart";
import SearchPlayersPage from "../pages/SearchPlayersPage";
import {isLoggedIn} from "../helpers/auth";
import {getAllPlayers, getClubData, getFavoritesByClub} from "../helpers/club";
import {getUserData} from "../helpers/user";
import PlayerPage from "../pages/PlayerPage";
import ComparatorPage from "../pages/ComparatorPage";
import Favorites from "../pages/Favorites";
import CreateSquadPage from "../pages/CreateSquadPage";
import ClubTeamsPage from "../pages/ClubTeamsPage";
import ChatPage from "../pages/ChatPage";
import Notifications from "../pages/Notifications";
import ChangePassword from "../pages/ChangePassword";
import SearchStuffPage from "../pages/SearchStuffPage";
import FavoritesStuff from "../pages/FavoritesStuff";

const TestClubContext = React.createContext(true);

const ClubWrapper = ({page}) => {
    const [loaded, setLoaded] = useState(false);
    const [renderSwitch, setRenderSwitch] = useState(null);
    const [testClub, setTestClub] = useState(true);

    useEffect(() => {
        getAllPlayers()
            .then((res) => {
                const club = 141;
                setLoaded(true);

                const players = res?.data?.result.filter((item) => {
                    const splittedId = item.identity?.split('-');
                    return splittedId[splittedId.length-1] !== 'stuff';
                });
                const stuff = res?.data?.result?.filter((item) => {
                    const splittedId = item.identity?.split('-');
                    return splittedId[splittedId.length-1] === 'stuff';
                });

                getFavoritesByClub()
                    .then((res) => {
                        const favorites = res?.data?.result.filter((item) => {
                            const splittedId = item.identity?.split('-');
                            return splittedId[splittedId.length-1] !== 'stuff';
                        });
                        const favoritesStuff = res?.data?.result?.filter((item) => {
                            const splittedId = item.identity?.split('-');
                            return splittedId[splittedId.length-1] === 'stuff';
                        });

                        if(club) {
                            switch(page) {
                                case 1:
                                    setRenderSwitch(<ClubAccountStart club={club}
                                                                      playersProp={players}
                                                                      favorites={favorites} />);
                                    break;
                                case 2:
                                    setRenderSwitch(<SearchPlayersPage club={club}
                                                                       playersProp={players}
                                                                       favorites={favorites} />);
                                    break;
                                case 3:
                                    setRenderSwitch(<ComparatorPage club={club} />);
                                    break;
                                case 4:
                                    setRenderSwitch(<PlayerPage club={club} />);
                                    break;
                                case 5:
                                    setRenderSwitch(<Favorites club={club}
                                                               playersProp={players}
                                                               favorites={favorites} />);
                                    break;
                                case 6:
                                    setRenderSwitch(<CreateSquadPage club={club} />);
                                    break;
                                case 7:
                                    setRenderSwitch(<ClubTeamsPage club={club} />);
                                    break;
                                case 8:
                                    setRenderSwitch(<ChatPage club={club} />);
                                    break;
                                case 9:
                                    setRenderSwitch(<Notifications club={club} />);
                                    break;
                                case 10:
                                    setRenderSwitch(<ChangePassword club={club} />);
                                    break;
                                case 11:
                                    setRenderSwitch(<SearchStuffPage club={club}
                                                                     playersProp={stuff}
                                                                     favorites={favoritesStuff} />);
                                    break;
                                case 12:
                                    setRenderSwitch(<FavoritesStuff club={club}
                                                                    favorites={favoritesStuff} />);
                                    break;
                                default:
                                    setRenderSwitch(<ClubAccountStart club={club} favorites={favorites} />);
                                    break;
                            }
                        }
                        else {
                            getUserData()
                                .then((res) => {
                                    if(res?.data?.result) window.location = "/rozpocznij";
                                    else window.location = "/";
                                });
                        }
                    });
            });

        // isLoggedIn()
        //     .then((res) => {
        //         if(!res?.data?.result) window.location = "/";
        //         else {
        //             getClubData()
        //                 .then((res) => {
        //                     setLoaded(true);
        //
        //                     const club = res?.data?.result;
        //                     if(club?.file_path) setTestClub(false);
        //
        //                     getAllPlayers()
        //                         .then((res) => {
        //                             const players = res?.data?.result.filter((item) => {
        //                                 const splittedId = item.identity?.split('-');
        //                                 return splittedId[splittedId.length-1] !== 'stuff';
        //                             });
        //                             const stuff = res?.data?.result?.filter((item) => {
        //                                 const splittedId = item.identity?.split('-');
        //                                 return splittedId[splittedId.length-1] === 'stuff';
        //                             });
        //
        //                             getFavoritesByClub()
        //                                 .then((res) => {
        //                                     const favorites = res?.data?.result.filter((item) => {
        //                                         const splittedId = item.identity?.split('-');
        //                                         return splittedId[splittedId.length-1] !== 'stuff';
        //                                     });
        //                                     const favoritesStuff = res?.data?.result?.filter((item) => {
        //                                         const splittedId = item.identity?.split('-');
        //                                         return splittedId[splittedId.length-1] === 'stuff';
        //                                     });
        //
        //                                     if(club) {
        //                                         switch(page) {
        //                                             case 1:
        //                                                 setRenderSwitch(<ClubAccountStart club={club}
        //                                                                                   playersProp={players}
        //                                                                                   favorites={favorites} />);
        //                                                 break;
        //                                             case 2:
        //                                                 setRenderSwitch(<SearchPlayersPage club={club}
        //                                                                                    playersProp={players}
        //                                                                                    favorites={favorites} />);
        //                                                 break;
        //                                             case 3:
        //                                                 setRenderSwitch(<ComparatorPage club={club} />);
        //                                                 break;
        //                                             case 4:
        //                                                 setRenderSwitch(<PlayerPage club={club} />);
        //                                                 break;
        //                                             case 5:
        //                                                 setRenderSwitch(<Favorites club={club}
        //                                                                            playersProp={players}
        //                                                                            favorites={favorites} />);
        //                                                 break;
        //                                             case 6:
        //                                                 setRenderSwitch(<CreateSquadPage club={club} />);
        //                                                 break;
        //                                             case 7:
        //                                                 setRenderSwitch(<ClubTeamsPage club={club} />);
        //                                                 break;
        //                                             case 8:
        //                                                 setRenderSwitch(<ChatPage club={club} />);
        //                                                 break;
        //                                             case 9:
        //                                                 setRenderSwitch(<Notifications club={club} />);
        //                                                 break;
        //                                             case 10:
        //                                                 setRenderSwitch(<ChangePassword club={club} />);
        //                                                 break;
        //                                             case 11:
        //                                                 setRenderSwitch(<SearchStuffPage club={club}
        //                                                                                    playersProp={stuff}
        //                                                                                    favorites={favoritesStuff} />);
        //                                                 break;
        //                                             case 12:
        //                                                 setRenderSwitch(<FavoritesStuff club={club}
        //                                                                            favorites={favoritesStuff} />);
        //                                                 break;
        //                                             default:
        //                                                 setRenderSwitch(<ClubAccountStart club={club} favorites={favorites} />);
        //                                                 break;
        //                                         }
        //                                     }
        //                                     else {
        //                                         getUserData()
        //                                             .then((res) => {
        //                                                 if(res?.data?.result) window.location = "/rozpocznij";
        //                                                 else window.location = "/";
        //                                             });
        //                                     }
        //                                 });
        //                         });
        //                 });
        //         }
        //     });
    }, []);

    return <>
        {loaded ? <TestClubContext.Provider value={{testClub}}>
            {renderSwitch}
        </TestClubContext.Provider> : <LoadingPage dark={true} />}
    </>
}

export default ClubWrapper;
export { TestClubContext };
