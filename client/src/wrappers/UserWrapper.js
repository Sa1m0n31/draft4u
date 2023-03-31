import React, {useContext, useEffect, useState} from 'react'
import LoadingPage from "../pages/LoadingPage";
import {isLoggedIn, logoutUser} from "../helpers/auth";
import {getUserData, getUserSubscription} from "../helpers/user";
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
import {ContentContext, StuffContext} from "../App";
import PlayerPage from "../pages/PlayerPage";
import Community from "../pages/Community";
import {addTrailingZero} from "../helpers/others";

const UserContext = React.createContext(5);

const UserWrapper = ({page}) => {
    const [days, setDays] = useState(100);
    const [loaded, setLoaded] = useState(false);
    const [renderSwitch, setRenderSwitch] = useState(null);

    const { isStuff, setIsStuff } = useContext(StuffContext);
    const { language } = useContext(ContentContext);

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
                                    getUserSubscription(user.id)
                                        .then((res) => {
                                            const result = res?.data?.result[0];
                                            setLoaded(true);
                                            if(result) {
                                                if(result.subscription) {
                                                    const currentDate = new Date().getTime() - 1000 * 60 * 60;
                                                    const expireDate = new Date(Date.parse(result.subscription)).getTime();
                                                    const nextPaymentDateObject = new Date(Date.parse(result.subscription));
                                                    nextPaymentDateObject.setDate(nextPaymentDateObject.getDate() - 1);

                                                    const daysToExpire = Math.ceil((expireDate - currentDate) / 86400000);
                                                    setDays(daysToExpire);
                                                }
                                                else {
                                                    setDays(0);
                                                }
                                            }
                                        });

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
        {loaded ? <>
            {renderSwitch}

            {days <= 0 ? <h3 className="expireSubscriptionInfo">
                {language === 'pl' ? 'Twoja subskrypcja wygasła i nie jesteś widoczny dla klubów. ' : 'Your subscription expired and you are not visible for clubs '}
                <a href="/zaplac">
                    {language === 'pl' ? 'Zaplac teraz' : 'Pay now'}
                </a>
            </h3> : ''}
        </> : <LoadingPage />}
    </>
}

export default UserWrapper;
export { UserContext };
