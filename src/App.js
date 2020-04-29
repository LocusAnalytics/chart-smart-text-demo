import React from "react";
import "./App.css";
import Barchart from "./components/Barchart.js";
import Linechart from "./components/Linechart.js";
import { generateBarchartData } from "./helpers/generateData";

function App() {
  const barchartData1 = generateBarchartData(4, "fms");
  const barchartData2 = generateBarchartData(4, "counties");

  const linechartData1 = [
    {
      index: 1,
      label: "Engineering",
      series: [
        { x: 2005, y: 2 },
        { x: 2006, y: 3 },
        { x: 2007, y: 1 },
        { x: 2008, y: 8 },
      ],
    },
    {
      index: 2,
      label: "Doctor",
      series: [
        { x: 2005, y: 4 },
        { x: 2006, y: 3 },
        { x: 2007, y: 2 },
        { x: 2008, y: 2 },
      ],
    },
    {
      index: 3,
      label: "Pilot",
      series: [
        { x: 2005, y: 6 },
        { x: 2006, y: 3 },
        { x: 2007, y: 7 },
        { x: 2008, y: 8 },
      ],
    },
    {
      index: 4,
      label: "Consultant",
      series: [
        { x: 2005, y: 2 },
        { x: 2006, y: 1 },
        { x: 2007, y: 5 },
        { x: 2008, y: 10 },
      ],
    },
  ];

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
