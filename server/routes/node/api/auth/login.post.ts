import { loginSchema } from '~/server/validators/loginSchema'
import { authService } from '~/server/services/AuthService'
import { userService } from '~/server/services/UserService'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { error } = loginSchema.validate(body, {
    abortEarly: false,
    allowUnknown: true
  })

  if (error) {
    setResponseStatus(event, 422)

    return {
      errors: error.details.reduce<{ [key: string]: string }>((acc, it) => {
        acc[it.context?.key as string] = it.message
        return acc
      }, {})
    }
  }

  const isCorrect = await userService.checkPassword(body.password, body.email)

  if (isCorrect) {
    const user = await userService.getUserByEmail(body.email)
    if (user) {
      return authService.createTokens(user)
    } else {
      setResponseStatus(event, 422)
      return {
        errors: {
          email: 'Incorrect email'
        }
      }
    }
  } else {
    setResponseStatus(event, 422)
    return {
      errors: {
        password: 'Incorrect password'
      }
    }
  }
})
