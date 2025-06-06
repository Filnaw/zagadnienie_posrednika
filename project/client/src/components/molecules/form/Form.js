import React from 'react';
import "./Form.css";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import "../../atoms/container/Container.css";

const Form = () => {
    return (
        <div className="container">

            <div className="container-row">
                <Input
                    label="Demand - Customer 1"
                    id="demand-customer-1"
                    type="number"
                    placeholder="30"
                />
                <Input
                    label="Demand - Customer 2"
                    id="demand-customer-2"
                    type="number"
                    placeholder="30"
                />
            </div>


            <div className="container-row">
                <Input
                    label="Supply - Supplier 1"
                    id="supply-supplier-1"
                    type="number"
                    placeholder="Enter supply"
                />
                <Input
                    label="Transport: Supplier 1 → Customer 1"
                    id="t11"
                    type="number"
                    placeholder="?"
                />
                <Input
                    label="Transport: Supplier 1 → Customer 2"
                    id="t12"
                    type="number"
                    placeholder="?"
                />
                <Input
                    label="Purchase price - Supplier 1"
                    id="price-supplier-1"
                    type="number"
                    placeholder="6"
                />
            </div>

            <div className="container-row">
                <Input
                    label="Supply - Supplier 2"
                    id="supply-supplier-2"
                    type="number"
                    placeholder="Enter supply"
                />
                <Input
                    label="Transport: Supplier 2 → Customer 1"
                    id="t21"
                    type="number"
                    placeholder="?"
                />
                <Input
                    label="Transport: Supplier 2 → Customer 2"
                    id="t22"
                    type="number"
                    placeholder="?"
                />
                <Input
                    label="Purchase price - Supplier 2"
                    id="price-supplier-2"
                    type="number"
                    placeholder="7"
                />
            </div>


            <div className="container-row">
                <Input
                    label="Selling price - Customer 1"
                    id="sell-customer-1"
                    type="number"
                    placeholder="12"
                />
                <Input
                    label="Selling price - Customer 2"
                    id="sell-customer-2"
                    type="number"
                    placeholder="13"
                />
            </div>

            <Button text="Solve" />
        </div>
    );
};

export default Form;
