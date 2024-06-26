const { createOne, updateOne } = require('./crudController');
const { UserModel } = require('../models/User');
const { ReservationModel } = require('../models/Reservation');
const { ErrorMessages } = require('../errors/ErrorMessages');
const { NotFoundError } = require('../errors/Errors');
const { HTTP_STATUS } = require('../constants/httpCodes.js');
const { successMessages } = require('../utils/successMessages');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const exclude = '-updatedAt -createdAt -password';

const registerUser = async (req, res) => {
    const { body } = req;

    const user = await UserModel.findOne({ username: body.username }).lean();

    if (user) return res.status(409).json({ success: false, message: 'Username already exists' });
    const salt = await bcrypt.genSalt();
    body.password = await bcrypt.hash(body.password, salt);
    req.body = body;
    await createOne(UserModel, req, res);
};

const viewAllUsers = async (req, res) => {
    const { page = 1, size = 10, isDeleted, username, role } = req.query;
    const skip = (page - 1) * size;

    const query = {};
    if (isDeleted !== undefined) {
        query.isDeleted = isDeleted;
    }
    if (username) {
        query.username =
            { $regex: username, $options: 'i' };
    }
    if (role) {
        query.role = role;
    }

    const dataFound = await UserModel.find(query, exclude)
        .lean()
        .skip(skip)
        .limit(size);

    const totalItems = await UserModel.countDocuments();

    res.status(HTTP_STATUS.OK).json({ success: true, data: dataFound, totalItems });
};

const viewSingleUser = async (req, res) => {
    const { username } = req.params;
    const dataFound = await UserModel.findOne({ username }, exclude).lean();
    if (!dataFound) throw new NotFoundError(ErrorMessages.dataNotFound);

    res.status(HTTP_STATUS.OK).json({ success: true, data: dataFound });
};

const updateUser = async (req, res) => {
    await updateOne(UserModel, req, res);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    const userToDelete = await UserModel.findByIdAndUpdate(id, { isDeleted: true });

    res.status(HTTP_STATUS.OK).json({ success: true, message: successMessages.userDeleted(userToDelete.username) });
};

const viewHistory = async (req, res) => {
    const { id } = req.params;

    const playerId = mongoose.Types.ObjectId(id);

    const exclude = ' -isScheduled -isCanceled -isFinished -registeredPlayers';
    const query = {
        $or: [
            { registeredPlayers: { $in: [playerId] } },
            { 'match.whiteTeam.players': { $in: [playerId] } },
            { 'match.blackTeam.players': { $in: [playerId] } }]
    };

    const userHistory = await ReservationModel.find(query, exclude)
        .populate('field')
        .lean();

    if (!userHistory.length) throw new NotFoundError(ErrorMessages.dataNotFound);

    res.status(HTTP_STATUS.OK).json(userHistory);
};

module.exports = {
    registerUser,
    viewAllUsers,
    viewSingleUser,
    updateUser,
    deleteUser,
    viewHistory
};
