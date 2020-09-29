/**
 * Create users table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary().unsigned();
        table.string('email').unique().notNullable();
        table.string('username').unique().notNullable();
        table.string('password').notNullable();
        table.boolean('active').default(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * Drop users table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
