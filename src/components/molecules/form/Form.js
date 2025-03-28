import React from 'react';
import "./Form.css";
import Container from "../../atoms/container/Container";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";


const Form=()=>{
    return(
        <>
          <Container>
              <Input
                label="Podaż:"
                id="supply"
                type="number"
                placeholder="Wpisz liczbę podaży..."
              />
              <Input
                label="Popyt:"
                id="demand"
                type="number"
                placeholder="Wpisz liczbę popytu..."
              />
              <Input
                label="Cena zakupu:"
                id="purchase"
                type="number"
                placeholder="Wpisz cenę zakupu..."
              />
              <Input
                label="Cena sprzedaży:"
                id="sale"
                type="number"
                placeholder="Wpisz cenę sprzedaży..."
              />
              <Input
                label="Koszt transportu:"
                id="transport"
                type="number"
                placeholder="Wpisz koszt transportu..."
              />
              <Button text="Oblicz koszty"/>
          </Container>
        </>
    );
}

export default Form;