const Client = require('./../model/Client');
const Course = require('./../model/Course');
const ClientCourse = require('./../model/ClientCourse');
const Role = require('./../model/Role');

const { v4: uuidv4 } = require('uuid');
const authUtil = require('./../util/authUtil');

exports.registerAccount = async (data) => {
    if(!data.firstName || !data.lastName || !data.phoneNumber || !data.email || !data.password)
        return false;
    const rowsUpdated = await Client.create({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: authUtil.hashPassword(data.password),
        idRole: 1
    });
    return rowsUpdated != null;
};

exports.signIn = async (data) => {
    const client = await Client.findOne({
        where: {email: data.email},
        include: [{
            model: Role,
            as: 'role',
            }   
        ]
    });
    if (!client)
        return null;
    if(!authUtil.comparePassword(data.password,client.password))
        return null;
    return client;
}

exports.saveRefreshToken = (data, idClient) => {
    return Client.update(data, { where: { id: idClient } });
}

exports.checkRefreshToken = async (data, idClient) => {
    const client = await Client.findOne({
        where: {id: idClient},
        include: [{
            model: Role,
            as: 'role',
            }   
        ]
    });
    if (!client || !client.refreshToken || !client.refreshTokenExp || client.refreshToken != data.refreshToken || client.refreshTokenExp < new Date()) {
        return null;
    }
    return client
}

exports.updateRefreshToken = async (idClient) => {
    var date = new Date();
    const token = {
        refreshToken: uuidv4(),
        refreshTokenExp: date.setDate(date.getDate() + 1)
    }
    const rowsUpdated = await Client.update(token, { where: { id: idClient } });
    if(!rowsUpdated > 0)
        return null;
    return token.refreshToken;
}