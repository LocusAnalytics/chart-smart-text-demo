import {
  createSingleBusinessMultipleRegions,
  createSingleRegionMultipleBusinesses,
} from "./barchartSmartText";

import { createSingleRegionMultipleBusinessesLine } from "./linechartSmartText";

export function createSmartText(data, chartType, chartProperties) {
  if (chartType === "single region multiple businesses") {
    return createSingleRegionMultipleBusinesses(data, chartProperties);
  } else if (chartType === "single business multiple regions") {
    return createSingleBusinessMultipleRegions(data, chartProperties);
  } else if (chartType === "single region multiple businesses line") {
    return createSingleRegionMultipleBusinessesLine(
      data,
      chartProperties.variable
    );
  }
}
