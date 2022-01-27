const PaymentStatus = require('./../model/PaymentStatus');
const PaymentMethod = require('./../model/PaymentMethod');
const Payment = require('./../model/Payment');
const ClientCourse = require('./../model/ClientCourse');
const Course = require('./../model/Course');
const Client = require('./../model/Client');
const Sequelize = require('sequelize');

exports.getClientPayments = async (idClient) => {
    const clientCourse = await ClientCourse.findAll({
        where: {idClient: idClient },
        attributes: ['id']
    });
    let courses = [];
    for (var course of clientCourse)
        courses.push(course.id)
    const pay = await Payment.findAll({
            where: {
                idClientCourse: {
                    [Sequelize.Op.in] : courses
                }},
            attributes: ['id','date', 'amount','idStatus'],
                include: [{
                    model: PaymentStatus,
                    as: 'paymentStatus',
                    attributes: ['id','name']
                },
                {
                    model: PaymentMethod,
                    as: 'paymentMethod',
                    attributes: ['id','name']
                },
                {
                    model: ClientCourse,
                    as: 'clientCourse',
                    attributes: ['id'],
                    include: [{
                                    model: Course,
                                    as: 'course',
                                    attributes: ['id','name']
                                },
                                {
                                    model: Client,
                                    as: 'client',
                                    attributes: ['id','firstName', 'lastName']
                                },]
                }
            ]
        });
        return pay;
}

exports.getPayments = () => {
    return ClientCourse.findAll({
        attributes: ['id'],
        include: [
            {
                model: Course,
                as: 'course',
                attributes: ['id','name']
            },
            {
                model: Client,
                as: 'client',
                attributes: ['id','firstName', 'lastName']
            },
            {
                model: Payment,
                as: 'payments',
                attributes: ['id','date', 'amount'],
                include: [{
                    model: PaymentStatus,
                    as: 'paymentStatus',
                    attributes: ['id','name']
                },
                {
                    model: PaymentMethod,
                    as: 'paymentMethod',
                    attributes: ['id','name']
                }]
            }
        ]
    });
}


exports.getPaymentMethods = (fullAccess) => {
    if(fullAccess)
        return PaymentMethod.findAll({});
    return PaymentMethod.findAll({
        where: {id: [3]}
    });
}

exports.getPaymentStatues = () => {
    return PaymentStatus.findAll({});
}

exports.getPaymentById = (idPayment) => {
    return Payment.findByPk(idPayment,
        {
            attributes: ['id','idMethod','idStatus','idClientCourse','amount','date'],
        }
        );
};

exports.createPayment = (newPaymentData) => {
    return Payment.create({
        amount: newPaymentData.amount,
        date: newPaymentData.date,
        idClientCourse: newPaymentData.idClientCourse,
        idMethod: newPaymentData.idMethod,
        idStatus: newPaymentData.idStatus ? newPaymentData.idStatus : 2
    });
};

exports.updatePayment = (idPayment, data) => {
    return Payment.update(data, { where: { id: idPayment } });
};

exports.checkIfClientAssociatedWithCourse = (idClient, idClientCourse) => {
    console.log(idClient)
    console.log(idClientCourse)

    return ClientCourse.findOne({where: {id: idClientCourse, idClient: idClient}});
}
