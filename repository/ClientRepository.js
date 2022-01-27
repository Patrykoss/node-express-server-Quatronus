const Client = require('./../model/Client');
const Course = require('./../model/Course');
const ClientCourse = require('./../model/ClientCourse');

const authUtil = require('./../util/authUtil')
const Sequelize = require('sequelize');

exports.getClients = () => {
    return Client.findAll({where: {
            idRole: {[Sequelize.Op.not]: 2},
        },
        attributes: ['id', 'firstName', 'lastName', 'phoneNumber']
    });
};

exports.getClientById = (idClient) => {
    return Client.findByPk(idClient,
        {
            include: [{
                model: ClientCourse,
                as: 'clientCourse',
                include: [{
                    model: Course,
                    as: 'course'
                }]
            }],
            attributes: {
                exclude: ['password']
            }
        }
        );
};

exports.getClientCourses = (idClient) => {
    return ClientCourse.findAll({
        where: {idClient: idClient},
        include: [{
            model: Course,
            as: 'course',
            attributes: ['name']
        },{
            model: Client,
            as: 'client',
            attributes: ['id', 'firstName', 'lastName']
        }],
        attributes: ['id']
    })
}

exports.existsEmail = (emailData) => {
    return Client.findOne({where: {email: emailData}});
}

exports.createClient = (newClientData) => {
    return Client.create({
        firstName: newClientData.firstName,
        lastName: newClientData.lastName,
        phoneNumber: newClientData.phoneNumber,
        email: newClientData.email,
        password: authUtil.hashPassword('1234'),
        idRole: 1
    });
};

exports.updateClient = (idClient, data) => {
    if(!data.firstName || !data.lastName || !data.phoneNumber || !data.email)
        return Promise.resolve(
            {
            type: 'ValidationError'
            }
        );
        data.idRole = 1;
    return Client.update(data, { where: { id: idClient } });
};

exports.deleteClient = (idClient) => {
    return Client.destroy({
        where: { id: idClient }
    });
};