import React, {useEffect, useState} from 'react'
import LoadingPage from "../pages/LoadingPage";
import ClubAccountStart from "../pages/ClubAccountStart";
import SearchPlayersPage from "../pages/SearchPlayersPage";

const ClubContext = React.createContext(5);

const ClubWrapper = ({page}) => {
    const [loaded, setLoaded] = useState(false);
    const [renderSwitch, setRenderSwitch] = useState(null);

    useEffect(() => {
        // isLoggedIn()
        //     .then((res) => {
        //         if(!res?.data?.result) window.location = "/";
        //         else {
        //             getUserData()
        //                 .then((res) => {
                            setLoaded(true);

                            //const user = res?.data?.result;

                            switch(page) {
                                case 1:
                                    setRenderSwitch(<ClubAccountStart user={{}} />);
                                    break;
                                case 2:
                                    setRenderSwitch(<SearchPlayersPage user={{}} />);
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
            //             });
            //     }
            // });
    }, []);

    return <>
        {loaded ? renderSwitch : <LoadingPage />}
    </>
}

export default ClubWrapper;
export { ClubContext };
