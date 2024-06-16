export default defineEventHandler((event) => {
  setResponseStatus(event, 404)
  return {
    success: false,
    statusCode: 404,
    message: 'Not Found'
  }
})
