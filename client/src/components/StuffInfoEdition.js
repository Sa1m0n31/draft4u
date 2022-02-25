import React, {useEffect, useState} from 'react';
import StuffExperience from "./StuffExperience";
import {getCvs} from "../helpers/user";

const StuffInfoEdition = ({id}) => {
    const [cvs, setCvs] = useState([]);
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCvs(id)
            .then((res) => {
                const result = res?.data?.result;
                if(result) {
                    setExperience(result.filter((item) => {
                        return item.type === 'experience';
                    }));
                    setEducation(result.filter((item) => {
                        return item.type === 'education';
                    }));
                    setCourses(result.filter((item) => {
                        return item.type === 'courses';
                    }));
                }
            });
    }, []);

    const addNewCv = (type, title, from, to, description) => {

    }

    const openCvModal = () => {

    }

    return <section className="userInfoEdition siteWidthSuperNarrow">
        <StuffExperience cvs={experience} openCvModal={openCvModal} />
    </section>
};

export default StuffInfoEdition;
