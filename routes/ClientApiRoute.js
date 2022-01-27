const express = require('express');
const router = express.Router();

const clientController = require('./../controllers/ClientController');
const isAuth = require('./../middleware/authJwt');

router.get('/',[isAuth.verifyToken, isAuth.isAdmin], clientController.getClients);
router.get('/email/:email', clientController.checkEmail);
router.get('/:idClient/courses',[isAuth.verifyToken, isAuth.isAdminOrUser], clientController.getClientCourses);
router.get('/:idClient',[isAuth.verifyToken, isAuth.isAdminOrUser], clientController.getClientById);
router.post('/',[isAuth.verifyToken, isAuth.isAdmin], clientController.createClient);
router.put('/:idClient',[isAuth.verifyToken, isAuth.isAdminOrUser], clientController.updateClient);
router.delete('/:idClient',[isAuth.verifyToken, isAuth.isAdmin],clientController.deleteClient);


module.exports = router;