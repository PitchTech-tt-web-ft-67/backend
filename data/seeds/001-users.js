
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 1, first_name: 'Tony', last_name:'Yang', password:'bullet', role_id:'Owner'},
 
      ]);
    });
};
