const { check, validationResult } = require('express-validator');

const validate = (method) => {
    switch (method) {
        case 'createDeapartment':
            {
                return [
                    check('name', 'Department Name is required').not().isEmpty().isLength({max: 30}).withMessage('Department Name must not more than 30 characters long'),
                    check('email', 'Department Email is required').not().isEmpty().isEmail().normalizeEmail().withMessage('Department email is not valid').isLength({max: 50}).withMessage('Department Email must not more than 50 characters long'),
                    check('labelColour', 'Department Label Colour is required').not().isEmpty().isLength({max: 10}).withMessage('Department Label Colou must not more than 10 characters long'),
                    check('description', 'Department Description is required').not().isEmpty().isLength({max: 100}).withMessage('Department Description Colou must not more than 100 characters long'),
                ]
            }
            break;
        default:
    }
}

//Export default modules
export default validate;