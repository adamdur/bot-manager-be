/**
 * Create bot_keys table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
    return knex.schema.createTable('bot_keys', table => {
        table.increments('id').primary().unsigned();
        table.integer('inventory_item').unsigned().index().references('id').inTable('inventory').notNullable();
        table.integer('user_id').unsigned().index().references('id').inTable('users').notNullable();
        table.string('password').notNullable();
        table.boolean('active').default(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * Drop bot_keys table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bot_keys');
};
