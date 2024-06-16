// https://medium.com/@techsuneel99/jwt-authentication-in-nodejs-refresh-jwt-with-cookie-based-token-37348ff685bf
// https://medium.com/@imanmalekian31/how-to-use-jwt-and-usefetch-to-make-authenticated-api-requests-in-nuxt-3-924708170678
// https://github.com/Black-Kamelia/Hedera/blob/develop/client/utils/fetch/$fetchAPI.ts
// https://github.com/trandaison/nuxt-3-auth/blob/main/src/runtime/services/Auth.ts
// https://dev.to/rafaelmagalhaes/authentication-in-nuxt-3-375o
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import jwt from 'jsonwebtoken'
import type { User } from '@prisma/client'
import { personalTokenService } from '~/server/services/PersonalTokenService'

class AuthService {
  async createTokens (user: User) {
    const tokens = this.getTokens()

    const createdTokens = await prisma.personalToken.create({
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        userId: user.id
      }
    })

    return {
      accessToken: createdTokens.accessToken,
      refreshToken: createdTokens.refreshToken
    }
  }

  async refreshTokens (refreshToken: string) {
    const tokens = this.getTokens()
    const personalToken = await personalTokenService.getPersonalToken(refreshToken)

    if (personalToken) {
      const updatedPersonalToken = await personalTokenService.updatePersonalToken(personalToken, tokens)
      return {
        accessToken: updatedPersonalToken.accessToken,
        refreshToken: updatedPersonalToken.refreshToken
      }
    }
  }

  async getUserIdByToken (token: string) {
    const personalToken = await prisma.personalToken.findFirst({
      where: {
        OR: [
          { accessToken: token },
          { refreshToken: token }
        ]
      }
    })

    return personalToken?.userId || null
  }

  async verifyToken (token: string) {
    try {
      jwt.verify(token, useRuntimeConfig().SECRET_KEY)
      const personalToken = await personalTokenService.getPersonalToken(token)
      return !!personalToken
    } catch (error) {
      return false
    }
  }

  convertToken (token: string) {
    return token.replace('Bearer ', '')
  }

  private getTokens () {
    const accessToken: string = jwt.sign({}, useRuntimeConfig().SECRET_KEY, { expiresIn: '1m' })
    const refreshToken: string = jwt.sign({}, useRuntimeConfig().SECRET_KEY, { expiresIn: '30d' })

    return {
      accessToken,
      refreshToken
    }
  }
}

export const authService =  new AuthService()
