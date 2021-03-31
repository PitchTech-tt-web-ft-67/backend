
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 1, first_name: 'Tony', last_name:'Yang', email:'tonyandbullet@gmail.com', password:'bullet', role_id:'1'},
 
      ]);
    });
};
