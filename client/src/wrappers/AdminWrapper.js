import React, {useEffect, useState} from 'react'
import LoadingPage from "../pages/LoadingPage";
import {isLoggedIn} from "../helpers/auth";
import AdminPanel from "../pages/AdminPanel";

const AdminWrapper = ({page}) => {
    const [loaded, setLoaded] = useState(false);
    const [renderSwitch, setRenderSwitch] = useState(null);

    useEffect(() => {
        isLoggedIn()
            .then((res) => {
                if(!res?.data?.result) window.location = "/";
                else {
                    setLoaded(true);
                    switch(page) {
                        case 1:
                            setRenderSwitch(<AdminPanel admin={res?.data?.result} />);
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
