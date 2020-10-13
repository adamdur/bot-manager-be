import Joi from 'joi';

export default {
    addBot: Joi.object({
        name: Joi.string().required(),
        active: Joi.boolean().optional()
    }),

    addRenewal: Joi.object({
        price: Joi.number().required().allow(null),
        period: Joi.string().required().allow(null),
        currency: Joi.string().optional().valid('USD', 'EUR', 'GBP')
    }),
};
