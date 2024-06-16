import { authService } from '~/server/services/AuthService'

export default defineEventHandler(async (event) => {
  if (getRequestURL(event).pathname.startsWith('/node/api/protected')) {
    const token = authService.convertToken(event.req.headers['authorization'] || '' as string)
    if (!token) {
      setResponseStatus(event, 401)
      return 'Access Denied. No token provided.'
    }

    const isVerified = await authService.verifyToken(token)
    if (!isVerified) {
      setResponseStatus(event, 401)
      return 'Access Denied. No token provided.'
    }
  }
})
