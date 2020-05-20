import { roundToDecimal } from "./smartTextHelpers";

// THESE FUNCTIONS PROCESS SERIES DATA (ARRAYS OF  {X: YEAR, Y: VALUE})

function findSeriesPeak(series) {
  /* Given a series i.e. array of objects:
    [{x: time, y: dependent val}]
    If series has a peak, i.e. an item that is not at the start or the end which
    is higher than every other items in the series, return that peak item.
    Otherwise, return null */

  const { periodStart, periodEnd } = processSeries(series);

  const seriesMax = series.reduce((prev, curr) => {
    return prev.y > curr.y ? prev : curr;
  });

  if (seriesMax.x !== periodStart && seriesMax.x !== periodEnd) {
    return seriesMax;
  } else {
    return null;
  }
}

function processSeries(series) {
  /* Given a series i.e. array of objects:
    [{x: time, y: dependent val}]
    Calculate a bunch of things that mainly feed into the basic desc,
    but are also useful for other desc */
  // in place sort ascending year
  series.sort((a, b) => {
    return a.x - b.x;
  });
  const firstDatum = series[0];
  const lastDatum = series[series.length - 1];
  const periodStart = firstDatum.x;
  const periodEnd = lastDatum.x;
  const periodNetChange = lastDatum.y - firstDatum.y;
  const periodPctChange = Math.floor((periodNetChange / firstDatum.y) * 100);
  const finalVal = lastDatum.y;
  return {
    firstDatum,
    lastDatum,
    periodStart,
    periodEnd,
    periodNetChange,
    periodPctChange,
    finalVal,
  };
}

// THESE FUNCTIONS PROCESS LINE CHART DATA, I.E.:
// ARRAYS OF {LABEL: FM OR CTY NAME, SERIES: TIME SERIES}

function processLineChartData(data) {
  /* Given data with many series, calculate a few things that
  are useful to generate the basic desc */
  const dataCopy = [...data];
  const fullData = dataCopy.map((datum) => {
    return { ...datum, ...processSeries(datum.series) };
  });
  const highestNetChange = fullData.reduce((prev, curr) => {
    return prev.periodNetChange > curr.periodNetChange ? prev : curr;
  });
  const highestPctChange = fullData.reduce((prev, curr) => {
    return prev.periodPctChange > curr.periodPctChange ? prev : curr;
  });
  const highestFinalVal = fullData.reduce((prev, curr) => {
    return prev.finalVal > curr.finalVal ? prev : curr;
  });

  return {
    highestNetChange,
    highestPctChange,
    highestFinalVal,
  };
}

// THESE FUNCTIONS ACTUALLY CALL ON THE DATA PROCESSORS
// AND USE THEIR OUTPUT TO STITCH TOGETHER REAL DESCRIPTION TEXTS

function generateBasicDescription(data, properties) {
  const {
    highestNetChange,
    highestPctChange,
    highestFinalVal,
  } = processLineChartData(data);
  const addOrLost = highestNetChange.periodNetChange > 0 ? "added" : "lost";

  // change is always positive (in text)
  const netChange = Math.abs(highestNetChange.periodNetChange);
  const pctChange = Math.abs(highestPctChange.periodPctChange);

  let growthStatement = "";
  if (highestPctChange.periodPctChange > 0) {
    growthStatement = `Industry ${highestPctChange.label} is the fastest growing,\
      and it has grown \
      ${pctChange}% \
      from ${highestPctChange.periodStart} to ${highestPctChange.periodEnd}`;
  } else if (highestPctChange.periodPctChange < 0) {
    growthStatement = `Industry ${highestPctChange.label} is the fastest declining,\
      and it has declined \
      ${pctChange}% \
      from ${highestPctChange.periodStart} to ${highestPctChange.periodEnd}`;
  }

  const template = `${highestNetChange.label} has ${addOrLost} ${netChange} \
  ${properties.variable} between ${highestNetChange.periodStart} and \
  ${highestNetChange.periodEnd}. ${highestFinalVal.label} has the highest value \
  in ${highestFinalVal.periodEnd}, at ${highestFinalVal.finalVal} ${properties.variable}. \
  ${growthStatement}. `;

  return template;
}

function generatePeakDescription(data, properties) {
  var peakStatement = "";

  var topPeak = { x: 0, y: 0 }; // We will only describe the highest peak
  var topDatum = null;

  for (const datum of data) {
    const seriesPeak = findSeriesPeak(datum.series);
    if (seriesPeak && seriesPeak.y > topPeak.y) {
      topPeak = seriesPeak;
      topDatum = datum;
    }
  }

  if (topDatum != null && topPeak.x !== 0) {
    peakStatement = `${topDatum.label} has reached a peak in ${properties.variable} at \
    ${topPeak.x}, at a value of ${topPeak.y}. `;
  }

  return peakStatement;
}

export function createSingleRegionMultipleBusinessesLine(data, properties) {
  const basicDesc = generateBasicDescription(data, properties);
  const peakDesc = generatePeakDescription(data, properties);
  return basicDesc + peakDesc;
}
