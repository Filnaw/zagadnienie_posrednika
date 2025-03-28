import React from "react";
import "./Button.css";


const Button =({text})=>{

    return(
        <>
            <div className="btn">{text}</div>
        </>
    );

}

export default Button;