const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize/sequelize');

const Client = sequelize.define('Client', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Imię jest wymagane"
            },
            len: {
                args: [2,20],
                msg: "Imię powinno zawierać od 2 do 20 znaków"
            },
            is: {
                args: /^[a-zA-ZąęćłńóśżźĄĘĆŁŃÓŚŹŻ]*$/,
                msg: "Imię musi składać się tylko z liter"
            },
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Nazwisko jest wymagane"
            },
            len: {
                args: [2,20],
                msg: "Nazwisko powinno zawierać od 2 do 20 znaków"
            },
            is: {
                args: /^[a-zA-ZąęćłńóśżźĄĘĆŁŃÓŚŹŻ]*$/,
                msg: "Nazwisko musi składać się tylko z liter"
            },
        }
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Numer telefonu jest wymagany" 
            },
            is: {
                args: /^[0-9]{9}$/,
                msg: "Numer telefonu składa się z 9 cyfr"
            },
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [0,40],
                msg: "Email powinnien zawierać nie mniej niż 40 znaków"
            },
            isEmail: {
                msg: "Pole powinno zawierać prawidłowy adres email"
            },
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Hasło jest wymagane" 
            }
        }
    },
    idRole: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Rola jest wymagana" 
            }
        }
    },
    refreshToken: {
        type: Sequelize.STRING,
        allowNull: true
    },
    refreshTokenExp: {
        type: Sequelize.DATE,
        allowNull: true
    }

});

module.exports = Client;