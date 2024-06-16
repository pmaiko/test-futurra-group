import type { Prisma, User } from '@prisma/client'
import { generateHash } from '~/server/utils/generate-hash'
import { authService } from '~/server/services/AuthService'

export class UserService {
  async createUser (data: Prisma.UserCreateInput): Promise<User> {
    return  prisma.user.create({
      data
    })
  }

  getUserByEmail (email: string) {
    return prisma.user.findFirst({ where: { email } })
  }

  getUserById (id: number) {
    return prisma.user.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        surname: true,
        middleName: true,
        email: true,
        phone: true
      }
    })
  }

  async getUserByToken (token: string) {
    const userId = await authService.getUserIdByToken(token)
    if (userId) {
      return this.getUserById(userId)
    } else {
      return null
    }
  }

  async checkPassword (password: string, email: string) {
    password = generateHash(password)
    const user = await this.getUserByEmail(email)
    return password === user?.password
  }
}

export const userService = new UserService()
