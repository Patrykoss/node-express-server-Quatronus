const PaymentRepository = require('./../repository/PaymentRepository');
const {ValidationError} = require('sequelize');

exports.getPayments = (req, res, next) => {
    PaymentRepository.getPayments()
        .then(payments => {
            res.status(200).json(payments);
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};

exports.getClientPayments = async (req, res, next) => {
    const idClient = req.params.idClient;
    if(req.role != 'Admin' && req.idClient != idClient)
        res.status(403).json('You have no access for this data');

    const payments = await PaymentRepository.getClientPayments(idClient);
    return res.status(200).json(payments);
}

exports.getPaymentMethods = (req, res, next) => {
    let fullAccess = false;
    if(req.role == 'Admin')
        fullAccess = true;
    PaymentRepository.getPaymentMethods(fullAccess)
        .then(paymentsMethods => {
            res.status(200).json(paymentsMethods);
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};

exports.getPaymentStatues = (req, res, next) => {
    PaymentRepository.getPaymentStatues()
        .then(paymentStatues => {
            res.status(200).json(paymentStatues);
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};

exports.getPaymentById = (req, res, next) => {
    const idPayment = req.params.idPayment;
    PaymentRepository.getPaymentById(idPayment)
        .then(payment => {
            if (!payment)
                res.status(404).json('Payment with id: ' + idPayment + ' not found');
            else 
                res.status(200).json(payment);
        }) 
        .catch(err => {
            if (!err.statusCode) 
                err.statusCode = 500;
            next(err);
        });;
};

exports.createPayment = (req, res, next) => {
    if(req.role == 'User')
        PaymentRepository.checkIfClientAssociatedWithCourse(req.idClient, req.body.idClientCourse).then(
            clientCourse => {
                if (!clientCourse)
                res.status(403).json('You have no access for this data')
            });
    PaymentRepository.createPayment(req.body)
        .then(() => {
            res.status(201).json({success: true});
        })
        .catch(err => {
            if(err instanceof ValidationError)
                res.status(400).json({success: true, error:err.message});
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};

exports.updatePaymemt = (req, res, next) => {
    const idPayment = req.params.idPayment;
    PaymentRepository.updatePayment(idPayment, req.body)
        .then(() => {
            res.status(201).json({success: true});
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};