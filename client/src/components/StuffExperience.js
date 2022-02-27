import React from 'react';
import SingleCv from "./SingleCv";

const StuffExperience = ({cvs, openCvModal, deleteCvModal}) => {
    return <div className="stuffSection">
        <h3 className="stuff__header">
            Wykształcenie
        </h3>

        {cvs?.map((item, index) => {
            return <SingleCv key={index}
                        id={item.id}
                        type="experience"
                        title={item.title}
                        from={item.from_date}
                        to={item.to_date}
                        description={item.description}
                        openCvModal={openCvModal}
                        deleteCvModal={deleteCvModal} />
        })}

        <button className="stuff__addNewBtn" onClick={() => { openCvModal(null, 'experience'); }}>
            + Dodaj nowy
        </button>
    </div>
};

export default StuffExperience;
