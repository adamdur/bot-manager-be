import Joi from 'joi';

export default {
    login:
        Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        })
};
