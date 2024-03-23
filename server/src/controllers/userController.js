const { getOne, createOne, getAll, updateOne } = require('./crudController');
const { UserModel } = require('../models/User');
const {ReservationModel} = require('../models/Reservation');
const { ErrorMessages } = require('../errors/ErrorMessages');
const { NotFoundError } = require('../errors/Errors');
const { HTTP_STATUS } = require('../constants/httpCodes.js');
const { successMessages } = require('../utils/successMessages');

const registerUser = async (req, res) => {
    await createOne(UserModel, req, res);
};

const viewAllUsers = async (req, res) => {
    await getAll(UserModel, req, res);
};

const viewSingleUser = async (req, res) => {
    await getOne(UserModel, req, res);
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
