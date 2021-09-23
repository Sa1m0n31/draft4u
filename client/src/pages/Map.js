import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import MapContent from "../components/MapContent";

const Map = () => {
    return <div className="container container--light">
        <Header menu="dark" />
        <MapContent />
        <Footer theme="light" border={true} />
    </div>
}

export default Map;
