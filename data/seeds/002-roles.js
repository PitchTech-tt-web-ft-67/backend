
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {role_id: 1, role_name: 'Owner'},
        {role_id: 2, role_name: 'Renter'},
        
      ]);
    });
};
