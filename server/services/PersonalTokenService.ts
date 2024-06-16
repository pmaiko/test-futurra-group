import type { PersonalToken } from '@prisma/client'
import type { Tokens } from '~/types/auth'

export class PersonalTokenService {
  getPersonalToken (token: string) {
    return prisma.personalToken.findFirst({
      where: {
        OR: [
          { accessToken: token },
          { refreshToken: token }
        ]
      }
    })
  }

  updatePersonalToken (personalToken: PersonalToken, tokens: Tokens) {
    return prisma.personalToken.update({
      where: {
        id: personalToken?.id
      },
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }
    })
  }
}

export const personalTokenService = new PersonalTokenService()
