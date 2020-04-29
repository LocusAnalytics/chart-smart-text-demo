import { roundToDecimal } from "./smartTextHelpers";

function processBarChartData(data, nationAvg) {
  // Make deep copy of data because splice later modifies the original array
  let dataCopy = [...data];
  /* I know that this iterates over the array 4 times,
    but our arrays are always gonna be short */
  let maxDatum = dataCopy.reduce((prev, curr) => {
    return prev.val > curr.val ? prev : curr;
  });
  dataCopy.splice(dataCopy.indexOf(maxDatum), 1);
  let nextMaxDatum = dataCopy.reduce((prev, curr) => {
    return prev.val > curr.val ? prev : curr;
  });
  let minDatum = dataCopy.reduce((prev, curr) => {
    return prev.val < curr.val ? prev : curr;
  });
  let maxToNextRatio = roundToDecimal(maxDatum.val / nextMaxDatum.val);
  let maxToMinRatio = roundToDecimal(maxDatum.val / minDatum.val);
  let maxToNationalRatio = roundToDecimal(maxDatum.val / nationAvg);

  return {
    maxDatum,
    nextMaxDatum,
    minDatum,
    maxToNextRatio,
    maxToMinRatio,
    maxToNationalRatio,
  };
}

export function createSingleRegionMultipleBusinesses(data, properties) {
  let {
    maxDatum,
    nextMaxDatum,
    minDatum,
    maxToNextRatio,
    maxToMinRatio,
    maxToNationalRatio,
  } = processBarChartData(data, properties.nationAvg);
  let aboveOrBelow = maxToNationalRatio > 1 ? "above" : "below";

  // Because it is percent above or below national, not pct of national
  let maxToNationalPct = Math.round(Math.abs(maxToNationalRatio * 100 - 100));
  let text =
    maxDatum.name +
    " is the largest in " +
    properties.region +
    " by " +
    properties.variable +
    ", " +
    maxToNextRatio +
    " times as large as the next largest industry - " +
    nextMaxDatum.name +
    ", and " +
    maxToMinRatio +
    " times as large as the " +
    data.length +
    "th largest industry - " +
    minDatum.name +
    ". " +
    maxDatum.name +
    "'s " +
    properties.variable +
    " in " +
    properties.region +
    " is " +
    aboveOrBelow +
    " the national average by " +
    maxToNationalPct +
    "%";

  return text;
}

export function createSingleRegionMultipleBusinessesLQ(data, properties) {
  let {
    maxDatum,
    nextMaxDatum,
    minDatum,
    maxToNextRatio,
    maxToMinRatio,
    maxToNationalRatio,
  } = processBarChartData(data, properties.nationAvg);
  let text =
    maxDatum.name +
    " is the most concentrated in " +
    properties.region +
    " by " +
    properties.variable +
    ", and is " +
    maxToNationalRatio +
    " times the national average.";
  return text;
}

export function createSingleBusinessMultipleRegions(data, properties) {
  let {
    maxDatum,
    nextMaxDatum,
    minDatum,
    maxToNextRatio,
    maxToMinRatio,
    maxToNationalRatio,
  } = processBarChartData(data, properties.nationAvg);
  let text =
    maxDatum.name +
    " has the largest " +
    properties.fm +
    " industry by " +
    properties.variable +
    ", " +
    maxToNextRatio +
    " times as large as the next largest county - " +
    nextMaxDatum.name +
    ", and " +
    maxToMinRatio +
    " times as large as the " +
    data.length +
    "th largest county - " +
    minDatum.name +
    ". " +
    maxDatum.name +
    "'s " +
    properties.variable +
    " in " +
    properties.fm +
    " is " +
    maxToNationalRatio +
    " times the national average.";
  return text;
}
