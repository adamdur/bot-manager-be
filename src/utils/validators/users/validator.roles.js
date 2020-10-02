import Joi from 'joi';

export default {
    addRole: Joi.object({
        code: Joi.string().required(),
    }),

    assignRole: Joi.object({
        code: Joi.string().required(),
    }),
};
