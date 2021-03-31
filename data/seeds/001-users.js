
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 1, first_name: 'Tony', last_name:'Yang', email:'tonyandbullet@gmail.com', password:'bullet', role:'1'},
        {user_id: 2, first_name: 'Jake', last_name:'Sierra', email:'jakesierra@gmail.com', password:'password', role:'2'},

      ]);
    });
};
