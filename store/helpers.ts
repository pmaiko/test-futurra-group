import { type ParsedInfo, deviceType } from '~/types'

interface State {
  scrollbarWidth: number | null
  windowWidth: number | null
  windowHeight: number | null
  vwUnit: number | null
  vhUnit: number | null
  vwUnitStatic: number | null
  vhUnitStatic: number | null
  vvh: number | null,
  parsedUserAgent: ParsedInfo | null
}

export const useHelpersStore = defineStore('helpers', {
  state: (): State => ({
    scrollbarWidth: null,
    windowWidth: null,
    windowHeight: null,
    vwUnit: null,
    vhUnit: null,
    vwUnitStatic: null,
    vhUnitStatic: null,
    vvh: null,
    parsedUserAgent: null
  }),

  getters: {
    isMobile: state => state.parsedUserAgent?.deviceType === deviceType.isMobile,
    isTablet: state => state.parsedUserAgent?.deviceType === deviceType.isTablet,
    isDesktop: state => state.parsedUserAgent?.deviceType === deviceType.isDesktop,

    sizes: state => ({
      scrollbarWidth: state.scrollbarWidth,
      windowWidth: state.windowWidth,
      windowHeight: state.windowHeight,
      vwUnit: state.vwUnit,
      vhUnit: state.vhUnit,
      vwUnitStatic: state.vwUnitStatic,
      vhUnitStatic: state.vhUnitStatic,
      vvh: state.vvh
    })
  },

  actions: {
    setScrollbarWidth (payload: number) {
      this.scrollbarWidth = payload
    },

    setWindowDimensions ({ width, height }: { width: number, height: number }) {
      this.windowWidth = width
      this.windowHeight = height
    },

    setViewportUnits ({ vwUnit, vhUnit }: { vwUnit: number, vhUnit: number }) {
      this.vwUnit = vwUnit
      this.vhUnit = vhUnit
    },

    setViewportUnitsStatic ({ vwUnit, vhUnit }: { vwUnit: number, vhUnit: number }) {
      this.vwUnitStatic = vwUnit
      this.vhUnitStatic = vhUnit
    },

    setVisualViewport (payload: number) {
      this.vvh = payload
    },

    setParsedUserAgent (payload: ParsedInfo) {
      this.parsedUserAgent = payload
    }
  }
})
