const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secret')

module.exports = function makeToken(user){
    const payload = {
        subject: user.user_id,
        email: user.email
    }


    const options = {
        expiresIn : "7777777s"
    }

    return jwt.sign(payload, jwtSecret, options)
}