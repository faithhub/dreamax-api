const { check, validationResult } = require('express-validator');

const validate = (method) => {
    switch (method) {
        case 'createDeapartment':
            {
                return [
                    check('name', 'Department Name is required').not().isEmpty(),
                    check('email', 'Department Email is required').not().isEmpty(),
                    check('labelColour', 'Department Label Colour is required').not().isEmpty(),
                    check('description', 'Department Description is required').not().isEmpty(),
                ]
            }
            break;
        default:
    }
}

//Export default modules
export default validate;