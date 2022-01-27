const express = require('express');
const router = express.Router();

const authController = require('./../controllers/AuthController');
const isAuth = require('./../middleware/authJwt');

router.post('/register', authController.registerAccount);
router.post('/signIn', authController.signIn);
router.post('/refreshToken',[isAuth.getTokenValue], authController.updateRefreshToken);

module.exports = router;