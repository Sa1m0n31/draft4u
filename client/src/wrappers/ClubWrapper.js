import React, {useEffect, useState} from 'react'
import LoadingPage from "../pages/LoadingPage";
import ClubAccountStart from "../pages/ClubAccountStart";
import SearchPlayersPage from "../pages/SearchPlayersPage";
import {isLoggedIn} from "../helpers/auth";
import {getClubData, getFavoritesByClub} from "../helpers/club";
import {getUserData} from "../helpers/user";
import Player from "../pages/Player";
import PlayerPage from "../pages/PlayerPage";
import ComparatorPage from "../pages/ComparatorPage";
import Favorites from "../pages/Favorites";
import CreateSquadPage from "../pages/CreateSquadPage";
import ClubTeamsPage from "../pages/ClubTeamsPage";

const ClubContext = React.createContext(5);

const ClubWrapper = ({page}) => {
    const [loaded, setLoaded] = useState(false);
    const [renderSwitch, setRenderSwitch] = useState(null);

    useEffect(() => {
        isLoggedIn()
            .then((res) => {
                if(!res?.data?.result) window.location = "/";
                else {
                    getClubData()
                        .then((res) => {
                            setLoaded(true);

                            const club = res?.data?.result;

                            getFavoritesByClub()
                                .then((res) => {
                                    const favorites = res?.data?.result;
                                    console.log(favorites);

                                    if(club) {
                                        switch(page) {
                                            case 1:
                                                setRenderSwitch(<ClubAccountStart club={club} favorites={favorites} />);
                                                break;
                                            case 2:
                                                setRenderSwitch(<SearchPlayersPage club={club} favorites={favorites} />);
                                                break;
                                            case 3:
                                                setRenderSwitch(<ComparatorPage club={club} />);
                                                break;
                                            case 4:
                                                setRenderSwitch(<PlayerPage club={club} />);
                                                break;
                                            case 5:
                                                setRenderSwitch(<Favorites club={club} />);
                                                break;
                                            case 6:
                                                setRenderSwitch(<CreateSquadPage club={club} />);
                                                break;
                                            case 7:
                                                setRenderSwitch(<ClubTeamsPage club={club} />);
                                                break;
                                            default:
                                                setRenderSwitch(<ClubAccountStart user={{}} />);
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
                }
            });
    }, []);

    return <>
        {loaded ? renderSwitch : <LoadingPage />}
    </>
}

export default ClubWrapper;
export { ClubContext };
