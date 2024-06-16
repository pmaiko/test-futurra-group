import Joi from 'joi'

export const userSchema = Joi.object({
  name: Joi.string().max(50).min(3).required(),
  surname: Joi.string().max(50).min(3).required(),
  middleName: Joi.string().max(50).min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(50).min(3).required(),
  password: Joi.string().max(50).min(3).required()
})
