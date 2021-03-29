
exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
        table.increments('user_id')
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.string('password').notNullable
        table
            .integer('role_id')
            .unsigned()
            .notNullable()
            .references('role_name')
            .inTable('roles')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
    })
    .createTable('roles', table => {
        table.increments('role_id');
        table.string("role_name").notNullable.unique()
    })
    .createTable('products', table => {
        table.increments('product_id')
        table.string('product_name').notNullable
    
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('products')
    .dropTableIfExists('roles')
    .dropTableIfExists('users')
};
