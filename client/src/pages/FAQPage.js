import React from 'react'
import PlayerFAQ from "../components/PlayerFAQ";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FAQPage = ({user}) => {
    return <div className="container container--light">
        <Header player={true} loggedIn={true} menu="dark" profileImage={user.file_path} />
        <main className="siteWidthSuperNarrow faqPage">
            <PlayerFAQ />
        </main>
        <Footer theme="dark" />
    </div>
}

export default FAQPage;
