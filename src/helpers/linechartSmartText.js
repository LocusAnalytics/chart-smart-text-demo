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

export function createSingleRegionMultipleBusinessesLine(data, variable) {
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
