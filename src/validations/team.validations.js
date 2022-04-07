import Joi from 'joi';

const validateSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    labelColor: Joi.string().allow("").optional(),
    description: Joi.string().allow("").optional(),
});

export { validateSchema }