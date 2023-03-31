import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyAccountStartHeader from "../components/MyAccountStartHeader";
import BlogSection from "../components/BlogSection";
import ClubActivities from "../components/ClubActivities";
import MyAccountStartBottom from "../components/MyAccountStartBottom";
import AddAccountTypeSection from "../components/AddAccountTypeSection";
import {isUserWithTwoAccounts} from "../helpers/user";

const MyAccountStart = ({user, isLocal}) => {
    const [fullName, setFullName] = useState("");
    const [doubleAccount, setDoubleAccount] = useState(true);

    useEffect(() => {
        // For Facebook and Google accounts
        isUserWithTwoAccounts()
            .then((res) => {
                if(res?.data?.result) {
                    localStorage.setItem('2a', '1');
                    setDoubleAccount(true);
                }
                else {
                    localStorage.setItem('2a', '0');
                    setDoubleAccount(false);
                }
            });

        setFullName(user.first_name + " " + user.last_name);
    }, []);

    return <div className="container container--light">
        <Header loggedIn={true} player={true} menu="dark" profileImage={user.file_path} isLocal={isLocal} />

        <MyAccountStartHeader fullName={fullName} image={user.file_path} />
        {!doubleAccount ? <AddAccountTypeSection /> : ''}
        <BlogSection />
        <ClubActivities userId={user?.id} />
        <MyAccountStartBottom userId={user.id} />

        <Footer border={true} />
    </div>
}

export default MyAccountStart;
