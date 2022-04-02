import React, {useEffect, useRef, useState} from 'react'
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import {getTerms, sendInfoAboutTermsUpdate, updateTerms} from "../helpers/admin";

const AdminTerms = ({lang}) => {
    const [status, setStatus] = useState(-1);

    const [terms, setTerms] = useState(null);
    const [policy, setPolicy] = useState(null);
    const [cookies, setCookies] = useState(null);
    const [mailSend, setMailSend] = useState(0);

    useEffect(() => {
        if(lang) {
            getTerms(lang)
                .then((res) => {
                    const result = res?.data?.result;
                    if(result) {
                        if(result.terms_of_service) setTerms(EditorState.createWithContent(convertFromRaw(JSON.parse(result.terms_of_service))));
                        if(result.privacy_policy) setPolicy(EditorState.createWithContent(convertFromRaw(JSON.parse(result.privacy_policy))));
                        if(result.cookies_policy) setCookies(EditorState.createWithContent(convertFromRaw(JSON.parse(result.cookies_policy))));
                    }
                });
        }
    }, [lang]);

    useEffect(() => {
        if(status !== -1) window.scrollTo(0, 0);
    }, [status]);

    const handleSubmit = () => {
        updateTerms(JSON.stringify(convertToRaw(terms?.getCurrentContent())),
            JSON.stringify(convertToRaw(policy?.getCurrentContent())),
            JSON.stringify(convertToRaw(cookies?.getCurrentContent())),
            lang)
            .then((res) => {
                if(res?.data?.result) setStatus(1);
                else setStatus(0);
            });
    }

    const sendInfoAboutTermsChange = () => {
        sendInfoAboutTermsUpdate()
            .then((res) => {
                if(res?.data?.result) setMailSend(1);
                else setMailSend(-1);
            })
            .catch(() => {
                setMailSend(-1);
            });
    }

    return <div className="container container--dark container--admin">
        <AdminTop />
        <main className="admin">
            <PanelMenu menuOpen={8} />
            <main className="admin__main">
                <header className="admin__flex">
                    <h1 className="admin__main__header">
                        Edytuj regulaminy - wersja {lang === 'pl' ? "polska" : "angielska"}
                    </h1>
                    {status !== -1 ? <span className="admin__status">
                        {status === 1 ? <span className="admin__status__inner admin__status--success">
                            Treści zostały zaktualizowane
                        </span> : (status === 2) ? <span className="admin__status__inner admin__status--success">
                            Treści zostały zaktualizowane
                        </span> : <span className="admin__status__inner admin__status--error">
                            Coś poszło nie tak... Skontaktuj się z administratorem systemu
                        </span>}
                    </span> : ""}
                    {!mailSend ? <button className='admin__btn admin__btn--sendMail' onClick={() => { sendInfoAboutTermsChange(); }}>
                        Wyślij maila o zmianie regulaminu
                    </button> : (mailSend === 1 ? <span className="sendMailInfo">
                        Mail został pomyślnie wysłany
                    </span> : <span className="sendMailInfo">
                        Coś poszło nie tak... Prosimy spróbować później
                    </span>)}
                </header>
                <main className="admin__editorWrapper">
                    <div className="admin__label admin__label--100 admin__label--terms">
                        Regulamin
                        <Editor
                            editorState={terms}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editor"
                            onEditorStateChange={(text) => { setTerms(text); }}
                        />
                    </div>
                    <div className="admin__label admin__label--100 admin__label--terms">
                        Polityka prywatności
                        <Editor
                            editorState={policy}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editor"
                            onEditorStateChange={(text) => { setPolicy(text); }}
                        />
                    </div>
                    <div className="admin__label admin__label--100 admin__label--terms">
                        Polityka plików cookies
                        <Editor
                            editorState={cookies}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editor"
                            onEditorStateChange={(text) => { setCookies(text); }}
                        />
                    </div>
                </main>
                <button className="admin__btn admin__btn--addArticle" onClick={() => { handleSubmit() }}>
                    Aktualizuj treści
                </button>
            </main>
        </main>
    </div>
}

export default AdminTerms;
