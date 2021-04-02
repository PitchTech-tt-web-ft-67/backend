
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {product_id: 1, product_name: 'Macbook 15" 2016', user: 1},
        {product_id: 2, product_name: 'iphone 2015', user: 1},
        {product_id: 3, product_name: 'windows 2016', user: 1},

      ]);
    });
};
