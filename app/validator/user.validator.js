const {
    check,
    validationResult
} = require('express-validator');

const insert = [
    check('name') 
        .not()
        .isEmpty()
        .withMessage('name can not be empty!'),

    check('email') 
        .not()
        .isEmpty()
        .withMessage('email can not be empty!')
        .isEmail() 
        .withMessage('Invalid email address!')
        .bail(),

    check('password') 
        .not()
        .isEmpty()
        .withMessage('password can not be empty!')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('must contain a number'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(422).json({
                errors: errors.array()
            });

        next();
    },
]

const update = [
    check('name') 
        .not()
        .isEmpty()
        .withMessage('name can not be empty!'),

    check('email')  
        .not()
        .isEmpty()
        .withMessage('email can not be empty!')
        .isEmail() 
        .withMessage('Invalid email address!'),

    check('password') 
        .not()
        .isEmpty()
        .withMessage('password can not be empty!')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long'),

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
    insert,
    update,
}