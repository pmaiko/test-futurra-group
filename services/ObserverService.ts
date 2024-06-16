import type { WatchStopHandle } from '@vue/runtime-core'

interface IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}


interface IntersectionObserverEntry {
  readonly boundingClientRect: DOMRectReadOnly;
  readonly intersectionRatio: number;
  readonly intersectionRect: DOMRectReadOnly;
  readonly isIntersecting: boolean;
  readonly rootBounds: DOMRectReadOnly | null;
  readonly target: Element;
  readonly time: number;
}

type InViewCallback = (element: Element) => void
type OutViewCallback = (element: Element) => void

export default class ObserverService {
  static instanceCount: number = 0
  private observer: IntersectionObserver
  private unwatch: WatchStopHandle | null = null

  constructor (options: IntersectionObserverInit = { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0 }, onInViewCallBack?: InViewCallback, onOutViewCallBack?: OutViewCallback) {
    ObserverService.instanceCount++
    const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
      entries.forEach((entry) => {
        const element = entry.target

        if (entry.isIntersecting) {
          onInViewCallBack?.(element)

          !onOutViewCallBack && observer.unobserve(element)
        } else {
          onOutViewCallBack?.(element)
        }
      })
    }
    this.observer = new IntersectionObserver(callback, options)
  }

  observe = (element: Element) => {
    this.unwatch = watch(() => useIndexStore().preloader, (preloader) => {
      if (!preloader) {
        this.observer.observe(element)
      }
    }, { immediate: true })
  }

  unobserve = (element: Element) => {
    this.observer.unobserve(element)
    this.unwatch?.()
  }

  disconnect = () => {
    this.observer.disconnect()
    this.unwatch?.()
  }
}
