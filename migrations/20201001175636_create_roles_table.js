/**
 * Create roles.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
    return knex.schema.createTable('roles', table => {
        table.increments('id').primary().unsigned();
        table.string('code').unique().notNullable();
    });
};

/**
 * Drop roles table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('roles');
};
