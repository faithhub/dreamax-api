import Joi from 'joi';

const validateSchema = Joi.object({
    usercomment: Joi.string().min(10).max(500).required(),
    admincomment: Joi.string().min(10).max(500),
    rating: Joi.number().integer().integer().required(),
    ticketId: Joi.number().integer().required(),
    adminId: Joi.number().integer().required(),
});


export { validateSchema }