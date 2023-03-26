import React, {useContext, useEffect, useState} from 'react'
import {getUserFavorites, getUserVisited} from "../helpers/user";
import settings from "../settings";
import {ContentContext} from "../App";
import ClubListModal from "./ClubListModal";
import ClubDetailsModal from "./ClubDetailsModal";

const ClubActivities = ({userId}) => {
    const [visitors, setVisitors] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [clubListModalVisible, setClubListModalVisible] = useState(false);
    const [clubDetails, setClubDetails] = useState(null);

    const { content, language } = useContext(ContentContext);

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

        {clubDetails ? <ClubDetailsModal club={clubDetails}
                                         closeModal={() => { setClubDetails(null); }} /> : ''}

        <h3 className="clubActivities__subheader">
            {content.club_activities_header1}
        </h3>
        <section className="clubActivities__list">
            {visitors.length ? visitors.map((item, index) => {
                return item?.file_path ? <button className="clubActivities__list__btn"
                                                 onClick={() => { setClubDetails(item); }}>
                    <img key={index} className="clubActivities__img" src={`${settings.IMAGE_URL}/image?url=/media/clubs/${item.file_path}`} alt="klub" />
                </button> : '';
            }) : <h3 className="clubActivities__empty">
                {content.club_activities_text1}
            </h3>}
        </section>

        <h3 className="clubActivities__subheader">
            {content.club_activities_header2}
        </h3>
        <section className="clubActivities__list">
            {favorites.length ? favorites.map((item, index) => {
                return item?.file_path ? <button className="clubActivities__list__btn"
                                                 onClick={() => { setClubDetails(item); }}>
                        <img key={index} className="clubActivities__img" src={`${settings.IMAGE_URL}/image?url=/media/clubs/${item.file_path}`} alt="klub" />
                </button>: '';
            }) : <h3 className="clubActivities__empty">
                {content.club_activities_text2}
            </h3> }
        </section>

        <button className="btn btn--sendCv btn--hover btn--gradient center goldman"
                onClick={() => { setClubListModalVisible(true); }}>
            {language === 'pl' ? 'Wyślij CV do klubu' : 'Send CV to club'}
        </button>
    </section>
}

export default ClubActivities;
