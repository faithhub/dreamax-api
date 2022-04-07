import Joi from 'joi';

const validateSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    labelColor: Joi.string().max(20).allow(''),
    description: Joi.string().max(100).allow(''),
});

export { validateSchema }