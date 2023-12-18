const db = require("../model");
const Room = db.rooms;
const Message = db.messages;

const index = async (req, res) => {
    Room.find({ deletedAt: null })
        .then(data => {
            res.status(200).send({
                message: 'OK',
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Internal Server Error!"
            });
        })
}

const insert = async (req, res) => {
    try { 
        const room = new Room({
            name: req.body.name, 
        }); 
    
        room.save(room) 

        res.status(200).json({
            message: "OK",
            data: room
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

const show = async (req, res) => {
    Room.findById(req.params.id)
        .then(room_data => {
            if(room_data){
                res.status(200).send({
                    message: 'OK',
                    data: room_data
                });
            }else{
                res.status(200).send({
                    message: 'OK',
                    data: room_data
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Internal Server Error!"
            });
        })
}

const update = async (req, res) => { 
    Room.findByIdAndUpdate(req.params.id, {
            name: req.body.name, 
        })
        .then(data => {
            res.status(200).send({
                message: 'OK', 
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Internal Server Error!"
            });
        })
}

const destroy = async (req, res) => {
    Room.findByIdAndUpdate(req.params.id, {
            deletedAt: Date.now()
        })
        .then(data => {
            res.status(200).send({
                message: 'OK', 
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Internal Server Error!"
            });
        })
} 

module.exports = {
    index,
    insert,
    show,
    update,
    destroy, 
}