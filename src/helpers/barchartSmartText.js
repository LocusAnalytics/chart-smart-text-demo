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

export function createSingleRegionMultipleBusinesses(data, nationAvg) {
  let {
    maxDatum,
    nextMaxDatum,
    minDatum,
    maxToNextRatio,
    maxToMinRatio,
    maxToNationalRatio,
  } = processBarChartData(data, nationAvg);
  let text =
    "Industry " +
    maxDatum.name +
    " is the largest and it is " +
    maxDatum.val +
    ", which is " +
    maxToNextRatio +
    " times larger than the next largest industry " +
    nextMaxDatum.name +
    ", and " +
    maxToMinRatio +
    " times larger than the " +
    data.length +
    "th largest industry " +
    minDatum.name +
    " and " +
    maxToNationalRatio +
    " times the national average";
  return text;
}

export function createSingleBusinessMultipleRegions(data, nationAvg) {
  let {
    maxDatum,
    nextMaxDatum,
    minDatum,
    maxToNextRatio,
    maxToMinRatio,
    maxToNationalRatio,
  } = processBarChartData(data, nationAvg);
  let text =
    "Region " +
    maxDatum.name +
    " is the largest and it is " +
    maxDatum.val +
    ", which is " +
    maxToNextRatio +
    " times larger than the next largest region " +
    nextMaxDatum.name +
    ", and " +
    maxToMinRatio +
    " times larger than the " +
    data.length +
    "th largest region " +
    minDatum.name +
    ", and " +
    maxToNationalRatio +
    " times the national average";
  return text;
}
