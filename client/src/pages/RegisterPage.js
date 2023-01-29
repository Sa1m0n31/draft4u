import React, {useState} from 'react'
import Header from "../components/Header";
import fbIcon from "../static/img/facebook.svg";
import instaIcon from "../static/img/instagram.svg";
import authBackground from "../static/img/auth-background.png";
import RegisterUser from "../components/RegisterUser";
import RegisterClub from "../components/RegisterClub";
import ChooseAccountType from "../components/ChooseAccountType";

const RegisterPage = () => {
    const [accountType, setAccountType] = useState(0); // 0 - player, 1 - stuff, 2 - club

    return <div className="container container--light">
        <Header menu="dark" mobileBackground="black" />

        <div className="chooseAccountTypeModal chooseAccountTypeModal--register">
            <ChooseAccountType chooseAccountType={setAccountType} />
        </div>

        <div className={accountType === 2 ? "authBox authBox--club" : "authBox"}>
            <ul className="authBox__socialMedia">
                <li className="footer__col__list__item">
                    <a className="footer__col__socialMediaLink" href="https://www.facebook.com/Draft4uPolska/" target="_blank">
                        <img className="footer__col__socialMediaLink__img" src={fbIcon} alt="facebook" />
                    </a>
                </li>
                <li className="footer__col__list__item">
                    <a className="footer__col__socialMediaLink" href="https://www.instagram.com/draft4u.com.pl/?fbclid=IwAR2T5cPxFXcSmGdxxpBkclPct0HKQl9ezqeNLdVYwdDYZ_c6E74llzmbihY" target="_blank">
                        <img className="footer__col__socialMediaLink__img" src={instaIcon} alt="instagram" />
                    </a>
                </li>
            </ul>

            <h1 className="authBox__header">
                Rejestracja
            </h1>
            <h2 className="authBox__subheader">
                Twojego konta
            </h2>

            {accountType === 0 ? <RegisterUser type={0} /> :
                (accountType === 1 ? <RegisterUser type={1} /> : <RegisterClub />)}
        </div>

        <img className="authImg" src={authBackground} alt="tlo" />
    </div>
}

export default RegisterPage;
