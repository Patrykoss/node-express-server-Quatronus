const express = require('express');
const router = express.Router();

const clientCourseController = require('../controllers/ClientCourseController');
const authService = require('./../middleware/authJwt');

router.get('/',[authService.verifyToken, authService.isAdmin], clientCourseController.getClientCourse);
router.get('/:idClientCourse',[authService.verifyToken, authService.isAdmin], clientCourseController.getClientCourseById);
router.post('/',[authService.verifyToken, authService.isAdmin], clientCourseController.createClientCourse);
router.put('/:idClientCourse',[authService.verifyToken, authService.isAdmin], clientCourseController.updateClientCourse);
router.delete('/:idClientCourse',[authService.verifyToken, authService.isAdmin], clientCourseController.deleteClientCourse);

module.exports = router;