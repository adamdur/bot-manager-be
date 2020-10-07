/**
 * Create bot_accounts table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
    return knex.schema.createTable('bot_accounts', table => {
        table.increments('id').primary().unsigned();
        table.integer('inventory_item').unsigned().index().references('id').inTable('inventory').notNullable();
        table.integer('user_id').unsigned().index().references('id').inTable('users').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.enum('type', ['Discord', 'Email', 'Dashboard']).nullable();
        table.text('description').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * Drop bot_accounts table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bot_accounts');
};
