const express = require('express');
const router = express.Router();
const Users = require('./users-model')
const bcryptjs = require('bcryptjs');
const makeToken = require('../middleware/makeToken');




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

        const newUser = await Users.addUser({
            
            first_name,
            last_name,
            password: await bcryptjs.hash(password,  10),
            email,
            role,
        })

        res.status(201).json(newUser)
    } catch(err){
        next(err)
    }
})

// router.post('/login', loginValidation, ( req , res ) => {
//     Users.getUser(req.body.email)
//     .then((user) => {
//         if(bcryptjs.compareSync(req.body.password, user[0].password)){
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
router.post('/login', async (req, res, next) => {
    
    try{
      const {email, password} = req.body
  
      if(!email || !password){
        return res.status(401).json({message: 'email and password required'})
      }
    //   const user = await Users.findById({email}).first()
  
    //   const passwordValid = await bcryptjs.compareSync(password, user.password)
  
    //   if(!user || !passwordValid){
    //     return res.status(401).json({message: 'invalid credentials'})
    //   }

    // const passwordValid = await bcryptjs.compareSync(password, user.password)

    Users.findById({email})
        .first()
        .then( user => {
          if( user && bcryptjs.compareSync(password, user.password)){
            const token = makeToken(user)
  
            res.json({
              message: `welcome, ${user.first_name}`,
              token:token
            })
          } else {
              res.status(401).json({message:"Invalid Credentials"})
          }
      })





      
    } catch(err){
      next(err)
    }
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
