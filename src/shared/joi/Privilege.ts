import Joi from '@hapi/joi';

export const createPrivilegeSchema = Joi.object().keys({
    name: Joi.string().required()
  });