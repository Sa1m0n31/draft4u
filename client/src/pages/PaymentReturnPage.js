import React, {useContext} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {ContentContext} from "../App";

const PaymentReturnPage = ({user, isLocal}) => {
    const { content } = useContext(ContentContext);

    return <div className="container container--light">
        <Header player={true} loggedIn={true} menu="dark" profileImage={user.file_path} isLocal={isLocal} />
        <main className="pageContent pageContent--paymentReturn">
            <h2 className="pageContent__header">
                {content.ty_page_header}
            </h2>
            <h3 className="pageContent__subheader">
                {content.ty_page_text}
            </h3>
        </main>
        <Footer theme="light" />
    </div>
}

export default PaymentReturnPage;
