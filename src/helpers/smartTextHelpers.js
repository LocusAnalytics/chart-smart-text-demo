export function roundToDecimal(num, dec = 2) {
  // To round we have to multiply by 10^[n decimal places] then divide by the same
  let factor = 10 ** dec;
  return Math.round((num + Number.EPSILON) * factor) / factor;
}
