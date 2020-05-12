import { roundToDecimal } from "./smartTextHelpers";
import { Container } from "@material-ui/core";

function processBarChartData(data, nationAvg) {
  // Make deep copy of data because splice later modifies the original array
  const dataCopy = [...data];
  /* I know that this iterates over the array 4 times,
    but our arrays are always gonna be short */
  const maxDatum = dataCopy.reduce((prev, curr) => {
    return prev.val > curr.val ? prev : curr;
  });
  dataCopy.splice(dataCopy.indexOf(maxDatum), 1);
  const nextMaxDatum = dataCopy.reduce((prev, curr) => {
    return prev.val > curr.val ? prev : curr;
  });
  const minDatum = dataCopy.reduce((prev, curr) => {
    return prev.val < curr.val ? prev : curr;
  });
  const maxToNextRatio = roundToDecimal(maxDatum.val / nextMaxDatum.val);
  const maxToMinRatio = roundToDecimal(maxDatum.val / minDatum.val);
  const maxToNationalRatio = roundToDecimal(maxDatum.val / nationAvg);

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
  const {
    maxDatum,
    nextMaxDatum,
    minDatum,
    maxToNextRatio,
    maxToMinRatio,
    maxToNationalRatio,
  } = processBarChartData(data, properties.nationAvg);
  const highestIndustryName = maxDatum.name;
  const regionName = properties.region;
  const variableName = properties.variable;
  const nextHighestIndustryName = nextMaxDatum.name;
  const numOfIndustriesShown = data.length;
  const lowestIndustryName = minDatum.name;
  const aboveOrBelow = maxToNationalRatio > 1 ? "above" : "below";

  // Because it is percent above or below national, not pct of national
  const highestToNationalPercent = Math.round(
    Math.abs(maxToNationalRatio * 100 - 100)
  );

  const template = `${highestIndustryName} is the largest in ${regionName} by\
  ${variableName}, ${maxToNextRatio} times as large as the next largest industry,\
  ${nextHighestIndustryName}, and ${maxToMinRatio} times as large as\
  the ${numOfIndustriesShown}th largest industry, ${lowestIndustryName}.\
  ${highestIndustryName}'s and ${variableName} in ${regionName} is ${aboveOrBelow}\
  the national average by ${highestToNationalPercent}%.`;

  return template;
}

export function createSingleRegionMultipleBusinessesLQ(data, properties) {
  const { maxDatum, maxToNationalRatio } = processBarChartData(
    data,
    properties.nationAvg
  );
  const highestIndustryName = maxDatum.name;
  const template = `You have the highest comparative advantage in ${highestIndustryName}, \
  which is ${maxToNationalRatio} times the national average`;

  return template;
}

export function createSingleBusinessMultipleRegions(data, properties) {
  const {
    maxDatum,
    nextMaxDatum,
    minDatum,
    maxToNextRatio,
    maxToMinRatio,
    maxToNationalRatio,
  } = processBarChartData(data, properties.nationAvg);
  const highestRegionName = maxDatum.name;
  const industryName = properties.fm;
  const variableName = properties.variable;
  const nextHighestRegionName = nextMaxDatum.name;
  const numOfRegionsShown = data.length;
  const lowestRegionName = minDatum.name;
  const aboveOrBelow = maxToNationalRatio > 1 ? "above" : "below";

  // Because it is percent above or below national, not pct of national
  const highestToNationalPercent = Math.round(
    Math.abs(maxToNationalRatio * 100 - 100)
  );
  const template = `${highestRegionName} has the largest ${industryName} industry by\
  ${variableName}, ${maxToNextRatio} times as large as the next largest county, \
  ${nextHighestRegionName}, and ${maxToMinRatio} times as large as\
  the ${numOfRegionsShown}th largest county, ${lowestRegionName}. \
  ${highestRegionName}'s ${variableName} in ${industryName} is ${aboveOrBelow}\
  the national average by ${highestToNationalPercent}%.`;

  return template;
}
