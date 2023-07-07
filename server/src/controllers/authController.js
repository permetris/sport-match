const User = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcrypt');
const { hashPassword } = require('../utils/hashPassword');
const { ErrorMessages } = require('../errors/errorMessages');
const { ValidationError, NotFoundError, AuthorizationError, AuthenticationError } = require('../errors/Errors');
const { HTTP_STATUS } = require('../utils/httpCodes');
const { createJWT } = require('../token.js');
const { forgottenPasswordEmail } = require('../utils/forgottenPasswordEmail');
const crypto = require('crypto');
const { successMessages } = require('../utils/successMessages');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError(ErrorMessages.userNotFound);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new AuthenticationError(ErrorMessages.passError);

  const token = createJWT(user);

  res.header('Authorization', 'Bearer ' + token);
  res.header('Role', user.role);
  res.header('UserId', user._id);
  res.set('Access-Control-Expose-Headers', ['Authorization', 'Role', 'UserId']);

  return res.status(HTTP_STATUS.OK).json({ success: true, message: successMessages.userLoggedIn(user.username) });
};

const forgottenPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError(ErrorMessages.userNotFound);

  let token = await Token.findOne({ userId: user._id });
  if (!token) {
    token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex')
    }).save();
  }

  const recoveryLink = `${process.env.BASE_URL}/reset-password/${user._id}/${token.token}`;
  await forgottenPasswordEmail(user, recoveryLink);

  res.status(HTTP_STATUS.OK).json({ success: true, message: successMessages.linkSentToUserMail(user.email) });
};

const resetPasswordWithLink = async (req, res) => {
  const { id, emailToken } = req.params;
  const { password } = req.body;

  const token = await Token.findOne({
    userId: id,
    token: emailToken
  });

  if (!token) throw new ValidationError(ErrorMessages.invalidQuery);

  const hashedPassword = await hashPassword(password);

  const user = await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });

  if (!user) { throw new NotFoundError(ErrorMessages.userNotFound); } else {
    await token.delete();
  }

  res.status(HTTP_STATUS.ACCEPTED).json({ success: true, message: successMessages.passwordUpdated });
};

const resetPassword = async (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;

  const user = await User.findById(id);

  if (!user) throw new NotFoundError(ErrorMessages.dataNotFound);

  if (await bcrypt.compare(password, user.password)) {
    user.password = await hashPassword(newPassword);
    user.save();
    return res.status(HTTP_STATUS.ACCEPTED).json({ success: true, message: successMessages.passwordUpdated });
  } else {
    throw new AuthorizationError(ErrorMessages.incorrectPassword);
  }
};

module.exports = {
  loginUser,
  forgottenPassword,
  resetPasswordWithLink,
  resetPassword
};
