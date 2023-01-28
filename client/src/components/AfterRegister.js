import React, {useEffect, useState} from 'react';
import check from '../static/img/check-gold.svg';

const AfterRegister = ({club}) => {
    const [confirmText, setConfirmText] = useState('');

    useEffect(() => {
        if(club) {
            setConfirmText('Twoje konto zostało założone! Poinformujemy Cię drogą mailową, gdy administratorzy zatwierdzą Twój klub.');
        }
        else {
            setConfirmText('Twoje konto zostało założone! Na podany adres e-mail wysłaliśmy link aktywacyjny. Kliknij w niego i dołącz do społeczności Draft4U!')
        }
    }, [club]);

    return <div className="afterRegister">
        <img className="checkImg" src={check} alt="sukces" />

        <h3 className="afterRegister__header">
            {confirmText}
        </h3>

        <a href="/" className="btn btn--gradient goldman center btn--afterRegister">
            Wróć na stronę główną
        </a>
    </div>
};

export default AfterRegister;
