import breakpoints from '~/assets/variables/breakpoints'

type Breakpoints = typeof breakpoints
type Points = keyof Breakpoints
type MqlPoints =
  | Points
  | `${Points}Up`
  | `${Points}Down`
  | 'portrait'
  | 'landscape'
  | 'landscapeProtected'
  | 'hasMouse'
  | 'hasTouch'

export default defineNuxtPlugin(() => {
  const keysBreakpoints: Points[] = Object.keys(breakpoints) as Points[]
  const points = reactive(keysBreakpoints.reduce((acc, breakpoint) => {
    acc[breakpoint as Points] = false
    return acc
  }, {} as Record<MqlPoints, boolean>))

  const getNextBreakpoint = (point: Points) => {
    return keysBreakpoints.find(p => breakpoints[p] > breakpoints[point])
  }
  const useMatchMedia = (query: string) => {
    if (import.meta.client) {
      return window.matchMedia(query)
    } else {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {}
      } as unknown as MediaQueryList
    }
  }

  const mqls = {} as Record<MqlPoints, MediaQueryList>
  keysBreakpoints.forEach((point) => {
    const nextPoint = getNextBreakpoint(point)

    if (nextPoint) {
      mqls[point] = useMatchMedia(`(min-width: ${breakpoints[point]}px) and (max-width: ${breakpoints[nextPoint] - 0.02}px)`)
      points[point] = mqls[point].matches

      mqls[`${point}Down`] = useMatchMedia(`(max-width: ${breakpoints[nextPoint] - 0.02}px)`)
      points[`${point}Down`] = mqls[`${point}Down`].matches
    } else {
      mqls[point] = useMatchMedia(`(min-width: ${breakpoints[point]}px)`)
      points[point] = mqls[point].matches

      mqls[`${point}Down`] = useMatchMedia(`(max-width: ${breakpoints[point] - 0.02}px)`)
      points[`${point}Down`] = mqls[`${point}Down`].matches
    }

    mqls[`${point}Up`] = useMatchMedia(`(min-width: ${breakpoints[point]}px)`)
    points[`${point}Up`] = mqls[`${point}Up`].matches
  })

  mqls.portrait = useMatchMedia('(orientation: portrait)')
  points.portrait = mqls.portrait.matches

  mqls.landscape = useMatchMedia('(orientation: landscape)')
  points.landscape = mqls.landscape.matches

  mqls.landscapeProtected = useMatchMedia('(max-height: 414px) and (max-width: 896px) and (orientation: landscape)')
  points.landscapeProtected = mqls.landscapeProtected.matches

  mqls.hasMouse = useMatchMedia('(hover: hover)')
  points.hasMouse = mqls.hasMouse.matches

  mqls.hasTouch = useMatchMedia('(pointer: coarse)')
  points.hasTouch = mqls.hasTouch.matches

  Object.keys(mqls).forEach((point) => {
    mqls[point as MqlPoints].addListener((event: MediaQueryListEvent) => {
      points[point as MqlPoints] = event.matches
    })
  })

  return {
    provide: {
      resp: points
    }
  }
})
