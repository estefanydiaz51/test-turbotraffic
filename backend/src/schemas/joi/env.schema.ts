import * as Joi from 'joi';


export const envSchema = Joi.object({
  PORT: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  MONGO_URI: Joi.string().required(),
})


