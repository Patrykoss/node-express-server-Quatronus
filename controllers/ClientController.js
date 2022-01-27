const ClientRepository = require('./../repository/ClientRepository');
const { ValidationError } = require('sequelize');


exports.getClients = (req, res, next) => {
    ClientRepository.getClients()
        .then(clients => {
            res.status(200).json(clients);
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};

exports.getClientById = (req, res, next) => {
    const idClient = req.params.idClient;
    if(req.role != 'Admin' && req.idClient != idClient)
        res.status(403).json('You have no access for this data');
    ClientRepository.getClientById(idClient)
        .then(client => {
            if (!client)
                res.status(404).json('Client with id: ' + idClient + ' not found');
            else 
                res.status(200).json(client);
        }) 
        .catch(err => {
            if (!err.statusCode) 
                err.statusCode = 500;
            next(err);
        });;
};

exports.getClientCourses = (req, res, next) => {
    const idClient = req.params.idClient;
    if(req.role!= 'Admin' && req.idClient != idClient)
        res.status(403).json('You have no access for this data');
    ClientRepository.getClientCourses(idClient)
        .then(courses => {
            res.status(200).json(courses);
        }) 
        .catch(err => {
            if (!err.statusCode) 
                err.statusCode = 500;
            next(err);
        });
};

exports.createClient = (req, res, next) => {
    ClientRepository.createClient(req.body)
        .then(newObj => {
            res.status(201).json(newObj.id);
        })
        .catch(err => {
            if(err instanceof ValidationError)
                res.status(400).json(err.message);
                
            if (!err.statusCode)
                err.statusCode = 500;
            
            next(err);
        });
};

exports.updateClient = (req, res, next) => {
    const idClient = req.params.idClient;
    if(req.role != 'Admin' && req.idClient != idClient)
        res.status(403).json('You have no access for this data');
    ClientRepository.updateClient(idClient, req.body)
        .then(result => {
            if (result == 0 || result.type == 'ValidationError')
                res.status(400).json({success: false});
            res.status(201).json({success: true});
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};

exports.deleteClient = (req, res, next) => {
    const idClient = req.params.idClient;
    ClientRepository.deleteClient(idClient)
        .then(result => {
            if(result == 0)
                res.status(404).json({
                    success: false,
                    message: 'Not found'
                });
            res.status(200).json({
                success: true,
                message: 'Client deleted!'
            });
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};

exports.checkEmail = (req, res, next) => {
    const email = req.params.email;
    ClientRepository.existsEmail(email)
        .then(exists => {
            if (exists) {
                res.status(200).json(true);
            } else {
                res.status(200).json(false);
            }
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};

exports.findClientsAvaible = (req, res, next) => {
    const idCourse = req.params.idCourse;
    ClientRepository.findClientsAvaible(idCourse)
        .then(clients => {
            res.status(200).json(clients);
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};