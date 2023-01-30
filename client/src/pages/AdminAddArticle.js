import React, {useEffect, useRef, useState} from 'react'
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import settings from "../settings";
import trashIcon from "../static/img/trash-black.svg";
import Dropzone from "react-dropzone-uploader";
import {addArticle, generateImageLink, getArticle, updateArticle} from "../helpers/blog";
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import closeIcon from "../static/img/close-grey.svg";

const AdminAddArticle = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [updateImage, setUpdateImage] = useState(false);
    const [img, setImg] = useState(false);
    const [imgForLink, setImgForLink] = useState(false);
    const [imageUpdated, setImageUpdated] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [status, setStatus] = useState(-1);
    const [articleId, setArticleId] = useState(0);
    const [generatedLink, setGeneratedLink] = useState(null);
    const [excerpt, setExcerpt] = useState("");

    const linkModal = useRef(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const articleToUpdate = params.get('id');

        if(articleToUpdate) {
            setArticleId(parseInt(articleToUpdate));
            getArticle(articleToUpdate)
                .then((res) => {
                    setUpdateMode(true);
                    const result = res?.data?.result[0];
                    if(result) {
                        setTitle(result.title);
                        setExcerpt(result.excerpt);
                        setContent(EditorState.createWithContent(convertFromRaw(JSON.parse(result.content))));
                        setUpdateImage(result.file_path);
                    }
                });
        }
    }, []);

    useEffect(() => {
        if(status !== -1) window.scrollTo(0, 0);
    }, [status]);

    const deleteImg = () => {
        if(img) {
            img.remove();
            setImg(null);
        }
        if(updateImage) {
            setUpdateImage(null);
        }
        setImageUpdated(true);
    }

    const deleteImgForLink = () => {
        imgForLink.remove();
        setImgForLink(null);
    }

    const getUploadImage = (img) => {
        console.log(img);
    }

    const handleChangeStatus = (status) => {
        if(updateMode) {
            setImageUpdated(true);
            setUpdateImage(null);
        }
        setImg(status);
    }

    const handleChangeStatusForImageForLink = (status) => {
        setImgForLink(status);

        generateImageLink(imgForLink?.file)
            .then((res) => {
                if(res?.data?.result !== generatedLink && generatedLink !== 'test') setGeneratedLink(res?.data?.result);
                else if(generatedLink === 'test') setGeneratedLink(null);
            });
    }

    const handleSubmit = () => {
        if(content) {
            if(!updateMode) {
                addArticle(title, img?.file, JSON.stringify(convertToRaw(content?.getCurrentContent())), excerpt)
                    .then((res) => {
                        setStatus(res?.data?.result);
                    });
            }
            else {
                updateArticle(articleId, title, imageUpdated ? (img ? img.file : 'delete') : null, JSON.stringify(convertToRaw(content?.getCurrentContent())), excerpt)
                    .then((res) => {
                        setStatus(res?.data?.result);
                    });
            }
        }
    }

    useEffect(() => {
        if(generatedLink && generatedLink !== 'test') {
            linkModal.current.style.zIndex = "10";
            linkModal.current.style.opacity = "1";
        }
        else {
            linkModal.current.style.zIndex = "-1";
            linkModal.current.style.opacity = "0";
        }
    }, [generatedLink]);

    const copyToClipboard = () => {
        const input = document.createElement('textarea');
        input.innerHTML = `${settings.IMAGE_URL}/image?url=/media/blog/${generatedLink}`;
        document.body.appendChild(input);
        input.select();
        const result = document.execCommand('copy');
        document.body.removeChild(input);
        setGeneratedLink('test');
        return result;
    }

    return <div className="container container--dark container--admin">

        <div className="modal modal--deleteSquad" ref={linkModal}>
            <div className="modal__inner">
                <button className="modal__close" onClick={() => { setGeneratedLink(null); }}>
                    <img className="btn__img" src={closeIcon} alt="zamknij" />
                </button>

                <h3 className="modal__header">
                    Link do zdjęcia:
                </h3>
                <h4 className="modal__link">
                    {`${settings.IMAGE_URL}/image?url=/media/blog/${generatedLink}`}
                </h4>

                <button className="modal__btn modal__btn--copy" onClick={() => { copyToClipboard(); }}>
                    Skopiuj link
                </button>
            </div>
        </div>

        <AdminTop />
        <main className="admin">
            <PanelMenu menuOpen={3} />
            <main className="admin__main">
                <header className="admin__flex">
                    <h1 className="admin__main__header">
                        Dodaj nowy artykuł
                    </h1>
                    {status !== -1 ? <span className="admin__status">
                        {status === 1 ? <span className="admin__status__inner admin__status--success">
                            Artykuł został dodany
                        </span> : (status === 2) ? <span className="admin__status__inner admin__status--success">
                            Artykuł został zaktualizowany
                        </span> : <span className="admin__status__inner admin__status--error">
                            Coś poszło nie tak... Skontaktuj się z administratorem systemu
                        </span>}
                    </span> : ""}
                </header>
                <section className="admin__articleTitle">
                    <label className="admin__label admin__label--100">
                        Tytuł
                        <input className="admin__input"
                               name="title"
                               value={title}
                               onChange={(e) => { setTitle(e.target.value); }}
                               placeholder="Tu wpisz tytuł artykułu" />
                    </label>
                    <label className="admin__label admin__label--100">
                        Zajawka
                        <textarea className="admin__input admin__input--excerpt"
                               name="excerpt"
                               value={excerpt}
                               onChange={(e) => { setExcerpt(e.target.value); }}
                               placeholder="Tu wpisz zajawkę artykułu" />
                    </label>
                </section>
                <div className="admin__flex admin__flex--imagesUploadWrapper">
                    <label className="admin__label admin__flex">
                        Dodaj obrazek wyróżniający
                        <span className="admin__label__imgUpload">
                            {updateImage ? <figure className="admin__label__imgUpload__updateImgWrapper">
                                <img className="admin__label__imgUpload__updateImg" src={`${settings.IMAGE_URL}/image?url=/media/blog/${updateImage}`} alt="foto" />
                            </figure> : ""}
                            {img || updateImage ? <button className="admin__label__imgUpload__trashBtn" onClick={(e) => { e.stopPropagation(); e.preventDefault(); deleteImg(); }}>
                                <img className="btn__img" src={trashIcon} alt="usun" />
                            </button> : ""}
                            <Dropzone
                                canRemove={true}
                                getUploadParams={getUploadImage}
                                onChangeStatus={(status) => { handleChangeStatus(status); }}
                                accept="image/*"
                                maxFiles={1} />
                        </span>
                    </label>

                    <label className="admin__label admin__flex admin__label--imageForLink">
                        Dodaj obrazek do artykułu
                        <span className="admin__label__imgUpload">
                            {imgForLink ? <button className="admin__label__imgUpload__trashBtn" onClick={(e) => { e.stopPropagation(); e.preventDefault(); deleteImgForLink(); }}>
                                <img className="btn__img" src={trashIcon} alt="usun" />
                            </button> : ""}
                            <Dropzone
                                canRemove={true}
                                getUploadParams={getUploadImage}
                                onChangeStatus={(status) => { handleChangeStatusForImageForLink(status); }}
                                accept="image/*"
                                maxFiles={1} />
                    </span>
                    </label>
                </div>
                <main className="admin__editorWrapper">
                    <Editor
                        editorState={content}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editor"
                        onEditorStateChange={(text) => { setContent(text); }}
                    />
                </main>
                <button className="admin__btn admin__btn--addArticle" onClick={() => { handleSubmit() }}>
                    {updateMode ? "Aktualizuj artykuł" : "Dodaj artykuł"}
                </button>
            </main>
        </main>
    </div>
}

export default AdminAddArticle;
