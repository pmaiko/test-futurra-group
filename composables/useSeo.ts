import type { breadcrumb, Meta } from '~/types/page'
import colorsVar1 from 'assets/variables/colors-var1'
import colorsVar2 from '~/assets/variables/colors-var2'

export const  useSeo = (meta: Meta | null) => {
  const indexStore = useIndexStore()
  const helpersStore = storeToRefs(useHelpersStore())
  const { $resp } = useNuxtApp()
  const { origin } = useRequestURL()
  const { fullPath } = useRoute()

  const variantValue = meta?.seo.variant as Variants
  const variant = Variants[variantValue] || ''

  const mergedColors = {
    ...colorsVar1,
    ...(variant === Variants.var1 ? colorsVar1 : {}),
    ...(variant === Variants.var2 ? colorsVar2 : {})
  }

  const generateAlternate = () => {
    const locales = indexStore.locales

    return locales?.map((locale) => {
      return {
        rel: 'alternate',
        href: origin + localizePath(fullPath, locale.code),
        hreflang: locale.code
      }
    }) || []
  }

  const generateBreadcrumbsMicroMark = (breadcrumbs: breadcrumb[]) => {
    const urls = breadcrumbs.map(breadcrumb => localizePath(breadcrumb.url))

    const getId = (breadcrumb: breadcrumb) => {
      if (localizePath(breadcrumb.url)) {
        return `${origin}${localizePath(breadcrumb.url)}`
      } else if (!urls.includes(fullPath)) {
        return `${origin}${localizePath(breadcrumb.url) || fullPath || ''}`
      } else {
        return `${origin}${_get(breadcrumb, 'label', '')?.replace(/\s+/g, '-')?.trim()}`
      }
    }

    return {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbs?.map((breadcrumb, index) => {
        return {
          '@type': 'ListItem',
          'position': index + 1,
          'item': {
            '@id': getId(breadcrumb),
            'name': breadcrumb.label
          }
        }
      })
    }
  }

  const generateFavicon = () => {
    return (meta?.seo.favicons || []).map((favicon) => {
      return {
        rel: favicon.rel,
        type: favicon.type,
        sizes: favicon.sizes,
        href: favicon.href,
        color: favicon.color
      }
    })
  }

  const htmlClasses = computed(() => {
    const classes = []

    classes.push(_kebabCase(helpersStore.parsedUserAgent.value?.osName || ''))
    classes.push(_kebabCase(helpersStore.parsedUserAgent.value?.browserName || ''))
    classes.push(_kebabCase(helpersStore.parsedUserAgent.value?.deviceType || ''))

    $resp.hasMouse && classes.push(_kebabCase('hasMouse'))
    $resp.hasTouch && classes.push(_kebabCase('hasTouch'))

    classes.push(variant)

    return classes.join(' ')
  })

  const rootStyles = computed(() => {
    return ':root{' + Object.entries(helpersStore.sizes.value).reduce((acc, [key, value]) => {
      value && (acc += `--${_kebabCase(key)}:${value};`)
      return acc
    }, '') + '}'
  })

  const rootColorsStyles = computed(() => {
    return ':root{' + Object.entries(mergedColors).reduce((acc, [key, value]) => {
      value && (acc += `--${_kebabCase(key)}:${value};`)
      return acc
    }, '') + '}'
  })

  const rootClassesColorsStyles = computed(() => {
    return Object.entries(mergedColors).reduce((acc, [key, value]) => {
      if (value) {
        key = _kebabCase(key)
        acc += `.text-${key}{color:var(--${key});}`
        acc += `.bg-${key}{background-color:var(--${key});}`
        acc += `.border-${key}{border-color:var(--${key});}`
      }
      return acc
    }, '')
  })

  const handler = computed(() => {
    const seo = meta?.seo
    const og = meta?.seo.og
    const breadcrumbs = meta?.seo.breadcrumbs

    const domain = new URL(origin)?.hostname

    return {
      htmlAttrs: {
        lang: _get(indexStore, 'currentLocale.code'),
        class: htmlClasses
      },
      style: [
        {
          innerHTML: rootStyles
        },
        {
          innerHTML: rootColorsStyles
        },
        {
          innerHTML: rootClassesColorsStyles
        }
      ],
      title: seo?.title,
      meta: [
        { name: 'description', content: seo?.description },
        { name: 'robots', content: seo?.robots },

        { property: 'og:title', content: og?.title },
        { property: 'og:description', content: og?.description },
        { property: 'og:image', content: origin + og?.image },
        { property: 'og:locale', content: _get(indexStore, 'currentLocale.code') },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: domain },

        { property: 'theme-color', name: 'theme-color', content: '#141315' }
      ],
      link: [
        { rel: 'canonical', href: origin + localizePath(fullPath, indexStore.currentLocale?.code) },
        ...generateAlternate(),
        ...generateFavicon()
      ],
      script: [
        {
          children: breadcrumbs && JSON.stringify(generateBreadcrumbsMicroMark(breadcrumbs)),
          type: 'application/ld+json'
        }
      ]
    }
  })

  useHead(handler.value)
}
