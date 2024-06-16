import mitt from 'mitt'

const emitter = mitt()

export const useBus = () => {
  return {
    bus: emitter
  }
}
