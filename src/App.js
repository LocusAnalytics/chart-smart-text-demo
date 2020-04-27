import React from "react";
import "./App.css";
import Barchart from "./components/Barchart.js";
import Linechart from "./components/Linechart.js";

function App() {
  const barchartData = [
    { index: 1, name: "Engineering", val: 7 },
    { index: 2, name: "Doctor", val: 11 },
    { index: 3, name: "Pilot", val: 8 },
    { index: 4, name: "Consultant", val: 1 },
  ];
  return (
    <div className="App">
      <header className="App-header">Smart Text Prototype Demo</header>
      <div className="App-body">
        <Barchart data={barchartData} />
        <Linechart />
      </div>
    </div>
  );
}

export default App;
