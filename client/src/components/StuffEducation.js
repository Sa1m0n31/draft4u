import React, {useContext} from 'react';
import SingleCv from "./SingleCv";
import {ContentContext} from "../App";

const StuffEducation = ({cvs, openCvModal, deleteCvModal}) => {
    const { content } = useContext(ContentContext);

    return <div className="stuffSection">
        <h3 className="stuff__header">
            {content.cv_type2}
        </h3>

        {cvs?.map((item, index) => {
            return <SingleCv key={index}
                             id={item.id}
                             type="education"
                             title={item.title}
                             from={item.from_date}
                             to={item.to_date}
                             description={item.description}
                             openCvModal={openCvModal}
                             deleteCvModal={deleteCvModal} />
        })}

        <button className="stuff__addNewBtn" onClick={() => { openCvModal(null, 'education'); }}>
            + {content.add_new}
        </button>
    </div>
};

export default StuffEducation;
