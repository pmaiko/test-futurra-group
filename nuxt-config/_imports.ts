export default defineNuxtConfig({
  imports: {
    dirs: [
      './store',
      './composables/**'
    ]
  },
  components: {
    dirs: [{
      path: '~/components/base',
      pathPrefix: false
    }]
  }
})
