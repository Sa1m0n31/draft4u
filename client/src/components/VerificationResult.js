import React from 'react'
import successImg from '../static/img/success.svg'

const VerificationResult = () => {
    return <main className="verificationResult">
        <section className="verificationResult__flex">
            <img className="verificationResult__img" src={successImg} alt="sukces" />
            <h2 className="verificationResult__header">
                Twoje konto zostało pomyślnie zweryfikowane
            </h2>
        </section>

        <a className="verificationResult__comeBackBtn btn--gradient center goldman" href="/">
            Powrót
        </a>
    </main>
}

export default VerificationResult;
