const Sequelize = require('sequelize');

const sequelize = new Sequelize('quatronus', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;