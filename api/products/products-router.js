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
            res.status(400).json({error: err.message})
        }
    })
    .catch(err => {
        res.status(404).json({ error: err.message})
    })
})

router.post('/', ( req , res ) => {
    Products.addProduct(req.body)
    .then(product => {
        res.status(201).json(product)
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

router.put('/:id', ( req , res ) => {
    const { id } = req.params
    const changes = req.body

    Products.updateProduct( id, changes)
    .then( product => {
        if(req.body){
            res.status(200).json(product)
        } else {
            res.status(400).json({message:'Requires Name'})
        }
    })
    .catch( err => {
        res.status(400).json({error: err.message})
    })
})

router.delete('/:id' , ( req , res ) => {
    const { id } = req.params

    Products.removeProduct(id)
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

module.exports = router;