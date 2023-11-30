const express = require('express')

const router = express.Router()

const AuthController = require('../app/controller/auth.controller')
const AuthValidator = require('../app/validator/auth.validator')

router.post('/login', AuthValidator.login, AuthController.login)

module.exports = router