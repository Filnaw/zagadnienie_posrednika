import "./Board.css";
import React from "react";
import Title from "../../atoms/title/Title";
import Table from "../../molecules/table/Table";


const Board = ({ data }) => {
    if (!data) return null;
    return (
        <div className="container">
            <Title text="Wyniki" />
            <div className="container-row">
                <p>Zysk: {data.total_profit.toFixed(2)}</p>
                <p>Koszt zakupu: {data.total_cost.toFixed(2)}</p>
                <p>Koszt transportu: {data.total_transport.toFixed(2)}</p>
                <p>Przychód: {data.total_revenue.toFixed(2)}</p>
            </div>

                    <Table
                        matrix={data.allocation}
                        label="Optymalny transport"
                        originalSupplierCount={data.original_supplier_count}
                        originalCustomerCount={data.original_customer_count}
                    />

                    <Table
                        matrix={data.profit_matrix}
                        label="Zyski jednostkowe"
                        originalSupplierCount={data.original_supplier_count}
                        originalCustomerCount={data.original_customer_count}
                    />

        </div>
    );
};

export default Board;





