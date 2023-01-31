import React, {useContext, useEffect, useState} from 'react'
import LoadingPage from "../pages/LoadingPage";
import {isLoggedIn, logoutUser} from "../helpers/auth";
import {getUserData} from "../helpers/user";
import MyAccountStart from "../pages/MyAccountStart";
import PlayerProfileEdition from "../pages/PlayerProfileEdition";
import FAQPage from "../pages/FAQPage";
import VideoUploadPage from "../pages/VideoUploadPage";
import PaymentPage from "../pages/PaymentPage";
import PaymentReturnPage from "../pages/PaymentReturnPage";
import {getClubData} from "../helpers/club";
import Notifications from "../pages/Notifications";
import {getAdminData} from "../helpers/admin";
import SingleArticle from "../pages/SingleArticle";
import ChangePassword from "../pages/ChangePassword";
import ChatPage from "../pages/ChatPage";
import {StuffContext} from "../App";
import PlayerPage from "../pages/PlayerPage";
import Feed from "../pages/Feed";
import Community from "../pages/Community";

const UserContext = React.createContext(5);

const UserWrapper = ({page}) => {
    const [loaded, setLoaded] = useState(false);
    const [renderSwitch, setRenderSwitch] = useState(null);

    const { isStuff, setIsStuff } = useContext(StuffContext);

    useEffect(() => {
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
                            const isLocal = !user?.adapter || user?.adapter === 1;

                            if(user) {
                                const identitySplited = user.identity.split('-');

                                if(identitySplited[identitySplited.length-1] === 'stuff') {
                                    setIsStuff(true);
                                }

                                if(user.active) {
                                    switch(page) {
                                        case 1:
                                            setRenderSwitch(<MyAccountStart user={user} isLocal={isLocal} />);
                                            break;
                                        case 2:
                                            setRenderSwitch(<PlayerProfileEdition user={user} isLocal={isLocal} />);
                                            break;
                                        case 3:
                                            setRenderSwitch(<FAQPage user={user} isLocal={isLocal} />);
                                            break;
                                        case 4:
                                            setRenderSwitch(<VideoUploadPage user={user} isLocal={isLocal} />);
                                            break;
                                        case 5:
                                            setRenderSwitch(<PaymentPage user={user} isLocal={isLocal} />);
                                            break;
                                        case 6:
                                            setRenderSwitch(<PaymentReturnPage user={user} isLocal={isLocal} />);
                                            break;
                                        case 7:
                                            setRenderSwitch(<ChatPage user={user} isLocal={isLocal} />);
                                            break;
                                        case 8:
                                            setRenderSwitch(<Notifications user={user} isLocal={isLocal} />);
                                            break;
                                        case 9:
                                            setRenderSwitch(<SingleArticle user={user} isLocal={isLocal} />);
                                            break;
                                        case 10:
                                            setRenderSwitch(<ChangePassword user={user} isLocal={isLocal} />);
                                            break;
                                        case 11:
                                            setRenderSwitch(<PlayerPage userInfo={user} isLocal={isLocal} />);
                                            break;
                                        case 12:
                                            setRenderSwitch(<Community user={user} isLocal={isLocal} />);
                                            break;
                                        default:
                                            setRenderSwitch(<PlayerProfileEdition user={user} isLocal={isLocal} />);
                                            break;
                                    }
                                }
                                else {
                                    logoutUser()
                                        .then((res) => {
                                            if(res?.data?.result) window.location = "/";
                                        })
                                }
                            }
                            else {
                                getClubData()
                                    .then((res) => {
                                        if(res?.data?.result) {
                                            window.location = "/konto-klubu";
                                        }
                                        else {
                                            getAdminData()
                                                .then((res) => {
                                                   if(res?.data?.result) window.location = "/panel";
                                                   else window.location = "/";
                                                });
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
