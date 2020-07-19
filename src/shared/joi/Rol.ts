import Joi from '@hapi/joi';

export const createRolSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    privileges : Joi.array().items(Joi.number().required())
});
