const ClientCourseRepository = require('./../repository/ClientCourseRepository');
const {ValidationError} = require('sequelize');

exports.getClientCourse = (req, res, next) => {
    ClientCourseRepository.getClientCourseList()
        .then(clientCourse => {
            res.status(200).json(clientCourse);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getClientCourseById = (req, res, next) => {
    const idClientCourse = req.params.idClientCourse;
    ClientCourseRepository.getClientCourseById(idClientCourse)
        .then(clientCourse => {
            if (!clientCourse) {
                res.status(404).json('ClientCourse with id: ' + idClientCourse + ' not found')
            } else {
                res.status(200).json(clientCourse);
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createClientCourse = (req, res, next) => {
    ClientCourseRepository.createClientCourse(req.body)
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

exports.updateClientCourse = (req, res, next) => {
    const idClientCourse = req.params.idClientCourse;
    ClientCourseRepository.updateClientCourse(idClientCourse, req.body)
        .then((result) => {
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

exports.deleteClientCourse = (req, res, next) => {
    const idClientCourse = req.params.idClientCourse;
    ClientCourseRepository.deleteClientCourse(idClientCourse)
        .then(result => {
            if(result == 0)
                res.status(404).json({
                    success: false,
                    message: 'Not found'
                });
            res.status(200).json({
                success: true,
                message: 'Client assignments to course deleted!'
            });
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};