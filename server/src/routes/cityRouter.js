const express = require('express');
const cityController = require('../controllers/cityController');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateCity } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/',
    callbackErrorHandler(cityController.viewAllCitys));

router.post('/',
    isLoggedIn, isAdmin, validateCity, callbackErrorHandler(cityController.createCity));

router.get('/:id', validateId, callbackErrorHandler(cityController.viewSingleCity));

router.put('/:id',
    validateId, isLoggedIn, isAdmin, validateCity, callbackErrorHandler(cityController.updateCity));

router.delete('/:id',
    validateId, isLoggedIn, isAdmin, callbackErrorHandler(cityController.deleteCity));

module.exports = router;
