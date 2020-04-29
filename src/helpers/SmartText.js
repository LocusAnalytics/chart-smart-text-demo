import {
  createSingleBusinessMultipleRegions,
  createSingleRegionMultipleBusinesses,
  createSingleRegionMultipleBusinessesLQ,
} from "./barchartSmartText";

import { createSingleRegionMultipleBusinessesLine } from "./linechartSmartText";

export function createSmartText(data, chartType, chartProperties) {
  if (chartType === "single region multiple businesses") {
    return createSingleRegionMultipleBusinesses(data, chartProperties);
  } else if (chartType === "single region multiple businesses lq") {
    return createSingleRegionMultipleBusinessesLQ(data, chartProperties);
  } else if (chartType === "single business multiple regions") {
    return createSingleBusinessMultipleRegions(data, chartProperties);
  } else if (chartType === "single region multiple businesses line") {
    return createSingleRegionMultipleBusinessesLine(data, chartProperties);
  }
}
