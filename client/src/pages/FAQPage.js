import React from 'react'
import PlayerFAQ from "../components/PlayerFAQ";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FAQPage = ({user, isLocal}) => {
    return <div className="container container--light">
        <Header player={true} loggedIn={true} menu="dark" profileImage={user.file_path} isLocal={isLocal} />
        <main className="siteWidthSuperNarrow faqPage">
            <PlayerFAQ />
        </main>
        <Footer theme="light" border={true} />
    </div>
}

export default FAQPage;
