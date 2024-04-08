const { User } = require('../models');

const userData = [
    {
        username: 'johnsmith',
        password: 'passwordofjohn'
    },
    {
        username: 'janesmith',
        password: 'janespassword'
    }
];

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUsers;