/**
 * Create bot_traded_out table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
    return knex.schema.createTable('bot_traded_out', table => {
        table.increments('id').primary().unsigned();
        table.integer('trade_id').unsigned().index().references('id').inTable('bot_trades').notNullable();
        table.integer('inventory_item').unsigned().index().references('id').inTable('inventory').notNullable();
        table.integer('user_id').unsigned().index().references('id').inTable('users').notNullable();
        table.float('extra_cash').nullable();
        table.enum('currency', ['USD', 'EUR', 'GBP']).nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * Drop bot_traded_out table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bot_traded_out');
};
