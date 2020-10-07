/**
 * Create bot_rentals table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
    return knex.schema.createTable('bot_rentals', table => {
        table.increments('id').primary().unsigned();
        table.integer('inventory_item').unsigned().index().references('id').inTable('inventory').notNullable();
        table.integer('user_id').unsigned().index().references('id').inTable('users').notNullable();
        table.float('price').notNullable();
        table.enum('currency', ['USD', 'EUR', 'GBP']).notNullable();
        table.timestamp('start_at').notNullable();
        table.timestamp('end_at').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * Drop bot_rentals table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bot_rentals');
};
