export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'nuxt-lodash',
    'nuxt-svgo',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/tailwindcss',
    'nuxt-eslint-globals'
  ],
  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  },
  lodash: {
    prefix: '_',
    upperAfterPrefix: false
  },
  svgo: {
    global: true,
    svgo: false,
    svgoConfig: {},
    defaultImport: 'component'
  },
  svgSprite: {
    input: '~/assets/icons'
  }
})
