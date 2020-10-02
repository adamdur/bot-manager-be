/**
 * Create bot_renewal_types table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
    return knex.schema.createTable('bot_renewals', table => {
        table.increments('id').primary().unsigned();
        table.integer('bot_id').unsigned().index().references('id').inTable('bots');
        table.integer('price').nullable();
        table.string('period').nullable();
        table.unique(['bot_id', 'price', 'period']);
    });
};

/**
 * Drop bot_renewal_types table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bot_renewals');
};
