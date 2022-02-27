import React from 'react';
import SingleCv from "./SingleCv";

const StuffEducation = ({cvs, openCvModal, deleteCvModal}) => {
    return <div className="stuffSection">
        <h3 className="stuff__header">
            Doświadczenia zawodowe
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
            + Dodaj nowy
        </button>
    </div>
};

export default StuffEducation;
