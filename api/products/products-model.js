const db = require('../../data/dbConfig')

module.exports = {
    addProduct,
    getProduct,
    findById,
    removeProduct,
    updateProduct,
    getProducts
       
}



function getProduct() {
    return db('products').select('product_id','product_name', 'user');
}

async function addProduct(product) {
   
    return await db('products').insert(product).into("products")
}

function findById(id) {
    return db('products').where("product_id", id).first()
}

function removeProduct(id) {
    return db('products').where('product_id', id).delete();
}

async function updateProduct(id, product) {
    return await db('products').where('product_id', id).update(product);
}

function getProducts(id){
    return db('products').where('product_name', id);
}