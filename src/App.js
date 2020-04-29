import React from "react";
import "./App.css";
import Barchart from "./components/Barchart.js";
import Linechart from "./components/Linechart.js";

function App() {
  const barchartData1 = [
    { index: 1, name: "Engineering", val: 7 },
    { index: 2, name: "Doctor", val: 11 },
    { index: 3, name: "Pilot", val: 8 },
    { index: 4, name: "Consultant", val: 1 },
  ];
  const barchartData2 = [
    { index: 1, name: "New York", val: 7 },
    { index: 2, name: "Arizona", val: 11 },
    { index: 3, name: "Florida", val: 8 },
    { index: 4, name: "Atlanta", val: 1 },
  ];

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
          nationAvg={5}
          chartType="single region multiple businesses"
        />
        Demo for simple description of single business multiple regions:
        <Barchart
          data={barchartData2}
          nationAvg={4}
          chartType="single business multiple regions"
        />
        <Linechart
          data={linechartData1}
          chartType="single region multiple businesses time"
        />
      </div>
    </div>
  );
}

export default App;
