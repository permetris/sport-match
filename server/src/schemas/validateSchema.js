const { HTTP_STATUS } = require('../utils/httpCodes');

const validateSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(HTTP_STATUS.INVALID).json({ message: error.details.map(err => err.message) });
  }
  next();
};

module.exports = {
  validateSchema
};
