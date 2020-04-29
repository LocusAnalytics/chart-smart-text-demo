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

  const linechartData1 = generateLinechartData(3, "fms", 4);

  return (
    <div className="App">
      <header className="App-header">Smart Text Prototype Demo</header>
      <div className="App-body">
        <h1>
          For now, please mentally adjust the units to appropriate numbers (e.g.
          business count is in thousands, annual payroll is in $1,000, and so
          on...)
        </h1>
        Demo for simple description of single region multiple businesses:
        <Barchart
          data={barchartData1}
          chartProperties={{
            nationAvg: 15,
            region: "Seneca County, NY",
            variable: "Count of businesses",
          }}
          chartType="single region multiple businesses"
        />
        Demo for simple description of single region multiple businesses LQ:
        <Barchart
          data={barchartData1}
          chartProperties={{
            nationAvg: 3,
            region: "Parker County, TX",
            variable: "Count of businesses",
          }}
          chartType="single region multiple businesses lq"
        />
        Demo for simple description of single business multiple regions:
        <Barchart
          data={barchartData2}
          chartProperties={{
            nationAvg: 5,
            fm: "Banking and Loans",
            variable: "Employment",
          }}
          chartType="single business multiple regions"
        />
        For time series, there are a lot more things to describe. For now, the
        industry with largest net change between start and end will get a
        description of how much they gained or lost. The industry with highest
        final value will get their final value stated. The industry with highest
        percent growth (if any) will get their pct growth stated.
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
