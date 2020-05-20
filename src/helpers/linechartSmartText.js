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

function _findCrossPoint(s1, s2) {
  for (const i in s1) {
    if (s1[i].y > s2[i].y) {
      return { crossYear: s1[i].x, crossValue: s1[i].y };
    }
  }
}

function _findSingularCrossPoint(s1, s2) {
  const { crossPoint } = _findCrossPoint(s1, s2);
  if (crossPoint) {
    for (const i in s2) {
      if (s2[i].x > crossPoint.crossYear && s2[i].y < crossPoint.crossValue) {
        return null;
      }
    }
    return crossPoint;
  }
}

function findUsurper(data) {
  let usurpers = [];
  // Criteria: x usurps y if
  // x's final value is higher, and its initial value is lower than y's
  // after the year k where x's value first surpass y's,
  // there are no years k+1,..., k+n where x's value is lower than y's.
  for (const datum of data) {
    const processedSeries = processSeries(datum.series);
    // Loop through every other datum
    for (const otherDatum of data.map((i) => i.index !== datum.index)) {
      const otherProcessedSeries = processSeries(otherDatum.series);
      if (
        processedSeries.firstDatum.y < otherProcessedSeries.firstDatum.y &&
        processedSeries.finalVal > otherProcessedSeries.finalVal
      ) {
        const crossPoint = _findSingularCrossPoint(
          datum.series,
          otherDatum.series
        );
        if (crossPoint) {
          usurpers.push({ u1: datum, xp: crossPoint, u2: otherDatum });
        }
      }
    }
  }
}

function findTrendBreaker(data) {
  /* If only one datum has overall increasing trend while all other
  data is decreasing, or vice versa, then:
  Return an object containing that trend-breaking data, as well as
  other information to generate the trend breaker text */
  let riseCount = 0;
  let riser = null;
  let riseChange = 0;

  let declineCount = 0;
  let decliner = null;
  let declineChange = 0;

  for (const datum of data) {
    const { periodNetChange, periodPctChange } = processSeries(datum.series);
    if (periodNetChange > 0) {
      riseCount++;
      riser = datum;
      riseChange = periodPctChange;
    } else if (periodNetChange < 0) {
      declineCount++;
      decliner = datum;
      declineChange = periodPctChange;
    }
  }

  if (riseCount === 1 && declineCount > 1) {
    return { rise: true, datum: riser, change: riseChange };
  } else if (declineCount === 1 && riseCount > 1) {
    return { rise: false, datum: decliner, change: declineChange };
  }
}

function processLineChartData(data) {
  /* Given data with many series, calculate a few things that
  are useful to generate the basic desc */
  const fullData = data.map((datum) => {
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
  let peakStatement = "";

  let topPeak = { x: 0, y: 0 }; // We will only describe the highest peak
  let topDatum = null;

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

function generateTrendBreakingDescription(data, properties) {
  const trendBreaker = findTrendBreaker(data);
  if (trendBreaker && trendBreaker.rise === true) {
    return `Of the industries shown during your selected period, \
    only ${trendBreaker.datum.label}'s ${properties.variable} has grown overall, \
    by ${trendBreaker.change}%. `;
  } else if (trendBreaker && trendBreaker.rise === false) {
    return `Of the industries shown during your selected period, \
    only ${trendBreaker.datum.label}'s ${properties.variable} has declined overall, \
    by ${trendBreaker.change}%. `;
  }
}

function generateUsurperDescription(data, properties) {
  let usurpers = findUsurper(data);
  let usurpersStatement = "";
  if (usurpers) {
    for (const u of usurpers) {
      usurpersStatement += `Industry ${u.u1.label} has surpassed ${u.u2.label} in \
      ${properties.variable} in ${u.xp.crossYear}. `;
    }
  }
  return usurpersStatement;
}

export function createSingleRegionMultipleBusinessesLine(data, properties) {
  const dataCopy = [...data]; // work on a copy of the data just to be sure
  const basicDesc = generateBasicDescription(dataCopy, properties);
  const peakDesc = generatePeakDescription(dataCopy, properties);
  const trendbreakDesc = generateTrendBreakingDescription(dataCopy, properties);
  // const usurpersStatement = generateUsurperDescription(data, properties);
  return basicDesc + peakDesc + trendbreakDesc;
}
