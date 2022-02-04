import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";

const PaymentReturnPage = ({user, isLocal}) => {
    return <div className="container container--light">
        <Header player={true} loggedIn={true} menu="dark" profileImage={user.file_path} isLocal={isLocal} />
        <main className="pageContent pageContent--paymentReturn">
            <h2 className="pageContent__header">
                Twoja subskrypcja została pomyślnie przedłużona
            </h2>
            <h3 className="pageContent__subheader">
                Dziękujemy, że jesteś z nami!
            </h3>
        </main>
        <Footer theme="light" />
    </div>
}

export default PaymentReturnPage;
