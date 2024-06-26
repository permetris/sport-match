/* eslint-disable max-len */
const express = require('express');
const userController = require('../controllers/userController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateUser } = require('../middleware/requestValidationHandler');
const { isProfileOwner, isLoggedIn, isAdmin, isProfileOwnerOrAdmin } = require('../middleware/authorizationHandler');

const router = express.Router();

router.get('/',
    isLoggedIn, isAdmin, callbackErrorHandler(userController.viewAllUsers));
router.get('/:username/history',
    validateId, isLoggedIn, isProfileOwner, callbackErrorHandler(userController.viewHistory));
router.post('/',
    validateUser, callbackErrorHandler(userController.registerUser));
router.get('/:username',
    callbackErrorHandler(userController.viewSingleUser));
router.put('/:id',
    validateId, isLoggedIn, isProfileOwnerOrAdmin, validateUser, callbackErrorHandler(userController.updateUser));
router.delete('/:id',
    validateId, isLoggedIn, isProfileOwnerOrAdmin, callbackErrorHandler(userController.deleteUser));

module.exports = router;
