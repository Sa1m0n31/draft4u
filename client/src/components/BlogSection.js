import React, {useEffect, useState} from 'react'
import {getLastArticle} from "../helpers/blog";
import settings from "../settings";
import {convertStringToURL} from "../helpers/others";

const BlogSection = () => {
    const [article, setArticle] = useState(null);

    useEffect(() => {
        getLastArticle()
            .then((res) => {
                const result = res?.data?.result;
                if(result) {
                    setArticle(res?.data?.result);
                }
            });
    }, []);

    return (article ? <section className="blogSection siteWidthSuperNarrow">
            <h2 className="blogSection__title">
                {article.title}
            </h2>
            {article.file_path ? <figure className="blogSection__imgWrapper">
                <img className="blogSection__img" src={`${settings.API_URL}/image?url=/media/blog/${article.file_path}`} alt={article.title} />
            </figure> : ""}
            <p className="blogSection__extract">
                {article.excerpt}
            </p>
            <a className="button button--readMore" href={`/wpis/${article?.title ? convertStringToURL(article.title) : ""}`}>
                Czytaj więcej <span className="gold bold"> > </span>
            </a>
        </section> : "")
}

export default BlogSection;
