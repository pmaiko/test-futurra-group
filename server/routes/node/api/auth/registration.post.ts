import { userSchema } from '~/server/validators/userSchema'
import { generateHash } from '~/server/utils/generate-hash'
import { userService } from '~/server/services/UserService'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { error } = userSchema.validate(body, {
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

  const user = userService.createUser({
    name: body.name,
    surname: body.surname,
    middleName: body.middleName,
    email: body.email,
    phone: body.phone,
    password: generateHash(body.password)
  })

  return {
    success: !!user
  }
})
