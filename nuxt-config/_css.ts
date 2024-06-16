export default defineNuxtConfig({
  css: [
    '~/assets/styles/main.scss',
    'vue-final-modal/style.css'
  ],

  postcss: {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 16,
        minPixelValue: 1,
        propList: ['*'],
        selectorBlackList: []
      }
    }
  }
})
