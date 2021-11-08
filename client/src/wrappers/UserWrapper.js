import React, {useEffect, useState} from 'react'
import LoadingPage from "../pages/LoadingPage";
import {isLoggedIn} from "../helpers/auth";
import {getUserData} from "../helpers/user";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MyAccountStart from "../pages/MyAccountStart";
import PlayerProfileEdition from "../pages/PlayerProfileEdition";
import FAQPage from "../pages/FAQPage";
import VideoUploadPage from "../pages/VideoUploadPage";
import PaymentPage from "../pages/PaymentPage";
import {render} from "@testing-library/react";
import PaymentReturnPage from "../pages/PaymentReturnPage";
import {getClubData} from "../helpers/club";
import ChatPageForUser from "../pages/ChatPageForUser";

const UserContext = React.createContext(5);

const UserWrapper = ({page}) => {
    const [loaded, setLoaded] = useState(false);
    const [renderSwitch, setRenderSwitch] = useState(null);

    useEffect(() => {
        console.log("is logged in?");
        isLoggedIn()
            .then((res) => {
                if(!res?.data?.result) {
                    window.location = "/";
                }
                else {
                    getUserData()
                        .then((res) => {
                            setLoaded(true);

                            const user = res?.data?.result;

                            if(user) {
                                switch(page) {
                                    case 1:
                                        setRenderSwitch(<MyAccountStart user={user} />);
                                        break;
                                    case 2:
                                        setRenderSwitch(<PlayerProfileEdition user={user} />);
                                        break;
                                    case 3:
                                        setRenderSwitch(<FAQPage user={user} />);
                                        break;
                                    case 4:
                                        setRenderSwitch(<VideoUploadPage user={user} />);
                                        break;
                                    case 5:
                                        setRenderSwitch(<PaymentPage user={user} />);
                                        break;
                                    case 6:
                                        setRenderSwitch(<PaymentReturnPage user={user} />);
                                        break;
                                    case 7:
                                        setRenderSwitch(<ChatPageForUser user={user} />);
                                        break;
                                    default:
                                        setRenderSwitch(<PlayerProfileEdition user={user} />);
                                        break;
                                }
                            }
                            else {
                                getClubData()
                                    .then((res) => {
                                        if(res?.data?.result) {
                                            window.location = "/konto-klubu";
                                        }
                                        else {
                                            window.location = "/";
                                        }
                                    });
                            }
                        });
                }
            });
    }, []);

    return <>
        {loaded ? renderSwitch : <LoadingPage />}
    </>
}

export default UserWrapper;
export { UserContext };
