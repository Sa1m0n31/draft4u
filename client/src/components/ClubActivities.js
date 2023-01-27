import React, {useContext, useEffect, useState} from 'react'
import {getUserFavorites, getUserVisited} from "../helpers/user";
import settings from "../settings";
import {ContentContext} from "../App";
import ClubListModal from "./ClubListModal";

const ClubActivities = ({userId}) => {
    const [visitors, setVisitors] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [clubListModalVisible, setClubListModalVisible] = useState(false);

    const { content } = useContext(ContentContext);

    useEffect(() => {
        getUserVisited()
            .then((res) => {
                setVisitors(res?.data?.result);
            });

        getUserFavorites()
            .then((res) => {
                setFavorites(res?.data?.result);
            });
    }, []);

    return <section className="clubActivities siteWidthSuperNarrow">
        {clubListModalVisible ? <ClubListModal closeModal={() => { setClubListModalVisible(false); }}
                                               userId={userId} /> : ''}

        {/*<figure className="clubActivities__imgHeader">*/}
        {/*    <img className="btn__img" src={getImageUrl(content.img4)} alt="aktywnosci-klubow" />*/}
        {/*</figure>*/}
        <h3 className="clubActivities__subheader">
            {content.club_activities_header1}
        </h3>
        <section className="clubActivities__list">
            {visitors.length ? visitors.map((item, index) => {
                return item?.file_path ? <img key={index} className="clubActivities__img" src={`${settings.API_URL}/image?url=/media/clubs/${item.file_path}`} alt="klub" /> : '';
            }) : <h3 className="clubActivities__empty">
                {content.club_activities_text1}
            </h3>}
        </section>

        <h3 className="clubActivities__subheader">
            {content.club_activities_header2}
        </h3>
        <section className="clubActivities__list">
            {favorites.length ? favorites.map((item, index) => {
                return item?.file_path ? <img key={index} className="clubActivities__img" src={`${settings.API_URL}/image?url=/media/clubs/${item.file_path}`} alt="klub" /> : '';
            }) : <h3 className="clubActivities__empty">
                {content.club_activities_text2}
            </h3> }
        </section>

        <button className="btn btn--sendCv btn--hover btn--gradient center goldman"
                onClick={() => { setClubListModalVisible(true); }}>
            Wyślij CV do klubu
        </button>
    </section>
}

export default ClubActivities;
