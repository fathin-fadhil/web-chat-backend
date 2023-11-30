const express = require('express')

const router = express.Router()

const MessageController = require('../app/controller/message.controller')
const MessageValidator = require('../app/validator/message.validator') 

router.delete('/message/:id', MessageController.destroy)
router.post('/message', MessageController.insert)


module.exports = router