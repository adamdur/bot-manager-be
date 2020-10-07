/**
 * Create bot_renewal_types.currency field.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function(knex) {
    return knex.schema.table('bot_renewals', table => {
        table.enum('currency', ['USD', 'EUR', 'GBP']).default('USD').nullable();
    });
};

/**
 * Drop bot_renewal_types.currency column.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function(knex) {
    return knex.schema.table('bot_renewals', table => {
        table.dropColumn('currency');
    });
};
