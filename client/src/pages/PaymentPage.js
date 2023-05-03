import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import PaymentForm from "../components/PaymentForm";
import {getPaymentMethods} from "../helpers/payment";
import {getAllCoupons} from "../helpers/coupon";

const PaymentPage = ({user, isLocal, days}) => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        getPaymentMethods()
            .then((res) => {
                setPaymentMethods(res?.data?.result?.filter((item) => {
                    return item.status;
                }));
            });

        getAllCoupons()
            .then((res) => {
                setCoupons(res?.data?.result);
            });
    }, []);

    return <div className="container container--light">
        <Header player={true}
                loggedIn={true}
                menu="dark"
                profileImage={user.file_path}
                isLocal={isLocal} />
        <PaymentForm methods={paymentMethods}
                     coupons={coupons}
                     userId={user.id}
                     daysToExpire={days}
                     email={user.email} />
        <Footer border={true} />
    </div>
}

export default PaymentPage;
