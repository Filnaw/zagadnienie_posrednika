import "./Board.css";
import React from "react";
import Title from "../../atoms/title/Title";
import Container from "../../molecules/container/Container";

const Board =()=>{
    return(
        <div className="container">
            <Title text="Individual profits"/>
            <Container variant="container-row" count={2}/>
            <Container variant="container-row" count={2}/>
             <Title text="Optima transport"/>
            <Container variant="container-row" count={2}/>
            <Container variant="container-row" count={2}/>
        </div>
    );
}

export default Board;


