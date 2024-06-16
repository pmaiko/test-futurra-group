import { authService } from '~/server/services/AuthService'
import { refreshedTokensService } from '~/server/services/RefreshedTokensService'

export default defineEventHandler(async (event) => {
  // const delay = () =>  new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(null)
  //   }, 3000)
  // })
  // await delay()

  const getError = () => {
    setResponseStatus(event, 401)
    return 'Access Denied. No refresh token provided.'
  }

  const body = await readBody(event)
  const refreshToken = body['refreshToken']

  if (await refreshedTokensService.checkIncludesToken(refreshToken)) {
    setResponseStatus(event, 477)
    return 'Access Denied. It is refreshed token.'
  }

  if (!refreshToken) {
    return getError()
  }

  const isVerified = await authService.verifyToken(refreshToken)
  if (isVerified) {
    await refreshedTokensService.setRefreshedToken(refreshToken)
    const tokens = await authService.refreshTokens(refreshToken)

    if (tokens) {
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }
    } else {
      return getError()
    }
  } else {
    return getError()
  }
})
