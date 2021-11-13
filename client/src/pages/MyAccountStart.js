import React, {useContext, useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyAccountStartHeader from "../components/MyAccountStartHeader";
import BlogSection from "../components/BlogSection";
import ClubActivities from "../components/ClubActivities";
import MyAccountStartBottom from "../components/MyAccountStartBottom";

const MyAccountStart = ({user}) => {
    const [fullName, setFullName] = useState("");

    useEffect(() => {
        console.log(user);
        setFullName(user.first_name + " " + user.last_name);
    }, []);

    return <div className="container container--light">
        <Header loggedIn={true} player={true} menu="dark" profileImage={user.file_path} />

        <MyAccountStartHeader fullName={fullName} image={user.file_path} />
        <BlogSection />
        <ClubActivities />
        <MyAccountStartBottom userId={user.id} />

        <Footer theme="light" border={true} />
    </div>
}

export default MyAccountStart;
