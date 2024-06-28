const express = require('express');
const reservationController = require('../controllers/reservationController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateDoubleId, validateQuery, validateReservation } = require('../middleware/requestValidationHandler');
const { isLoggedIn, isAdmin, isProfileOwnerOrAdmin, isAnyAdmin } = require('../middleware/authorizationHandler');

const router = express.Router();

router.get('/',
    callbackErrorHandler(reservationController.viewAllReservations));
router.post('/',
    isLoggedIn, isAnyAdmin, validateReservation, callbackErrorHandler(reservationController.createReservation));
router.get('/filter',
    validateQuery, callbackErrorHandler(reservationController.filterReservation));
router.get('/:id',
    validateId, callbackErrorHandler(reservationController.viewSingleReservation));
router.put('/:id',
    validateId, isLoggedIn, callbackErrorHandler(reservationController.updateReservation));
router.put('/:id/add-player/:playerId',
    validateDoubleId, isLoggedIn, isProfileOwnerOrAdmin, callbackErrorHandler(reservationController.addPlayerToReservation));
router.put('/:id/remove-player/:playerId',
    validateDoubleId, isLoggedIn, isProfileOwnerOrAdmin, callbackErrorHandler(reservationController.removePlayerFromReservation));
router.delete('/:id',
    validateId, isLoggedIn, isAnyAdmin, callbackErrorHandler(reservationController.deleteReservation));
router.put('/cancel/:id',
    validateId, isLoggedIn, isAdmin, callbackErrorHandler(reservationController.cancelReservation));
router.post('/check/:id', reservationController.check);
module.exports = router;
