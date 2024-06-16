import env from './nuxt-config/_env'
import seo from './nuxt-config/_seo'
import typescript from './nuxt-config/_typescript'
import vite from './nuxt-config/_vite'
import nitro from './nuxt-config/_nitro'
import imports from './nuxt-config/_imports'
import css from './nuxt-config/_css'
import modules from './nuxt-config/_modules'
import hooks from './nuxt-config/_hooks'
// import router from './nuxt-config/_router'

export default defineNuxtConfig({
  ...env,
  ...seo,
  ...typescript,
  ...vite,
  ...nitro,
  ...imports,
  ...css,
  ...hooks,
  ...modules,
  // ...router,

  build: {
    transpile: []
  },
  features: {
    inlineStyles: true
    // inlineStyles: id => !id?.includes('entry')
  },

  devtools: { enabled: true }
})
// https://nuxt.com/docs/api/configuration/nuxt-config
