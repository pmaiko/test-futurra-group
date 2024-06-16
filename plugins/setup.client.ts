import { useViewportUnits } from '~/composables/useViewportUnits'

export default defineNuxtPlugin(() => {
  const { bus: EventBus } = useBus()

  onNuxtReady(() => {
    const helpersStore = useHelpersStore()

    const onResizeChange = (event: Event | null) => {
      helpersStore.setViewportUnits(useViewportUnits())

      helpersStore.setWindowDimensions({
        width: Math.min(window.innerWidth, window.screen.width || 0),
        height: Math.min(window.innerHeight, window.screen.height || 0)
      })
      event && EventBus.emit('resize', event)
    }

    const onOrientationChange = (event: Event | null) => {
      helpersStore.setViewportUnitsStatic(useViewportUnits())
      event && EventBus.emit('orientationchange', event)
    }

    const onScrollChange = (event: Event | null) => {
      event && EventBus.emit('scroll', event)
    }

    const onVisualViewportChange = (event: Event | null) => {
      const visualViewport = event?.target as VisualViewport | null
      const height = visualViewport?.height || null
      height && helpersStore.setVisualViewport(height)
    }

    onResizeChange(null)
    onOrientationChange(null)
    onScrollChange(null)
    onVisualViewportChange(null)

    window.addEventListener('resize', _debounce(onResizeChange, 600), false)
    window.addEventListener('orientationchange', onOrientationChange, false)
    window.addEventListener('scroll', _throttle(onScrollChange, 50), false)
    window.visualViewport?.addEventListener('resize', _debounce(onVisualViewportChange, 600), false)
  })
})
