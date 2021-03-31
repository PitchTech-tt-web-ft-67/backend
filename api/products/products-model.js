const db = require('../../data/dbConfig')

module.exports = {
    addProduct,
    getProduct,
    removeProduct,
    updateProduct,
    findById   
}

function addProduct(product) {
   
    return db('products as p').insert(product).into("products")
}

function getProduct() {
    return db('products').select('product_id','product_name');
}

function removeProduct(id) {
    return db('products').where('product_id', id).delete();
}

function updateProduct(id, product) {
    return db('products as p').where('p.product_name', id).update(product);
}

function findById(id) {
    return db('products as p').where("p.product_id", id).first()
}