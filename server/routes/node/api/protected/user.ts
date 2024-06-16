import { authService } from '~/server/services/AuthService'
import { userService } from '~/server/services/UserService'

export default defineEventHandler(async (event) => {
  const token = authService.convertToken(event.req.headers['authorization'] as string)
  return await userService.getUserByToken(token)
})
