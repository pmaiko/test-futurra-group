export const useViewportUnits = () => {
  const vwUnit = window.innerWidth * 0.01
  const vhUnit = window.innerHeight * 0.01

  return {
    vwUnit,
    vhUnit
  }
}
