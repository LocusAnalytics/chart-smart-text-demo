import React from "react";
import "./App.css";
import Barchart from "./components/Barchart.js";
import Linechart from "./components/Linechart.js";
import {
  generateBarchartData,
  generateLinechartData,
} from "./helpers/generateData";
import {
  seriesWithPeak,
  trendBreaker,
  usurper,
} from "./exampleData/exampleData";

function App() {
  const barchartData1 = generateBarchartData(4, "fms");
  const barchartData2 = generateBarchartData(4, "counties");

  const linechartData1 = generateLinechartData(3, "fms", 4);
  const linechartDataPeak = [
    ...generateLinechartData(2, "fms", 10, 2006, 10),
    { index: 2, label: "Engineering", series: seriesWithPeak },
  ];

  // Generate 10 years' worth of random data on 2 FMs
  // then change the label field to "business" and "occupation"
  const occvsbizData = generateLinechartData(2, "fms", 10).map(
    (datum, index) => {
      return { ...datum, label: index ? "business" : "occupation" };
    }
  );

  return (
    <div className="App">
      <header className="App-header">Smart Text Prototype Demo</header>
      <div className="App-body">
        Demo for Occupation vs. Business trend comparison
        <Linechart
          data={occvsbizData}
          chartType="occupation vs business trend"
        />
        <h1>
          For now, please mentally adjust the units to appropriate numbers (e.g.
          business count is in thousands, annual payroll is in $1,000, and so
          on...)
        </h1>
        <div>
          Also, apologies for the cut off legends... Hope it doesn't affect too
          much.
        </div>
        <br />
        For time series, there are a lot more things to describe. Currently:
        <ol>
          <li>
            The industry with largest net change between start and end will get
            a description of how much they gained or lost.{" "}
          </li>
          <li>
            The industry with highest final value will get their final value
            stated.
          </li>
          <li>
            The industry with highest percent growth (if any) will get their pct
            growth stated.
          </li>
          <li>
            If there are industries that have a peak that is not at the start or
            end of period, this peak will be noted for the industry with highest
            peak value.
          </li>
          <li>
            If there is a “trend breaker” industry that is the only to have
            declined or grown during period, that "trend breaker" will be
            mentioned as such.
          </li>
          <li>
            If there is an “usurper” industry that has grown to surpass another
            industry, and never declined below the surpassed industry during
            period, identify it.
          </li>
        </ol>
        Demo for Linechart with an usurper.
        <Linechart
          data={usurper}
          chartType="single region multiple businesses line"
          chartProperties={{ variable: "establishments" }}
        />
        Demo for Linechart with a trend breaker.
        <Linechart
          data={trendBreaker}
          chartType="single region multiple businesses line"
          chartProperties={{ variable: "establishments" }}
        />
        Demo for Linechart with a peak.
        <Linechart
          data={linechartDataPeak}
          chartType="single region multiple businesses line"
          chartProperties={{ variable: "establishments" }}
        />
        General demo for Linechart.
        <Linechart
          data={linechartData1}
          chartType="single region multiple businesses line"
          chartProperties={{ variable: "jobs" }}
        />
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
            nationAvg: 1, // LQ will always have national value to be 1
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
      </div>
    </div>
  );
}

export default App;
