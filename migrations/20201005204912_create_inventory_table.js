/**
 * Create inventory table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
    return knex.schema.createTable('inventory', table => {
        table.increments('id').primary().unsigned();
        table.integer('bot_id').unsigned().index().references('id').inTable('bots').notNullable();
        table.integer('bot_renewal').unsigned().index().references('id').inTable('bot_renewals').notNullable();
        table.integer('user_id').unsigned().index().references('id').inTable('users').notNullable();
        table.dateTime('renewal_expiry').nullable();
        table.boolean('active').default(1).notNullable();
        table.boolean('sold').default(0).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * Drop inventory table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('inventory');
};
