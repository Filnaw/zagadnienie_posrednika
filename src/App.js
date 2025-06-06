import React from "react";
import "./App.css";
import Form from "./components/organisms/form/Form";
import Board from "./components/organisms/board/Board";

function App() {
  return (
    <div className="App">
      <Form/>
        <Board/>
    </div>
  );
}

export default App;
