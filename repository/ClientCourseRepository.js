const Client = require('../model/Client');
const Course = require('../model/Course');
const ClientCourse = require('../model/ClientCourse');
const Payment = require('../model/Payment');
const PaymentStatus = require('../model/PaymentStatus');
const PaymentMethod = require('../model/PaymentMethod');

exports.getClientCourseList = () => {
    return ClientCourse.findAll({
        include: [
            {
                model: Client,
                as: 'client',
                attributes: ['firstName', 'lastName']
            },
            {
                model: Course,
                as: 'course',
                attributes: ['name']
            }],
        

    });
};

exports.getClientCourseById = (idClientCourse) => {
    return ClientCourse.findByPk(idClientCourse, { include: [
            {
                model: Client,
                as: 'client',
                attributes: ['firstName', 'lastName']
            },
            {
                model: Course,
                as: 'course',
                attributes: ['name']
            },
            {
                model: Payment,
                as: 'payments',
                include: [
                    {
                        model: PaymentStatus,
                        as: 'paymentStatus',
                        attributes: ['id', 'name']
                    },
                    {
                        model: PaymentMethod,
                        as: 'paymentMethod',
                        attributes: ['id', 'name']
                    }
                ]
            }
        
        ]
    });
};

exports.createClientCourse = (data) => {
    return ClientCourse.create({
        idClient: data.idClient,
        idCourse: data.idCourse,
        dateJoining: data.dateJoining,
        getCertificate: data.getCertificate
    });
};

exports.updateClientCourse = (idClientCourse, data) => {
    if(!data.dateJoining)
        return Promise.resolve(
            {
            type: 'ValidationError'
            }
        );
    return ClientCourse.update(data, { where: { id: idClientCourse } });
};

exports.deleteClientCourse = (idClientCourse) => {
    return ClientCourse.destroy({
        where: { id: idClientCourse }
    });
};