const db = require('../../data/dbConfig')

module.exports = {

    getProduct,
    findById   
}



function getProduct() {
    return db('products').select('product_id','product_name');
}



function findById(id) {
    return db('products').where("product_id", id).first()
}