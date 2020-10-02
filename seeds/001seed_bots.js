exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('bots').del()
        .then(function () {
            // Inserts seed entries
            return knex('bots').insert([
                {name: 'Adept'},
                {name: 'Backdoor.io'},
                {name: 'Balko'},
                {name: 'CandyPreme'},
                {name: 'Cybersole'},
                {name: 'Dashe'},
                {name: 'Eve'},
                {name: 'F3ather'},
                {name: 'FlareAIO'},
                {name: 'Fleek Framework'},
                {name: 'Galaxsio'},
                {name: 'Ganesh'},
                {name: 'Hawkmesh'},
                {name: 'Hayha'},
                {name: 'Kodai'},
                {name: 'Kickmoji'},
                {name: 'Kilo'},
                {name: 'Launcher'},
                {name: 'Mbot'},
                {name: 'Mekpreme'},
                {name: 'Phantom'},
                {name: 'Phasma'},
                {name: 'Prism'},
                {name: 'Polaris'},
                {name: 'Project destroyer'},
                {name: 'Rush'},
                {name: 'S-chrysant'},
                {name: 'Scottbot'},
                {name: 'Sieupreme'},
                {name: 'SoleAIO'},
                {name: 'Solyd'},
                {name: 'Splashforce'},
                {name: 'TKS - The kick station'},
                {name: 'Tohru'},
                {name: 'Velox'},
                {name: 'Wrath'},
                {name: 'Wop'},
                {name: 'Zeny'},
            ]);
        });
};
