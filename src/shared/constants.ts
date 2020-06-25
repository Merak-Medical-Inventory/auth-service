import Joi from '@hapi/Joi';

export const createUserSchema = Joi.object().keys({
    username: Joi.string().required(),
    name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    recovery_email: Joi.string().email(),
    password: Joi.string().required(),
    phone: Joi.string(),
    profile_image: Joi.string(),
    isEnabled: Joi.boolean()
  });

  export const updateUserSchema = Joi.object().keys({
    username: Joi.string(),
    name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string().email(),
    recovery_email: Joi.string().email(),
    phone: Joi.string(),
    profile_image: Joi.string(),
    isEnabled: Joi.boolean()
  });


  export const paramMissingError = 'One or more of the required parameters was missing.';

  export interface IRequest extends Request {
    [key: string]: any;
  }
