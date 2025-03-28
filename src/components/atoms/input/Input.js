import React from 'react';
import "./Input.css";


const Input =({label, id, type, placeholder})=>{

    return(
        <div className="input-row">
            <label className="label">{label}</label>
            <input
                id={id}
                className="input"
                type={type}
                placeholder={placeholder}
            />
        </div>
    );

}

export default Input;