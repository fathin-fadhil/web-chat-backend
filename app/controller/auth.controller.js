const bcrypt = require('bcryptjs/dist/bcrypt');
const jsonwebtoken = require('jsonwebtoken'); 

const db = require("../model");
const User = db.users;

const login = async (req, res) => {
    try {  
        let user = await User.findOne({'email': req.body.email})
        
        if (user && (await bcrypt.compare(req.body.password, user.password))) { 
            let user_data = await User.findById(user._id.toString());
            user_data = user_data.toJSON()
            
            const token = jsonwebtoken.sign(
                user_data,
                process.env.APP_KEY, 
                {
                    expiresIn: "2h",
                }
            )  

            user_data.token = token

            res.status(200).json(user_data)
        }else{
            res.status(400).send("Invalid Credentials")
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

module.exports = {
    login, 
}