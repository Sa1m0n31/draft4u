import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import PaymentForm from "../components/PaymentForm";

const PaymentPage = ({user}) => {
    const [cost, setCost] = useState(0);
    const [type, setType] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        switch(parseInt(urlParams.get('pakiet'))) {
            case 1:
                setCost(199);
                setType("miesięczny");
                break;
            case 2:
                setCost(399);
                setType("3 miesięczny");
                break;
            default:
                setCost(999);
                setType("roczny");
                break;
        }
    }, []);

    return <div className="container container--light">
        <Header player={true} loggedIn={true} menu="dark" profileImage={user.file_path} />
        <PaymentForm cost={cost} type={type} />
        <Footer theme="light" />
    </div>
}

export default PaymentPage;
