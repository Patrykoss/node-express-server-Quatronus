const sequelize = require('./sequelize');

const Client = require('./../../model/Client');
const Course = require('./../../model/Course');
const ClientCourse = require('./../../model/ClientCourse');
const Role = require('./../../model/Role');
const PaymentMethod = require('./../../model/PaymentMethod');
const PaymentStatus = require('./../../model/PaymentStatus');
const Payment = require('./../../model/Payment');

const authUtil = require('./../../util/authUtil')

module.exports = () => {
    Client.hasMany(ClientCourse, { as: 'clientCourse', foreignKey: { name: 'idClient', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    ClientCourse.belongsTo(Client, { as: 'client', foreignKey: { name: 'idClient', allowNull: false } });
    Course.hasMany(ClientCourse, { as: 'clientCourse', foreignKey: { name: 'idCourse', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    ClientCourse.belongsTo(Course, { as: 'course', foreignKey: { name: 'idCourse', allowNull: false } });

    Role.hasMany(Client, { as: 'client', foreignKey: { name: 'idRole', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Client.belongsTo(Role, { as: 'role', foreignKey: { name: 'idRole', allowNull: false } });

    PaymentMethod.hasMany(Payment, { as: 'payment', foreignKey: { name: 'idMethod', allowNull: false }, constraints: true, onDelete: 'CASCADE' });;
    Payment.belongsTo(PaymentMethod, { as: 'paymentMethod', foreignKey: { name: 'idMethod', allowNull: false } });

    PaymentStatus.hasMany(Payment, { as: 'payment', foreignKey: { name: 'idStatus', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Payment.belongsTo(PaymentStatus, { as: 'paymentStatus', foreignKey: { name: 'idStatus', allowNull: false } });

    ClientCourse.hasMany(Payment, { as: 'payments', foreignKey: { name: 'idClientCourse', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Payment.belongsTo(ClientCourse, { as: 'clientCourse', foreignKey: { name: 'idClientCourse', allowNull: false } });

    let allClients, allCourses, allRoles, allPaymentStatuses, allPaymentMethods, allClientCourse;
    return sequelize
        .sync({ force: true })
        .then(() => {
            return Role.findAll();
        })
        .then(roles => {
            if(!roles || roles.length == 0){
                return Role.bulkCreate([
                    {name: 'User'},
                    {name: 'Admin'}
                ])
                .then(() => {
                    return Role.findAll();
                })
            } else {
                return roles;
            }
        })
        .then(roles => {
            allRoles = roles;
            return Client.findAll();
        })
        .then(clients => {
            if (!clients || clients.length == 0) {
                return Client.bulkCreate([
                    { firstName: 'Admin', lastName: 'Admin', phoneNumber: '000000000', email: 'admin@quatronus.com',password: authUtil.hashPassword('admin'), idRole: allRoles[1].id },
                    { firstName: 'Jan', lastName: 'Kowalski', phoneNumber: '546123456', email: 'jan.kowalski@gmail.com',password: authUtil.hashPassword('1234'), idRole: allRoles[0].id },
                    { firstName: 'Michał', lastName: 'Byk', phoneNumber: '123444555', email: 'michal.byk@gmail.com',password: authUtil.hashPassword('1234'), idRole: allRoles[0].id },
                    { firstName: 'Ola', lastName: 'Kruk', phoneNumber: '777888999', email: 'Ola.kruk@gmail.com',password: authUtil.hashPassword('1234'), idRole: allRoles[0].id },
                ])
                    .then(() => {
                        return Client.findAll();
                    });
            } else {
                return clients;
            }
        })
        .then(clients => {
            allClients = clients;
            return Course.findAll();
        })
        .then(courses => {
            if (!courses || courses.length == 0) {
                return Course.bulkCreate([
                    { name: 'Matura polski', description: 'Przygotowanie do matury z polskiego.', startDate: '2021-02-01', endDate: '2021-06-01' },
                    { name: 'Matura fizyka', description: 'Przygotowanie do matury z fizyki.', startDate: '2021-02-07', endDate: '2021-06-07' }
                ])
                    .then(() => {
                        return Course.findAll();
                    });
            } else {
                return courses;
            }
        })
        .then(courses => {
            allCourses = courses;
            return ClientCourse.findAll();
        })
        .then(clientCourse => {
            if (!clientCourse || clientCourse.length == 0) {
                return ClientCourse.bulkCreate([
                    { idClient: allClients[1].id, idCourse: allCourses[0].id, dateJoining: '2021-03-01', getCertificate: false },
                    { idClient: allClients[1].id, idCourse: allCourses[1].id, dateJoining: '2021-02-11', getCertificate: false },
                    { idClient: allClients[2].id, idCourse: allCourses[1].id, dateJoining: '2021-02-07', getCertificate: true }
                ])
                    .then(() => {
                        return ClientCourse.findAll();
                    });
            } else {
                return clientCourse;
            }
        }).
        then(clientCourse => {
            allClientCourse = clientCourse
            return PaymentMethod.findAll();
        })
        .then(paymentMethods => {
            if(!paymentMethods || paymentMethods.length === 0) {
                return PaymentMethod.bulkCreate([
                    { name: 'Gotówka'},
                    { name: 'Karta'},
                    { name: 'Przelew'}
                ])
                    .then(() => {
                        return PaymentMethod.findAll();
                    });
            } else {
                return paymentMethods;
            }
        })
        .then(paymentMethods => {
            allPaymentMethods = paymentMethods
            return PaymentStatus.findAll();
        })
        .then(paymentStatuses => {
            if(!paymentStatuses || paymentStatuses.length === 0) {
                return PaymentStatus.bulkCreate([
                    { name: 'Zatwierdzona'},
                    { name: 'W trakcie weryfikacji'},
                    { name: 'Nieudana'},
                    { name: 'Zwrócona'},
                    { name: 'Zwrot'}
                ])
                    .then(() => {
                        return PaymentStatus.findAll();
                    });
            } else {
                return paymentStatuses;
            }
        })
        .then(paymentStatuses => {
            allPaymentStatuses = paymentStatuses
            return Payment.findAll();
        })
        .then(payments=> {
            if(!payments || payments.length === 0) {
                return Payment.bulkCreate([
                    { amount: 550, date: '2021-02-01', idStatus: allPaymentStatuses[0].id, idMethod: allPaymentMethods[0].id, idClientCourse: allClientCourse[0].id},
                    { amount: 250.5, date: '2021-03-01', idStatus: allPaymentStatuses[1].id, idMethod: allPaymentMethods[1].id, idClientCourse: allClientCourse[1].id},
                    { amount: 350.45, date: '2021-04-01', idStatus: allPaymentStatuses[2].id, idMethod: allPaymentMethods[2].id, idClientCourse: allClientCourse[0].id}
                ])
                    .then(() => {
                        return Payment.findAll();
                    });
            } else {
                return payments;
            }
        });    
};