const express = require('express');
const router = express.Router();

const paymentController = require('./../controllers/PaymentController');
const isAuth = require('./../middleware/authJwt');

router.get('/',[isAuth.verifyToken, isAuth.isAdmin], paymentController.getPayments);
router.get('/client/:idClient',[isAuth.verifyToken, isAuth.isAdminOrUser], paymentController.getClientPayments);
router.get('/status',[isAuth.verifyToken, isAuth.isAdmin], paymentController.getPaymentStatues);
router.get('/method',[isAuth.verifyToken, isAuth.isAdminOrUser], paymentController.getPaymentMethods);
router.get('/:idPayment',[isAuth.verifyToken, isAuth.isAdmin], paymentController.getPaymentById);
router.post('/',[isAuth.verifyToken, isAuth.isAdminOrUser], paymentController.createPayment);
router.put('/:idPayment',[isAuth.verifyToken, isAuth.isAdmin], paymentController.updatePaymemt);

module.exports = router;