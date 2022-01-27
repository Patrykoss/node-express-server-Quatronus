const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize/sequelize');

const PaymentMethod = sequelize.define('PaymentMethod', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Nazwa formy płatności jest wymagana"
            },
            max: {
                args: [20],
                msg: "Nazwa formy płatności zawiera maksymalnie 20 znaków"
            }
        }
    },
});

module.exports = PaymentMethod;