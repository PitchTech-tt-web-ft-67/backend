const db = require("../../data/dbConfig");

 module.exports = {
     addUser,
     getUser,
     findById,
     getProducts,
     removeProduct,
     updateProduct,
     addProduct,
 }

  async function addUser(user) {
      const a = await db("users").insert(user);
      return { data: user , message: `${user.first_name} created!`}
  }


  function getUser(name) {
      return db('users').where('email', name);
  }

  function findById(id) {
      return db('users').where('user_id', id);
  }

async function getProducts(id){
    return db('products').where('product_name', id);
}

function removeProduct(id) {
    return db('products').where('product_id', id).delete();
}

function updateProduct(id, product) {
    return db('products').where('product_id', id).update(product);
}

function addProduct(product) {
   
    return db('products as p').insert(product).into("products")
}