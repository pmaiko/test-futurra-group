// https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks

import ObserverService from '~/services/ObserverService'
import type { Directive, DirectiveBinding } from '@vue/runtime-core'

const gsap = useGsap()
let observer: ObserverService

const animations = {
  'fade': {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  },
  'fade-from-bottom': {
    from: {
      opacity: 0,
      transform: 'translateY(40px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0px)'
    }
  }
} as const

interface DirectiveOptions {
  name: keyof typeof animations,
  duration: number,
  delay: string,
  ease: string,
  disabled: boolean
}

const getAnimationOptions = (options: DirectiveOptions | undefined) => {
  if (options?.name && !animations[options.name]) {
    console.warn(`There is no name ${options.name} in v-animate`)
  }

  let animation: DirectiveOptions
  if (options?.name) {
    animation = animations[options.name].from as unknown as DirectiveOptions
  } else {
    animation = animations['fade-from-bottom'].from as unknown as DirectiveOptions
  }

  return {
    ...options,
    name: options?.name || 'fade-from-bottom',
    ease: options?.ease || animation.ease || 'power2.out',
    duration: options?.duration || animation.duration || 1,
    delay: options?.delay || animation.delay || 0,
    clearProps: true
  }
}

export default <Directive> {
  getSSRProps ({ value }: DirectiveBinding<DirectiveOptions | undefined>) {
    const { name } = getAnimationOptions(value)
    return {
      style: animations[name].from
    }
  },

  mounted: (element, { value }: DirectiveBinding<DirectiveOptions | undefined>) => {
    if (!value?.disabled) {
      const { name, ...options } = getAnimationOptions(value)

      const tweenOptions = {
        ...animations[name].to,
        ...options
      }

      gsap.set(element, animations[name].from)

      observer = new ObserverService(undefined, (element) => {
        gsap.to(element, tweenOptions)
      })

      observer?.observe(element)
    }
  },

  beforeUnmount (element) {
    observer?.unobserve(element)
  }
}
