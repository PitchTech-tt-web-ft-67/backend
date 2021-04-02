const express = require('express')
const router = express.Router()
const Products = require('./products-model')
const restricted = require('../middleware/restricted')

router.get('/' , async ( req , res , next ) => {
    
   
    try {
        const product = await Products.getProduct()
        res.status(200).json(product)
    } catch ( err ){
        next(err)
    }
})

router.post('/', async( req , res , next ) => {
    try{
        const { product_name } = req.body
        console.log(req.body)
        if(!product_name ){
         return res.status(409).json({ message: "Missing Name"})
        } else {
        const newProduct = await Products.addProduct({
            product_name,
            user:req.jwt.user_id
        })
        res.status(200).json(newProduct)
        }
    } catch ( err ){
        console.log("here")
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

router.delete('/:id' , ( req , res ) => {
    const { id } = req.params
    Products.findById(id)
    .then( product => {
        if(product && product.user == req.jwt.user_id){
            //this is where we will perform delete
            Products.removeProduct(id)
            .then( deleted => {
                res.status(200).json({ message: "Successfully deleted" })
            })
            .catch( err => {
                res.status(500).json({ error:err.message })
            })
            
        } else {
            res.status(401).json({ message: 'This not yours.'})
        } 
    })
    .catch( err => {
        res.status(500).json({ message: err.message})
    })
    

})


router.put('/:id', ( req , res ) => {

    const { id } = req.params
    const changes = req.body

    Products.findById( id )
    .then( product => {
        console.log("hello")
        if( product && product.user == req.jwt.user_id ){
            Products.updateProduct( id, changes)
            .then ( update => {
                res.status(200).json(update)
            })
           
        } else {
            res.status(401).json({message: "Not yours to change."})
            console.log("You can't change this")
        }
        
    })

})






module.exports = router;