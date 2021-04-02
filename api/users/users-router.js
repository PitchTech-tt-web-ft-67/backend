const express = require('express');
const router = express.Router();
const Users = require('./users-model')
const bcrypt = require('bcryptjs');
const makeToken = require('../middleware/makeToken');
const restricted = require('../middleware/restricted')
require('dotenv').config();




router.post('/register' , async( req , res , next ) => {
    try {
        const { first_name, last_name, password, email, role } = req.body
        const user = await Users.findById({email}).first()

        if(user){
            return res.status(409).json({message:'Email taken.'})
        }
        if(!first_name || !last_name || !password || !email || !role){
            return res.status(409).json({message:'Field inputs are requried.'})
        }
        const hash = await bcrypt.hashSync(req.body.password, 10)
        const newUser = await Users.addUser({
            
            first_name,
            last_name,
            password: hash,
            email,
            role,
        })

        res.status(201).json(newUser)
    } catch(err){
        next(err)
    }
})

// router.post('/login', ( req , res ) => {
    
    
//     Users.getUser(req.body.email)
//     .then((user) => {
        
        
//         if( req.body.password === user[0].password){
//             const token = makeToken(user[0]);
//             res.status(200).json({
//                 message:"Here's a Pitch",
//                 data:user,
//                 token
//             });
//         } else {
//             res.status(401).json({ message: 'Need Email and Password.'})
//         }
//     })
// })

router.post('/login', async( req , res , next ) => {
    const credentials = await req.body;

    await Users.getUser(credentials.email)
    .then( user => {
       
        if( user && bcrypt.compareSync(credentials.password, user.password)){
            const token = makeToken(user)
            res.status(200).json({
                data: user,
                message: "Here's a Pitch.",
                token
            })
            next()
        } else {
            res.status(401).json({ message: 'Need Email and Password'})
        }
    })
    .catch( err => {
        res.status(500).json({message: err.message})
    })

})


router.get('/:id', ( req , res ) => {
    const { id } = req.params

    Users.findById(id)
    .then( user => {
        if(user){
            res.status(200).json(user)
        } else {
            res.status(400).json({error2:err.message})
        }
    })
    .catch( err => {
        res.status(404).json({ error1: err.message})
    })
})









module.exports = router;
