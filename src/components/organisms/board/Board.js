import "./Board.css";
import React from "react";
import Title from "../../atoms/title/Title";


const Board = ({ data }) => {
    return (
        <div className="container">
            <Title text="Wyniki optymalizacji" />
            <div className="container-row">
                <p>Zysk: {data.total_profit.toFixed(2)}</p>
                <p>Koszt zakupu: {data.total_cost.toFixed(2)}</p>
                <p>Koszt transportu: {data.total_transport.toFixed(2)}</p>
                <p>Przychód: {data.total_revenue.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default Board;





