import React from "react";
import "./Button.css";


const Button =({text, onClick})=>{

    return(
        <>
            <div onClick={onClick} className="btn">{text}</div>
        </>
    );

}

export default Button;