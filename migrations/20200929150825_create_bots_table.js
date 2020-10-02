/**
 * Create bots table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
    return knex.schema.createTable('bots', table => {
        table.increments('id').primary().unsigned();
        table.string('name').unique().notNullable();
        table.boolean('active').default(1).notNullable();
    });
};

/**
 * Drop bots table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bots');
};
