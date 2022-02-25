import React from 'react';
import SingleCv from "./SingleCv";

const StuffExperience = ({cvs, openCvModal}) => {
    return <div className="stuffSection">
        <h3 className="stuff__header">
            Doświadczenia zawodowe
        </h3>

        {cvs?.map((item, index) => {
            return <SingleCv key={index}
                        id={item.id}
                        title={item.title}
                        from={item.from}
                        to={item.to}
                        description={item.description} />
        })}

        <button className="stuff__addNewBtn" onClick={() => { openCvModal(); }}>
            + Dodaj nowy
        </button>
    </div>
};

export default StuffExperience;
