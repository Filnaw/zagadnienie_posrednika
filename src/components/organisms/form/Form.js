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
            <Title text="Popyt odbiorców" />
            <div className="container-row">
                <Input label="Popyt - Odbiorca 1" id="demand-customer-1" type="number" placeholder="0" />
                <Input label="Popyt - Odbiorca 2" id="demand-customer-2" type="number" placeholder="0" />
                <Input label="Popyt - Odbiorca 3" id="demand-customer-3" type="number" placeholder="0" />
            </div>

            <Title text="Cena sprzedaży" />
            <div className="container-row">
                <Input label="Cena sprzedaży - Odbiorca 1" id="sell-customer-1" type="number" placeholder="0" />
                <Input label="Cena sprzedaży - Odbiorca 2" id="sell-customer-2" type="number" placeholder="0" />
                <Input label="Cena sprzedaży - Odbiorca 3" id="sell-customer-3" type="number" placeholder="0" />
            </div>

            <Title text="Dostawa 1" />
            <div className="container-row">
                <Input label="Podaż" id="supply-supplier-1" type="number" placeholder="0" />
                <Input label="Koszt zakupu" id="price-supplier-1" type="number" placeholder="0" />
                <Input label="Koszt transportu → Odbiorca 1" id="t11" type="number" placeholder="0" />
                <Input label="Koszt transportu → Odbiorca 2" id="t12" type="number" placeholder="0" />
                <Input label="Koszt transportu → Odbiorca 3" id="t13" type="number" placeholder="0" />
            </div>

            <Title text="Dostawa 2" />
            <div className="container-row">
                <Input label="Podaż" id="supply-supplier-2" type="number" placeholder="0" />
                <Input label="Koszt zakupu" id="price-supplier-2" type="number" placeholder="0" />
                <Input label="Koszt transportu → Odbiorca 1" id="t21" type="number" placeholder="0" />
                <Input label="Koszt transportu → Odbiorca 2" id="t22" type="number" placeholder="0" />
                <Input label="Koszt transportu → Odbiorca 3" id="t23" type="number" placeholder="0" />
            </div>

            <Button text="Rozwiąż" onClick={() => handleSolve(setResult)} />
        </div>
    );
};

export default Form;
