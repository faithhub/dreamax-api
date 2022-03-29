const { check, validationResult } = require('express-validator');

const validate = (method) => {
    switch (method) {
        case 'createTeam':
            {
                return [
                    check('message', 'Message is required').not().isEmpty(),
                ]
            }
            break;
        default:
    }
}

//Export default modules
export default validate;