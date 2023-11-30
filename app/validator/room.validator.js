const {
    check,
    validationResult
} = require('express-validator');

const insert = [
    check('name') 
        .not()
        .isEmpty()
        .withMessage('name can not be empty!'), 

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