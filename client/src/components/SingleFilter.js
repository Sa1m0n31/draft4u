import React from 'react'
import {getTrackBackground, Range} from "react-range";
import man from '../static/img/man.svg'
import woman from '../static/img/woman.svg'

const SingleFilter = ({mobile, value, changeValue, step, min, max, width, header}) => {
    return <section className="singleFilter" style={{flexBasis: width}}>
        <h4 className="singleFilter__header">
            {header}
        </h4>
        <Range
            step={step}
            min={min}
            max={max}
            values={value}
            onChange={(values) => {
                changeValue(values);

            }}
            renderTrack={({ props, children }) => (
                <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                        ...props.style,
                        height: !mobile ? '20px' : '10px',
                        width: "100%",
                        borderRadius: '50%',
                        display: 'flex',
                    }}
                >
                    <div
                        ref={props.ref}
                        style={{
                            height: !mobile ? '15px' : '10px',
                            width: '100%',
                            borderRadius: !mobile ? '15px' : '10px',
                            border: '1px solid #707070',
                            background: getTrackBackground({
                                values: value[0] ? value : [1000, 3000],
                                colors: ['#474747', '#E2B76D', '#474747'],
                                min: min,
                                max: max,
                                rtl: false
                            }),
                            alignSelf: 'center'
                        }}
                    >
                        {children}
                    </div>
                </div>
            )}
            renderThumb={({ props }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: !mobile ? '20px' : '15px',
                        outline: 'none',
                        width: !mobile ? '20px' : '15px',
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        border: '1px solid #707070'
                    }}
                />
            )}
        />
        {value.length > 1 ? <aside className="singleFilter__values">
            <span className="singleFilter__values__min">
                {value[0]}
            </span>
            <span className="singleFilter__values__max">
                {value[1]}
            </span>
        </aside> : <aside className="singleFilter__values">
            <img className="singleFilter__values__img" src={man} alt="mezczyzni" />
            <img className="singleFilter__values__img" src={woman} alt="kobiety" />
        </aside>}
    </section>
}

export default SingleFilter;
