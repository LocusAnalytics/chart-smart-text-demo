function roundToDecimal(num, dec = 2) {
  // To round we have to multiply by 10^[n decimal places] then divide by the same
  let factor = 10 ** dec;
  return Math.round((num + Number.EPSILON) * factor) / factor;
}

function processBarChartData(data) {
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

  return { maxDatum, nextMaxDatum, minDatum, maxToNextRatio, maxToMinRatio };
}

function createSingleRegionMultipleBusinesses(data) {
  let {
    maxDatum,
    nextMaxDatum,
    minDatum,
    maxToNextRatio,
    maxToMinRatio,
  } = processBarChartData(data);
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
    minDatum.name;
  return text;
}

function createSingleBusinessMultipleRegions(data) {
  let {
    maxDatum,
    nextMaxDatum,
    minDatum,
    maxToNextRatio,
    maxToMinRatio,
  } = processBarChartData(data);
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
    minDatum.name;
  return text;
}

export function createSmartText(data, chartType) {
  if (chartType === "single region multiple businesses") {
    return createSingleRegionMultipleBusinesses(data);
  } else if (chartType === "single business multiple regions") {
    return createSingleBusinessMultipleRegions(data);
  }
}
