const { jwtSecret } = require('../../config/secret')
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = ( req , res , next) => {

        const token = req.headers.authorization
        if(token){
            jwt.verify( token, jwtSecret, ( err , decoded ) => {
                if(err){
                    console.log('here')
                    return res.status(401).json({ message: 'Token invalid'})
                } else {
                    req.jwt = decoded;
                    res.status(200).json({message: 'all good'})
                    next()
                }
                
            })
            
        } else {
            res.status(401).json({ message: 'Token required.'})
            
        }
  
}