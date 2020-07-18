import Joi from '@hapi/joi';

export const createDepartmentSchema = Joi.object().keys({
    code: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required()
});
