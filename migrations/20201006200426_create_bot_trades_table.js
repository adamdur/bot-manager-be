/**
 * Create bot_trades table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
    return knex.schema.createTable('bot_trades', table => {
        table.increments('id').primary().unsigned();
        table.integer('user_id').unsigned().index().references('id').inTable('users').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * Drop bot_trades table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bot_trades');
};
