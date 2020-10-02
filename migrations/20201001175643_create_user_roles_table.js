/**
 * Create user_roles table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_roles', table => {
        table.increments('id').primary().unsigned();
        table.integer('user_id').unsigned().index().references('id').inTable('users').notNullable();
        table.integer('role_id').unsigned().index().references('id').inTable('roles').notNullable();
        table.unique(['user_id', 'role_id']);
    });
};

/**
 * Drop user_roles table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('user_roles');
};
