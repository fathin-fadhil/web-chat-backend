const {
    check,
    validationResult
} = require('express-validator');

const login = [
    check('email') 
        .not()
        .isEmpty()
        .withMessage('Email can not be empty!') 
        .isEmail() 
        .withMessage('Invalid email address!'),

    check('password') 
        .not()
        .isEmpty()
        .withMessage('Email can not be empty!'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(422).json({
                errors: errors.array()
            });

        next();
    },
]

module.exports = {
    login,
}