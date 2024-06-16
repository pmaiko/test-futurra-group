interface Listeners {
  up: (() => void)[];
  right: (() => void)[];
  down: (() => void)[];
  left: (() => void)[];
}

export default class SwipeEventsService {
  private startX: number
  private startY: number
  private element: Element
  private listeners: Listeners

  constructor (element: Element) {
    this.startX = 0
    this.startY = 0

    this.element = element

    this.listeners = {
      up: [],
      right: [],
      down: [],
      left: []
    }

    this.element.addEventListener('touchstart', this.touchstart, { passive: true })
  }

  onSwipe (direction: keyof Listeners, callback: () => void) {
    this.listeners[direction].push(callback)
  }

  unobserve = () => {
    this.element.removeEventListener('touchstart', this.touchstart)
    this.element.removeEventListener('touchmove', this.touchmove)
  }

  private touchstart = (event: Event) => {
    if (event instanceof TouchEvent) {
      const touches = event.touches
      if (touches && touches.length) {
        this.startX = touches[0].pageX
        this.startY = touches[0].pageY
        this.element.addEventListener('touchmove', this.touchmove, { passive: true })
      }
    }
  }

  private touchmove (event: Event) {
    if (event instanceof TouchEvent) {
      const touches = event.touches
      if (touches && touches.length) {
        const deltaX = this.startX - touches[0].pageX
        const deltaY = this.startY - touches[0].pageY

        if (deltaY >= 50) {
          this.listeners.up.forEach(callback => callback())
        }
        if (deltaX <= -50) {
          this.listeners.right.forEach(callback => callback())
        }
        if (deltaY <= -50) {
          this.listeners.down.forEach(callback => callback())
        }
        if (deltaX >= 50) {
          this.listeners.left.forEach(callback => callback())
        }

        if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
          this.element.removeEventListener('touchmove', this.touchmove)
        }
      }
    }
  }
}
