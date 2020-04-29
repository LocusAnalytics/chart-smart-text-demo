import React from "react";
import "./App.css";
import Barchart from "./components/Barchart.js";
import Linechart from "./components/Linechart.js";
import {
  generateBarchartData,
  generateLinechartData,
} from "./helpers/generateData";

function App() {
  const barchartData1 = generateBarchartData(4, "fms");
  const barchartData2 = generateBarchartData(4, "counties");

  const linechartData1 = generateLinechartData(4, "fms", 5);

  return (
    <div className="App">
      <header className="App-header">Smart Text Prototype Demo</header>
      <div className="App-body">
        Demo for simple description of single region multiple businesses:
        <Barchart
          data={barchartData1}
          chartProperties={{ nationAvg: 5 }}
          chartType="single region multiple businesses"
        />
        Demo for simple description of single business multiple regions:
        <Barchart
          data={barchartData2}
          chartProperties={{ nationAvg: 5 }}
          chartType="single business multiple regions"
        />
        <Linechart
          data={linechartData1}
          chartType="single region multiple businesses line"
          chartProperties={{ variable: "jobs" }}
        />
      </div>
    </div>
  );
}

export default App;
