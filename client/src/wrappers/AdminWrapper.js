import React, {useEffect, useState} from 'react'
import LoadingPage from "../pages/LoadingPage";
import {isLoggedIn} from "../helpers/auth";
import AdminPanel from "../pages/AdminPanel";
import AdminAddNotification from "../pages/AdminAddNotification";
import AdminNotificationList from "../pages/AdminNotificationList";
import AdminAddClub from "../pages/AdminAddClub";
import AdminClubsList from "../pages/AdminClubsList";

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
                            setRenderSwitch(<AdminClubsList admin={result} />);
                            break;
                        case 5:
                            setRenderSwitch(<AdminAddNotification admin={result} />);
                            break;
                        case 6:
                            setRenderSwitch(<AdminNotificationList admin={result} />);
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
