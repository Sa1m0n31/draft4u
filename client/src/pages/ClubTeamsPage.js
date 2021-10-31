import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";

const ClubTeamsPage = ({club}) => {
    return <div className="container container--dark">
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club.file_path} />

        <Footer theme="dark" border={true} />
    </div>
}

export default ClubTeamsPage;
