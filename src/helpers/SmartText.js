function roundToDecimal(num, dec = 2) {
  // To round we have to multiply by 10^[n decimal places] then divide by the same
  let factor = 10 ** dec;
  return Math.round((num + Number.EPSILON) * factor) / factor;
}

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

function createSingleRegionMultipleBusinesses(data, nationAvg) {
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

function createSingleBusinessMultipleRegions(data, nationAvg) {
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

function processSeries(series) {
  /* Given a series i.e. array of objects:
  [{x: time, y: dependent val}]
  Calculate a bunch of things */
  // in place sort ascending year
  series.sort((a, b) => {
    return a.x - b.x;
  });
  let firstDatum = series[0];
  let lastDatum = series[series.length - 1];
  let periodStart = firstDatum.x;
  let periodEnd = lastDatum.x;
  let periodNetChange = lastDatum.y - firstDatum.y;
  let periodPctChange = (periodNetChange / firstDatum.y) * 100;
  let finalVal = lastDatum.y;
  return {
    periodStart,
    periodEnd,
    periodNetChange,
    periodPctChange,
    finalVal,
  };
}

function processLineChartData(data) {
  let dataCopy = [...data];
  let fullData = dataCopy.map((datum) => {
    return { ...datum, ...processSeries(datum.series) };
  });
  let highestNetChange = fullData.reduce((prev, curr) => {
    return prev.periodNetChange > curr.periodNetChange ? prev : curr;
  });
  let highestPctChange = fullData.reduce((prev, curr) => {
    return prev.periodPctChange > curr.periodPctChange ? prev : curr;
  });
  let highestFinalVal = fullData.reduce((prev, curr) => {
    return prev.finalVal > curr.finalVal ? prev : curr;
  });

  return {
    highestNetChange,
    highestPctChange,
    highestFinalVal,
  };
}

function createSingleRegionMultipleBusinessesLine(data, variable) {
  let {
    highestNetChange,
    highestPctChange,
    highestFinalVal,
  } = processLineChartData(data);
  let addOrLost = highestNetChange.periodNetChange > 0 ? "added" : "lost";
  let text =
    "Industry " +
    highestNetChange.label +
    " has " +
    addOrLost +
    " " +
    highestNetChange.periodNetChange +
    " " +
    variable +
    " between " +
    highestNetChange.periodStart +
    " and " +
    highestNetChange.periodEnd +
    ". Industry " +
    highestFinalVal.label +
    " has the highest value in " +
    highestFinalVal.periodEnd +
    ", at " +
    highestFinalVal.finalVal +
    ". Industry " +
    highestPctChange.label +
    " is the fastest growing, and it has grown " +
    highestPctChange.periodPctChange +
    "% from " +
    highestPctChange.periodStart +
    " to " +
    highestPctChange.periodEnd;
  return text;
}

export function createSmartText(data, chartType, chartProperties) {
  if (chartType === "single region multiple businesses") {
    return createSingleRegionMultipleBusinesses(
      data,
      chartProperties.nationAvg
    );
  } else if (chartType === "single business multiple regions") {
    return createSingleBusinessMultipleRegions(data, chartProperties.nationAvg);
  } else if (chartType === "single region multiple businesses line") {
    return createSingleRegionMultipleBusinessesLine(
      data,
      chartProperties.variable
    );
  }
}
