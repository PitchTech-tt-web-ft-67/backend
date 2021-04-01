const jwt = require('jsonwebtoken');
const secrets = require('../../config/secret')

module.exports = function makeToken(user){
    const payload = {
        subject: user.user_id,
        email: user.email
    }


    const options = {
        expiresIn : "2 weeks"
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}