const jwt = require("jsonwebtoken"); 

const verifyToken = (req, res, next) => {
    // let token = req.headers.authorization; 

    // if (!token) {
    //     return res.status(403).send({
    //         message: "A token is required for authentication"
    //     });
    // }

    // token = token.replace('Bearer ','');

    // try {
    //     const decoded = jwt.verify(token, process.env.APP_KEY); 
    //     req.user = decoded;
    // } catch (err) {
    //     return res.status(401).send({
    //         message: "Invalid Token"
    //     }); 
    // }

    return next();
};

module.exports = verifyToken;