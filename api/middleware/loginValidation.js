const loginValidation = ( req, res, next ) => {
    const data = req.body;
    const email = Object.prototype.hasOwnProperty.call(data , "email")
    const password = Object.prototype.hasOwnProperty.call(data , "password")


    if(
        email === true &&
        password === true &&
        Object.keys(data).length === 2
    ) {
        next();
    } else {
        res.status(400).json({
            message: 'Invalid Credentials'
        });
    }
}
module.exports = loginValidation;