const db = require('../../data/dbConfig')

module.exports = {
    addProduct,
    getProduct,
    removeProduct,
    updateProduct,
    findBy   
}

async function addProduct(product) {
    const a = await db('products').insert(product);
    return { data: a , message:  `${a.product} added!`}
}

function getProduct() {
    return db('products').select('product_id','product_name');
}

function removeProduct(id) {
    return db('products').where('product_id', id).delete();
}

await function updateProduct(id, product) {
    await db('products').where('product_id', id).update(product);
    return db('products').where('product_id', id).first();
}

function findBy(filter) {
    return db('products as p').select('p.product_id' ,'p.product_name').where(filter);
}