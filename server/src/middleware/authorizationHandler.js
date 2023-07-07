const jwt = require('jsonwebtoken');
const { callbackErrorHandler } = require('./errorMiddlewareHandler');
const { ErrorMessages } = require('../errors/ErrorMessages');
const { AuthenticationError, AuthorizationError } = require('../errors/Errors');

const isLoggedIn = callbackErrorHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) throw new AuthenticationError(ErrorMessages.notLoggedIn);

  const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
  req.user = decoded;

  return next();
});

const isAdmin = callbackErrorHandler(async (req, res, next) => {
  if (req.user.role !== 'ADMIN') throw new AuthorizationError(ErrorMessages.unauthorized);

  next();
});

const isProfileOwner = callbackErrorHandler(async (req, res, next) => {
  const id = req.params.playerId ? req.params.playerId : req.params.id;

  if ((id !== req.user.id)) throw new AuthorizationError(ErrorMessages.unauthorized);

  return next();
});

module.exports = {
  isLoggedIn,
  isAdmin,
  isProfileOwner
};
