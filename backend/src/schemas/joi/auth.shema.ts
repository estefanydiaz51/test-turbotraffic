import * as Joi from 'joi';


export const CreateUserSchema = Joi.object({
  name: Joi.string().min(8).trim().required(),
  role: Joi.string().trim().required()
})

export const LoginSchema = Joi.object({
  name: Joi.string().min(8).trim().required(),
})



