const db = require("../model");

const socket = require('../../service/socket-io')

const Room = db.rooms;
const Message = db.messages; 

const insert = async (req, res) => {
    try { 
        Room.findById(req.body.room_id)
            .then(async data => {
                if(data){
/*                     const message = new Message({
                        room_id: req.body.room_id, 
                        user_name: req.body.user_name, 
                        message: req.body.message,  
                    }); 
                    const messageData = await message.save() */            

                    // socket.sendMessage(req.body.room_id, 'new_message', {messageData})
                    socket.sendEncryptedMessage(req.body.room_id, req.body)
                    res.status(200).json({ message: "OK" })
                }else{
                    res.status(400).json({
                        message: "Room not found!", 
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Internal Server Error!"
                });
            })
    
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
} 

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const destroy = async (req, res) => {
/*     Message.findByIdAndUpdate(req.params.id, {
            deletedAt: Date.now()
        })
        .then(data => {
            res.status(200).send({
                message: 'OK', 
            });
            socket.sendMessage(data.room_id, 'delete_message', {messageId: data.id})
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Internal Server Error!"
            });
        }) */
    socket.deleteMessageBroadcast(req.query.room_id, req.params.id)
} 

module.exports = { 
    insert, 
    destroy, 
}