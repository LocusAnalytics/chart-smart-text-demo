import { roundToDecimal } from "./smartTextHelpers";
import { Container } from "@material-ui/core";

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
  var highestIndustryName = maxDatum.name;
  var regionName = properties.region;
  var variableName = properties.variable;
  var nextHighestIndustryName = nextMaxDatum.name;
  var numOfIndustriesShown = data.length;
  var lowestIndustryName = minDatum.name;
  var aboveOrBelow = maxToNationalRatio > 1 ? "above" : "below";

  // Because it is percent above or below national, not pct of national
  var highestToNationalPercent = Math.round(
    Math.abs(maxToNationalRatio * 100 - 100)
  );

  let template = `${highestIndustryName} is the largest in ${regionName} by\
  ${variableName}, ${maxToNextRatio} times as large as the next largest industry,\
  ${nextHighestIndustryName}, and ${maxToMinRatio} times as large as\
  the ${numOfIndustriesShown}th largest industry, ${lowestIndustryName}.\
  ${highestIndustryName}'s and ${variableName} in ${regionName} is ${aboveOrBelow}\
  the national average by ${highestToNationalPercent}%.`;

  return template;
}

export function createSingleRegionMultipleBusinessesLQ(data, properties) {
  let { maxDatum, maxToNationalRatio } = processBarChartData(
    data,
    properties.nationAvg
  );
  let highestIndustryName = maxDatum.name;
  let template = `You have the highest comparative in ${highestIndustryName}, \
  which is ${maxToNationalRatio} times the national average`;

  return template;
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
  var highestRegionName = maxDatum.name;
  var industryName = properties.fm;
  var variableName = properties.variable;
  var nextHighestRegionName = nextMaxDatum.name;
  var numOfRegionsShown = data.length;
  var lowestRegionName = minDatum.name;
  var aboveOrBelow = maxToNationalRatio > 1 ? "above" : "below";

  // Because it is percent above or below national, not pct of national
  var highestToNationalPercent = Math.round(
    Math.abs(maxToNationalRatio * 100 - 100)
  );
  let template = `${highestRegionName} has the largest ${industryName} industry by\
  ${variableName}, ${maxToNextRatio} times as large as the next largest county, \
  ${nextHighestRegionName}, and ${maxToMinRatio} times as large as\
  the ${numOfRegionsShown}th largest county, ${lowestRegionName}. \
  ${highestRegionName}'s ${variableName} in ${industryName} is ${aboveOrBelow}\
  the national average by ${highestToNationalPercent}%.`;

  return template;
}
