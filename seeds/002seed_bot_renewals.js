exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('bot_renewals').del()
        .then(function () {
            // Inserts seed entries
            return knex('bot_renewals').insert([
                {bot_id: 1, price: 35, period: '1m'},
                {bot_id: 1, price: null, period: null},// Adept
                {bot_id: 3, price: 40, period: '6m'},
                {bot_id: 3, price: 60, period: '6m'},
                {bot_id: 3, price: 360, period: '1y'},
                {bot_id: 3, price: null, period: null},// Balko
                {bot_id: 4, price: 20, period: '1m'},
                {bot_id: 4, price: 60, period: '6m'},
                {bot_id: 4, price: null, period: null},// CandyPreme
                {bot_id: 5, price: 100, period: '6m'},
                {bot_id: 5, price: null, period: null},// Cybersole
                {bot_id: 6, price: 50, period: '1m'},
                {bot_id: 6, price: null, period: null},// Dashe
                {bot_id: 7, price: 35, period: '1m'},
                {bot_id: 7, price: null, period: null},// Eve
                {bot_id: 8, price: 35, period: '1s'},
                {bot_id: 8, price: null, period: null},// F3ather
                {bot_id: 9, price: 30, period: '1m'},
                {bot_id: 9, price: 50, period: '6m'},
                {bot_id: 9, price: null, period: null},// FlareAIO
                {bot_id: 10, price: 100, period: '6m'},
                {bot_id: 10, price: null, period: null},// Fleek Framework
                {bot_id: 11, price: 100, period: '6m'},
                {bot_id: 11, price: null, period: null},// Galaxsio
                {bot_id: 12, price: 80, period: '6m'},
                {bot_id: 12, price: null, period: null},// Ganesh
            ]);
        });
};
