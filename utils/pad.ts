export const pad = (number: number, countZero: number = 1): string => {
  if (Number(number) < 10) {
    return new Array(countZero).fill('0').join('') + parseInt(String(number))
  }
  return String(parseInt(String(number)))
}
