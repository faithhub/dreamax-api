const { check, validationResult } = require('express-validator');

const validate = (method) => {
    switch (method) {
        case 'createDepartment':
            {
                return [
                    check('name', 'Department Name is required').not().isEmpty().isLength({ max: 30 }).withMessage('Department Name must not more than 30 characters long'),
                ]
            }
            break;
        default:
    }
}

//Export default modules
export default validate;