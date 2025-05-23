import { useState } from "react";
import "./App.css";
import Expenses from "./components/Expenses";

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Expenses</h1>
      <Expenses />
    </>
  );
}

export default App;
