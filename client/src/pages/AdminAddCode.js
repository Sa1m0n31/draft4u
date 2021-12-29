import React, {useEffect, useRef, useState} from 'react'
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {addCoupon, getCoupon, updateCoupon} from "../helpers/coupon";

const AdminAddCode = () => {
    const [title, setTitle] = useState("");
    const [discount, setDiscount] = useState(0);
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [limit, setLimit] = useState(1);
    const [updateMode, setUpdateMode] = useState(false);
    const [status, setStatus] = useState(-1);
    const [codeId, setCodeId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const codeToUpdate = params.get('id');

        if(codeToUpdate) {
            setCodeId(parseInt(codeToUpdate));
            getCoupon(codeToUpdate)
                .then((res) => {
                    setUpdateMode(true);
                    const result = res?.data?.result[0];
                    if(result) {
                        setTitle(result.name);
                        setDiscount(result.value);
                        setDateFrom(result.date_from?.substring(0, 10));
                        setDateTo(result.date_to?.substring(0, 10));
                        setLimit(result.use_limit);
                    }
                });
        }
    }, []);

    useEffect(() => {
        if(status !== -1) window.scrollTo(0, 0);
    }, [status]);

    const handleSubmit = () => {
        if(title) {
            if(!updateMode) {
                addCoupon(title, discount, dateFrom, dateTo, limit)
                    .then((res) => {
                        setStatus(res?.data?.result);
                    });
            }
            else {
                updateCoupon(codeId, title, discount, dateFrom, dateTo, limit)
                    .then((res) => {
                        setStatus(res?.data?.result);
                    });
            }
        }
    }

    return <div className="container container--dark container--admin">
        <AdminTop />
        <main className="admin">
            <PanelMenu menuOpen={4} />
            <main className="admin__main">
                <header className="admin__flex">
                    <h1 className="admin__main__header">
                        Dodaj nowy kod rabatowy
                    </h1>
                    {status !== -1 ? <span className="admin__status">
                        {status === 1 ? <span className="admin__status__inner admin__status--success">
                            Kod rabatowy został dodany
                        </span> : (status === 2) ? <span className="admin__status__inner admin__status--success">
                            Kod rabatowy został zaktualizowany
                        </span> : <span className="admin__status__inner admin__status--error">
                            Coś poszło nie tak... Skontaktuj się z administratorem systemu
                        </span>}
                    </span> : ""}
                </header>
                <section className="admin__articleTitle">
                    <label className="admin__label admin__label--100">
                        Kod
                        <input className="admin__input"
                               name="title"
                               value={title}
                               onChange={(e) => { setTitle(e.target.value); }}
                               placeholder="Tu wpisz kod rabatowy" />
                    </label>
                    <label className="admin__label admin__label--100">
                        Zniżka (w procentach)
                        <input className="admin__input"
                               name="discount"
                               type="number"
                               min={0}
                               value={discount}
                               onChange={(e) => { setDiscount(e.target.value); }}
                               placeholder="Tu wpisz procent zniżki" />
                    </label>
                    <label className="admin__label admin__label--100">
                        Ważny od
                        <input className="admin__input"
                               name="dateFrom"
                               type="date"
                               value={dateFrom}
                               onChange={(e) => { setDateFrom(e.target.value); }} />
                    </label>
                    <label className="admin__label admin__label--100">
                        Ważny do
                        <input className="admin__input"
                               name="dateTo"
                               type="date"
                               value={dateTo}
                               onChange={(e) => { setDateTo(e.target.value); }} />
                    </label>
                    <label className="admin__label admin__label--100">
                        Maksymalna liczba użycia kodu
                        <input className="admin__input"
                               name="limit"
                               type="number"
                               value={limit}
                               onChange={(e) => { setLimit(e.target.value); }}
                               placeholder="Tu wpisz maksymalną liczbę możliwych użyć kodu" />
                    </label>
                </section>
                <button className="admin__btn admin__btn--addArticle" onClick={() => { handleSubmit() }}>
                    {updateMode ? "Aktualizuj kod" : "Dodaj kod"}
                </button>
            </main>
        </main>
    </div>
}

export default AdminAddCode;
