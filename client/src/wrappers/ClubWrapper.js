import React, {useEffect, useState} from 'react'
import LoadingPage from "../pages/LoadingPage";
import ClubAccountStart from "../pages/ClubAccountStart";
import SearchPlayersPage from "../pages/SearchPlayersPage";
import {isLoggedIn} from "../helpers/auth";
import {getClubData, getFavoritesByClub} from "../helpers/club";
import {getUserData} from "../helpers/user";

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
                                    console.log(res.data);

                                    if(club) {
                                        switch(page) {
                                            case 1:
                                                setRenderSwitch(<ClubAccountStart club={club} favorites={favorites} />);
                                                break;
                                            case 2:
                                                setRenderSwitch(<SearchPlayersPage club={club} favorites={favorites} />);
                                                break;
                                            // case 3:
                                            //     setRenderSwitch(<FAQPage user={user} />);
                                            //     break;
                                            // case 4:
                                            //     setRenderSwitch(<VideoUploadPage user={user} />);
                                            //     break;
                                            // case 5:
                                            //     setRenderSwitch(<PaymentPage user={user} />);
                                            //     break;
                                            // case 6:
                                            //     setRenderSwitch(<PaymentReturnPage user={user} />);
                                            //     break;
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
