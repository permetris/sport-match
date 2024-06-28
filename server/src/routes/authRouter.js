const express = require('express');
const authController = require('../controllers/authController');
const { isLoggedIn, isProfileOwner } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateEmail, validatePassword } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.post('/login',

    callbackErrorHandler(authController.loginUser));
router.post('/forgotten-password',
    validateEmail, callbackErrorHandler(authController.forgottenPassword));
router.patch('/reset-password',

    validatePassword, callbackErrorHandler(authController.resetPasswordWithLink));
router.patch('/:id/reset-password',
    validateId, isLoggedIn, isProfileOwner, validatePassword, callbackErrorHandler(authController.resetPassword));
module.exports = router;
