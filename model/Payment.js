const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize/sequelize');

const Payment = sequelize.define('Payment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    idMethod: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Format płatności jest wymagany"
            }
        }
    },
    idStatus: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Status płatności jest wymagany"
            }
        }
    },
    idClientCourse: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Kurs jest wymagany"
            }
        }
    },
    amount: {
        type: Sequelize.DECIMAL(7,2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Kwota płatności jest wymagana"
            },
            isDecimal: {
                msg: "Błędny format kwoty"
            }
        }
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Data płatności jest wymagana"
            },
            isDate: {
                args: true,
                msg: "Wymagany format daty"
            }
        }
    }
});

module.exports = Payment;