import Joi from 'joi';

const validateSchema = Joi.object({
    userId: Joi.number().required(),
    username: Joi.string().min(3).max(30).required(),
    firstName: Joi.string().max(30).required(),
    lastName: Joi.string().max(30).required(),
    departmentId: Joi.number().required(),
});

export { validateSchema }