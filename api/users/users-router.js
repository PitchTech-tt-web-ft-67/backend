const express = require('express');
const router = express.Router();
const Users = require('./users-model')
const bcrypt = require('bcryptjs');
const makeToken = require('../middleware/makeToken');
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
        const hash = bcrypt.hashSync(req.body.password, 10)
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

router.post('/login', async ( req , res , next ) => {
    const credentials = req.body;

    await Users.getUser(credentials.email)
    .then( user => {
       
        if( user && bcrypt.compare(credentials.password, user.password)){
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
            res.status(400).json({error:err.message})
        }
    })
    .catch( err => {
        res.status(404).json({ error: err.message})
    })
})


router.get('/:id/products', ( req , res ) => {
    console.log(req.params)
    Users.getProducts(req.params.id)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: 'Could not grab'})
    })
})

router.delete('/:id/products/:product_id' , ( req , res ) => {
    const { id } = req.params

    Users.removeProduct(id)
    .then( product => {
        if(product){
            res.status(200).json({message:'Product deleted.'})
        } else {
            res.status(404).json({message: "Need Identification."})
        }
    })
    .catch( err => {
        res.status(500).json({ message: 'Product unable to delete.'})
    })
})

router.put('/:id/products/:product_id', ( req , res ) => {

    const changes = req.body
    console.log(req.body)

    Users.updateProduct( req.params.product_id, changes)
    .then( product => {
        
        if(changes.product_name){
            res.status(200).json(product)
        } else {
            res.status(400).json({message:'Requires Name'})
        }
    })
    .catch( err => {
        res.status(400).json({error: err.message})
    })
})

router.post('/:id/products', ( req , res ) => {
    const { product_name } = req.body
    Users.addProduct({product_name})
    .then(product => {
        res.status(201).json(product)
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})



module.exports = router;
