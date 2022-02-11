import React, {useEffect, useState} from 'react'
import LoadingPage from "../pages/LoadingPage";
import {isLoggedIn} from "../helpers/auth";
import AdminPanel from "../pages/AdminPanel";
import AdminAddNotification from "../pages/AdminAddNotification";
import AdminNotificationList from "../pages/AdminNotificationList";
import AdminAddClub from "../pages/AdminAddClub";
import AdminClubsList from "../pages/AdminClubsList";
import AdminAddArticle from "../pages/AdminAddArticle";
import AdminArticlesList from "../pages/AdminArticlesList";
import AdminChangePassword from "../pages/AdminChangePassword";
import AdminAddCode from "../pages/AdminAddCode";
import AdminCodesList from "../pages/AdminCodesList";
import AdminPlayersList from "../pages/AdminPlayersList";
import AdminMailingList from "../pages/AdminMailingList";
import AdminPlayerInfo from "../pages/AdminPlayerInfo";
import AdminContent from "../pages/AdminContent";
import AdminImages from "../pages/AdminImages";
import AdminTerms from "../pages/AdminTerms";

const AdminWrapper = ({page}) => {
    const [loaded, setLoaded] = useState(false);
    const [renderSwitch, setRenderSwitch] = useState(null);

    useEffect(() => {
        isLoggedIn()
            .then((res) => {
                if(!res?.data?.result) window.location = "/";
                else {
                    setLoaded(true);
                    const result = res?.data?.result;
                    switch(page) {
                        case 1:
                            setRenderSwitch(<AdminPanel admin={result} />);
                            break;
                        case 2:
                            setRenderSwitch(<AdminAddClub admin={result} />);
                            break;
                        case 3:
                            setRenderSwitch(<AdminClubsList admin={result} />);
                            break;
                        case 4:
                            setRenderSwitch(<AdminPlayersList admin={result} />);
                            break;
                        case 5:
                            setRenderSwitch(<AdminAddNotification admin={result} />);
                            break;
                        case 6:
                            setRenderSwitch(<AdminNotificationList admin={result} />);
                            break;
                        case 7:
                            setRenderSwitch(<AdminAddArticle admin={result} />);
                            break;
                        case 8:
                            setRenderSwitch(<AdminArticlesList admin={result} />);
                            break;
                        case 9:
                            setRenderSwitch(<AdminChangePassword admin={result} />);
                            break;
                        case 10:
                            setRenderSwitch(<AdminAddCode admin={result} />);
                            break;
                        case 11:
                            setRenderSwitch(<AdminCodesList admin={result} />);
                            break;
                        case 12:
                            setRenderSwitch(<AdminMailingList admin={result} />);
                            break;
                        case 13:
                            setRenderSwitch(<AdminPlayerInfo admin={result} />);
                            break;
                        case 14:
                            setRenderSwitch(<AdminContent admin={result} lang="pl" />);
                            break;
                        case 15:
                            setRenderSwitch(<AdminContent admin={result} lang="en" />);
                            break;
                        case 16:
                            setRenderSwitch(<AdminImages admin={result} lang="pl" />);
                            break;
                        case 17:
                            setRenderSwitch(<AdminImages admin={result} lang="en" />);
                            break;
                        case 18:
                            setRenderSwitch(<AdminTerms admin={result} lang="pl" />);
                            break;
                        case 19:
                            setRenderSwitch(<AdminTerms admin={result} lang="en" />);
                            break;
                        default:
                            break;
                    }
                }
            });
    }, []);

    return <>
        {loaded ? renderSwitch : <LoadingPage />}
    </>
}

export default AdminWrapper;
