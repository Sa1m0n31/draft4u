import React from 'react'

import fbIcon from '../static/img/facebook.svg'
import instaIcon from '../static/img/instagram.svg'
import ytIcon from '../static/img/youtube.svg'

const Footer = ({theme, border}) => {
    return <footer id={border ? "footerBorder" : ""} className={theme === "dark" ? "footer footer--dark" : (theme === "light" ? "footer footer--light" : "footer footer--dark footer--light--mobile")}>
        <div className="footer__inner">
            <section className="footer__col">
                <h4 className="footer__col__header">
                    Kontakt
                </h4>
                <ul className="footer__col__list footer__col__list--contact">
                    <li className="footer__col__list__item footer__contactItem">
                        <span>Tel</span>
                        <a className="footer__col__list__item__link" href="tel:+48790731997">
                            790 731 997
                        </a>
                    </li>
                    <li className="footer__col__list__item footer__contactItem">
                        <span>Tel</span>
                        <a className="footer__col__list__item__link" href="tel:+48 535480814">
                            535 480 814
                        </a>
                    </li>
                    <li className="footer__col__list__item footer__contactItem">
                        <span>Mail</span>
                        <a className="footer__col__list__item__link" href="mailto:biuro@draft4u.com.pl">
                            biuro@draft4u.com.pl
                        </a>
                    </li>
                </ul>
            </section>

            <section className="footer__col">
                <h4 className="footer__col__header">
                    Informacje dodatkowe
                </h4>
                <ul className="footer__col__list">
                    <li className="footer__col__list__item">
                        <a className="footer__col__list__item__link">
                            Regulamin
                        </a>
                    </li>
                    <li className="footer__col__list__item">
                        <a className="footer__col__list__item__link">
                            Polityka prywatności
                        </a>
                    </li>
                    <li className="footer__col__list__item">
                        <a className="footer__col__list__item__link">
                            Regulalmin RODO
                        </a>
                    </li>
                    <li className="footer__col__list__item">
                        <a className="footer__col__list__item__link">
                            Regulamin plików cookies
                        </a>
                    </li>
                </ul>
            </section>

            <section className="footer__col">
                <h4 className="footer__col__header">
                    Dołącz do nas
                </h4>
                <ul className="footer__col__list--socialMedia">
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
            </section>
        </div>
    </footer>
}

export default Footer;
