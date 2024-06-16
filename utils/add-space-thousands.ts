export const addSpaceThousands = (number: string, space: string = ' '): string => {
  number = String(number)
  let [integer, decimals] = number.split('.')
  integer = integer.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + space)

  if (decimals) {
    return `${integer}.${decimals}`
  }
  return String(integer)
}
