import React from 'react';

const ChangeContentLabel = ({label, name, value, func, type}) => {
    return type === 'textarea' ? <label className="admin__label">
        {label}
        <textarea className="admin__input admin__input--title admin__input--textarea"
               name={name}
               value={value}
               onChange={(e) => { func(e.target.value); }} />
    </label> : <label className="admin__label">
        {label}
        <input className="admin__input admin__input--title"
               name={name}
               value={value}
               onChange={(e) => { func(e.target.value); }} />
    </label>
};

export default ChangeContentLabel;
