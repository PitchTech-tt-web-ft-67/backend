const { jwtSecret } = require('../../config/secret')
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = async( req , res , next) => {
    try{
        const token = await req.headers.authorization
        if(!token){
            res.status(401).json({ message: 'Token required.'})
        } else {
            jwt.verify(token, jwtSecret, ( err , decoded ) => {
                if(err){
                    return res.status(401).json({ message: 'Token invalid'})
                } else {
                    req.decodedToken = decoded;
                    next()
                }
            })
        }
    } catch(err){
        next(err)
    }
}