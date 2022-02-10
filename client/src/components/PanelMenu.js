import React, {useState} from 'react'
import clubs from '../static/img/admin-teams.svg'
import players from '../static/img/admin-players.svg'
import notifications from '../static/img/admin-notifications.svg'
import articles from '../static/img/admin-articles.svg'
import settings from '../static/img/admin-settings.svg'
import mail from '../static/img/letter-icon.svg'
import pen from '../static/img/pen-white.png'
import camera from '../static/img/camera.svg'

const PanelMenu = ({menuOpen, menuSelected}) => {
    const [submenu, setSubmenu] = useState(-1);

    const menu = [
        { name: 'Kluby', icon: clubs },
        { name: 'Zawodnicy', icon: players },
        { name: 'Powiadomienia', icon: notifications },
        { name: 'Artykuły', icon: articles },
        { name: 'Kody rabatowe', icon: settings },
        { name: 'Newsletter', icon: mail },
        { name: 'Treści', icon: pen },
        { name: 'Grafiki', icon: camera },
        { name: 'Regulaminy', icon: articles }
    ]

    const submenus = [
        [
            {name: 'Dodaj klub', link: '/dodaj-klub'},
            {name: 'Lista klubów', link: '/lista-klubow'}
        ],
        [
            {name: 'Lista zawodników', link: '/lista-zawodnikow'}
        ],
        [
            {name: 'Dodaj powiadomienie', link: '/dodaj-powiadomienie'},
            {name: 'Lista powiadomień', link: '/lista-powiadomien'}
        ],
        [
            {name: 'Dodaj artykuł', link: '/dodaj-artykul'},
            {name: 'Lista artykułów', link: '/lista-artykulow'}
        ],
        [
            {name: 'Dodaj kod rabatowy', link: '/dodaj-kod'},
            {name: 'Lista kodów', link: '/lista-kodow'}
        ],
        [
            { name: 'Lista mailingowa', link: '/lista-mailingowa' }
        ],
        [
            { name: "Wersja polska", link: '/polski' },
            { name: "Wersja angielska", link: '/angielski' }
        ],
        [
            { name: "Wersja polska", link: '/grafiki-polski' },
            { name: "Wersja angielska", link: '/grafiki-angielski' }
        ],
        [
            { name: "Wersja polska", link: '/regulaminy-polski' },
            { name: "Wersja angielska", link: '/regulaminy-angielski' }
        ]
    ]

    return <menu className="panelMenu">
        <ul className="panelMenu__list">
            {menu.map((item, index) => {
                return <li className="panelMenu__list__item" key={index}>
                    <button className={submenu === index || menuOpen === index ? "panelMenu__list__item__link panelMenu__list__item__link--selected" : "panelMenu__list__item__link"}
                            onClick={() => { if(submenu !== index) setSubmenu(index); else setSubmenu(-1); }}>
                        <img className="panelMenu__list__item__icon" src={item.icon} alt={item.name} />
                        {item.name}
                    </button>
                    {submenu === index || menuOpen === index ? <ul className="panelMenu__submenu">
                        {submenus[index].map((item, index) => {
                            return <li className="panelMenu__submenu__item" key={index}>
                                <a className="panelMenu__submenu__link" href={item.link}>
                                    {item.name}
                                </a>
                            </li>
                        })}
                    </ul> : ""}
                </li>
            })}
        </ul>
    </menu>
}

export default PanelMenu;
