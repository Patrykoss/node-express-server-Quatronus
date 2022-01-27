const express = require('express');
const router = express.Router();

const courseController = require('./../controllers/CourseController');
const isAuth = require('./../middleware/authJwt');

router.get('/', courseController.getCourses);
router.get('/:idCourse', courseController.getCourseById);
router.get('/:idCourse/admin',[isAuth.verifyToken, isAuth.isAdmin], courseController.getCourseByIdExtended);
router.post('/',[isAuth.verifyToken, isAuth.isAdmin], courseController.createCourse);
router.put('/:idCourse',[isAuth.verifyToken, isAuth.isAdmin], courseController.updateCourse);
router.delete('/:idCourse',[isAuth.verifyToken, isAuth.isAdmin], courseController.deleteCourse);

module.exports = router;