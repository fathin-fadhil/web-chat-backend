const {
    check,
    validationResult
} = require('express-validator');

const insert = [
    // check('room_id') 
    //     .not()
    //     .isEmpty()
    //     .withMessage('room_id can not be empty!'), 

    // check('user_name') 
    //     .not()
    //     .isEmpty()
    //     .withMessage('user_name can not be empty!'), 

    // check('user_id') 
    //     .not()
    //     .isEmpty()
    //     .withMessage('user_id can not be empty!'), 

    check('message') 
        .not()
        .isEmpty()
        .withMessage('message can not be empty!'), 

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
    check('room_id') 
        .not()
        .isEmpty()
        .withMessage('room_id can not be empty!'), 

    check('user_name') 
        .not()
        .isEmpty()
        .withMessage('user_name can not be empty!'), 

    check('user_id') 
        .not()
        .isEmpty()
        .withMessage('user_id can not be empty!'), 

    check('message') 
        .not()
        .isEmpty()
        .withMessage('message can not be empty!'), 

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