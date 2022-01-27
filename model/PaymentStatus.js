const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize/sequelize');

const PaymentStatus = sequelize.define('PaymentStatus', {
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
                msg: "Nazwa statusu płatności jest wymagana"
            },
            max: {
                args: [20],
                msg: "Nazwa statusu płatności zawiera maksymalnie 20 znaków"
            },
            is: {
                args: /^[a-zA-ZąęćłńóśżźĄĘĆŁŃÓŚŹŻ]*$/,
                msg: "Nazwa statusu płatności musi składać się tylko z liter"
            },
        }
    },
});

module.exports = PaymentStatus