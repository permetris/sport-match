// eslint-disable-next-line max-len
const { idSchema, passwordSchema, emailSchema, resetParamsSchema, doubleIdSchema, fieldSchema, matchSchema, reservationSchema, resultSchema, teamSchema, userSchema, querySchema } = require('../schemas/schemas');
const { validateSchema } = require('../schemas/validateSchema');
const { HTTP_STATUS } = require('../utils/httpCodes');

const validateParams = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.params);

  if (error) {
    return res.status(HTTP_STATUS.INVALID).json({ message: error.details.map(err => err.message) });
  }
  next();
};

const validateQuery = (req, res, next) => {
  const { error } = querySchema.validate(req.query);
  if (error) {
    return res.status(HTTP_STATUS.INVALID).json({ message: error.details.map(err => err.message) });
  }
  next();
};

const validateId = validateParams(idSchema);

const validateResetParams = validateParams(resetParamsSchema);

const validateDoubleId = validateParams(doubleIdSchema);

const validateField = validateSchema(fieldSchema);

const validatePassword = validateSchema(passwordSchema);

const validateEmail = validateSchema(emailSchema);

const validateMatch = validateSchema(matchSchema);

const validateReservation = validateSchema(reservationSchema);

const validateResult = validateSchema(resultSchema);

const validateTeam = validateSchema(teamSchema);

const validateUser = validateSchema(userSchema);

module.exports = {
  validateId,
  validateResetParams,
  validatePassword,
  validateEmail,
  validateField,
  validateMatch,
  validateReservation,
  validateResult,
  validateTeam,
  validateUser,
  validateQuery,
  validateDoubleId
};
