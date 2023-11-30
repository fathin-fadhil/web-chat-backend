const bcrypt = require('bcryptjs/dist/bcrypt') 

const db = require("../model");
const User = db.users;

const index = async (req, res) => {
    User.find({ deletedAt: null })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Internal Server Error!"
            });
        })
}

const insert = async (req, res) => {
    try {
        let encryptedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword
        }); 
    
        user.save(user) 

        res.status(200).json({
            message: "OK",
            data: user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

const show = async (req, res) => {
    User.findById(req.params.id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Internal Server Error!"
            });
        })
}

const update = async (req, res) => { 
    User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Internal Server Error!"
            });
        })
}

const destroy = async (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
            deletedAt: Date.now()
        })
        .then(data => {
            res.send(data);
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