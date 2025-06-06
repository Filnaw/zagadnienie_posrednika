import React, { useState } from "react";
import "./App.css";
import Form from "./components/organisms/form/Form";
import Board from "./components/organisms/board/Board";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="App">
      <Form setResult={setResult} />
      {result && <Board data={result} />}
    </div>
  );
}

export default App;

