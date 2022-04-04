import { check, validationResult } from 'express-validator';
import Joi from 'joi';

// const validate = (method) => {
//     switch (method) {
//         case 'createMessage':
//             {
//                 return [
//                     check('message', 'Message is required').not().isEmpty(),
//                 ]
//             }
//             break;
//         default:
//     }
// }


// export default class {
//     static ticketSchema () {
//         return [
//             check('piority', 'Ticket piority is required').not().isEmpty(),
//             check('department', 'Department is required').not().isEmpty()
    
//         ]
//     }

//     static feedBackSchema () {
//         return [
//             check('ticketId', 'Ticket piority is required').not().isEmpty(),
//             check('useromment', 'Department is required').not().isEmpty()
    
//         ]
//     }
// }

const TicketSchema = Joi.object({
    piority: Joi.number().integer(),
    department: Joi.number().integer()
});

const feedBackSchema = Joi.object({
    ticketId: Joi.number().integer(),
    userComment: Joi.string()
})

export { TicketSchema, feedBackSchema }