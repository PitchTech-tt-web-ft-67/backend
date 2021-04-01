const express = require('express')
const router = express.Router()
const Products = require('./products-model')

router.get('/' , async ( req , res , next ) => {
    
   
    try {
        const product = await Products.getProduct()
        res.status(200).json(product)
    } catch ( err ){
        next(err)
    }
})


router.get('/:id', ( req , res ) => {
    const { id } = req.params

    Products.findById(id)
    .then( item => {
        if(item){
            res.status(200).json(item)

        } else {
            res.status(400).json({error: error.message})
        }
    })
    .catch(err => {
        res.status(404).json({ error: err.message})
    })
})




module.exports = router;