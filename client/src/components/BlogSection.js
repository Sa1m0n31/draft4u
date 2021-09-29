import React from 'react'
import example from '../static/img/blog-zdjecie.png'

const BlogSection = () => {
    return <section className="blogSection siteWidthSuperNarrow">
        <h2 className="blogSection__title">
            Wywiad z Lorem Ipsum
        </h2>
        <figure className="blogSection__imgWrapper">
            <img className="blogSection__img" src={example} alt="wywiad" />
        </figure>
        <p className="blogSection__extract">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis pretium dolor. Nam eu odio et turpis volutpat congue in ac metus. Integer consectetur justo lorem, quis consectetur nisi ultricies ut. Maecenas auctor mauris tristique justo volutpat imperdiet. Proin commodo mi sapien, vitae volutpat dui rutrum pharetra. Curabitur non magna auctor, lobortis metus sed, condimentum odio. Sed iaculis in lacus et porttitor. Nulla facilisi. Nulla ipsum lacus, vulputate eu est nec, pretium sodales nisi. Pellentesque tempor, felis sit amet malesuada elementum, lectus massa gravida enim, a vestibulum libero ligula non diam.
        </p>
        <button className="button button--readMore">
            Czytaj więcej <span className="gold bold"> > </span>
        </button>
    </section>
}

export default BlogSection;
