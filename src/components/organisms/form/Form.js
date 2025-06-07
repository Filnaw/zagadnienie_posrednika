import React from 'react';
import "./Form.css";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import "../../atoms/container/Container.css";
import Title from "../../atoms/title/Title";
import { handleSolve } from "./handleSolve";


const Form = ({ setResult }) => {
    return (
        <div className="container">
           <Title text="Zapotrzebowanie odbiorców" />
            <div className="container-row">
                <Input label="Popyt odbiorcy 1" id="demand-1" type="number" placeholder="0" />
                <Input label="Popyt odbiorcy 2" id="demand-2" type="number" placeholder="0" />
                <Input label="Popyt odbiorcy 3" id="demand-3" type="number" placeholder="0" />
            </div>


           <Title text="Cena sprzedaży" />
            <div className="container-row">
                <Input label="Cena sprzedaży do odbiorcy 1" id="sale-price-1" type="number" placeholder="0" />
                <Input label="Cena sprzedaży do odbiorcy 2" id="sale-price-2" type="number" placeholder="0" />
                <Input label="Cena sprzedaży do odbiorcy 3" id="sale-price-3" type="number" placeholder="0" />
            </div>


            <Title text="Dostawca 1" />
            <div className="container-row">
                <Input label="Podaż dostawcy 1" id="supply-1" type="number" placeholder="0" />
                <Input label="Koszt zakupu od dostawcy 1" id="purchase-cost-1" type="number" placeholder="0" />
                <Input label="Transport do odbiorcy 1" id="t11" type="number" placeholder="0" />
                <Input label="Transport do odbiorcy 2" id="t12" type="number" placeholder="0" />
                <Input label="Transport do odbiorcy 3" id="t13" type="number" placeholder="0" />
            </div>


           <Title text="Dostawca 2" />
            <div className="container-row">
                <Input label="Podaż dostawcy 2" id="supply-2" type="number" placeholder="0" />
                <Input label="Koszt zakupu od dostawcy 2" id="purchase-cost-2" type="number" placeholder="0" />
                <Input label="Transport do odbiorcy 1" id="t21" type="number" placeholder="0" />
                <Input label="Transport do odbiorcy 2" id="t22" type="number" placeholder="0" />
                <Input label="Transport do odbiorcy 3" id="t23" type="number" placeholder="0" />
            </div>


            <Button text="Rozwiąż" onClick={() => handleSolve(setResult)} />

        </div>
    );
};

export default Form;
