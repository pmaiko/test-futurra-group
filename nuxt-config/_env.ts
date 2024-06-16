export default defineNuxtConfig({
  runtimeConfig: {
    SECRET_KEY: process.env.SECRET_KEY,

    public: {
      NODE_JS_URL: process.env.NODE_JS_URL,
      NODE_JS_API_URL: process.env.NODE_JS_API_URL,
      GA_TRACKING: process.env.GA_TRACKING,
      LOCALE_DEFAULT: process.env.LOCALE_DEFAULT
    }
  }
})
