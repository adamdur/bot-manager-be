exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('roles').del()
        .then(function () {
            // Inserts seed entries
            return knex('roles').insert([
                {code: 'admin'},
                {code: 'premium'},
                {code: 'user'},
            ]);
        });
};
