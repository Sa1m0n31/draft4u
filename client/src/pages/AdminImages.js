import React, {useEffect, useRef, useState} from 'react'
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Dropzone from "react-dropzone-uploader";
import settings from "../settings";
import trashIcon from "../static/img/trash-black.svg";
import {getCustomFields, updateCustomImages} from "../helpers/admin";

const AdminImages = ({lang}) => {
    const [status, setStatus] = useState(-1);

    const [images, setImages] = useState([
        { img: null, updateImage: false, imageUpdated: false, label: 'Strona główna - belka' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Strefa zawodnika' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Strefa klubu' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Aktywność klubów' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Wyszukiwarka zawodników' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Ulubieni zawodnicy' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 1' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 2' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 3' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 4' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 5' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 6' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 7' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 8' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 9' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 10' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 11' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 12' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 13' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 14' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 15' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 16' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 17' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 18' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 19' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 20' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 21' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 22' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Button 23' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Strona główna - asystent' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Strona główna - zawodnik' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Strona główna - klub' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Strefa asystenta' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Rejestracja mobile - sztab' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Rejestracja mobile - klub' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Rejestracja desktop - sztab' },
        { img: null, updateImage: false, imageUpdated: false, label: 'Rejestracja desktop - klub' },
    ]);

    useEffect(() => {
        getCustomFields(lang)
            .then((res) => {
                const keyValuePairs = Object.entries(res?.data?.result[0]);
                const imagesKeyValue = keyValuePairs.filter((item) => {
                    return item[0].substring(0, 3) === 'img';
                });
                setImages(images?.map((item, index) => {
                    return {
                        img: item.img,
                        updateImage: imagesKeyValue[index][1],
                        imageUpdated: imagesKeyValue[index][1] !== null,
                        label: item.label
                    }
                }));
            });
    }, []);

    useEffect(() => {
        if(status !== -1) window.scrollTo(0, 0);
    }, [status]);

    const getUploadImage = (img) => {
        console.log(img);
    }

    const handleChangeStatus = (status, index) => {
        setImages(images.map((item, i) => {
            return {
                img: index === i ? status : item.img,
                updateImage: index === i ? null : item.updateImage,
                imageUpdated: index === i ? true : item.imageUpdated,
                label: item.label
            }
        }));
    }

    const deleteImg = (index) => {
        if(images[index]?.img) {
            images[index].img.remove();
            setImages(images.map((item, i) => {
                return {
                    img: i === index ? null : item.img,
                    updateImage: item.updateImage,
                    imageUpdated: index === i ? true : item.imageUpdated,
                    label: item.label
                }
            }));
        }
        if(images[index]?.img.updateImage) {
            setImages(images.map((item, i) => {
                return {
                    img: item.img,
                    updateImage: index === i ? null : item.updateImage,
                    imageUpdated: index === i ? true : item.imageUpdated,
                    label: item.label
                }
            }));
        }
    }

    const handleSubmit = () => {
        updateCustomImages(images, lang)
            .then((res) => {
                if(res?.data?.result) setStatus(1);
                else setStatus(-1);
            });
    }

    return <div className="container container--dark container--admin">
        <AdminTop />
        <main className="admin">
            <PanelMenu menuOpen={7} />
            <main className="admin__main">
                <header className="admin__flex">
                    <h1 className="admin__main__header">
                        Edytuj grafiki - wersja {lang === 'pl' ? "polska" : "angielska"}
                    </h1>
                    {status !== -1 ? <span className="admin__status">
                        {status === 1 ? <span className="admin__status__inner admin__status--success">
                            Grafiki zostały zaktualizowane
                        </span> : (status === 2) ? <span className="admin__status__inner admin__status--success">
                            Grafiki zostały zaktualizowane
                        </span> : <span className="admin__status__inner admin__status--error">
                            Coś poszło nie tak... Skontaktuj się z administratorem systemu
                        </span>}
                    </span> : ""}
                </header>
                <section className="admin__articleTitle admin--customImages">
                    {images?.map((item, index) => {
                        return  <label className="admin__label" key={index}>
                            {item.label}
                            <span className="admin__label__imgUpload">
                                {item.updateImage ? <figure className="admin__label__imgUpload__updateImgWrapper">
                                    <img className="admin__label__imgUpload__updateImg" src={`${settings.API_URL}/image?url=/media/fields/${item.updateImage}`} alt="foto" />
                                </figure> : ""}
                                {item.img || item.updateImage ? <button className="admin__label__imgUpload__trashBtn" onClick={(e) => { e.stopPropagation(); e.preventDefault(); deleteImg(index); }}>
                                    <img className="btn__img" src={trashIcon} alt="usun" />
                                </button> : ""}
                                <Dropzone
                                    canRemove={true}
                                    getUploadParams={getUploadImage}
                                    onChangeStatus={(status) => { handleChangeStatus(status, index); }}
                                    accept="image/*"
                                    maxFiles={1} />
                            </span>
                        </label>
                    })}
                </section>
                <button className="admin__btn admin__btn--addArticle" onClick={() => { handleSubmit() }}>
                    Edytuj grafiki
                </button>
            </main>
        </main>
    </div>
}

export default AdminImages;
