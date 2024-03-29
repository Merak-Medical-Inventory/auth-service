import Joi from "@hapi/joi";

export const createUserSchema = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  last_name: Joi.string().required(),
  rol: Joi.number().required(),
  department: Joi.number()
});

export const updateUserSchema = Joi.object().keys({
  username: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  name: Joi.string(),
  last_name: Joi.string(),
  rol: Joi.number(),
  department: Joi.number(),
  privilegeId: Joi.number()
});

export const paramMissingError =
  "One or more of the required parameters was missing.";

export interface IRequest extends Request {
  [key: string]: any;
}
