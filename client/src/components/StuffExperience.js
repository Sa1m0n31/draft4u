import React, {useContext} from 'react';
import SingleCv from "./SingleCv";
import {ContentContext} from "../App";

const StuffExperience = ({cvs, openCvModal, deleteCvModal, club}) => {
    const { content } = useContext(ContentContext);

    return <div className="stuffSection">
        <h3 className="stuff__header">
            {content.cv_type1}
        </h3>

        {cvs?.map((item, index) => {
            return <SingleCv key={index}
                        id={item.id}
                        club={club}
                        type="experience"
                        title={item.title}
                        from={item.from_date}
                        to={item.to_date}
                        description={item.description}
                        openCvModal={openCvModal}
                        deleteCvModal={deleteCvModal} />
        })}

        {!club ? <button className="stuff__addNewBtn" onClick={() => { openCvModal(null, 'experience'); }}>
            + {content.add_new}
        </button> : ''}
    </div>
};

export default StuffExperience;
