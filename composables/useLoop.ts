export const useLoop = () => {
  return {
    goNext: (index: number, length: number) => {
      return (index + 1) % length
    },

    goPrev: (index: number, length: number) => {
      return (index - 1 + length) % length
    }
  }
}
