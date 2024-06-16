export default defineEventHandler(async (event) => {
  const lang = event.req.headers['accept-language'] || useRuntimeConfig().public.LOCALE_DEFAULT

  const data = await useStorage('assets:server').getItem(`translations/${lang}/index.json`)
  if (data) {
    return data
  }

  setResponseStatus(event, 404)
  return {
    success: false,
    statusCode: 404,
    message: 'Not Found'
  }
})
