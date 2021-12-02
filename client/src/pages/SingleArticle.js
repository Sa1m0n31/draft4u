import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import settings from "../settings";
import example from "../static/img/profile-picture.png";
import Footer from "../components/Footer";
import LoadingPage from "./LoadingPage";
import {getArticleBySlug} from "../helpers/blog";
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

const SingleArticle = ({user, isLocal}) => {
    const [loaded, setLoaded] = useState(false);
    const [article, setArticle] = useState({});
    const [content, setContent] = useState(null);

    useEffect(() => {
        const slug = window.location.pathname.split("/")[2];
        getArticleBySlug(slug)
            .then((res) => {
                setLoaded(true);
                setContent(stateToHTML((convertFromRaw(JSON.parse(res.data.result.content)))));
                setArticle(res?.data?.result);
            });
    }, []);

    return <div className="container container--light">
        {loaded ? <>
            <Header loggedIn={true} player={true} theme="light" menu="dark" profileImage={user.file_path} isLocal={isLocal} />

            <main className="single">
                <figure className="single__imgWrapper">
                    <img className="blogSection__img" src={`${settings.API_URL}/image?url=/media/blog/${article.file_path}`} alt={article.title} />
                </figure>
                <h1 className="single__title">
                    {article.title}
                </h1>
                <article className="single__article" dangerouslySetInnerHTML={{__html: content}}></article>
            </main>

            <Footer theme="light" border={true} />
        </> : <LoadingPage />}
    </div>
}

export default SingleArticle;
