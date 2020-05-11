import { roundToDecimal } from "./smartTextHelpers";
import { fms, counties } from "./params";

export function getRandom(arr, n) {
  /* Get n random elements from arr
    Using black magic Fisher-Yates shuffle
    Code is from here
    https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array/45556840#45556840
    Read the explanation here:
    https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modern_method
    */
  let res = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) {
    throw new RangeError(
      "Trying to randomly take more elements than there are available"
    );
  }
  while (n--) {
    var x = Math.floor(Math.random() * len);

    res[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return res;
}

export function generateBarchartData(
  n,
  counties_or_fms,
  data_upper_bounds = 30
) {
  /* Generate barchart with randonmized data for n counties or fms
  data_upper_bounds is at 30 because Slider.js currently has a max set at 30*/
  let res = new Array(n);
  let randomNames = getRandom(
    counties_or_fms === "counties" ? counties : fms,
    n
  );
  while (n--) {
    res[n] = {
      index: n,
      name: randomNames[n],
      val: roundToDecimal(Math.random() * data_upper_bounds, 1),
    };
  }
  return res;
}

function _generateSeries(n_years, startYear, data_upper_bounds) {
  let series = new Array(n_years);
  while (n_years--) {
    let year = startYear + n_years;
    series[n_years] = {
      x: year,
      y: Math.floor(Math.random() * data_upper_bounds),
    };
  }
  return series;
}

export function generateLinechartData(
  n,
  counties_or_fms,
  n_years,
  startYear = 2005,
  data_upper_bounds = 30
) {
  let res = new Array(n);
  let randomNames = getRandom(
    counties_or_fms === "counties" ? counties : fms,
    n
  );
  while (n--) {
    res[n] = {
      index: n,
      label: randomNames[n],
      series: _generateSeries(n_years, startYear, data_upper_bounds),
    };
  }
  return res;
}
