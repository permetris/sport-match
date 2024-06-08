const { createOne, updateOne } = require('./crudController');
const { UserModel } = require('../models/User');
const { ReservationModel } = require('../models/Reservation');
const { ErrorMessages } = require('../errors/ErrorMessages');
const { NotFoundError } = require('../errors/Errors');
const { HTTP_STATUS } = require('../constants/httpCodes.js');
const { successMessages } = require('../utils/successMessages');
const bcrypt = require('bcrypt');

const exclude = '-updatedAt -createdAt -password -role';

const registerUser = async (req, res) => {
    const { body } = req;
    const salt = await bcrypt.genSalt();
    body.password = await bcrypt.hash(body.password, salt);
    req.body = body;
    await createOne(UserModel, req, res);
};

const viewAllUsers = async (req, res) => {
    const { page = 1, size = 10 } = req.query;
    const skip = (page - 1) * size;
    const { username } = req.query;

    const query = {};
    if (username) {
        query.username =
            { $regex: username, $options: 'i' };
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

    if (userToDelete) {
        await ReservationModel.updateMany({
            registeredPlayers: { $in: [id] }
        },
        {
            $pull: { registeredPlayers: id }
        });
    } else {
        throw new NotFoundError(ErrorMessages.dataNotFound);
    }

    res.status(HTTP_STATUS.OK).json({ success: true, message: successMessages.userDeleted(userToDelete.username) });
};

const viewHistory = async (req, res) => {
    const { id } = req.params;
    const exclude = ' -isScheduled -isCanceled -isFinished -registeredPlayers';

    // eslint-disable-next-line max-len
    const userHistory = await ReservationModel.find({ registeredPlayers: { $in: [id] }, isFinished: true }, exclude)
        .populate('field', 'name')
        .populate({
            path: 'match',
            populate: {
                path: 'whiteTeam',
                populate: {
                    path: 'players'
                }
            }
        })
        .populate({
            path: 'match',
            populate: {
                path: 'blackTeam',
                populate: {
                    path: 'players'
                }
            }
        })
        .populate({
            path: 'match',
            populate: {
                path: 'result'
            }
        }).lean();

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
