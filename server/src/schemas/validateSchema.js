const { HTTP_STATUS } = require('../constants/httpCodes');

const validateSchema = (schema) => (req, res, next) => {
    console.log('passowrd', req.body);
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(HTTP_STATUS.INVALID).json({ message: error.details.map(err => err.message) });
    }
    next();
};

module.exports = {
    validateSchema
};
