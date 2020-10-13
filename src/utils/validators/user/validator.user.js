import Joi from 'joi';

export default {
    saveUser: Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().min(4).required(),
        password: Joi.string().min(6).required(),
    }),

    updateUser: Joi.object({
        username: Joi.string().min(4).required(),
        old_password: Joi.string().min(6).optional(),
        new_password: Joi.string().min(6).optional(),
        new_password_check: Joi.string().min(6).optional(),
    }),

    changePassword: Joi.object({
        old_password: Joi.string().min(6).required(),
        new_password: Joi.string().min(6).required(),
        new_password_check: Joi.string().min(6).required(),
    }),

    checkEmail: Joi.object({
        email: Joi.string().email().required()
    }),

    checkUsername: Joi.object({
        username: Joi.string().min(4).required()
    }),
};
