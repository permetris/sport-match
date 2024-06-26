const express = require('express');
const fieldController = require('../controllers/fieldController');
const { isLoggedIn, isAdmin, isAnyAdmin } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateField } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/',
    callbackErrorHandler(fieldController.viewAllFields));
router.post('/',

    isLoggedIn, isAnyAdmin, validateField, callbackErrorHandler(fieldController.createField));
router.get('/:id',
    validateId, callbackErrorHandler(fieldController.viewSingleField));
router.put('/:id',
    validateId, isLoggedIn, isAnyAdmin, validateField, callbackErrorHandler(fieldController.updateField));
router.delete('/:id',
    validateId, isLoggedIn, isAnyAdmin, callbackErrorHandler(fieldController.deleteField));

module.exports = router;
