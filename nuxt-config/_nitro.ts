export default defineNuxtConfig({
  nitro: {
    esbuild: {
      options: {
        minify: false
      }
    },
    storage: {
      fs: {
        driver: 'fs',
        base: 'server/storage'
      }
    }
  }
})
