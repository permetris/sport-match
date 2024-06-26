const { UserModel } = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcrypt');
const { hashPassword } = require('../utils/hashPassword');
const { ErrorMessages } = require('../errors/ErrorMessages');
const { ValidationError, NotFoundError, AuthorizationError } = require('../errors/Errors');
const { HTTP_STATUS } = require('../constants/httpCodes');
const { createJWT } = require('../token.js');
const { forgottenPasswordEmail } = require('../utils/forgottenPasswordEmail');
const crypto = require('crypto');
const { successMessages } = require('../utils/successMessages');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email, isDeleted: false }).lean();
    if (!user) throw new NotFoundError(ErrorMessages.userNotFound);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) { return res.status(HTTP_STATUS.FORBIDDEN).json({ success: false, message: 'Passwords do not match' }); }
    const token = createJWT(user);
    const bearer = `Bearer ${token}`;

    const userResponse = { ...user, token: bearer };
    return res.status(HTTP_STATUS.OK).json({ user: userResponse, success: true });
};

const forgottenPassword = async (req, res) => {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
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

    const user = await UserModel.findByIdAndUpdate({ _id: id }, { password: hashedPassword });

    if (!user) { throw new NotFoundError(ErrorMessages.userNotFound); } else {
        await token.delete();
    }

    res.status(HTTP_STATUS.ACCEPTED).json({ success: true, message: successMessages.passwordUpdated });
};

const resetPassword = async (req, res) => {
    const { id } = req.params;
    const { password, newPassword } = req.body;
    console.log(id);

    const user = await UserModel.findById(id);
    console.log(user);

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
