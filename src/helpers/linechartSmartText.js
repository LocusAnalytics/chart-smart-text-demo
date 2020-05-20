import { roundToDecimal } from "./smartTextHelpers";

function findSeriesPeak(series) {
  /* Given a series i.e. array of objects:
    [{x: time, y: dependent val}]
    If series has a peak, i.e. an item that is not at the start or the end which
    is higher than every other items in the series, return that peak item.
    Otherwise, return null */

  const { periodStart, periodEnd } = processSeries(series);

  const seriesMax = Math.max.apply(
    Math,
    series.map((datum) => datum.y)
  );

  if (seriesMax.x !== periodStart && seriesMax.y !== periodEnd) {
    return seriesMax;
  } else {
    return null;
  }
}

function processSeries(series) {
  /* Given a series i.e. array of objects:
    [{x: time, y: dependent val}]
    Calculate a bunch of things */
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

function processLineChartData(data) {
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

function generateBasicDescription(data, properties) {
  const {
    highestNetChange,
    highestPctChange,
    highestFinalVal,
  } = processLineChartData(data);
  const addOrLost = highestNetChange.periodNetChange > 0 ? "added" : "lost";

  // change is always positive (in text)
  const change = Math.abs(highestNetChange.periodNetChange);
  let growthStatement = "";
  if (highestPctChange.periodPctChange > 0) {
    growthStatement = `Industry ${highestPctChange.label} is the fastest growing,\
      and it has grown \
      ${highestPctChange.periodPctChange}% \
      from ${highestPctChange.periodStart} to ${highestPctChange.periodEnd}`;
  } else if (highestPctChange.periodPctChange < 0) {
    growthStatement = `Industry ${highestPctChange.label} is the fastest declining,\
      and it has declined \
      ${highestPctChange.periodPctChange}% \
      from ${highestPctChange.periodStart} to ${highestPctChange.periodEnd}`;
  }

  const template = `${highestNetChange.label} has ${addOrLost} ${change} \
  ${properties.variable} between ${highestNetChange.periodStart} and \
  ${highestNetChange.periodEnd}. ${highestFinalVal.label} has the highest value \
  in ${highestFinalVal.periodEnd}, at ${highestFinalVal.finalVal} ${properties.variable}. \
  ${growthStatement}`;

  return template;
}

export function createSingleRegionMultipleBusinessesLine(data, properties) {
  return generateBasicDescription(data, properties);
}
