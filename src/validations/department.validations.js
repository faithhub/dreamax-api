const { check, validationResult } = require('express-validator');

const validate = (method) => {
    switch (method) {
        case 'createDepartment':
            {
                return [
                    check('name', 'Department Name is required').not().isEmpty().isLength({max: 30}).withMessage('Department Name must not more than 30 characters long')
                    .custom(value => {
                        return Department.findOne({ where: {name: value} })
                           .then(() => {
                              return Promise.reject('Department Name already exist')
                           })
                     }),
                    check('email', 'Department Email is required').not().isEmpty().isEmail().normalizeEmail().withMessage('Department email is not valid').isLength({max: 50}).withMessage('Department Email must not more than 50 characters long')
                    .custom(value => {
                        return Department.findOne({ where: {email: value} })
                           .then(() => {
                              return Promise.reject('Department Email already exist')
                           })
                     })
                     ,
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