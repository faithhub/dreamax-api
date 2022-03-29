const { check, validationResult } = require('express-validator');

const validate = (method) => {
    switch (method) {
        case 'createMessage':
            {
                return [
                    check('message', 'Message is required').not().isEmpty(),
                ]
            }
            break;
        default:
    }
}

export default validate;