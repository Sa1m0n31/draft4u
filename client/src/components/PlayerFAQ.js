import React, {useEffect, useState, useRef, useContext} from 'react'
import {ContentContext} from "../App";

const PlayerFAQ = () => {
    const [category, setCategory] = useState(0);
    const [faq, setFaq] = useState([]);

    const { content } = useContext(ContentContext);

    useEffect(() => {
        if(content) {
            setFaq([
                {
                    header: content.faq_header_1,
                    questions: [
                        {
                            q: content.faq_question_1,
                            a: content.faq_answer_1
                        },
                        {
                            q: content.faq_question_2,
                            a: content.faq_answer_2
                        },
                        {
                            q: content.faq_question_3,
                            a: content.faq_answer_3
                        }
                    ]
                },
                {
                    header: content.faq_header_2,
                    questions: [
                        {
                            q: content.faq_question_4,
                            a: content.faq_answer_4
                        },
                        {
                            q: content.faq_question_5,
                            a: content.faq_answer_5
                        },
                        {
                            q: content.faq_question_6,
                            a: content.faq_answer_6
                        },
                        {
                            q: content.faq_question_7,
                            a: content.faq_answer_7
                        }
                    ]
                },
                {
                    header: content.faq_header_3,
                    questions: [
                        {
                            q: content.faq_question_8,
                            a: content.faq_answer_8
                        },
                        {
                            q: content.faq_question_9,
                            a: content.faq_answer_9
                        },
                        {
                            q: content.faq_question_10,
                            a: content.faq_answer_10
                        },
                        {
                            q: content.faq_question_11,
                            a: content.faq_answer_11
                        },
                        {
                            q: content.faq_question_12,
                            a: content.faq_answer_12
                        }
                    ]
                },
                {
                    header: content.faq_header_4,
                    questions: [
                        {
                            q: content.faq_question_13,
                            a: content.faq_answer_13
                        },
                        {
                            q: content.faq_question_14,
                            a: content.faq_answer_14
                        },
                        {
                            q: content.faq_question_15,
                            a: content.faq_answer_15
                        },
                        {
                            q: content.faq_question_16,
                            a: content.faq_answer_16
                        }
                    ]
                }
            ])
        }
    }, [content]);

    const toggleQuestion = (index) => {
        const currentQuestion = document.getElementById(`faq__question-${category}-${index}`);
        const currentButton = document.getElementById(`faq__button-${category}-${index}`);

        if(window.getComputedStyle(currentQuestion).getPropertyValue("opacity") === "0") {
            currentQuestion.style.padding = "3%";
            currentQuestion.style.border = "1px solid #707070"
            currentQuestion.style.margin = "5px 0";
            currentQuestion.style.height = "auto";
            currentButton.style.transform = "rotate(45deg)";
            setTimeout(() => {
                currentQuestion.style.opacity = "1";
            }, 400);
        }
        else {
            currentButton.style.transform = "none";
            currentQuestion.style.opacity = "0";
            setTimeout(() => {
                currentQuestion.style.padding = "0";
                currentQuestion.style.margin = "0";
                currentQuestion.style.height = "0";
                currentQuestion.style.border = "none";
            }, 400);
        }
    }

    return <section className="faq">
        <header className="faq__header">
            {faq.map((item, index, array) => {
                return <><button className={category !== index ? "faq__btn" : "faq__btn faq__btn--current"} onClick={() => { setCategory(index); }}>
                    {faq[index].header}
                </button>
                {index !== array.length-1 ? <span className="faq__header__divider"></span> : ""}
                </>
            })}
        </header>

        <main className="faq__questions">
            {faq.map((item, index) => {
                if(index === category) {
                    return item.questions.map((item, index) => {
                        return <section className="faq__question">
                            <label className="faq__question__header">
                                <h4 className="faq__question__header__h">
                                    {item.q}
                                </h4>
                                <button className="faq__question__header__btn" id={`faq__button-${category}-${index}`} onClick={() => { toggleQuestion(index); }}>
                                    +
                                </button>
                            </label>
                            <article className="faq__question__main" id={`faq__question-${category}-${index}`}>
                                {item.a}
                            </article>
                        </section>
                    })
                }
            })}
        </main>
    </section>
}

export default PlayerFAQ;
