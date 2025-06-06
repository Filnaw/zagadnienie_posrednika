import "./Container.css";
import Input from "../../atoms/input/Input";
import React from "react";


const Container=({variant, count})=>{
    return(
        <div className={variant}>
            {Array.from({ length: count }).map((_, index) => (
                <Input
                    key={index}
                    id={`demand-customer-${index + 1}`}
                    type="number"
                    placeholder="0"
                />
            ))}
        </div>
    );
}

export default Container;