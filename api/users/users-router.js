const express = require('express');
const router = express.Router();
const Users = require('./users-model')
const bcryptjs = require('bcryptjs');
const loginValidation = require('../middleware/loginValidation')
const makeToken = require('../middleware/restricted')


router.post('/register' , async( req , res , next ) => {
    try {
        const { firstName, lastName, password, email, role } = req.body
        const user = await Users.findById({email}).first()

        if(user){
            return res.status(409).json({message:'Email taken.'})
        }
        if(!firstName || !lastName || !password || !email || !role){
            return res.status(409).json({message:'Field inputs are requried.'})
        }

        const newUser = await Users.addUser({
            firstName,
            lastName,
            password: await bcryptjs.hash(password,  10),
            email,
            role,
        })

        res.status(201).json(newUser)
    } catch(err){
        next(err)
    }
})

router.post('/login', loginValidation, ( req , res ) => {
    Users.getUser(req.body.email)
    .then((user) => {
        if(bcryptjs.compareSync(req.body.password, user[0].password)){
            const token = makeToken(user[0]);
            res.status(200).json({
                message:"Here's a Pitch",
                data:user,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials.'})
        }
    })
})


router.get('/:id', ( req , res ) => {
    const { id } = req.params

    Users.findById(id)
    .then( user => {
        if(user){
            res.status(200).json(user)
        } else {
            res.status(400).json({error:err.message})
        }
    })
    .catch( err => {
        res.status(404).json({ error: err.message})
    })
})



module.exports = router;
