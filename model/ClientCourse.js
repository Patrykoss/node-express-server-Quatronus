const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize/sequelize');

const ClientCourse = sequelize.define('ClientCourse', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    idClient: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Wybór klienta jest wymagany"
            }
        }
    },
    idCourse: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Wybór kursu jest wymagany"
            }
        }
    },
    dateJoining: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Data dołączenia klienta na kurs jest wymagana"
            }
        }
    },
    getCertificate: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
});

module.exports = ClientCourse;