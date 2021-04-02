const db = require("../../data/dbConfig");

 module.exports = {
     addUser,
     getUser,
     findById,
 }

  async function addUser(user) {
      const a = await db("users").insert(user);
      return { data: user , message: `${user.first_name} created!`}
  }


  function getUser(name) {
      return db('users').where('email', name).first();
  }

  function findById(id) {
      return db('users').where('user_id', id);
  }





