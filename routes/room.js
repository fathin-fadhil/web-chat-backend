const express = require('express')

const router = express.Router()

const RoomController = require('../app/controller/room.controller')
const RoomValidator = require('../app/validator/room.validator') 

router.get('/room', RoomController.index)
router.get('/room/:id', RoomController.show)
router.put('/room/:id', RoomController.update)
router.delete('/room/:id', RoomController.destroy)
router.post('/room', RoomValidator.insert, RoomController.insert)

module.exports = router