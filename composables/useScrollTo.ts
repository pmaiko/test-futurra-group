import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

type Options = {
  x: number | HTMLElement
  y: number | HTMLElement
  offsetX: number
  offsetY: number
  scrollContainer: HTMLElement
  duration: number
}

export const useScrollTo = (options: Options) => {
  options = {
    x: options.x || 0,
    y: options.y || 0,
    offsetX: options.offsetX || 0,
    offsetY: options.offsetY || 0,
    scrollContainer: options.scrollContainer || window,
    duration: options.duration || 0
  }
  const gsap = useGsap()
  gsap.registerPlugin(ScrollToPlugin)

  gsap.to(options.scrollContainer, {
    duration: options.duration,
    ease: 'power2.inOut',
    scrollTo: {
      x: options.x,
      y: options.y,
      offsetX: options.offsetX,
      offsetY: options.offsetY
    }
  })
}
