const { check, validationResult } = require('express-validator');
const models = require("../db/models");
const TeamMember = models.TeamMember;

const validate = (method) => {
    switch (method) {
        case 'createTeamMember':
            {
                return [
                    check('username', 'Username is required').not().isEmpty().isLength({ max: 50 }).withMessage('Username must not more than 50 characters long')
                        .isLength({ min: 3 }).withMessage('Username must not less than 3 characters long')
                        .custom(value => {
                            return TeamMember.findOne({ where: { username: value } })
                                .then((result) => {
                                    if (result) {
                                        return Promise.reject('Username already exist')
                                    }
                                })
                        }),
                    check('firstName', 'First Name is required').not().isEmpty().isLength({ max: 50 }).withMessage('First Name must not more than 50 characters long'),
                    check('lastName', 'Last Name is required').not().isEmpty().isLength({ max: 50 }).withMessage('Last Name must not more than 50 characters long'),
                    check('departmentId', 'Department is required').not().isEmpty().isNumeric().withMessage('Department ID must be an integer value'),
                ]
            }
            break;
        default:
    }
}

//Export default modules
export default validate;