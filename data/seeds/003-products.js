
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {product_id: 1, product_name: 'Macbook 15" 2016'},

      ]);
    });
};
