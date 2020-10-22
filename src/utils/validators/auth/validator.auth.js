import Joi from 'joi';

export default {
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
};
