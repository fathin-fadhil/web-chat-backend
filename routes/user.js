const express = require('express')

const router = express.Router()

const UserController = require('../app/controller/user.controller')
const UserValidator = require('../app/validator/user.validator')
const AuthMiddleware = require('../middleware/auth.middleware')

router.get('/user', UserController.index)
router.get('/user/:id', UserController.show)
router.put('/user/:id', UserController.update)
router.delete('/user/:id', UserController.destroy)
router.post('/user', UserValidator.insert, UserController.insert)

module.exports = router