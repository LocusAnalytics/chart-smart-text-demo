import {
  createSingleBusinessMultipleRegions,
  createSingleRegionMultipleBusinesses,
} from "./barchartSmartText";

import { createSingleRegionMultipleBusinessesLine } from "./linechartSmartText";

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
